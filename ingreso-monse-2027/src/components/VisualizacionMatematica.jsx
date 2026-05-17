export default function VisualizacionMatematica({ tipo, datos }) {
  if (!tipo || !datos) return null;

  if (tipo === "tabla_multiplicar") {
    const numero = clampNumber(datos.numero, 1, 12);
    const factor = clampNumber(datos.factor, 1, 12);
    const total = numero * factor;

    return (
      <div className="math-visual">
        <div className="multiply-grid" style={{ gridTemplateColumns: `repeat(${factor}, 34px)` }}>
          {Array.from({ length: total }).map((_, index) => (
            <div
              key={index}
              className="multiply-dot"
              style={{ backgroundColor: `hsl(${(index % factor) * (360 / factor)}, 70%, 60%)` }}
            >
              {numero}
            </div>
          ))}
        </div>
        <p className="math-visual-result">
          {numero} x {factor} = {total}
        </p>
      </div>
    );
  }

  if (tipo === "division_repartir") {
    const total = clampNumber(datos.total, 1, 40);
    const grupos = clampNumber(datos.grupos, 1, 6);
    const porGrupo = Math.floor(total / grupos);
    const colores = ["#ff69b4", "#87ceeb", "#98fb98", "#facc15", "#dda0dd", "#fb923c"];

    return (
      <svg viewBox="0 0 500 400" className="math-visual-svg" role="img" aria-label={`${total} dividido ${grupos}`}>
        <text x="250" y="30" textAnchor="middle" className="svg-title">
          {total} / {grupos} = {porGrupo}
        </text>
        {Array.from({ length: grupos }).map((_, grupoIndex) => (
          <g key={grupoIndex}>
            <text x="28" y={80 + grupoIndex * 58} className="svg-label">
              Grupo {grupoIndex + 1}
            </text>
            {Array.from({ length: porGrupo }).map((_, index) => (
              <circle
                key={index}
                cx={120 + index * 35}
                cy={74 + grupoIndex * 58}
                r="14"
                fill={colores[grupoIndex % colores.length]}
                stroke="#334155"
                strokeWidth="2"
              />
            ))}
            <text x={125 + porGrupo * 35} y={80 + grupoIndex * 58} className="svg-label">
              = {porGrupo}
            </text>
          </g>
        ))}
      </svg>
    );
  }

  if (tipo === "fraccion_pizza") {
    if (Array.isArray(datos)) {
      return (
        <div className="fraction-operation">
          {datos.map((item, index) => (
            <VisualizacionMatematica
              key={`${item.label || "pizza"}-${index}`}
              tipo="fraccion_pizza"
              datos={{
                numerador: item.numerador ?? item.pintadas,
                denominador: item.denominador ?? item.total,
                titulo: item.label,
              }}
            />
          ))}
        </div>
      );
    }

    const numerador = clampNumber(datos.numerador ?? datos.pintadas, 0, 12);
    const denominador = clampNumber(datos.denominador ?? datos.total, 1, 12);
    const shownNumerator = Math.min(numerador, denominador);
    const anguloPorcion = 360 / denominador;

    return (
      <div className="math-visual">
        {datos.titulo && <p className="math-visual-title">{datos.titulo}</p>}
        <svg viewBox="0 0 320 320" className="pizza-svg" role="img" aria-label={`${numerador} de ${denominador}`}>
          <circle cx="160" cy="160" r="124" fill="#ffe4b5" stroke="#8b4513" strokeWidth="3" />
          {Array.from({ length: shownNumerator }).map((_, index) => {
            const startAngle = index * anguloPorcion - 90;
            const endAngle = (index + 1) * anguloPorcion - 90;
            const x1 = 160 + 124 * Math.cos(toRadians(startAngle));
            const y1 = 160 + 124 * Math.sin(toRadians(startAngle));
            const x2 = 160 + 124 * Math.cos(toRadians(endAngle));
            const y2 = 160 + 124 * Math.sin(toRadians(endAngle));
            const largeArc = anguloPorcion > 180 ? 1 : 0;

            return (
              <path
                key={index}
                d={`M 160 160 L ${x1} ${y1} A 124 124 0 ${largeArc} 1 ${x2} ${y2} Z`}
                fill="#ff6347"
                stroke="#8b4513"
                strokeWidth="2"
              />
            );
          })}
          {Array.from({ length: denominador }).map((_, index) => {
            const angle = index * anguloPorcion - 90;
            const x = 160 + 124 * Math.cos(toRadians(angle));
            const y = 160 + 124 * Math.sin(toRadians(angle));
            return <line key={index} x1="160" y1="160" x2={x} y2={y} stroke="#8b4513" strokeWidth="2" />;
          })}
          <text x="160" y="305" textAnchor="middle" className="svg-title">
            {numerador}/{denominador}
          </text>
        </svg>
      </div>
    );
  }

  if (tipo === "fraccion_operacion") {
    const { frac1, frac2, operacion, resultado } = datos;
    return (
      <div className="fraction-operation">
        <VisualizacionMatematica tipo="fraccion_pizza" datos={{ numerador: frac1.num, denominador: frac1.den }} />
        <span>{operacion}</span>
        <VisualizacionMatematica tipo="fraccion_pizza" datos={{ numerador: frac2.num, denominador: frac2.den }} />
        <span>=</span>
        <VisualizacionMatematica tipo="fraccion_pizza" datos={{ numerador: resultado.num, denominador: resultado.den }} />
      </div>
    );
  }

  if (tipo === "fraccion_del_resto") {
    const total = clampNumber(datos.total, 1, 30);
    const resto = clampNumber(datos.resto, 0, total);
    const final = clampNumber(datos.final, 0, resto || total);

    return (
      <div className="rest-visual">
        <RestRow title={`1. Tenes ${total} en total`} count={total} active={total} activeClass="blue" />
        <RestRow title={`2. Usas una parte. Quedan ${resto}`} count={total} active={resto} activeClass="blue" mutedFromStart />
        <p className="rest-label orange">RESTO = {resto}</p>
        <RestRow title={`3. Ahora trabajas con esos ${resto} que quedan`} count={resto || total} active={final} activeClass="green" />
        <p className="rest-label green">Resultado del resto = {final}</p>
      </div>
    );
  }

  if (tipo === "angulo") {
    if (Array.isArray(datos)) {
      return (
        <div className="fraction-operation">
          {datos.map((item, index) => (
            <VisualizacionMatematica
              key={`${item.label || "angulo"}-${index}`}
              tipo="angulo"
              datos={{ grados: item.grados ?? item.medida, nombre: item.label }}
            />
          ))}
        </div>
      );
    }

    const grados = clampNumber(datos.grados, 1, 180);
    const radianes = toRadians(grados);

    return (
      <svg viewBox="0 0 300 250" className="math-visual-svg" role="img" aria-label={`Angulo de ${grados} grados`}>
        <line x1="150" y1="150" x2="250" y2="150" stroke="#334155" strokeWidth="3" />
        <line x1="150" y1="150" x2={150 + 100 * Math.cos(radianes)} y2={150 - 100 * Math.sin(radianes)} stroke="#334155" strokeWidth="3" />
        <path d={`M 200 150 A 50 50 0 0 1 ${150 + 50 * Math.cos(radianes)} ${150 - 50 * Math.sin(radianes)}`} fill="none" stroke="#ff6347" strokeWidth="3" />
        <text x="210" y="145" className="svg-title" fill="#ff6347">
          {grados}°
        </text>
        {datos.nombre && (
          <text x="150" y="230" textAnchor="middle" className="svg-label">
            Angulo {datos.nombre}
          </text>
        )}
      </svg>
    );
  }

  if (tipo === "triangulo") {
    const tipoTriangulo = datos.tipo || "triangulo";
    const puntos = tipoTriangulo === "rectangulo" ? "55,205 55,55 255,205" : "150,50 50,205 250,205";

    return (
      <svg viewBox="0 0 300 250" className="math-visual-svg" role="img" aria-label={`Triangulo ${tipoTriangulo}`}>
        <polygon points={puntos} fill="#87ceeb" stroke="#334155" strokeWidth="3" />
        <text x="150" y="238" textAnchor="middle" className="svg-label">
          Triangulo {tipoTriangulo}
        </text>
      </svg>
    );
  }

  if (tipo === "perimetro") {
    const lados = datos.lados || { arriba: 0, derecha: 0, abajo: 0, izquierda: 0 };
    const perimetro = Number(lados.arriba) + Number(lados.derecha) + Number(lados.abajo) + Number(lados.izquierda);

    return (
      <svg viewBox="0 0 350 300" className="math-visual-svg" role="img" aria-label={`Perimetro ${perimetro}`}>
        <rect x="75" y="75" width="200" height="150" fill="#ffe4b5" stroke="#334155" strokeWidth="3" />
        <text x="175" y="60" textAnchor="middle" className="svg-label">{lados.arriba}</text>
        <text x="290" y="155" className="svg-label">{lados.derecha}</text>
        <text x="175" y="250" textAnchor="middle" className="svg-label">{lados.abajo}</text>
        <text x="48" y="155" className="svg-label">{lados.izquierda}</text>
        <text x="175" y="285" textAnchor="middle" className="svg-title" fill="#ff6347">
          Perimetro = {perimetro}
        </text>
      </svg>
    );
  }

  if (tipo === "grafico_barras") {
    const normalizedItems = Array.isArray(datos.datos)
      ? datos.datos
      : Array.isArray(datos.categorias) && Array.isArray(datos.valores)
        ? datos.categorias.map((label, index) => ({ label, valor: datos.valores[index] }))
        : [];
    const items = normalizedItems.slice(0, 12);
    const maxValor = Math.max(1, ...items.map((item) => item.valor));

    return (
      <div className="math-visual">
        {datos.titulo && <p className="math-visual-title">{datos.titulo}</p>}
        <svg viewBox="0 0 620 320" className="math-visual-svg wide" role="img" aria-label="Grafico de barras">
          {items.map((item, index) => {
            const altura = (item.valor / maxValor) * 200;
            const gap = items.length > 6 ? 45 : 75;
            const width = items.length > 6 ? 34 : 54;
            const x = 52 + index * gap;
            return (
              <g key={`${item.label}-${index}`}>
                <rect x={x} y={250 - altura} width={width} height={altura} fill={`hsl(${index * 42}, 70%, 60%)`} stroke="#334155" strokeWidth="2" />
                <text x={x + width / 2} y={242 - altura} textAnchor="middle" className="svg-label">{item.valor}</text>
                <text x={x + width / 2} y="275" textAnchor="middle" className="svg-small">{item.label}</text>
              </g>
            );
          })}
          <line x1="40" y1="250" x2="600" y2="250" stroke="#334155" strokeWidth="2" />
        </svg>
      </div>
    );
  }

  if (tipo === "numeros_romanos") {
    return (
      <div className="roman-visual">
        <div>
          <small>Numero arabigo</small>
          <strong>{datos.arabigo}</strong>
        </div>
        <span>=</span>
        <div>
          <small>Numero romano</small>
          <strong>{datos.romano}</strong>
        </div>
      </div>
    );
  }

  if (tipo === "secuencia") {
    const numeros = Array.isArray(datos.numeros) ? datos.numeros.slice(0, 8) : [];
    return (
      <div className="sequence-visual">
        <div className="sequence-row">
          {numeros.map((numero, index) => (
            <span key={`${numero}-${index}`}>{numero}</span>
          ))}
        </div>
        {datos.patron && <p>Patron: {datos.patron}</p>}
      </div>
    );
  }

  return null;
}

function RestRow({ title, count, active, activeClass, mutedFromStart = false }) {
  return (
    <div className="rest-row">
      <p>{title}</p>
      <div>
        {Array.from({ length: count }).map((_, index) => {
          const isActive = mutedFromStart ? index >= count - active : index < active;
          return <span key={index} className={isActive ? activeClass : "muted"} />;
        })}
      </div>
    </div>
  );
}

function clampNumber(value, min, max) {
  const number = Number(value);
  if (!Number.isFinite(number)) return min;
  return Math.max(min, Math.min(max, Math.trunc(number)));
}

function toRadians(degrees) {
  return (degrees * Math.PI) / 180;
}
