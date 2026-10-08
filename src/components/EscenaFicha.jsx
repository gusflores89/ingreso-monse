import { useId, useState } from 'react';
import styles from './LecturaModulo.module.css';

const NIVELES = [
  { ml: 0, nombre: 'Sin jugo', fraccion: '0', litros: '0' },
  { ml: 250, nombre: 'Un cuarto de litro', fraccion: '1/4', litros: '0,25' },
  { ml: 500, nombre: 'Medio litro', fraccion: '1/2', litros: '0,5' },
  { ml: 750, nombre: 'Tres cuartos de litro', fraccion: '3/4', litros: '0,75' },
  { ml: 1000, nombre: 'Un litro', fraccion: '1', litros: '1' },
];

export function JarraExplorable({ inicial = 500, capacidad = false }) {
  const [indice, setIndice] = useState(NIVELES.findIndex(n => n.ml === inicial));
  const [medidas, setMedidas] = useState(false);
  const id = useId();
  const n = NIVELES[indice];
  const altura = n.ml / 1000 * 210;
  const nivelY = 265 - altura;
  return <div className={styles.exploracion}>
    <p className={styles.invitacion}>{capacidad ? 'En esta jarra cabe hasta un litro. Cambiá lo que hay dentro.' : 'Agregá o sacá jugo. Mirá cómo cambia el nivel.'}</p>
    <svg viewBox="0 0 500 315" role="img" aria-label={`${n.ml ? `Jarra con ${n.nombre.toLowerCase()}` : 'Jarra sin jugo'}. Capacidad máxima: un litro.`} className={styles.jarra}>
      <defs><clipPath id={id}><rect x="64" y="55" width="166" height="210" /></clipPath></defs>
      <path d="M232 95 H257 Q282 95 282 120 V202 Q282 225 257 225 H232" fill="none" stroke="#267b9c" strokeWidth="17" />
      <path d="M232 95 H257 Q282 95 282 120 V202 Q282 225 257 225 H232" fill="none" stroke="#e1f1f7" strokeWidth="9" />
      <path d="M61 55 L35 34 L89 45 H232 V265 Q232 273 222 273 H72 Q61 273 61 263 Z" fill="#fff" stroke="#267b9c" strokeWidth="4" />
      <g clipPath={`url(#${id})`}>
        <rect x="64" y={nivelY} width="166" height={altura} fill="#f2b238" />
        {n.ml > 0 && <line x1="64" x2="230" y1={nivelY} y2={nivelY} stroke="#aa630e" strokeWidth="4" />}
      </g>
      <path d="M78 67 V249" fill="none" stroke="#e0edf2" strokeWidth="4" />
      {NIVELES.map((marca, i) => {
        const y = 265 - marca.ml / 1000 * 210;
        return <g key={marca.ml}>
          <line x1="198" x2="232" y1={y} y2={y} stroke="#183c50" strokeWidth="2" />
          {(i === 0 || i === 2 || i === 4 || i === indice) && <>
            <line x1="287" x2="310" y1={y} y2={y} stroke={i === indice ? '#a75d13' : '#668c9e'} strokeWidth={i === indice ? 3 : 1} />
            <text x="321" y={y + 6} fontSize="19" fill="#183c50" fontWeight={i === indice ? 700 : 400}>
              {medidas ? `${marca.ml} ml` : i === 4 ? '1 litro' : i === 2 ? 'medio litro' : i === 0 ? 'vacía' : i === 1 ? 'un cuarto' : 'tres cuartos'}
            </text>
          </>}
        </g>;
      })}
      <text x="63" y="304" fontSize="17" fill="#183c50">Las rayitas muestran cuánto jugo hay.</text>
    </svg>
    <p className={styles.nivel} aria-live="polite">{n.nombre}</p>
    <div className={styles.controlesJarra} role="group" aria-label="Cambiar la cantidad de jugo">
      <button type="button" disabled={indice === 0} onClick={() => setIndice(i => i - 1)}>Sacar un poco</button>
      <button type="button" disabled={indice === 4} onClick={() => setIndice(i => i + 1)}>Agregar un poco</button>
    </div>
    <p className={styles.note}>Cada toque cambia una de las cuatro partes iguales que caben en esta jarra.</p>
    <button type="button" className={styles.verMedidas} aria-expanded={medidas} onClick={() => setMedidas(v => !v)}>{medidas ? 'Volver a los nombres' : 'Ver cómo se escribe esta cantidad'}</button>
    {medidas && <div className={styles.equivalencias}>
      <p><strong>{n.ml === 0 ? 'Sin jugo' : n.ml === 1000 ? '1 litro' : `${n.fraccion} de litro`} = {n.litros} L = {n.ml} ml</strong></p>
      <p>L quiere decir litro. ml quiere decir mililitro: una unidad más pequeña. Un litro tiene 1000 mililitros.</p>
      <p>Cuatro partes de 250 ml llenan esta jarra: 250 + 250 + 250 + 250 = 1000 ml.</p>
      <details><summary>Si una botella dice «cc»</summary><p>Un cc equivale a un ml. Por ejemplo, 750 cc y 750 ml indican la misma cantidad de líquido.</p></details>
    </div>}
  </div>;
}

