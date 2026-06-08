import { useState, useEffect } from "react";

export default function VisualizacionMatematica({ tipo, datos = {} }) {
  if (tipo === "ortografia_reglas") {
    return <VisualizacionOrtografia datos={datos} />;
  }

  if (tipo === "fraccion_interactiva") {
    return <InteractiveFractionExplorer datos={datos} />;
  }

  if (tipo === "fraccion_operaciones_interactiva") {
    return <InteractiveFractionOperations datos={datos} />;
  }

  const [radio, setRadio] = useState(40);
  const [modoTab, setModoTab] = useState("medidas");
  const [rollProgress, setRollProgress] = useState(0);
  const [rolling, setRolling] = useState(false);

  useEffect(() => {
    let frameId;
    if (rolling) {
      const startTime = performance.now();
      const duration = 2500;

      const animate = (now) => {
        const elapsed = now - startTime;
        const progress = Math.min(1, elapsed / duration);
        setRollProgress(progress);

        if (progress < 1) {
          frameId = requestAnimationFrame(animate);
        } else {
          setRolling(false);
        }
      };

      frameId = requestAnimationFrame(animate);
    }
    return () => cancelAnimationFrame(frameId);
  }, [rolling]);

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

  if (tipo === "circulo_geometria") {
    return (
      <div style={{
        background: "linear-gradient(135deg, rgba(26, 23, 37, 0.6) 0%, rgba(17, 13, 36, 0.8) 100%)",
        border: "1px solid rgba(139, 92, 246, 0.2)",
        borderRadius: "16px",
        padding: "24px",
        color: "#e8e4f0",
        maxWidth: "600px",
        margin: "16px auto",
        boxShadow: "0 8px 32px 0 rgba(0, 0, 0, 0.3), 0 0 15px rgba(139, 92, 246, 0.1)",
        fontFamily: "'Inter', sans-serif"
      }}>
        {/* Navigation Tabs */}
        <div style={{ display: "flex", gap: "10px", marginBottom: "20px" }}>
          <button
            type="button"
            onClick={() => setModoTab("medidas")}
            style={{
              flex: 1,
              padding: "10px",
              borderRadius: "8px",
              border: modoTab === "medidas" ? "1px solid rgba(139, 92, 246, 0.5)" : "1px solid rgba(255, 255, 255, 0.05)",
              backgroundColor: modoTab === "medidas" ? "rgba(139, 92, 246, 0.15)" : "rgba(255, 255, 255, 0.02)",
              color: modoTab === "medidas" ? "#c084fc" : "#9590a6",
              cursor: "pointer",
              fontWeight: "600",
              fontSize: "0.85rem",
              transition: "all 0.2s ease",
              minHeight: "auto"
            }}
          >
            📏 Explorador de Medidas
          </button>
          <button
            type="button"
            onClick={() => setModoTab("pi")}
            style={{
              flex: 1,
              padding: "10px",
              borderRadius: "8px",
              border: modoTab === "pi" ? "1px solid rgba(139, 92, 246, 0.5)" : "1px solid rgba(255, 255, 255, 0.05)",
              backgroundColor: modoTab === "pi" ? "rgba(139, 92, 246, 0.15)" : "rgba(255, 255, 255, 0.02)",
              color: modoTab === "pi" ? "#c084fc" : "#9590a6",
              cursor: "pointer",
              fontWeight: "600",
              fontSize: "0.85rem",
              transition: "all 0.2s ease",
              minHeight: "auto"
            }}
          >
            🎯 ¿De dónde sale Pi (π)?
          </button>
        </div>

        {modoTab === "medidas" ? (
          <div>
            <div style={{ marginBottom: "16px" }}>
              <label style={{ display: "flex", justifyContent: "space-between", fontSize: "0.85rem", color: "#a59ec9", marginBottom: "8px" }}>
                <span>Arrastrá para cambiar el Radio (r):</span>
                <strong style={{ color: "#c084fc" }}>{radio} cm</strong>
              </label>
              <input
                type="range"
                min="20"
                max="75"
                value={radio}
                onChange={(e) => setRadio(Number(e.target.value))}
                style={{ width: "100%", accentColor: "#8b5cf6", cursor: "pointer" }}
              />
            </div>

            <div style={{ display: "flex", justifyContent: "center", backgroundColor: "rgba(0,0,0,0.15)", borderRadius: "12px", padding: "16px", marginBottom: "16px" }}>
              <svg width="300" height="220" viewBox="0 0 300 220" style={{ overflow: "visible" }}>
                <line x1="150" y1="0" x2="150" y2="220" stroke="rgba(255, 255, 255, 0.03)" strokeWidth="1" />
                <line x1="0" y1="110" x2="300" y2="110" stroke="rgba(255, 255, 255, 0.03)" strokeWidth="1" />
                
                <circle cx="150" cy="110" r={radio} fill="rgba(139, 92, 246, 0.05)" stroke="#8b5cf6" strokeWidth="3" />
                <circle cx="150" cy="110" r="4" fill="#ffffff" />

                {/* Radius */}
                <line x1="150" y1="110" x2={150 + radio * Math.cos(toRadians(-30))} y2={110 + radio * Math.sin(toRadians(-30))} stroke="#c084fc" strokeWidth="3" />
                <text x={150 + (radio / 2) * Math.cos(toRadians(-30))} y={110 + (radio / 2) * Math.sin(toRadians(-30)) - 8} textAnchor="middle" fill="#c084fc" fontSize="0.75rem" fontWeight="700">r</text>
                
                {/* Diameter */}
                <line x1={150 - radio} y1="110" x2="150" y2="110" stroke="#3b82f6" strokeWidth="2" strokeDasharray="3 3" />
                <line x1="150" y1="110" x2={150 + radio} y2="110" stroke="#3b82f6" strokeWidth="2" strokeDasharray="3 3" />
                <text x={150 - radio/2} y="125" textAnchor="middle" fill="#60a5fa" fontSize="0.75rem" fontWeight="700">d = 2r</text>
              </svg>
            </div>

            {/* Calculations panel */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px", textAlign: "left" }}>
              <div style={{ padding: "10px", background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.05)", borderRadius: "8px" }}>
                <span style={{ fontSize: "0.75rem", color: "#9590a6", display: "block" }}>Diámetro (d)</span>
                <strong style={{ fontSize: "1.1rem", color: "#60a5fa" }}>{(radio * 2).toFixed(0)} cm</strong>
                <p style={{ fontSize: "0.65rem", color: "#64748b", margin: "2px 0 0 0" }}>Fórmula: 2 * r</p>
              </div>
              <div style={{ padding: "10px", background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.05)", borderRadius: "8px" }}>
                <span style={{ fontSize: "0.75rem", color: "#9590a6", display: "block" }}>Perímetro (C)</span>
                <strong style={{ fontSize: "1.1rem", color: "#c084fc" }}>{(2 * Math.PI * radio).toFixed(1)} cm</strong>
                <p style={{ fontSize: "0.65rem", color: "#64748b", margin: "2px 0 0 0" }}>Fórmula: 2 * π * r</p>
              </div>
              <div style={{ padding: "10px", background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.05)", borderRadius: "8px", gridColumn: "span 2" }}>
                <span style={{ fontSize: "0.75rem", color: "#9590a6", display: "block" }}>Superficie / Área (A)</span>
                <strong style={{ fontSize: "1.2rem", color: "#10b981" }}>{(Math.PI * radio * radio).toFixed(0)} cm²</strong>
                <p style={{ fontSize: "0.65rem", color: "#64748b", margin: "2px 0 0 0" }}>Fórmula: π * r² (Espacio interior)</p>
              </div>
            </div>
          </div>
        ) : (
          <div>
            <p style={{ fontSize: "0.85rem", color: "#a59ec9", marginBottom: "16px", lineHeight: "1.5", textAlign: "left" }}>
              Cualquier rueda al dar <strong style={{ color: "#e8e4f0", fontWeight: "700" }}>una vuelta completa</strong> recorre una distancia que es un poco más de <strong style={{ color: "#e8e4f0", fontWeight: "700" }}>3 veces su diámetro</strong>. Ese valor exacto es el número <strong style={{ color: "#c084fc", fontWeight: "700" }}>Pi (π ≈ 3.1416)</strong>.
            </p>

            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", backgroundColor: "rgba(0,0,0,0.15)", borderRadius: "12px", padding: "20px 10px", marginBottom: "16px" }}>
              <svg width="100%" height="200" viewBox="0 0 500 200" style={{ overflow: "visible" }}>
                <line x1="40" y1="160" x2="460" y2="160" stroke="rgba(255,255,255,0.2)" strokeWidth="3" />
                <line x1="80" y1="160" x2={80 + rollProgress * 251.3} y2="160" stroke="#10b981" strokeWidth="4" />
                
                {rollProgress > 0 && (
                  <>
                    <line x1="80" y1="170" x2={Math.min(160, 80 + rollProgress * 251.3)} y2="170" stroke="#60a5fa" strokeWidth="4" />
                    {rollProgress >= 0.32 && <text x="120" y="185" textAnchor="middle" fill="#60a5fa" fontSize="0.75rem" fontWeight="700">1 Diám.</text>}

                    {rollProgress >= 0.32 && (
                      <>
                        <line x1="160" y1="170" x2={Math.min(240, 80 + rollProgress * 251.3)} y2="170" stroke="#60a5fa" strokeWidth="4" />
                        {rollProgress >= 0.64 && <text x="200" y="185" textAnchor="middle" fill="#60a5fa" fontSize="0.75rem" fontWeight="700">2 Diám.</text>}
                      </>
                    )}

                    {rollProgress >= 0.64 && (
                      <>
                        <line x1="240" y1="170" x2={Math.min(320, 80 + rollProgress * 251.3)} y2="170" stroke="#60a5fa" strokeWidth="4" />
                        {rollProgress >= 0.95 && <text x="280" y="185" textAnchor="middle" fill="#60a5fa" fontSize="0.75rem" fontWeight="700">3 Diám.</text>}
                      </>
                    )}

                    {rollProgress >= 0.96 && (
                      <>
                        <line x1="320" y1="170" x2="331.3" y2="170" stroke="#f59e0b" strokeWidth="4" />
                        <text x="352" y="185" textAnchor="middle" fill="#f59e0b" fontSize="0.7rem" fontWeight="700">+0.1416</text>
                      </>
                    )}
                  </>
                )}

                {(() => {
                  const cx = 80 + rollProgress * 251.3;
                  const cy = 160 - 40;
                  const angle = rollProgress * 360;
                  return (
                    <g transform={`translate(${cx}, ${cy}) rotate(${angle})`}>
                      <circle cx="0" cy="0" r="40" fill="rgba(139, 92, 246, 0.1)" stroke="#8b5cf6" strokeWidth="3" />
                      <line x1="0" y1="0" x2="0" y2="40" stroke="#c084fc" strokeWidth="3" />
                      <circle cx="0" cy="40" r="4" fill="#c084fc" />
                      <line x1="-40" y1="0" x2="40" y2="0" stroke="rgba(255,255,255,0.2)" strokeWidth="1" />
                      <circle cx="0" cy="0" r="4" fill="#ffffff" />
                    </g>
                  );
                })()}

                <text x="80" y="100" textAnchor="middle" fontSize="0.8rem" fill="#64748b">Inicio</text>
                <line x1="80" y1="110" x2="80" y2="155" stroke="rgba(255,255,255,0.15)" strokeWidth="1" strokeDasharray="2 2" />
                
                {rollProgress >= 0.99 && (
                  <>
                    <text x="331.3" y="100" textAnchor="middle" fontSize="0.8rem" fill="#10b981" fontWeight="700">C = π * d ≈ 3.1416 * d</text>
                    <line x1="331.3" y1="110" x2="331.3" y2="155" stroke="rgba(16, 185, 129, 0.4)" strokeWidth="1" strokeDasharray="2 2" />
                  </>
                )}
              </svg>
            </div>

            <div style={{ display: "flex", gap: "10px" }}>
              <button
                type="button"
                onClick={() => { setRollProgress(0); setRolling(true); }}
                disabled={rolling}
                style={{
                  flex: 1,
                  padding: "12px 20px",
                  borderRadius: "10px",
                  background: rolling ? "rgba(255,255,255,0.05)" : "linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)",
                  color: "#ffffff",
                  fontSize: "0.85rem",
                  fontWeight: "700",
                  border: "none",
                  cursor: rolling ? "not-allowed" : "pointer",
                  boxShadow: rolling ? "none" : "0 4px 15px rgba(139, 92, 246, 0.35)",
                  transition: "all 0.2s ease",
                  minHeight: "auto"
                }}
              >
                {rolling ? "Girando Rueda..." : "🎬 Desenrollar Círculo (Ver Animación)"}
              </button>
              {rollProgress > 0 && !rolling && (
                <button
                  type="button"
                  onClick={() => { setRollProgress(0); }}
                  style={{
                    padding: "12px 18px",
                    borderRadius: "10px",
                    background: "rgba(255,255,255,0.03)",
                    color: "#9590a6",
                    fontSize: "0.85rem",
                    border: "1px solid rgba(255,255,255,0.08)",
                    cursor: "pointer",
                    minHeight: "auto"
                  }}
                >
                  Reiniciar
                </button>
              )}
            </div>
          </div>
        )}
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

function InteractiveFractionExplorer({ datos }) {
  const [den, setDen] = useState(clampNumber(datos?.denominador ?? 4, 1, 12));
  const [selectedSlices, setSelectedSlices] = useState(() => {
    const initialNum = clampNumber(datos?.numerador ?? 3, 0, datos?.denominador ?? 4);
    return new Set(Array.from({ length: initialNum }, (_, i) => i));
  });

  const num = selectedSlices.size;

  const toggleSlice = (index) => {
    setSelectedSlices((prev) => {
      const next = new Set(prev);
      if (next.has(index)) {
        next.delete(index);
      } else {
        next.add(index);
      }
      return next;
    });
  };

  const handleDenChange = (newDen) => {
    const d = clampNumber(newDen, 1, 12);
    setDen(d);
    setSelectedSlices((prev) => {
      const next = new Set();
      prev.forEach((val) => {
        if (val < d) next.add(val);
      });
      return next;
    });
  };

  const handleNumChange = (newNum) => {
    const n = clampNumber(newNum, 0, den);
    setSelectedSlices(new Set(Array.from({ length: n }, (_, i) => i)));
  };

  const fillAll = () => {
    setSelectedSlices(new Set(Array.from({ length: den }, (_, i) => i)));
  };

  const clearAll = () => {
    setSelectedSlices(new Set());
  };

  // SVG calculations for circle slices
  const anguloPorcion = 360 / den;

  const renderPizzaSlices = () => {
    if (den === 1) {
      const isSelected = selectedSlices.has(0);
      return (
        <circle
          cx="160"
          cy="160"
          r="124"
          fill={isSelected ? "#ef4444" : "#ffe4b5"}
          stroke="#8b4513"
          strokeWidth="3"
          onClick={() => toggleSlice(0)}
          style={{ cursor: "pointer", transition: "fill 0.2s" }}
        />
      );
    }

    return Array.from({ length: den }).map((_, index) => {
      const isSelected = selectedSlices.has(index);
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
          fill={isSelected ? "#ef4444" : "#ffe4b5"}
          stroke="#8b4513"
          strokeWidth="2"
          onClick={() => toggleSlice(index)}
          style={{
            cursor: "pointer",
            transition: "all 0.2s ease",
            transformOrigin: "160px 160px",
          }}
        />
      );
    });
  };

  return (
    <div style={{
      display: "flex",
      flexDirection: "column",
      gap: "24px",
      width: "100%",
      fontFamily: "'Inter', sans-serif",
      color: "#e8e4f0"
    }}>
      {/* Layout Columns */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
        gap: "24px",
        alignItems: "start"
      }}>
        {/* Left Column: Visualizations */}
        <div style={{
          display: "flex",
          flexDirection: "column",
          gap: "20px",
          alignItems: "center",
          background: "rgba(0,0,0,0.2)",
          border: "1px solid #2a204d",
          borderRadius: "16px",
          padding: "20px"
        }}>
          <h4 style={{ margin: 0, fontSize: "1rem", color: "#a59ec9", textAlign: "center" }}>🍕 Toca las porciones para comerlas/pintarlas</h4>
          
          {/* Pizza circle container */}
          <div style={{ position: "relative", width: "240px", height: "240px" }}>
            <svg viewBox="0 0 320 320" style={{ width: "100%", height: "100%", overflow: "visible" }}>
              {/* Crust shadow */}
              <circle cx="160" cy="160" r="128" fill="rgba(0,0,0,0.15)" />
              {/* Main Crust */}
              <circle cx="160" cy="160" r="126" fill="#d97706" stroke="#78350f" strokeWidth="2" />
              
              {/* Slices */}
              {renderPizzaSlices()}
              
              {/* Pepperoni dots on selected slices */}
              {den > 1 && Array.from({ length: den }).map((_, index) => {
                if (!selectedSlices.has(index)) return null;
                const midAngle = (index + 0.5) * anguloPorcion - 90;
                const dist = 70;
                const px = 160 + dist * Math.cos(toRadians(midAngle));
                const py = 160 + dist * Math.sin(toRadians(midAngle));
                return (
                  <circle
                    key={`pep-${index}`}
                    cx={px}
                    cy={py}
                    r="8"
                    fill="#991b1b"
                    stroke="#7f1d1d"
                    strokeWidth="1.5"
                    style={{ pointerEvents: "none" }}
                  />
                );
              })}
            </svg>
          </div>

          <div style={{ width: "100%", borderTop: "1px dashed #2a204d", paddingTop: "16px" }}>
            <h4 style={{ margin: "0 0 12px 0", fontSize: "0.95rem", color: "#a59ec9", textAlign: "center" }}>🍫 Barra de Chocolate</h4>
            
            {/* Chocolate Bar representation */}
            <div style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "6px",
              justifyContent: "center",
              background: "rgba(0,0,0,0.15)",
              padding: "12px",
              borderRadius: "12px",
              border: "1px solid rgba(255,255,255,0.02)"
            }}>
              {Array.from({ length: den }).map((_, index) => {
                const isSelected = selectedSlices.has(index);
                return (
                  <button
                    key={index}
                    onClick={() => toggleSlice(index)}
                    style={{
                      width: `${Math.max(32, Math.min(52, 240 / den))}px`,
                      height: "52px",
                      backgroundColor: isSelected ? "#7c2d12" : "#fef3c7",
                      border: "2px solid #451a03",
                      borderRadius: "6px",
                      cursor: "pointer",
                      transition: "all 0.15s ease",
                      boxShadow: isSelected ? "inset 0 4px 6px rgba(0,0,0,0.4)" : "0 3px 5px rgba(0,0,0,0.2)",
                      transform: isSelected ? "scale(0.95)" : "none",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "1.1rem"
                    }}
                    title={`Porción de chocolate ${index + 1}`}
                  >
                    {isSelected ? "🍫" : ""}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right Column: Controls & Text Explanation */}
        <div style={{
          display: "flex",
          flexDirection: "column",
          gap: "16px",
          textAlign: "left"
        }}>
          {/* Fraction display card */}
          <div style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            background: "linear-gradient(135deg, rgba(139, 92, 246, 0.15) 0%, rgba(99, 102, 241, 0.15) 100%)",
            border: "1px solid rgba(139, 92, 246, 0.3)",
            borderRadius: "16px",
            padding: "16px 20px"
          }}>
            <div style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
              <span style={{ fontSize: "0.8rem", color: "#a59ec9", textTransform: "uppercase", fontWeight: "600" }}>Fracción Escrita</span>
              <strong style={{ fontSize: "1.25rem", color: "#c084fc" }}>{nombreDeFraccion(num, den)}</strong>
              <span style={{ fontSize: "0.75rem", color: "#8b5cf6" }}>Equivale a {(num / den).toFixed(2)} ({Math.round((num / den) * 100)}%)</span>
            </div>
            
            {/* Big fraction glyph */}
            <div style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              fontSize: "1.8rem",
              fontWeight: "800",
              lineHeight: "1.1",
              background: "rgba(0,0,0,0.2)",
              padding: "8px 16px",
              borderRadius: "12px",
              minWidth: "60px",
              textAlign: "center"
            }}>
              <span style={{ color: "#ef4444" }}>{num}</span>
              <div style={{ width: "100%", height: "2.5px", backgroundColor: "#e8e4f0", margin: "3px 0" }} />
              <span style={{ color: "#3b82f6" }}>{den}</span>
            </div>
          </div>

          {/* Explanation Text */}
          <div style={{
            background: "rgba(255,255,255,0.02)",
            border: "1px solid rgba(255,255,255,0.05)",
            borderRadius: "16px",
            padding: "16px",
            fontSize: "0.88rem",
            lineHeight: "1.5",
            color: "#d1cce5"
          }}>
            <p style={{ margin: "0 0 8px 0", fontWeight: "700", color: "#ffffff" }}>💡 ¿Qué significa esto?</p>
            {num === 0 ? (
              <span>
                Cortaste el entero en <strong>{den}</strong> partes iguales, pero todavía <strong>no tomaste ninguna</strong> porción. La fracción es 0.
              </span>
            ) : num === den ? (
              <span>
                Cortaste el entero en <strong>{den}</strong> partes iguales y las <strong>tomaste todas</strong>. ¡Tienes el <strong>entero completo</strong> (1)!
              </span>
            ) : (
              <span>
                Cortaste el entero en <strong style={{ color: "#3b82f6" }}>{den}</strong> partes iguales (denominador) y tomaste/pintaste <strong style={{ color: "#ef4444" }}>{num}</strong> de ellas (numerador).
              </span>
            )}
          </div>

          {/* Sliders and Buttons Controls */}
          <div style={{
            display: "flex",
            flexDirection: "column",
            gap: "14px",
            background: "rgba(0,0,0,0.1)",
            padding: "16px",
            borderRadius: "16px",
            border: "1px solid rgba(255,255,255,0.03)"
          }}>
            {/* Denominator (Total parts) */}
            <div>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.85rem", marginBottom: "6px" }}>
                <span style={{ color: "#a59ec9" }}>Cortar en (Denominador):</span>
                <strong style={{ color: "#3b82f6" }}>{den} partes</strong>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <button
                  type="button"
                  onClick={() => handleDenChange(den - 1)}
                  disabled={den <= 1}
                  style={controlBtnStyle(den <= 1)}
                >
                  -
                </button>
                <input
                  type="range"
                  min="1"
                  max="12"
                  value={den}
                  onChange={(e) => handleDenChange(Number(e.target.value))}
                  style={{ flex: 1, accentColor: "#3b82f6", cursor: "pointer" }}
                />
                <button
                  type="button"
                  onClick={() => handleDenChange(den + 1)}
                  disabled={den >= 12}
                  style={controlBtnStyle(den >= 12)}
                >
                  +
                </button>
              </div>
            </div>

            {/* Numerator (Selected parts) */}
            <div>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.85rem", marginBottom: "6px" }}>
                <span style={{ color: "#a59ec9" }}>Pintar (Numerador):</span>
                <strong style={{ color: "#ef4444" }}>{num} partes</strong>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <button
                  type="button"
                  onClick={() => handleNumChange(num - 1)}
                  disabled={num <= 0}
                  style={controlBtnStyle(num <= 0)}
                >
                  -
                </button>
                <input
                  type="range"
                  min="0"
                  max={den}
                  value={num}
                  onChange={(e) => handleNumChange(Number(e.target.value))}
                  style={{ flex: 1, accentColor: "#ef4444", cursor: "pointer" }}
                />
                <button
                  type="button"
                  onClick={() => handleNumChange(num + 1)}
                  disabled={num >= den}
                  style={controlBtnStyle(num >= den)}
                >
                  +
                </button>
              </div>
            </div>

            {/* Action buttons */}
            <div style={{ display: "flex", gap: "8px", marginTop: "4px" }}>
              <button
                type="button"
                onClick={fillAll}
                style={{
                  flex: 1,
                  padding: "8px",
                  borderRadius: "8px",
                  background: "rgba(255,255,255,0.05)",
                  border: "1px solid rgba(255,255,255,0.1)",
                  color: "#ffffff",
                  fontSize: "0.78rem",
                  fontWeight: "600",
                  cursor: "pointer",
                  minHeight: "auto"
                }}
              >
                Pintar Todo
              </button>
              <button
                type="button"
                onClick={clearAll}
                style={{
                  flex: 1,
                  padding: "8px",
                  borderRadius: "8px",
                  background: "rgba(255,255,255,0.05)",
                  border: "1px solid rgba(255,255,255,0.1)",
                  color: "#ffffff",
                  fontSize: "0.78rem",
                  fontWeight: "600",
                  cursor: "pointer",
                  minHeight: "auto"
                }}
              >
                Limpiar Mesa
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function controlBtnStyle(disabled) {
  return {
    width: "28px",
    height: "28px",
    borderRadius: "6px",
    border: "1px solid rgba(255, 255, 255, 0.1)",
    backgroundColor: disabled ? "rgba(255, 255, 255, 0.02)" : "rgba(255, 255, 255, 0.08)",
    color: disabled ? "#64748b" : "#ffffff",
    cursor: disabled ? "not-allowed" : "pointer",
    fontSize: "1rem",
    fontWeight: "700",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    minHeight: "auto",
    padding: 0
  };
}

function nombreDeFraccion(n, d) {
  if (n === 0) return "Cero";

  const numeradores = ["", "Un", "Dos", "Tres", "Cuatro", "Cinco", "Seis", "Siete", "Ocho", "Nueve", "Diez", "Once", "Doce"];
  const denominadoresSingular = ["", "entero", "medio", "tercio", "cuarto", "quinto", "sexto", "séptimo", "octavo", "noveno", "décimo", "onceavo", "doceavo"];
  const denominadoresPlural = ["", "enteros", "medios", "tercios", "cuartos", "quintos", "sextos", "séptimos", "octavos", "novenos", "décimos", "onceavos", "doceavos"];

  const numText = numeradores[n] || String(n);

  if (n === 1) {
    return `${numText} ${denominadoresSingular[d] || `${d} avo`}`;
  } else {
    return `${numText} ${denominadoresPlural[d] || `${d} avos`}`;
  }
}

function InteractiveFractionOperations({ datos }) {
  const [numA, setNumA] = useState(datos?.numA ?? 1);
  const [denA, setDenA] = useState(datos?.denA ?? 2);
  const [numB, setNumB] = useState(datos?.numB ?? 1);
  const [denB, setDenB] = useState(datos?.denB ?? 4);
  const [op, setOp] = useState(datos?.initialOp ?? "+");
  const [igualado, setIgualado] = useState(false);

  useEffect(() => {
    if (datos?.numA !== undefined) setNumA(datos.numA);
    if (datos?.denA !== undefined) setDenA(datos.denA);
    if (datos?.numB !== undefined) setNumB(datos.numB);
    if (datos?.denB !== undefined) setDenB(datos.denB);
    if (datos?.initialOp !== undefined) setOp(datos.initialOp);
  }, [datos]);

  useEffect(() => {
    setIgualado(false);
  }, [numA, denA, numB, denB, op]);

  const gcd = (a, b) => b ? gcd(b, a % b) : a;
  const lcm = (a, b) => (a * b) / gcd(a, b);

  const comunDen = lcm(denA, denB);
  const multA = comunDen / denA;
  const multB = comunDen / denB;
  const eqNumA = numA * multA;
  const eqNumB = numB * multB;

  let resNum = 0;
  let isNegative = false;
  if (op === "+") {
    resNum = eqNumA + eqNumB;
  } else if (op === "-") {
    resNum = eqNumA - eqNumB;
    if (resNum < 0) {
      resNum = 0;
      isNegative = true;
    }
  }

  const renderSmallPizza = (numerator, denominator, colorSelected = "#ef4444", colorUnselected = "#ffe4b5") => {
    const angulo = 360 / denominator;
    const slices = () => {
      if (denominator === 1) {
        const isSel = numerator >= 1;
        return (
          <circle
            cx="160"
            cy="160"
            r="124"
            fill={isSel ? colorSelected : colorUnselected}
            stroke="#8b4513"
            strokeWidth="3"
          />
        );
      }
      return Array.from({ length: denominator }).map((_, index) => {
        const isSel = index < numerator;
        const startAngle = index * angulo - 90;
        const endAngle = (index + 1) * angulo - 90;
        const x1 = 160 + 124 * Math.cos(toRadians(startAngle));
        const y1 = 160 + 124 * Math.sin(toRadians(startAngle));
        const x2 = 160 + 124 * Math.cos(toRadians(endAngle));
        const y2 = 160 + 124 * Math.sin(toRadians(endAngle));
        const largeArc = angulo > 180 ? 1 : 0;
        return (
          <path
            key={index}
            d={`M 160 160 L ${x1} ${y1} A 124 124 0 ${largeArc} 1 ${x2} ${y2} Z`}
            fill={isSel ? colorSelected : colorUnselected}
            stroke="#8b4513"
            strokeWidth="2"
          />
        );
      });
    };

    return (
      <svg viewBox="0 0 320 320" style={{ width: "110px", height: "110px", overflow: "visible" }}>
        <circle cx="160" cy="160" r="128" fill="rgba(0,0,0,0.15)" />
        <circle cx="160" cy="160" r="126" fill="#d97706" stroke="#78350f" strokeWidth="2" />
        {slices()}
      </svg>
    );
  };

  const renderChocolateGrid = () => {
    return (
      <div style={{
        display: "grid",
        gridTemplateColumns: `repeat(${denA}, 1fr)`,
        gap: "4px",
        width: "100%",
        maxWidth: "200px",
        background: "#451a03",
        padding: "6px",
        borderRadius: "8px",
        border: "3px solid #3b1601",
        boxShadow: "0 6px 12px rgba(0,0,0,0.3)"
      }}>
        {Array.from({ length: denA * denB }).map((_, idx) => {
          const col = idx % denA;
          const row = Math.floor(idx / denA);
          const inA = col < numA;
          const inB = row < numB;
          const isIntersection = inA && inB;
          let bgColor = "rgba(255,255,255,0.05)";
          if (isIntersection) {
            bgColor = "#7c2d12";
          } else if (inA) {
            bgColor = "rgba(59, 130, 246, 0.3)";
          } else if (inB) {
            bgColor = "rgba(245, 158, 11, 0.3)";
          }
          return (
            <div
              key={idx}
              style={{
                aspectRatio: "1",
                backgroundColor: bgColor,
                border: "1px solid #3b1601",
                borderRadius: "4px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "1rem",
                transition: "all 0.2s"
              }}
            >
              {isIntersection ? "🍫" : ""}
            </div>
          );
        })}
      </div>
    );
  };

  const FractionControl = ({ label, num, den, setNum, setDen, color }) => {
    return (
      <div style={{
        background: "rgba(255,255,255,0.02)",
        border: "1px solid rgba(255,255,255,0.05)",
        borderRadius: "12px",
        padding: "12px",
        display: "flex",
        flexDirection: "column",
        gap: "10px",
        flex: 1
      }}>
        <h5 style={{ margin: 0, fontSize: "0.85rem", color: "#a59ec9", borderBottom: `2px solid ${color}`, paddingBottom: "4px", textTransform: "uppercase" }}>
          {label}
        </h5>
        <div>
          <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.75rem", marginBottom: "4px" }}>
            <span>Numerador:</span>
            <strong style={{ color: "#ef4444" }}>{num}</strong>
          </div>
          <div style={{ display: "flex", gap: "6px" }}>
            <button
              type="button"
              onClick={() => setNum(Math.max(0, num - 1))}
              disabled={num <= 0}
              style={controlBtnStyle(num <= 0)}
            >
              -
            </button>
            <input
              type="range"
              min="0"
              max={den}
              value={num}
              onChange={(e) => setNum(Math.min(Number(e.target.value), den))}
              style={{ flex: 1, accentColor: "#ef4444", cursor: "pointer" }}
            />
            <button
              type="button"
              onClick={() => setNum(Math.min(den, num + 1))}
              disabled={num >= den}
              style={controlBtnStyle(num >= den)}
            >
              +
            </button>
          </div>
        </div>
        <div>
          <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.75rem", marginBottom: "4px" }}>
            <span>Denominador:</span>
            <strong style={{ color: "#3b82f6" }}>{den}</strong>
          </div>
          <div style={{ display: "flex", gap: "6px" }}>
            <button
              type="button"
              onClick={() => {
                const newDen = Math.max(1, den - 1);
                setDen(newDen);
                if (num > newDen) setNum(newDen);
              }}
              disabled={den <= 1}
              style={controlBtnStyle(den <= 1)}
            >
              -
            </button>
            <input
              type="range"
              min="1"
              max="8"
              value={den}
              onChange={(e) => {
                const newDen = Number(e.target.value);
                setDen(newDen);
                if (num > newDen) setNum(newDen);
              }}
              style={{ flex: 1, accentColor: "#3b82f6", cursor: "pointer" }}
            />
            <button
              type="button"
              onClick={() => {
                const newDen = Math.min(8, den + 1);
                setDen(newDen);
              }}
              disabled={den >= 8}
              style={controlBtnStyle(den >= 8)}
            >
              +
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div style={{
      display: "flex",
      flexDirection: "column",
      gap: "20px",
      width: "100%",
      fontFamily: "'Inter', sans-serif",
      color: "#e8e4f0"
    }}>
      {/* Operator Selector */}
      <div style={{
        display: "flex",
        justifyContent: "center",
        gap: "8px",
        background: "rgba(0,0,0,0.15)",
        padding: "6px",
        borderRadius: "12px",
        border: "1px solid #2a204d"
      }}>
        {[
          { id: "+", label: "➕ Suma" },
          { id: "-", label: "➖ Resta" },
          { id: "×", label: "✖️ Multiplicar" },
          { id: "÷", label: "➗ Dividir" }
        ].map(item => {
          const selected = op === item.id;
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => setOp(item.id)}
              style={{
                flex: 1,
                padding: "8px 10px",
                borderRadius: "8px",
                border: selected ? "1px solid rgba(139, 92, 246, 0.5)" : "1px solid transparent",
                backgroundColor: selected ? "rgba(139, 92, 246, 0.2)" : "transparent",
                color: selected ? "#c084fc" : "#9590a6",
                cursor: "pointer",
                fontWeight: "600",
                fontSize: "0.82rem",
                transition: "all 0.15s ease",
                minHeight: "auto"
              }}
            >
              {item.label}
            </button>
          );
        })}
      </div>

      {/* Grid: Inputs and Visualizations */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
        gap: "20px",
        alignItems: "start"
      }}>
        {/* Left column: Controls */}
        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          <div style={{ display: "flex", gap: "10px" }}>
            <FractionControl label="Fracción A" num={numA} den={denA} setNum={setNumA} setDen={setDenA} color="#ef4444" />
            <FractionControl label="Fracción B" num={numB} den={denB} setNum={setNumB} setDen={setDenB} color="#3b82f6" />
          </div>

          {/* Large math display */}
          <div style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "12px",
            background: "rgba(0,0,0,0.2)",
            padding: "16px",
            borderRadius: "16px",
            border: "1px solid rgba(255,255,255,0.02)"
          }}>
            {/* Fraction A */}
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", fontSize: "1.4rem", fontWeight: "700" }}>
              <span style={{ color: "#ef4444" }}>{numA}</span>
              <div style={{ width: "24px", height: "2px", backgroundColor: "#e8e4f0", margin: "2px 0" }} />
              <span style={{ color: "#ef4444" }}>{denA}</span>
            </div>

            {/* Operator */}
            <span style={{ fontSize: "1.4rem", fontWeight: "700", color: "#a59ec9" }}>
              {op}
            </span>

            {/* Fraction B */}
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", fontSize: "1.4rem", fontWeight: "700" }}>
              <span style={{ color: "#3b82f6" }}>{numB}</span>
              <div style={{ width: "24px", height: "2px", backgroundColor: "#e8e4f0", margin: "2px 0" }} />
              <span style={{ color: "#3b82f6" }}>{denB}</span>
            </div>
          </div>
        </div>

        {/* Right column: Interactive Visualizations and Resolution */}
        <div style={{
          display: "flex",
          flexDirection: "column",
          gap: "16px",
          alignItems: "center",
          background: "rgba(0,0,0,0.2)",
          border: "1px solid #2a204d",
          borderRadius: "16px",
          padding: "20px"
        }}>
          {/* Sum / Resta Homogeneous or Heterogeneous */}
          {(op === "+" || op === "-") && (() => {
            if (denA !== denB && !igualado) {
              return (
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "16px", width: "100%", textAlign: "center" }}>
                  <h4 style={{ margin: 0, fontSize: "0.95rem", color: "#a59ec9" }}>⚠️ Porciones de distintos tamaños</h4>
                  <div style={{ display: "flex", gap: "20px", justifyContent: "center" }}>
                    <div>
                      {renderSmallPizza(numA, denA, "#ef4444")}
                      <span style={{ display: "block", marginTop: "6px", fontSize: "0.8rem", color: "#ef4444" }}>A: {numA}/{denA}</span>
                    </div>
                    <div>
                      {renderSmallPizza(numB, denB, "#3b82f6")}
                      <span style={{ display: "block", marginTop: "6px", fontSize: "0.8rem", color: "#3b82f6" }}>B: {numB}/{denB}</span>
                    </div>
                  </div>
                  <p style={{ fontSize: "0.85rem", color: "#d1cce5", margin: 0 }}>
                    Para sumarlas o restarlas, primero debemos cortar ambas pizzas de la misma forma.
                  </p>
                  <button
                    type="button"
                    onClick={() => setIgualado(true)}
                    style={{
                      padding: "10px 18px",
                      borderRadius: "10px",
                      background: "linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)",
                      color: "#ffffff",
                      fontSize: "0.85rem",
                      fontWeight: "700",
                      border: "none",
                      cursor: "pointer",
                      boxShadow: "0 4px 15px rgba(139, 92, 246, 0.35)",
                      minHeight: "auto"
                    }}
                  >
                    🔍 Igualar Porciones (MCM = {comunDen})
                  </button>
                </div>
              );
            }

            const usedDen = denA === denB ? denA : comunDen;
            const usedNumA = denA === denB ? numA : eqNumA;
            const usedNumB = denA === denB ? numB : eqNumB;
            const finalNum = op === "+" ? usedNumA + usedNumB : usedNumA - usedNumB;
            const finalNumCapped = Math.max(0, finalNum);

            return (
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "16px", width: "100%" }}>
                <h4 style={{ margin: 0, fontSize: "0.95rem", color: "#a59ec9", textAlign: "center" }}>
                  {denA === denB ? "🍕 Porciones del mismo tamaño" : `🔍 Porciones igualadas en ${comunDen} partes`}
                </h4>

                <div style={{ display: "flex", gap: "14px", alignItems: "center", justifyContent: "center", width: "100%" }}>
                  {/* Pizza A */}
                  <div style={{ textAlign: "center" }}>
                    {renderSmallPizza(usedNumA, usedDen, "#ef4444")}
                    <span style={{ display: "block", marginTop: "4px", fontSize: "0.8rem", color: "#ef4444" }}>
                      {usedNumA}/{usedDen}
                    </span>
                  </div>

                  {/* Operator */}
                  <span style={{ fontSize: "1.2rem", fontWeight: "700", color: "#9590a6" }}>{op}</span>

                  {/* Pizza B */}
                  <div style={{ textAlign: "center" }}>
                    {renderSmallPizza(usedNumB, usedDen, "#3b82f6")}
                    <span style={{ display: "block", marginTop: "4px", fontSize: "0.8rem", color: "#3b82f6" }}>
                      {usedNumB}/{usedDen}
                    </span>
                  </div>

                  {/* Equals */}
                  <span style={{ fontSize: "1.2rem", fontWeight: "700", color: "#9590a6" }}>=</span>

                  {/* Pizza Result */}
                  <div style={{ textAlign: "center" }}>
                    {renderSmallPizza(finalNumCapped, usedDen, "#10b981")}
                    <span style={{ display: "block", marginTop: "4px", fontSize: "0.8rem", color: "#10b981", fontWeight: "700" }}>
                      {finalNum}/{usedDen}
                    </span>
                  </div>
                </div>

                {/* Arithmetic Steps */}
                <div style={{
                  background: "rgba(255,255,255,0.02)",
                  border: "1px solid rgba(255,255,255,0.05)",
                  borderRadius: "12px",
                  padding: "12px",
                  fontSize: "0.85rem",
                  width: "100%",
                  textAlign: "left",
                  lineHeight: "1.5"
                }}>
                  {denA !== denB && (
                    <div style={{ marginBottom: "8px", borderBottom: "1px dashed rgba(255,255,255,0.05)", paddingBottom: "6px" }}>
                      <strong>Equivalentes:</strong> A multiplicada x{multA} ➔ <strong>{eqNumA}/{comunDen}</strong>. B multiplicada x{multB} ➔ <strong>{eqNumB}/{comunDen}</strong>.
                    </div>
                  )}
                  {isNegative ? (
                    <span style={{ color: "#ef4444", fontWeight: "600" }}>
                      ⚠️ No se puede restar porque {usedNumA} es menor que {usedNumB}. El resultado daría negativo.
                    </span>
                  ) : (
                    <span>
                      Sumamos/restamos los numeradores y mantenemos el denominador: <br />
                      <code>{usedNumA} {op} {usedNumB} = {finalNum}</code> ➔ <strong>{finalNum}/{usedDen}</strong>
                    </span>
                  )}
                </div>

                {denA !== denB && (
                  <button
                    type="button"
                    onClick={() => setIgualado(false)}
                    style={{
                      padding: "6px 12px",
                      borderRadius: "6px",
                      background: "rgba(255,255,255,0.05)",
                      border: "1px solid rgba(255,255,255,0.1)",
                      color: "#9590a6",
                      fontSize: "0.75rem",
                      cursor: "pointer",
                      minHeight: "auto"
                    }}
                  >
                    ↩️ Volver a cortar
                  </button>
                )}
              </div>
            );
          })()}

          {/* Multiplication Grid */}
          {op === "×" && (
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "16px", width: "100%" }}>
              <h4 style={{ margin: 0, fontSize: "0.95rem", color: "#a59ec9", textAlign: "center" }}>
                🍫 Modelo de Área: Columnas x Filas
              </h4>
              {renderChocolateGrid()}
              <div style={{
                background: "rgba(255,255,255,0.02)",
                border: "1px solid rgba(255,255,255,0.05)",
                borderRadius: "12px",
                padding: "12px",
                fontSize: "0.85rem",
                width: "100%",
                textAlign: "left",
                lineHeight: "1.5"
              }}>
                • Sombras en <span style={{ color: "#60a5fa", fontWeight: "700" }}>azul</span>: Fracción A ({numA} de {denA} columnas). <br />
                • Sombras en <span style={{ color: "#f59e0b", fontWeight: "700" }}>naranja</span>: Fracción B ({numB} de {denB} filas). <br />
                • Intersección con <span style={{ color: "#10b981", fontWeight: "700" }}>chocolate 🍫</span>: El resultado es <strong>{numA * numB} pedazos de un total de {denA * denB}</strong>.
                <div style={{ marginTop: "6px", borderTop: "1px dashed rgba(255,255,255,0.05)", paddingTop: "6px", fontWeight: "600", textAlign: "center" }}>
                  Resultado: <strong>{numA * numB}/{denA * denB}</strong>
                </div>
              </div>
            </div>
          )}

          {/* Division (Invert & Multiply) */}
          {op === "÷" && (() => {
            if (numB === 0) {
              return (
                <div style={{ color: "#ef4444", fontSize: "0.9rem", padding: "20px", textAlign: "center" }}>
                  ⚠️ No se puede dividir por una fracción que es igual a cero.
                </div>
              );
            }
            const divNum = numA * denB;
            const divDen = denA * numB;
            const divGcd = gcd(divNum, divDen);
            const simpNum = divNum / divGcd;
            const simpDen = divDen / divGcd;

            return (
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "16px", width: "100%" }}>
                <h4 style={{ margin: 0, fontSize: "0.95rem", color: "#a59ec9", textAlign: "center" }}>
                  ➗ El truco de la Pirueta (Invertir)
                </h4>
                
                {/* Visual steps of inversion */}
                <div style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                  fontSize: "1.1rem",
                  fontWeight: "600"
                }}>
                  <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                    <span>{numA}</span>
                    <div style={{ width: "20px", height: "1.5px", backgroundColor: "#e8e4f0", margin: "2px 0" }} />
                    <span>{denA}</span>
                  </div>
                  <span style={{ color: "#9590a6" }}>÷</span>
                  <div style={{ display: "flex", flexDirection: "column", alignItems: "center", border: "1px dashed #ef4444", padding: "4px", borderRadius: "6px" }}>
                    <span style={{ color: "#ef4444" }}>{numB}</span>
                    <div style={{ width: "20px", height: "1.5px", backgroundColor: "#e8e4f0", margin: "2px 0" }} />
                    <span style={{ color: "#ef4444" }}>{denB}</span>
                  </div>
                  <span style={{ color: "#10b981" }}>➔</span>
                  <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                    <span>{numA}</span>
                    <div style={{ width: "20px", height: "1.5px", backgroundColor: "#e8e4f0", margin: "2px 0" }} />
                    <span>{denA}</span>
                  </div>
                  <span style={{ color: "#9590a6" }}>×</span>
                  <div style={{ display: "flex", flexDirection: "column", alignItems: "center", border: "1px solid #10b981", padding: "4px", borderRadius: "6px" }}>
                    <span style={{ color: "#10b981" }}>{denB}</span>
                    <div style={{ width: "20px", height: "1.5px", backgroundColor: "#e8e4f0", margin: "2px 0" }} />
                    <span style={{ color: "#10b981" }}>{numB}</span>
                  </div>
                </div>

                <div style={{
                  background: "rgba(255,255,255,0.02)",
                  border: "1px solid rgba(255,255,255,0.05)",
                  borderRadius: "12px",
                  padding: "12px",
                  fontSize: "0.85rem",
                  width: "100%",
                  textAlign: "left",
                  lineHeight: "1.5"
                }}>
                  1. Damos la vuelta a la segunda fracción: <br />
                  &nbsp;&nbsp;&nbsp;&nbsp;<code>{numB}/{denB}</code> se convierte en <strong>{denB}/{numB}</strong>. <br />
                  2. Cambiamos el signo de dividir por multiplicar. <br />
                  3. Multiplicamos directo: <br />
                  &nbsp;&nbsp;&nbsp;&nbsp;<code>{numA} × {denB} = {divNum}</code> (arriba) <br />
                  &nbsp;&nbsp;&nbsp;&nbsp;<code>{denA} × {numB} = {divDen}</code> (abajo) <br />
                  Resultado: <strong>{divNum}/{divDen}</strong> 
                  {divGcd > 1 && (
                    <span> (Simplificado ➔ <strong>{simpNum}/{simpDen}</strong>)</span>
                  )}
                  {simpDen === 1 && (
                    <span> = <strong>{simpNum} enteros</strong></span>
                  )}
                </div>

                {/* Small result visualization */}
                <div>
                  {renderSmallPizza(simpNum, simpDen, "#10b981")}
                  <span style={{ display: "block", marginTop: "4px", fontSize: "0.8rem", color: "#10b981", fontWeight: "700", textAlign: "center" }}>
                    Resultado: {simpNum}/{simpDen}
                  </span>
                </div>
              </div>
            );
          })()}
        </div>
      </div>
    </div>
  );
}

