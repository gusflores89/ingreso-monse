import { useState } from 'react';
import styles from './ExploradorModulo.module.css';
import { EXPLORADORES_MATEMATICAS, modeloSuma, mcd, romano, datosReparto, serieFibonacci } from '../lib/exploradores-matematicas';

const azul = '#155b91', naranja = '#e69b24', tinta = '#16334c';
const arr = (n) => Array.from({ length: n }, (_, i) => i);
const numero = (n) => Number(n.toFixed(3)).toLocaleString('es-AR');
function Boton({ children, onClick, disabled, selected }) {
  return <button type="button" className={selected ? styles.selected : styles.button} onClick={onClick} disabled={disabled} aria-pressed={selected === undefined ? undefined : selected} style={{ minHeight: 44 }}>{children}</button>;
}
function Control({ label, value, onChange, min = 1, max = 8, step = 1 }) {
  return <label style={{ display: 'grid', gap: 5, minWidth: 150, flex: '1 1 150px' }}><span>{label}: <strong>{value}</strong></span><input type="range" min={min} max={max} step={step} value={value} onChange={e => onChange(Number(e.target.value))} style={{ minHeight: 44, width: '100%', accentColor: azul }} /></label>;
}
function Opciones({ label, values, value, onChange }) {
  return <label style={{ display: 'grid', gap: 5 }}>{label}<select value={value} onChange={e => onChange(Number(e.target.value))} style={{ minHeight: 44, padding: 8, fontSize: 16 }}>{values.map(v => <option key={v} value={v}>{v}</option>)}</select></label>;
}
function Controles({ children }) { return <div className={styles.controls} style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>{children}</div>; }
function Explica({ children }) { return <div className={styles.explanation} aria-live="polite">{children}</div>; }
function Dibujo({ label, children, height = 270, maxWidth = 620 }) {
  return <svg viewBox={`0 0 480 ${height}`} role="img" aria-label={label} style={{ display: 'block', width: '100%', maxWidth, margin: '12px auto', color: tinta, background: '#fff', borderRadius: 14 }}><title>{label}</title>{children}</svg>;
}
function Texto({ x, y, children, size = 18, ...rest }) { return <text x={x} y={y} fontSize={size} fill={tinta} textAnchor="middle" {...rest}>{children}</text>; }
function Jarra({ cantidad, partes, label, color = naranja, segundaCantidad = 0 }) {
  return <Dibujo height={285} maxWidth={300} label={`${label}. ${cantidad} de ${partes} partes iguales de un litro.`}>
    <path d="M292 65 H325 Q350 65 350 92 V172 Q350 195 325 195 H292" fill="none" stroke={azul} strokeWidth="9" />
    <rect x="140" y="40" width="150" height="200" fill="#f4fafc" stroke={azul} strokeWidth="3" />
    <rect x="141" y={240 - 200 * cantidad / partes} width="148" height={200 * cantidad / partes} fill={color} />
    {segundaCantidad > 0 && <rect x="141" y={240 - 200 * cantidad / partes} width="148" height={200 * segundaCantidad / partes} fill="#73bde3" />}
    {arr(partes + 1).map(i => <line key={i} x1="140" x2="290" y1={40 + 200 * i / partes} y2={40 + 200 * i / partes} stroke={azul} strokeWidth={i === 0 || i === partes ? 2 : 1} />)}
    <Texto x={355} y={45}>1 litro</Texto><Texto x={355} y={240}>0</Texto><Texto x={240} y={273}>{label}</Texto>
  </Dibujo>;
}
function Puntos({ n, columns = 10, color = azul, x = 32, y = 35, paso = 28 }) {
  return <>{arr(n).map(i => <circle key={i} cx={x + (i % columns) * paso} cy={y + Math.floor(i / columns) * paso} r={Math.min(9, paso / 3)} fill={color} />)}</>;
}

