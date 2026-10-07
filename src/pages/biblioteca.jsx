import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import LecturaModulo from '@/components/LecturaModulo';
import styles from '@/components/LecturaModulo.module.css';

export default function Biblioteca() {
  const router = useRouter();
  const userId = typeof router.query.user_id === 'string' ? router.query.user_id : '';
  const tema = typeof router.query.tema === 'string' ? router.query.tema : '';
  const [catalogo, setCatalogo] = useState(null);
  const [error, setError] = useState('');
  const [materia, setMateria] = useState('Todas');
  const [retry, setRetry] = useState(0);
  useEffect(() => {
    if (!userId || tema) return;
    let activo = true; setError(''); setCatalogo(null);
    fetch(`/api/fichas?user_id=${encodeURIComponent(userId)}`).then(async r => { const d = await r.json(); if (!r.ok) throw Error(d.error); return d; })
      .then(d => { if (activo) setCatalogo(d.catalogo); }).catch(e => { if (activo) setError(e.message); });
    return () => { activo = false; };
  }, [userId, tema, retry]);
  if (!router.isReady) return <main className={styles.reader}>Cargando…</main>;
  if (!userId) return <main className={styles.reader}><h1>Mis fichas</h1><a href="/">Ingresá con tu cuenta para ver el avance.</a></main>;
  const volver = `/tutoria?user_id=${encodeURIComponent(userId)}`;
  if (tema) return <main><LecturaModulo key={`${userId}:${tema}`} userId={userId} tema={tema} releer onContinuar={() => router.push(`${volver}&tema=${encodeURIComponent(tema)}&modo=REPASO`)} /></main>;
  return <main className={styles.reader}>
    <a href={volver}>Volver a mi misión</a><h1>Mis fichas para entender</h1>
    <p>En cada tema: primero una idea y sus ejemplos; después, lo interactivo. Podés volver a leer cuando quieras.</p>
    <div className={styles.filter} aria-label="Filtrar fichas">{['Todas','Matemática','Lengua'].map(m => <button key={m} type="button" aria-pressed={materia === m} onClick={() => setMateria(m)}>{m}</button>)}</div>
    {error && <div role="alert"><p>{error}</p><button onClick={() => setRetry(n => n + 1)}>Volver a intentar</button></div>}
    {!catalogo && !error && <p role="status">Cargando tus lecturas…</p>}
    <div className={styles.catalog}>{catalogo?.filter(f => materia === 'Todas' || f.materia === materia).map(f => <article key={f.tema} className={styles.card}>
      <small>{f.materia}</small><h2>{f.titulo}</h2><p>{f.completada ? 'Ficha recorrida · podés releerla' : f.paso ? `Lectura en curso · paso ${f.paso + 1} de 4` : 'Primero: leer la ficha'}</p>
      <a href={`/biblioteca?user_id=${encodeURIComponent(userId)}&tema=${encodeURIComponent(f.tema)}`}>{f.completada ? 'Volver a leer' : 'Leer la ficha'}</a>
      <a href={f.pdf_url} target="_blank" rel="noopener noreferrer">Abrir o descargar PDF</a>
    </article>)}</div>
  </main>;
}