function VisualizacionOrtografia({ datos = {} }) {
  const { regla } = datos;

  if (regla === "b") {
    return (
      <div style={{
        background: "rgba(30, 27, 75, 0.4)",
        border: "1.5px solid #4f46e5",
        borderRadius: "16px",
        padding: "20px",
        color: "#f8fafc",
        boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.3)",
        maxWidth: "400px",
        margin: "0 auto",
        width: "100%",
        boxSizing: "border-box"
      }}>
        <h3 style={{ margin: "0 0 16px 0", color: "#818cf8", display: "flex", alignItems: "center", gap: "8px", fontSize: "1.2rem" }}>
          <span>📝</span> Reglas de la letra B
        </h3>
        
        <div style={{ display: "flex", flexDirection: "column", gap: "12px", fontSize: "0.9rem" }}>
          <div style={{ padding: "10px", background: "rgba(255,255,255,0.03)", borderRadius: "8px" }}>
            <strong style={{ color: "#38bdf8" }}>1. Verbos en -bir y -buir:</strong>
            <div style={{ marginTop: "4px", color: "#cbd5e1" }}>
              Escri<strong>b</strong>ir, reci<strong>b</strong>ir, contri<strong>b</strong>uir. <br />
              <span style={{ fontSize: "0.75rem", color: "#fca5a5" }}>⚠️ Excepto: hervir, servir, vivir.</span>
            </div>
          </div>
          
          <div style={{ padding: "10px", background: "rgba(255,255,255,0.03)", borderRadius: "8px" }}>
            <strong style={{ color: "#38bdf8" }}>2. Palabras con bu-, bur-, bus-:</strong>
            <div style={{ marginTop: "4px", color: "#cbd5e1" }}>
              <strong>bu</strong>eno, <strong>bur</strong>la, <strong>bus</strong>car.
            </div>
          </div>
          
          <div style={{ padding: "10px", background: "rgba(255,255,255,0.03)", borderRadius: "8px" }}>
            <strong style={{ color: "#38bdf8" }}>3. El pasado -aba y del verbo ir:</strong>
            <div style={{ marginTop: "4px", color: "#cbd5e1" }}>
              Jug<strong>aba</strong>, cant<strong>ábamos</strong>, <strong>iba</strong>, <strong>íbamos</strong>.
            </div>
          </div>
          
          <div style={{ padding: "10px", background: "rgba(255,255,255,0.03)", borderRadius: "8px" }}>
            <strong style={{ color: "#38bdf8" }}>4. Antes de consonante (bl, br):</strong>
            <div style={{ marginTop: "4px", color: "#cbd5e1" }}>
              <strong>bl</strong>anco, <strong>br</strong>azo, o<strong>b</strong>stáculo.
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (regla === "v") {
    return (
      <div style={{
        background: "rgba(15, 23, 42, 0.4)",
        border: "1.5px solid #10b981",
        borderRadius: "16px",
        padding: "20px",
        color: "#f8fafc",
        boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.3)",
        maxWidth: "400px",
        margin: "0 auto",
        width: "100%",
        boxSizing: "border-box"
      }}>
        <h3 style={{ margin: "0 0 16px 0", color: "#34d399", display: "flex", alignItems: "center", gap: "8px", fontSize: "1.2rem" }}>
          <span>⚔️</span> Reglas de la letra V
        </h3>
        
        <div style={{ display: "flex", flexDirection: "column", gap: "12px", fontSize: "0.9rem" }}>
          <div style={{ padding: "10px", background: "rgba(255,255,255,0.03)", borderRadius: "8px" }}>
            <strong style={{ color: "#a7f3d0" }}>1. Pasado de andar, tener, estar:</strong>
            <div style={{ marginTop: "4px", color: "#cbd5e1" }}>
              Andu<strong>v</strong>e, tu<strong>v</strong>e, estu<strong>v</strong>o, tu<strong>v</strong>iera.
            </div>
          </div>
          
          <div style={{ padding: "10px", background: "rgba(255,255,255,0.03)", borderRadius: "8px" }}>
            <strong style={{ color: "#a7f3d0" }}>2. Después de N, D y B:</strong>
            <div style={{ marginTop: "4px", color: "#cbd5e1" }}>
              e<strong>nv</strong>iar, a<strong>dv</strong>ertencia, o<strong>bv</strong>io.
            </div>
          </div>
          
          <div style={{ padding: "10px", background: "rgba(255,255,255,0.03)", borderRadius: "8px" }}>
            <strong style={{ color: "#a7f3d0" }}>3. Adjetivos en -ave, -eva, -ivo:</strong>
            <div style={{ marginTop: "4px", color: "#cbd5e1" }}>
              sua<strong>v</strong>e, nu<strong>v</strong>a, acti<strong>v</strong>o, decisi<strong>v</strong>o.
            </div>
          </div>
          
          <div style={{ padding: "10px", background: "rgba(255,255,255,0.03)", borderRadius: "8px" }}>
            <strong style={{ color: "#a7f3d0" }}>4. Las excepciones de la B:</strong>
            <div style={{ marginTop: "4px", color: "#cbd5e1" }}>
              her<strong>v</strong>ir, ser<strong>v</strong>ir, <strong>v</strong>i<strong>v</strong>ir.
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (regla === "ejemplos") {
    return <InteractiveSpellingGame />;
  }

  return null;
}

function InteractiveSpellingGame() {
  const words = [
    { id: 1, original: "escri__ir", correct: "escribir", letter: "b", rule: "Verbos terminados en -bir" },
    { id: 2, original: "en__iar", correct: "enviar", letter: "v", rule: "Después de la consonante N" },
    { id: 3, original: "__uscar", correct: "buscar", letter: "b", rule: "Palabras con bu-, bur-, bus-" },
    { id: 4, original: "estu__e", correct: "estuve", letter: "v", rule: "Pasado de andar, tener, estar" },
    { id: 5, original: "her__ir", correct: "hervir", letter: "v", rule: "Excepción: hervir, servir, vivir" },
    { id: 6, original: "nue__o", correct: "nuevo", letter: "v", rule: "Adjetivo terminado en -evo" }
  ];

  const [revealed, setRevealed] = useState({});

  const toggleReveal = (id) => {
    setRevealed(prev => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div style={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      gap: "16px",
      width: "100%",
      maxWidth: "420px",
      margin: "0 auto"
    }}>
      <h4 style={{ margin: "0 0 4px 0", fontSize: "0.95rem", color: "#a59ec9", textAlign: "center" }}>
        💡 ¡Hacé clic en cada tarjeta para ver la respuesta!
      </h4>
      <div style={{
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: "12px",
        width: "100%"
      }}>
        {words.map((w) => {
          const isRevealed = revealed[w.id];
          return (
            <button
              key={w.id}
              type="button"
              onClick={() => toggleReveal(w.id)}
              style={{
                background: isRevealed 
                  ? (w.letter === "b" ? "rgba(79, 70, 229, 0.2)" : "rgba(16, 185, 129, 0.2)")
                  : "rgba(255, 255, 255, 0.03)",
                border: isRevealed
                  ? (w.letter === "b" ? "1.5px solid #6366f1" : "1.5px solid #10b981")
                  : "1.5px solid rgba(255, 255, 255, 0.08)",
                borderRadius: "12px",
                padding: "16px 8px",
                cursor: "pointer",
                transition: "all 0.2s cubic-bezier(0.4, 0, 0.2, 1)",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                gap: "6px",
                outline: "none",
                minHeight: "100px",
                boxSizing: "border-box"
              }}
            >
              <span style={{
                fontSize: "1.1rem",
                fontWeight: "700",
                color: isRevealed 
                  ? (w.letter === "b" ? "#818cf8" : "#34d399") 
                  : "#e2e8f0",
                letterSpacing: "0.5px"
              }}>
                {isRevealed ? w.correct : w.original}
              </span>
              
              {isRevealed && (
                <span style={{
                  fontSize: "0.65rem",
                  color: "#cbd5e1",
                  textAlign: "center",
                  lineHeight: "1.2"
                }}>
                  {w.rule}
                </span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