function Fracciones({ suma = false, decimal = false }) {
  const [d1, setD1] = useState(decimal ? 10 : 2), [n1, setN1] = useState(decimal ? 5 : 1);
  const [d2, setD2] = useState(3), [n2, setN2] = useState(1), [paso, setPaso] = useState(0);
  const m = modeloSuma(n1, d1, n2, d2);
  const cambiar = (setter, v) => { setter(v); setPaso(0); };
  const denominador = (setter, numSetter, num, v) => { setter(v); numSetter(Math.min(num, v)); setPaso(0); };
  return <>
    <p>{suma ? 'Tenemos jugo en dos jarras iguales. Cada jarra llena representa UN litro. Primero mirá las cantidades; después dividí y reuní.' : 'Esta jarra llena contiene un litro. Dividimos ese litro en partes iguales. Cambiá cuánto jugo hay.'}</p>
    <Controles><Opciones label="Partes del primer litro" values={decimal ? [4, 10, 20] : [2, 3, 4, 6, 8]} value={d1} onChange={v => denominador(setD1, setN1, n1, v)} /><Control label="Partes con jugo" min={0} max={d1} value={n1} onChange={v => cambiar(setN1, v)} />
      {suma && <><Opciones label="Partes del segundo litro" values={[2, 3, 4, 6, 8]} value={d2} onChange={v => denominador(setD2, setN2, n2, v)} /><Control label="Partes con jugo en la segunda" min={0} max={d2} value={n2} onChange={v => cambiar(setN2, v)} /></>}
    </Controles>
    <div style={{ display: 'grid', gridTemplateColumns: suma ? 'repeat(auto-fit,minmax(210px,1fr))' : '1fr', gap: 12 }}>
      <Jarra cantidad={paso ? m.primero : n1} partes={paso ? m.denominador : d1} label={paso ? `${n1}/${d1} = ${m.primero}/${m.denominador} L` : `${n1}/${d1} de litro`} />
      {suma && <Jarra cantidad={paso ? m.segundo : n2} partes={paso ? m.denominador : d2} color="#73bde3" label={paso ? `${n2}/${d2} = ${m.segundo}/${m.denominador} L` : `${n2}/${d2} de litro`} />}
    </div>
    {suma ? <>
      <Explica><p>{paso === 0 ? `La primera jarra tiene ${n1} ${n1 === 1 ? "parte" : "partes"} de un litro dividido en ${d1}. La segunda tiene ${n2} ${n2 === 1 ? "parte" : "partes"} de un litro dividido en ${d2}. ${d1 === d2 ? 'Estas partes ya tienen el mismo tamaño.' : 'Sus partes tienen tamaños distintos: todavía no las contamos juntas.'}` : `Ahora cada litro está dividido en ${m.denominador} partes iguales. El nivel de jugo no cambió. Solo agregamos rayitas: ${n1}/${d1} y ${m.primero}/${m.denominador} indican la misma cantidad.`}</p></Explica>
      {paso < 2 && <Boton onClick={() => setPaso(paso + 1)}>{paso === 0 ? '1. Dividir en partes del mismo tamaño' : '2. Reunir el jugo'}</Boton>}
      {paso >= 2 && <><p><strong>Reunimos {m.primero} + {m.segundo} partes: {m.total} partes de tamaño 1/{m.denominador} de litro.</strong></p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(210px,1fr))' }}>{[0, ...(m.total > m.denominador ? [1] : [])].map(i => <Jarra key={i} cantidad={Math.min(m.denominador, Math.max(0, m.total - i * m.denominador))} segundaCantidad={i === 0 ? Math.min(m.segundo, m.denominador - m.primero) : m.total - m.denominador} partes={m.denominador} label={i === 0 ? 'Jugo reunido' : 'Lo que supera un litro'} />)}</div>
        <p className={styles.caption}>Los colores permiten seguir las cantidades: naranja, primera jarra; azul, segunda jarra. Al mezclar jugo real, los colores también se mezclan.</p>
        {paso === 2 && <Boton onClick={() => setPaso(3)}>3. Ver cómo se escribe la cuenta</Boton>}
      </>}
      {paso === 3 && <Explica><p><strong>{n1}/{d1} + {n2}/{d2} = {m.primero}/{m.denominador} + {m.segundo}/{m.denominador} = {m.total}/{m.denominador} de litro.</strong></p><p>Sumamos cuántas partes hay. Su tamaño se conserva: por eso el número de abajo queda igual.</p><details><summary>¿Cómo elegimos ese número de partes?</summary><p>{m.denominador} es el primer número que aparece tanto en la tabla del {d1} como en la del {d2}. Se llama mínimo común múltiplo, o MCM. Nos permite escribir ambas cantidades con partes iguales.</p></details></Explica>}
    </> : <Explica><p>Hay <strong>{n1}/{d1} de litro</strong>: {n1} partes con jugo, de las {d1} que llenan la jarra.</p>{decimal || d1 === 2 || d1 === 4 || d1 === 8 ? <p>Es la misma cantidad que <strong>{numero(n1 / d1)} L = {numero(n1 / d1 * 1000)} ml</strong>. Un litro contiene 1000 mililitros. {n1 === 3 && d1 === 4 ? 'Tres cuartos de litro son 750 ml, como puede indicar una botella.' : 'Cambió la escritura; el jugo sigue en el mismo nivel.'}</p> : <p>El número de abajo indica en cuántas partes iguales dividimos el litro; el de arriba, cuántas tomamos.</p>}</Explica>}
  </>;
}

function Canjes() {
  const [n, setN] = useState(12), [paquetes, setPaquetes] = useState(false);
  return <><p>Tenemos figuritas. Podés guardarlas de a diez o dejarlas sueltas.</p><Controles><Control label="Figuritas" value={n} onChange={setN} min={1} max={39} /><Boton onClick={() => setPaquetes(!paquetes)}>{paquetes ? 'Abrir los paquetes' : 'Guardar de a diez'}</Boton></Controles>
    <Dibujo label={`${n} figuritas: ${paquetes ? `${Math.floor(n / 10)} paquetes de diez y ${n % 10} sueltas` : 'todas sueltas'}`}>
      {paquetes ? <>{arr(Math.floor(n / 10)).map(i => <g key={i}><rect x={25 + i * 145} y="25" width="128" height="92" rx="9" fill="#e8f3ff" stroke={azul} /><Puntos n={10} columns={5} x={40 + i * 145} y={46} paso={23} /><Texto x={89 + i * 145} y={106}>10</Texto></g>)}<Puntos n={n % 10} x={35} y={180} /></> : <Puntos n={n} columns={10} x={50} y={50} paso={36} />}
    </Dibujo><Explica><p>{paquetes ? `${Math.floor(n / 10)} decenas y ${n % 10} unidades: ${Math.floor(n / 10) * 10} + ${n % 10} = ${n}.` : `Hay ${n} figuritas sueltas. Guardarlas en paquetes no agrega ni quita ninguna.`}</p></Explica></>;
}

