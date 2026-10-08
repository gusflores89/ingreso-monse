import { useEffect, useRef, useState } from 'react';
import styles from './LecturaModulo.module.css';
import EscenaFicha from './EscenaFicha';

export default function LecturaModulo({ userId, tema, children, onContinuar, releer = false }) {
  const [datos, setDatos] = useState(null);
  const [paso, setPaso] = useState(0);
  const [respuesta, setRespuesta] = useState(null);
  const [ayuda, setAyuda] = useState(null);
  const [error, setError] = useState('');
  const [ocupado, setOcupado] = useState(false);
  const [recarga, setRecarga] = useState(0);
  const enviando = useRef(false);
  const titulo = useRef(null);
  useEffect(() => {
    let activo = true;
    setDatos(null); setError(''); setAyuda(null); setRespuesta(null);
    fetch(`/api/fichas?user_id=${encodeURIComponent(userId)}&tema=${encodeURIComponent(tema)}`)
      .then(async r => { const d = await r.json(); if (!r.ok) throw Error(d.error); return d; })
      .then(d => { if (activo) { setDatos(d); setPaso(releer && d.lectura.completada ? 0 : d.lectura.paso); } })
      .catch(e => { if (activo) setError(e.message || 'No pudimos abrir la ficha.'); });
    return () => { activo = false; };
  }, [userId, tema, recarga, releer]);
  useEffect(() => { titulo.current?.focus(); }, [paso]);
  const avanzar = async (eleccion = respuesta) => {
    if (enviando.current || !datos) return;
    enviando.current = true; setOcupado(true); setError('');
    try {
      const r = await fetch('/api/fichas', { method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ user_id: userId, tema, version: datos.ficha.version, paso, respuesta: eleccion }) });
      const d = await r.json(); if (!r.ok) throw Error(d.error);
      if (d.revisar) { setAyuda(d); return; }
      setDatos(prev => ({ ...prev, lectura: d.lectura }));
      if (paso < 3) setPaso(paso + 1);
      else { setAyuda(null); if (releer) setPaso(4); }
    } catch (e) { setError(e.message || 'No pudimos guardar. Podés volver a intentar.'); }
    finally { enviando.current = false; setOcupado(false); }
  };
  if (datos?.lectura.completada && !releer && children) return children;
  const completa = datos?.lectura.completada && (!releer || paso === 4);
  const f = datos?.ficha;
  const continuar = async () => {
    if(enviando.current)return;
    enviando.current=true;setOcupado(true);setError('');
    try { await onContinuar?.(); } catch(e) { setError(e.message || 'No pudimos abrir la actividad. Volvé a intentar.'); }
    finally { enviando.current=false;setOcupado(false); }
  };
  return <section className={styles.reader} aria-label="Lectura previa del módulo" aria-busy={ocupado}>
    <nav className={styles.toolbar} aria-label="Material de estudio">
      <a href={`/biblioteca?user_id=${encodeURIComponent(userId)}`}>Mis fichas</a>
      {f && <a href={f.pdf_url} target="_blank" rel="noopener noreferrer">Abrir o descargar PDF</a>}
      <a href="/">Pausar y salir</a>
    </nav>
    {!datos && !error && <p role="status">Buscando tu ficha y el paso guardado…</p>}
    {error && <div role="alert" className={styles.error}><p>{error}</p>
      {!datos && <button type="button" onClick={() => setRecarga(n => n + 1)}>Volver a intentar</button>}</div>}
    {f && <>
      <p className={styles.eyebrow}>Primero miramos y descubrimos</p>
      <h1>{f.title}</h1>
      <p className={styles.purpose}>{f.proposito}</p>
      {completa ? <div className={styles.done}>
        <h2>Ficha recorrida</h2><p>Ya vimos una primera idea. Ahora seguimos aprendiendo paso a paso.</p>
        <button type="button" disabled={ocupado} onClick={continuar}>{ocupado?'Abriendo…':'Comenzar lo interactivo'}</button>
        <a href={`/biblioteca?user_id=${encodeURIComponent(userId)}&tema=${encodeURIComponent(tema)}`}>Volver a leer</a>
      </div> : <>
        <ol className={styles.progress} aria-label="Pasos de la lectura">
          {['La idea', 'Un ejemplo', 'Otra situación', 'Lo conversamos'].map((t, i) => <li key={t} aria-current={paso === i ? 'step' : undefined}>{i + 1}. {t}</li>)}
        </ol>
        <h2 ref={titulo} tabIndex={-1}>{['¿Para qué nos sirve?', f.ejemplo.titulo, 'La misma idea en otro lugar', 'Miremos un caso'][paso]}</h2>
        {paso === 0 && <>
          <EscenaFicha ficha={f} paso={paso} />
          <p className={styles.scene}>{f.exploracion && <><strong>Así empieza el ejemplo:</strong><br /></>}{f.situacion}</p>
          <details className={styles.mapaOpcional}><summary>Conectamos lo que vimos</summary>
          <div className={styles.map} aria-label="Relaciones entre las ideas">
            {f.relaciones.map((r, i) => <div className={styles.relation} key={i}><strong>{r.desde}</strong><span>{r.enlace}<b aria-hidden="true"> →</b></span><strong>{r.hasta}</strong></div>)}
          </div>
          </details>
          <p className={styles.reminder}>{f.prerrequisito}</p>
        </>}
        {paso === 1 && <>
          <EscenaFicha ficha={f} paso={paso} />
          {!f.diagrama && f.visual?.tipo === 'tabla' && <div className={styles.tableWrap}><table><caption>Relacionamos el ejemplo</caption><thead><tr>{f.visual.cabeceras.map(c => <th scope="col" key={c}>{c}</th>)}</tr></thead><tbody>{f.visual.filas.map((r,i) => <tr key={i}>{r.map((c,j) => <td key={j}>{c}</td>)}</tr>)}</tbody></table></div>}
          <ol className={styles.example}>{f.ejemplo.pasos.map(p => <li key={p}>{p}</li>)}</ol>
        </>}
        {paso === 2 && <>
          <div className={styles.scene}><h3>Probemos en otra situación</h3><p>{f.otroContexto.texto}</p><p><strong>La conexión: </strong>{f.otroContexto.conexion}</p></div>
          <div className={styles.contrast}><h3>Prestá atención a esta diferencia</h3><p>{f.contraste.texto}</p><p>{f.contraste.explicacion}</p></div>
        </>}
        {paso === 3 && <>
          <p>No hay nota. Si hace falta, lo vemos juntas.</p><p className={styles.question}>{f.comprobacion.pregunta}</p>
          <div className={styles.options} role="group" aria-label="Opciones para conversar">
            {f.comprobacion.opciones.map((o,i) => <button type="button" key={o} aria-pressed={respuesta === i} disabled={ocupado} onClick={() => setRespuesta(i)}>{o}</button>)}
          </div>
          {ayuda && <div role="status" className={styles.guidance}><h3>Lo vemos juntas</h3><p>{ayuda.pista}</p><p>{ayuda.explicacion}</p><p><strong>{f.comprobacion.opciones[ayuda.respuesta_guiada]}</strong></p>
            <button type="button" disabled={ocupado} onClick={() => avanzar(ayuda.respuesta_guiada)}>Revisé la explicación; continuar con ayuda</button></div>}
        </>}
        <div className={styles.actions}>
          {paso > 0 && <button type="button" disabled={ocupado} onClick={() => setPaso(p => p - 1)}>Volver al paso anterior</button>}
          <button type="button" disabled={ocupado || (paso === 3 && respuesta === null)} onClick={() => avanzar()}>{ocupado ? 'Guardando…' : paso === 3 ? 'Conversar sobre mi respuesta' : 'Leí este paso; seguir'}</button>
        </div>
        <p className={styles.note}>Cada paso que terminás queda guardado. Podés hacer una pausa.</p>
      </>}
    </>}
  </section>;
}