function Instrumentos() {
  const [instrumento, setInstrumento] = useState(0);
  return <div className={styles.exploracion}>
    <div role="group" aria-label="Elegir qué medir" className={styles.controlesJarra}>
      {['Harina en la balanza', 'Jugo en la jarra', 'Tiempo de un juego'].map((t,i) => <button key={t} type="button" aria-pressed={instrumento === i} onClick={() => setInstrumento(i)}>{t}</button>)}
    </div>
    {instrumento === 1 ? <JarraExplorable capacidad /> : instrumento === 0 ? <>
      <svg viewBox="0 0 500 290" role="img" aria-label="Bolsa de harina sobre una balanza. Su pantalla indica 500 gramos." className={styles.jarra}>
        <rect x="80" y="179" width="340" height="76" rx="20" fill="#dcecf2" stroke="#267b9c" strokeWidth="4" />
        <path d="M124 172 H376" stroke="#267b9c" strokeWidth="10" />
        <path d="M155 160 L165 65 L185 42 H315 L335 65 L345 160 Z" fill="#f9e6b7" stroke="#8a6737" strokeWidth="3" />
        <text x="193" y="120" fontSize="28" fill="#614829">HARINA</text>
        <rect x="177" y="196" width="146" height="40" rx="4" fill="white" stroke="#267b9c" />
        <text x="205" y="226" fontSize="29" fill="#183c50">500 g</text>
      </svg>
      <p>Esto es una <strong>balanza</strong>: ponemos la harina encima y leemos su masa. La pantalla dice <strong>500 gramos</strong>. La letra g significa gramos.</p>
    </> : <>
      <svg viewBox="0 0 500 230" role="img" aria-label="Un temporizador marca cero minutos al empezar y cinco minutos al terminar: pasaron cinco minutos." className={styles.jarra}>
        {[['INICIO', '00:00', 15], ['FINAL', '05:00', 282]].map(([titulo,hora,x]) => <g key={titulo}>
          <rect x={x} y="52" width="193" height="110" rx="20" fill="#dcecf2" stroke="#267b9c" strokeWidth="4" />
          <text x={x+43} y="36" fontSize="21" fill="#183c50">{titulo}</text>
          <text x={x+25} y="123" fontSize="45" fill="#183c50">{hora}</text>
          <text x={x+49} y="150" fontSize="17" fill="#183c50">min : seg</text>
        </g>)}
        <path d="M223 110 H266 M255 98 L269 110 L255 122" stroke="#b1730d" fill="none" strokeWidth="4" />
        <text x="159" y="207" fontSize="24" fill="#183c50">Pasaron 5 minutos</text>
      </svg>
      <p>El temporizador empieza en cero. Cuando llega a cinco minutos, el juego termina. Medimos <strong>cuánto tiempo pasó</strong>.</p>
    </>}
  </div>;
}

export default function EscenaFicha({ ficha, paso = 0 }) {
  if(ficha.exploracion?.tipo === 'instrumentos') return <Instrumentos />;
  if(ficha.exploracion?.tipo === 'jarra' && (ficha.tema !== 'fracciones_concepto' || paso === 1)) return <JarraExplorable inicial={ficha.exploracion.inicial} />;
  if(!ficha.diagrama) return null;
  return <figure className={styles.escena}><img src={ficha.diagrama.url} alt={ficha.diagrama.alt} />
    <details><summary>Leer la descripción del dibujo</summary><p>{ficha.diagrama.alt}</p></details>
  </figure>;
}