function Grupos({ min, max }) {
  const [filas, setFilas] = useState(3), [porFila, setPorFila] = useState(min);
  return <><p>Cada fila es una bandeja con la misma cantidad de galletitas.</p><Controles><Control label="Bandejas" value={filas} onChange={setFilas} max={6} /><Control label="Galletitas en cada bandeja" value={porFila} onChange={setPorFila} min={min} max={max} /></Controles><Dibujo label={`${filas} bandejas de ${porFila} galletitas: ${filas * porFila} en total.`} height={300}>{arr(filas).map(i => <g key={i}><rect x="30" y={20 + i * 43} width={porFila * 36 + 12} height="34" rx="7" fill="#fff3dc" stroke="#996319" /><Puntos n={porFila} columns={porFila} x={53} y={37 + i * 43} paso={36} color={naranja} /></g>)}</Dibujo><Explica><p>{arr(filas).map(() => porFila).join(' + ')} = <strong>{filas * porFila}</strong>.</p><p>{filas} × {porFila} significa {filas} grupos de {porFila}. Al agregar una bandeja sumás {porFila} galletitas más.</p></Explica></>;
}
function Reparto() {
  const [total, setTotal] = useState(8), [grupos, setGrupos] = useState(4), [hecho, setHecho] = useState(false);
  const { porGrupo, resto } = datosReparto(total, grupos);
  return <><p>Estas galletitas se reparten por igual entre platos. No se cortan.</p><Controles><Control label="Galletitas" value={total} min={1} max={24} onChange={n => { setTotal(n); setHecho(false); }} /><Control label="Platos" value={grupos} min={2} max={6} onChange={n => { setGrupos(n); setHecho(false); }} /><Boton onClick={() => setHecho(!hecho)}>{hecho ? 'Volver a reunir' : 'Repartir en partes iguales'}</Boton></Controles>
    <Dibujo height={370} label={hecho ? `${porGrupo} galletitas en cada uno de ${grupos} platos. Sobran ${resto}.` : `${total} galletitas antes de repartir.`}>{!hecho ? <Puntos n={total} columns={8} x={75} y={90} paso={42} color={naranja} /> : <>{arr(grupos).map(i => <g key={i}><rect x={10 + (i % 3) * 157} y={15 + Math.floor(i / 3) * 132} width="147" height="120" rx="22" fill="#f2f8fd" stroke={azul} /><Puntos n={porGrupo} columns={4} x={32 + (i % 3) * 157} y={37 + Math.floor(i / 3) * 132} paso={28} color={naranja} /><Texto x={83 + (i % 3) * 157} y={126 + Math.floor(i / 3) * 132} size={16}>{porGrupo} en el plato</Texto></g>)}<Texto x={240} y={306}>Sin repartir: {resto}</Texto><Puntos n={resto} x={190} y={338} color={naranja} /></>}</Dibujo>
    <Explica><p>{hecho ? `${total} ÷ ${grupos}: cada plato recibe ${porGrupo}${resto ? ` y sobran ${resto}` : ', sin sobrantes'}.` : 'Primero contá el total y los platos. Al repartir, el total se conserva.'}</p>{hecho && <p>Comprobamos: {grupos} × {porGrupo} + {resto} = {total}. Multiplicar reconstruye el total; dividir averigua cuánto toca.</p>}</Explica></>;
}
function Romanos() {
  const [n, setN] = useState(14);
  return <><p>Estos símbolos representan cantidades: I vale 1, V vale 5, X vale 10 y L vale 50.</p><Control label="Cantidad que queremos escribir" value={n} min={1} max={50} onChange={setN} /><Dibujo height={260} label={`${n} se escribe ${romano(n)}. Las unidades dibujadas son ${n}.`}><Texto x={240} y={48} size={38}>{romano(n)}</Texto><Puntos n={n} columns={10} x={65} y={86} paso={35} /></Dibujo><Explica><p><strong>{n} = {romano(n)}</strong>.</p><p>{romano(n).includes('XL') ? 'XL representa 40: diez antes de cincuenta.' : romano(n).includes('IX') ? 'IX representa 9: uno antes de diez.' : romano(n).includes('IV') ? 'IV representa 4: uno antes de cinco.' : 'Sumamos los valores de estos símbolos, de mayor a menor.'} Mirá cómo cambia al mover la cantidad una unidad.</p></Explica></>;
}
function Divisibilidad() {
  const [a, setA] = useState(2), [b, setB] = useState(3), [modo, setModo] = useState(0);
  const comun = a * b / mcd(a, b), divisor = mcd(a, b);
  return <><Controles><Control label="Primera cantidad" value={a} min={2} max={8} onChange={setA} /><Control label="Segunda cantidad" value={b} min={2} max={8} onChange={setB} /><Boton selected={modo === 0} onClick={() => setModo(0)}>Saltos que coinciden</Boton><Boton selected={modo === 1} onClick={() => setModo(1)}>Paquetes sin sobrantes</Boton></Controles>
    {modo === 0 ? <><Dibujo label={`Saltos de ${a} y de ${b}. Primera coincidencia positiva: ${comun}.`} height={210}>{[a, b].map((paso, fila) => <g key={fila}><line x1="35" x2="435" y1={60 + fila * 90} y2={60 + fila * 90} stroke={azul} />{arr(comun / paso + 1).map(i => <g key={i}><circle cx={35 + i * paso / comun * 400} cy={60 + fila * 90} r={i * paso === comun ? 12 : 6} fill={fila ? naranja : azul} /><Texto x={35 + i * paso / comun * 400} y={90 + fila * 90} size={14}>{i * paso}</Texto></g>)}</g>)}</Dibujo><Explica><p>Una fila avanza de {a} en {a}; la otra de {b} en {b}. Se encuentran por primera vez después del cero en <strong>{comun}</strong>. Ese es el MCM.</p></Explica></> : <><Dibujo label={`Agrupamos ${a} y ${b} objetos en paquetes de ${divisor}. Ninguno sobra.`} height={225}>{[a, b].map((n, fila) => <g key={fila}>{arr(n / divisor).map(i => <rect key={i} x={25 + i * divisor * 42} y={25 + fila * 100} width={divisor * 42 - 4} height="60" rx="8" fill="#ecf6ff" stroke={azul} />)}<Puntos n={n} columns={8} x={44} y={55 + fila * 100} paso={42} color={fila ? naranja : azul} /></g>)}</Dibujo><Explica><p>El paquete más grande que sirve para ambas cantidades tiene <strong>{divisor}</strong> objetos. Ese es el MCD. Todos los paquetes quedan completos.</p></Explica></>}
  </>;
}
function Resto() {
  const [total, setTotal] = useState(12), [paso, setPaso] = useState(0);
  const queda = total / 2, segundo = queda / 3;
  return <><p>Hay figuritas para regalar. Primero regalamos la mitad. Después regalamos un tercio de las que QUEDAN.</p><Control label="Figuritas al comenzar" value={total} onChange={n => { setTotal(n); setPaso(0); }} min={6} max={24} step={6} /><Dibujo label={`${total} figuritas. ${paso > 0 ? `La mitad, ${queda}, se regaló.` : ''} ${paso > 1 ? `Del resto se regalan ${segundo}. Quedan ${queda - segundo}.` : ''}`} height={240}>{arr(total).map(i => <g key={i}><circle cx={40 + i % 8 * 55} cy={50 + Math.floor(i / 8) * 57} r="17" fill={paso && i < queda ? '#e2e5e9' : paso === 2 && i < queda + segundo ? naranja : azul} /><Texto x={40 + i % 8 * 55} y={56 + Math.floor(i / 8) * 57} size={14} fill={paso && i < queda ? tinta : '#fff'}>{i + 1}</Texto></g>)}</Dibujo><Controles><Boton disabled={paso === 2} onClick={() => setPaso(paso + 1)}>{paso === 0 ? 'Regalar la mitad' : 'Regalar un tercio del resto'}</Boton><Boton onClick={() => setPaso(0)}>Volver al inicio</Boton></Controles><Explica><p>{paso === 0 ? `Comenzamos con ${total}.` : paso === 1 ? `Las grises ya se regalaron: ${queda}. Ahora nuestro grupo de referencia tiene ${queda} figuritas, no ${total}.` : `Las naranjas son un tercio de las ${queda} que quedaban: ${queda} ÷ 3 = ${segundo}. Las azules son las ${queda - segundo} que conservamos.`}</p></Explica></>;
}
function Cuadrado() {
  const [lado, setLado] = useState(3), [inversa, setInversa] = useState(false);
  return <><p>Armamos un piso cuadrado con baldosas. Tiene tantas filas como columnas.</p><Controles><Control label="Baldosas en cada lado" value={lado} onChange={setLado} max={6} /><Boton onClick={() => setInversa(!inversa)}>{inversa ? 'Ver cómo se construye' : 'Pensar desde el total hacia el lado'}</Boton></Controles><Dibujo label={`Cuadrado de ${lado} filas y ${lado} columnas: ${lado * lado} baldosas.`} height={300}>{arr(lado * lado).map(i => <rect key={i} x={110 + i % lado * 40} y={25 + Math.floor(i / lado) * 40} width="38" height="38" fill="#a9d5f0" stroke={azul} />)}<Texto x={240} y={285}>{inversa ? `√${lado * lado} = ${lado}` : `${lado}² = ${lado} × ${lado} = ${lado * lado}`}</Texto></Dibujo><Explica><p>{inversa ? `Si tenemos ${lado * lado} baldosas y hacemos este cuadrado completo, hay ${lado} en cada lado. Esa es la raíz cuadrada.` : `El 2 pequeño indica dos factores iguales: ${lado} × ${lado}. No significa ${lado} × 2.`}</p></Explica></>;
}
function Orden() {
  const [a, setA] = useState(2), [b, setB] = useState(3), [c, setC] = useState(4), [parentesis, setParentesis] = useState(false);
  const total = parentesis ? (a + b) * c : a + b * c;
  return <><p>Las cajas reúnen objetos. Cambiá qué queda dentro de cada caja y observá el total.</p><Controles><Control label="Primera cantidad" value={a} onChange={setA} max={4} /><Control label="Segunda cantidad" value={b} onChange={setB} max={4} /><Control label="Veces" value={c} onChange={setC} min={2} max={4} /><Boton selected={parentesis} onClick={() => setParentesis(!parentesis)}>{parentesis ? 'Quitar los paréntesis' : 'Agrupar la suma con paréntesis'}</Boton></Controles><Dibujo label={parentesis ? `${c} cajas con ${a} más ${b} objetos en cada una: ${total}.` : `${a} objetos sueltos y ${c} cajas de ${b}: ${total}.`} height={320}>
      {!parentesis && <Puntos n={a} x={75} y={35} color={naranja} />}{arr(c).map(i => <g key={i}><rect x="25" y={65 + i * 54} width="400" height="45" rx="7" fill="#f3f8fc" stroke={azul} />{parentesis && <Puntos n={a} x={50} y={87 + i * 54} color={naranja} paso={36} />}<Puntos n={b} x={parentesis ? 50 + a * 36 : 50} y={87 + i * 54} paso={36} /></g>)}
    </Dibujo><Explica><p><strong>{parentesis ? `(${a} + ${b}) × ${c}` : `${a} + ${b} × ${c}`} = {total}</strong>.</p><p>{parentesis ? `Primero reunimos ${a} + ${b} dentro de cada caja. Repetimos esa caja ${c} veces.` : `Primero contamos las cajas: ${b} × ${c} = ${b * c}. Después agregamos los ${a} sueltos.`}</p></Explica></>;
}
function Longitud() {
  const [cm, setCm] = useState(100), [unidad, setUnidad] = useState(0);
  return <><p>La cinta conserva su largo aunque lo escribamos con otra unidad.</p><Controles><Control label="Largo en centímetros" value={cm} onChange={setCm} min={25} max={200} step={25} />{['cm', 'm', 'mm'].map((u, i) => <Boton key={u} selected={unidad === i} onClick={() => setUnidad(i)}>Ver en {u}</Boton>)}</Controles><Dibujo label={`Cinta de ${cm} centímetros sobre una regla de 200 centímetros.`} height={190}><rect x="35" y="40" width={cm * 2} height="40" fill={naranja} /><line x1="35" x2="435" y1="115" y2="115" stroke={azul} />{arr(9).map(i => <g key={i}><line x1={35 + i * 50} x2={35 + i * 50} y1="105" y2="125" stroke={azul} /><Texto x={35 + i * 50} y={150} size={15}>{unidad === 0 ? i * 25 : unidad === 1 ? numero(i / 4) : i * 250}</Texto></g>)}<Texto x={240} y={181}>{['centímetros', 'metros', 'milímetros'][unidad]}</Texto></Dibujo><Explica><p>{cm} cm = {numero(cm / 100)} m = {cm * 10} mm.</p><p>Un metro tiene 100 centímetros. Cada centímetro tiene 10 milímetros. Cambiamos el tamaño de la unidad; la cinta no se estira.</p></Explica></>;
}
function Medidas() {
  const [modo, setModo] = useState(0), [cuartos, setCuartos] = useState(2);
  return <><Controles>{['Jugo', 'Harina', 'Tiempo'].map((v, i) => <Boton key={v} selected={modo === i} onClick={() => setModo(i)}>{v}</Boton>)}<Control label={modo === 2 ? 'Bloques de 15 minutos' : 'Cuartos de la unidad'} value={cuartos} onChange={setCuartos} min={0} max={4} /></Controles>{modo === 0 ? <Jarra cantidad={cuartos} partes={4} label={`${cuartos * 250} ml`} /> : modo === 1 ? <Dibujo height={260} label={`Balanza con ${cuartos} paquetes de 250 gramos: ${cuartos * 250} gramos.`}>{arr(cuartos).map(i => <g key={i}><rect x={45 + i * 100} y={65} width="85" height="90" rx="7" fill="#f5dda8" stroke="#866124" /><Texto x={87 + i * 100} y={115} size={17}>250 g</Texto></g>)}<rect x="30" y="160" width="420" height="65" rx="12" fill="#e8f0f7" stroke={azul} /><Texto x={240} y={202} size={27}>{cuartos * 250} g</Texto></Dibujo> : <Dibujo height={180} label={`${cuartos} bloques de 15 minutos: ${cuartos * 15} minutos de una hora.`}>{arr(4).map(i => <g key={i}><rect x={35 + i * 103} y="35" width="100" height="70" fill={i < cuartos ? naranja : '#edf3f7'} stroke={azul} /><Texto x={85 + i * 103} y={78}>15 min</Texto></g>)}<Texto x={240} y={150}>{cuartos * 15} de 60 minutos</Texto></Dibujo>}
    <Explica><p>{modo === 0 ? `${cuartos}/4 L = ${numero(cuartos / 4)} L = ${cuartos * 250} ml. Un litro contiene 1000 ml.` : modo === 1 ? `${cuartos} paquetes de 250 g pesan ${cuartos * 250} g: ${numero(cuartos / 4)} kg. Un kilogramo contiene 1000 g.` : `${cuartos * 15} minutos = ${cuartos * 15 * 60} segundos. Una hora tiene 60 minutos, no 100. ${cuartos === 4 ? 'Los cuatro bloques completan una hora.' : 'Cada bloque ocupa un cuarto de hora.'}`}</p></Explica></>;
}
function Angulo() {
  const [grados, setGrados] = useState(60);
  const rad = grados * Math.PI / 180, x = 240 + Math.cos(rad) * 130, y = 175 - Math.sin(rad) * 130;
  const ax = 240 + Math.cos(rad) * 55, ay = 175 - Math.sin(rad) * 55;
  return <><p>Un rayo queda quieto. El otro gira desde él. Medimos cuánto se abrió, no el largo de los rayos.</p><Control label="Abertura en grados" value={grados} onChange={setGrados} min={0} max={180} step={15} /><Dibujo label={`Ángulo de ${grados} grados.`}><path d={`M240 175 L295 175 A55 55 0 0 0 ${ax} ${ay} Z`} fill="#f9d88f" /><line x1="240" y1="175" x2="380" y2="175" stroke={azul} strokeWidth="5" /><line x1="240" y1="175" x2={x} y2={y} stroke={azul} strokeWidth="5" /><circle cx="240" cy="175" r="6" fill={tinta} /><Texto x={240} y={235} size={26}>{grados}°</Texto></Dibujo><Explica><p>{grados === 0 ? 'Los rayos están superpuestos: todavía no hay abertura.' : grados < 90 ? 'Es menor que una esquina recta: es un ángulo agudo.' : grados === 90 ? 'Es un cuarto de vuelta: un ángulo recto, como la esquina de una hoja.' : grados < 180 ? 'Supera una esquina recta y no llega a media vuelta: es obtuso.' : 'Media vuelta forma un ángulo llano: 180°.'}</p></Explica></>;
}
function Triangulo() {
  const [a, setA] = useState(60), [b, setB] = useState(60);
  const c = 180 - a - b;
  const rawX = 1 / (1 / Math.tan(a * Math.PI / 180) + 1 / Math.tan(b * Math.PI / 180));
  const tipX = rawX / Math.tan(a * Math.PI / 180), minX = Math.min(0, tipX), maxX = Math.max(1, tipX);
  const scale = Math.min(310 / (maxX - minX), 170 / rawX), offset = 85 - minX * scale;
  const p0 = [offset, 215], p1 = [offset + scale, 215], p2 = [offset + tipX * scale, 215 - rawX * scale];
  return <><p>Cambiá dos esquinas. La tercera se ajusta para cerrar el triángulo.</p><Controles><Control label="Primer ángulo" value={a} min={30} max={90} step={15} onChange={n => { setA(n); setB(Math.min(b, 150 - n)); }} /><Control label="Segundo ángulo" value={b} min={30} max={Math.min(90, 150 - a)} step={15} onChange={setB} /></Controles><Dibujo label={`Triángulo con ángulos ${a}, ${b} y ${c} grados.`}><polygon points={[p0, p1, p2].map(p => p.join(',')).join(' ')} fill="#d7edf9" stroke={azul} strokeWidth="3" /><Texto x={p0[0]} y={240}>{a}°</Texto><Texto x={p1[0]} y={240}>{b}°</Texto><Texto x={p2[0]} y={p2[1] - 12}>{c}°</Texto></Dibujo><Explica><p>{a}° + {b}° + {c}° = <strong>180°</strong>.</p><p>{a === b && b === c ? 'Los tres ángulos son iguales: el triángulo es equilátero.' : a === b || b === c || a === c ? 'Hay dos ángulos iguales y dos lados iguales: es isósceles.' : 'Los tres ángulos son distintos, y sus lados también: es escaleno.'}</p></Explica></>;
}
function Circulo() {
  const [r, setR] = useState(3), [diametro, setDiametro] = useState(false);
  return <><p>Imaginá un cantero redondo. El radio va desde el centro hasta el borde. El diámetro cruza el centro de un borde al otro.</p><Controles><Control label="Radio en metros" value={r} onChange={setR} min={1} max={5} /><Boton onClick={() => setDiametro(!diametro)}>{diametro ? 'Ver solo el radio' : 'Agregar el otro radio'}</Boton></Controles><Dibujo label={`Circunferencia de radio ${r} metros y diámetro ${2 * r} metros.`}><circle cx="240" cy="130" r={r * 21} fill="#e9f5e2" stroke={azul} strokeWidth="3" /><line x1={diametro ? 240 - r * 21 : 240} y1="130" x2={240 + r * 21} y2="130" stroke="#a0520b" strokeWidth="5" /><circle cx="240" cy="130" r="5" fill={tinta} /><Texto x={240} y={260}>{diametro ? `diámetro: ${r} + ${r} = ${2 * r} m` : `radio: ${r} m`}</Texto></Dibujo><Explica><p>{diametro ? `En el diámetro entran dos radios: ${2 * r} m. El radio sigue midiendo ${r} m.` : `Del centro al borde hay ${r} m. Cualquier radio de este círculo tiene esa misma medida.`}</p></Explica></>;
}
function Perimetro({ compuesto = false }) {
  const [ancho, setAncho] = useState(6), [alto, setAlto] = useState(4), [tramos, setTramos] = useState(0);
  const w = ancho * 35, h = alto * 35, x = 65, y = 40, recorte = 2 * 35;
  const puntos = compuesto ? [[x, y], [x + w, y], [x + w, y + h - recorte], [x + w - recorte, y + h - recorte], [x + w - recorte, y + h], [x, y + h]] : [[x, y], [x + w, y], [x + w, y + h], [x, y + h]];
  const lados = compuesto ? [ancho, alto - 2, 2, 2, ancho - 2, alto] : [ancho, alto, ancho, alto];
  return <><p>Vamos a poner una cerca. Solo contamos el borde exterior de la huerta{compuesto ? ', incluso el rincón que entra hacia adentro' : ''}.</p><Controles><Control label="Ancho en metros" value={ancho} min={4} max={8} onChange={n => { setAncho(n); setTramos(0); }} /><Control label="Alto en metros" value={alto} min={3} max={5} onChange={n => { setAlto(n); setTramos(0); }} /><Boton disabled={tramos === lados.length} onClick={() => setTramos(tramos + 1)}>Recorrer el próximo lado</Boton></Controles><Dibujo height={285} label={`Huerta con lados ${lados.join(', ')} metros. Recorridos ${tramos} lados.`}><polygon points={puntos.map(p => p.join(',')).join(' ')} fill="#e9f5e2" stroke="#65886c" strokeWidth="2" />{puntos.map((p, i) => { const q = puntos[(i + 1) % puntos.length]; return <g key={i}><line x1={p[0]} y1={p[1]} x2={q[0]} y2={q[1]} stroke={i < tramos ? '#b85b00' : azul} strokeWidth={i < tramos ? 7 : 2} /><Texto x={(p[0] + q[0]) / 2 + (p[0] === q[0] ? (i === puntos.length - 1 ? -28 : 26) : 0)} y={(p[1] + q[1]) / 2 + (p[1] === q[1] ? (i === 0 ? -15 : 24) : 6)} size={17}>{lados[i]} m</Texto></g>; })}</Dibujo><Explica><p>{tramos ? `${lados.slice(0, tramos).join(' + ')} = ${lados.slice(0, tramos).reduce((s, n) => s + n, 0)} m recorridos.` : 'Empezamos en la esquina superior izquierda.'}</p>{tramos === lados.length && <p>Volvimos al comienzo: el perímetro completo mide <strong>{2 * (ancho + alto)} m</strong>. {compuesto ? 'En este recorte de esquina, los dos tramos que entran reemplazan longitudes iguales del rectángulo. Por eso el perímetro se conserva.' : 'Sumamos los cuatro lados. El interior no se suma.'}</p>}</Explica></>;
}
function Grafico() {
  const [votos, setVotos] = useState([2, 3, 1]);
  const frutas = ['Manzana', 'Banana', 'Naranja'], total = votos.reduce((a, b) => a + b, 0);
  return <><p>Cada persona elige una fruta. Un toque agrega un voto. Una rayita de altura representa un voto.</p><Controles>{frutas.map((f, i) => <Boton key={f} disabled={votos[i] === 8} onClick={() => setVotos(votos.map((v, j) => j === i ? v + 1 : v))}>Votar {f.toLowerCase()}</Boton>)}<Boton onClick={() => setVotos([0, 0, 0])}>Vaciar los votos</Boton></Controles><Dibujo height={290} label={`Votos: ${frutas.map((f, i) => `${f} ${votos[i]}`).join(', ')}. Total ${total}.`}>{arr(9).map(i => <g key={i}><line x1="55" x2="450" y1={235 - i * 25} y2={235 - i * 25} stroke="#d4e0e8" /><Texto x={33} y={240 - i * 25} size={15}>{i}</Texto></g>)}{votos.map((n, i) => <g key={i}><rect x={90 + i * 120} y={235 - n * 25} width="65" height={n * 25} fill={[azul, naranja, '#428063'][i]} /><Texto x={122 + i * 120} y={225 - n * 25}>{n}</Texto><Texto x={122 + i * 120} y={267} size={16}>{frutas[i]}</Texto></g>)}</Dibujo><Explica><p>Hay {total} votos. {total > 0 ? `Manzana tiene ${votos[0]} de ${total}: ${votos[0]}/${total} del total.` : 'Todavía no elegimos ninguna fruta.'}</p><p>Si agregás un voto, suben esa barra y el total; las otras barras conservan su altura.</p></Explica></>;
}
function Proporcion() {
  const [recetas, setRecetas] = useState(2);
  return <><p>Una mezcla lleva 1 vaso de concentrado y 2 vasos de agua. Todos los vasos tienen la misma capacidad.</p><Control label="Veces que hacemos la receta" value={recetas} onChange={setRecetas} min={1} max={4} /><Dibujo label={`${recetas} vasos de concentrado y ${2 * recetas} de agua: ${3 * recetas} vasos de mezcla.`} height={310}>{arr(recetas).map(fila => <g key={fila}>{arr(3).map(i => <g key={i}><path d={`M${75 + i * 130} ${25 + fila * 68} h70 l-8 48 h-54 Z`} fill={i === 0 ? naranja : '#a8d8f0'} stroke={azul} /><Texto x={110 + i * 130} y={57 + fila * 68} size={14}>{i === 0 ? 'jugo' : 'agua'}</Texto></g>)}</g>)}</Dibujo><Explica><p>{recetas} × 1 = {recetas} vasos de concentrado; {recetas} × 2 = {recetas * 2} vasos de agua.</p><p>Multiplicamos ambas cantidades por el mismo número. Por cada vaso de concentrado siguen entrando dos de agua: conservamos la receta.</p></Explica></>;
}
function Secuencia({ fibonacci = false, ciclo = false }) {
  const [salto, setSalto] = useState(2), [cantidad, setCantidad] = useState(4), [modo, setModo] = useState(0);
  const valores = ciclo ? arr(cantidad).map(i => ['A', 'B', 'C'][i % 3]) : fibonacci ? modo === 0 ? arr(cantidad).map(i => 2 ** i) : serieFibonacci(cantidad) : arr(cantidad).map(i => 1 + i * salto);
  return <><p>{ciclo ? 'El patrón tiene tres lugares: A, B y C. Después vuelve a empezar.' : fibonacci ? modo === 0 ? 'Cada término tiene el doble del anterior.' : 'Comenzamos con 1 y 1. Para el siguiente, juntamos los dos anteriores.' : 'Empezamos en 1 y avanzamos siempre la misma cantidad.'}</p><Controles>{!fibonacci && !ciclo && <Control label="Salto que repetimos" value={salto} onChange={setSalto} min={1} max={5} />}{fibonacci && <><Boton selected={modo === 0} onClick={() => setModo(0)}>Duplicar</Boton><Boton selected={modo === 1} onClick={() => setModo(1)}>Juntar los dos anteriores</Boton></>}<Boton disabled={cantidad === 7} onClick={() => setCantidad(cantidad + 1)}>Mostrar el siguiente</Boton><Boton onClick={() => setCantidad(2)}>Volver a dos lugares</Boton></Controles><Dibujo label={`Secuencia: ${valores.join(', ')}.`} height={250}>{valores.map((v, i) => <g key={i}><rect x={15 + i * 65} y="65" width="58" height="60" rx="8" fill={ciclo ? ['#dcefff', '#ffe2a7', '#dcf0df'][i % 3] : '#e8f3fb'} stroke={azul} /><Texto x={44 + i * 65} y={103} size={24}>{v}</Texto><Texto x={44 + i * 65} y={150} size={14}>lugar {i + 1}</Texto>{!ciclo && <rect x={23 + i * 65} y={220 - Number(v) / Math.max(...valores) * 55} width="40" height={Number(v) / Math.max(...valores) * 55} fill={naranja} />}</g>)}</Dibujo><Explica><p>{ciclo ? `El lugar ${cantidad} tiene ${valores.at(-1)}. Los lugares 1, 4 y 7 comparten A: están separados por un ciclo completo de tres.` : fibonacci ? modo === 0 ? `${valores.at(-2)} × 2 = ${valores.at(-1)}. Multiplicar mantiene la razón, no la diferencia.` : cantidad === 2 ? 'Los dos primeros valores son 1 y 1.' : `${valores.at(-3)} + ${valores.at(-2)} = ${valores.at(-1)}.` : `${valores.at(-2)} + ${salto} = ${valores.at(-1)}. La diferencia entre vecinos es siempre ${salto}.`}</p></Explica></>;
}
function Equilibrio() {
  const [manzana, setManzana] = useState(3), [pera, setPera] = useState(2), [mostrar, setMostrar] = useState(false);
  return <><p>Una bolsa con dos manzanas pesa lo que indica la primera balanza. La segunda reúne una manzana y una pera. Los números son unidades de masa de este juego.</p><Controles><Control label="Masa de cada manzana para armar el ejemplo" value={manzana} onChange={n => { setManzana(n); setMostrar(false); }} min={1} max={5} /><Control label="Masa de cada pera para armar el ejemplo" value={pera} onChange={n => { setPera(n); setMostrar(false); }} min={1} max={5} /><Boton onClick={() => setMostrar(!mostrar)}>{mostrar ? 'Ocultar el procedimiento' : 'Desarmar las dos igualdades'}</Boton></Controles><Dibujo label={`Dos manzanas equivalen a ${manzana * 2}. Una manzana más una pera equivalen a ${manzana + pera}.`} height={240}>{[0, 1].map(fila => <g key={fila}><line x1="55" x2="425" y1={85 + fila * 100} y2={85 + fila * 100} stroke={azul} strokeWidth="4" /><path d={`M225 ${85 + fila * 100} l15 -22 l15 22 Z`} fill={azul} /><circle cx="93" cy={51 + fila * 100} r="22" fill="#bd4242" /><Texto x={147} y={58 + fila * 100}>+</Texto>{fila === 0 ? <circle cx="192" cy="51" r="22" fill="#bd4242" /> : <path d="M187 126 Q177 122 180 141 C152 170 209 180 204 154 L198 136 Z" fill="#77a352" />}<Texto x={348} y={60 + fila * 100} size={30}>{fila === 0 ? manzana * 2 : manzana + pera}</Texto></g>)}</Dibujo><Explica>{mostrar ? <><p>Dos manzanas pesan {2 * manzana}. Una pesa {2 * manzana} ÷ 2 = <strong>{manzana}</strong>.</p><p>Manzana + pera pesan {manzana + pera}. Quitamos la manzana conocida: {manzana + pera} − {manzana} = <strong>{pera}</strong> para la pera.</p></> : <p>Las dos manzanas tienen la misma masa. Primero podemos repartir su total en dos partes iguales; después averiguamos la pera.</p>}</Explica></>;
}

function Escena({ config }) {
  switch (config[0]) {
    case 'canjes': return <Canjes />;
    case 'grupos': return <Grupos min={config[2]} max={config[3]} />;
    case 'romanos': return <Romanos />;
    case 'reparto': return <Reparto />;
    case 'divisibilidad': return <Divisibilidad />;
    case 'fraccion': return <Fracciones />;
    case 'sumaFracciones': return <Fracciones suma />;
    case 'decimal': return <Fracciones decimal />;
    case 'resto': return <Resto />;
    case 'cuadrado': return <Cuadrado />;
    case 'orden': return <Orden />;
    case 'longitud': return <Longitud />;
    case 'medidas': return <Medidas />;
    case 'angulo': return <Angulo />;
    case 'triangulo': return <Triangulo />;
    case 'circulo': return <Circulo />;
    case 'perimetro': return <Perimetro />;
    case 'compuesto': return <Perimetro compuesto />;
    case 'grafico': return <Grafico />;
    case 'proporcion': return <Proporcion />;
    case 'secuencia': return <Secuencia />;
    case 'fibonacci': return <Secuencia fibonacci />;
    case 'ciclo': return <Secuencia ciclo />;
    case 'equilibrio': return <Equilibrio />;
    default: return null;
  }
}
export default function ExploradorMatematicas({ tema }) {
  const config = EXPLORADORES_MATEMATICAS[tema];
  if (!config) return null;
  return <section className={styles.root} aria-label={config[1]} data-explorador-matematica={tema}>
    <h3 className={styles.title}>{config[1]}</h3>
    <Escena key={tema} config={config} />
  </section>;
}
