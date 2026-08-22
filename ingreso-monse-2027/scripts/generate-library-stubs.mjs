import fs from "fs";
import path from "path";
import PDFDocument from "pdfkit";

const filesToGenerate = [
  {
    dir: "./public/examenes",
    name: "simulacro_matematica_2025_resuelto.pdf",
    title: "Simulacro Matematica 2025 (Resuelto)",
    subtitle: "Preparacion Examen de Ingreso CNM 2027",
    desc: "Este documento contiene el examen simulado de Matematica resuelto paso a paso con los criterios oficiales de correccion del Colegio Nacional de Monserrat.",
    points: [
      "Resolucion detallada de las 5 preguntas del simulacro.",
      "Criterios de puntuacion y desarrollo exigidos por el tribunal examinador.",
      "Consejos de velocidad y distribucion del tiempo.",
      "Temas cubiertos: Fracciones homogeneas y heterogeneas, perfiles de figuras compuestas, jerarquia de operaciones, y sistema decimal."
    ]
  },
  {
    dir: "./public/examenes",
    name: "simulacro_lengua_2025_resuelto.pdf",
    title: "Simulacro Lengua 2025 (Resuelto)",
    subtitle: "Preparacion Examen de Ingreso CNM 2027",
    desc: "Resolucion del simulacro de Lengua enfocado en analisis de textos, respuestas modelo de produccion escrita y justificacion de reglas ortograficas.",
    points: [
      "Respuestas redactadas con el nivel formal requerido.",
      "Analisis sintactico y morfologico de las oraciones propuestas.",
      "Justificacion ortografica detallada de las reglas estudiadas (B, V, tildes).",
      "Estrategias de comprension lectora rapida."
    ]
  },
  {
    dir: "./public/examenes",
    name: "examen_ingreso_2024_resuelto.pdf",
    title: "Examen de Ingreso Real 2024 (Comentado)",
    subtitle: "Examen Oficial Comentado - Ciclo Anterior",
    desc: "Compilado del examen oficial real administrado el ano anterior. Incluye la resolucion completa, comentarios pedagogicos y advertencias sobre los errores mas comunes.",
    points: [
      "Resolucion completa de los enunciados de Matematica y Lengua del examen real 2024.",
      "Notas al pie explicando en que paso del ejercicio los alumnos suelen equivocarse.",
      "Tabla posicional y desintegrador de numeros aplicados a las consignas oficiales.",
      "Criterios de prolijidad exigidos por los docentes correctores."
    ]
  },
  {
    dir: "./public/apuntes",
    name: "guia_avanzada_geometria.pdf",
    title: "Guia Avanzada: Perimetros, Areas y Angulos",
    subtitle: "Material de Refuerzo - Ingreso Monserrat",
    desc: "Cuadernillo teorico-practico disenado especialmente para dominar los temas complejos de geometria del examen, con enfasis en figuras compuestas.",
    points: [
      "Explicacion del calculo de perimetros en figuras combinadas (patio en L, rectangulos y cuadrados adyacentes).",
      "Definiciones conceptuales de angulos internos, complementarios y suplementarios.",
      "Formulas esenciales y su aplicacion logica sin memorizacion ciega.",
      "Seccion de autoevaluacion con 10 ejercicios nivel examen."
    ]
  },
  {
    dir: "./public/apuntes",
    name: "cuadernillo_dictados_caligrafia.pdf",
    title: "Cuadernillo de Dictados e Impresion de Hojas Pautadas",
    subtitle: "Taller de Practica Escrita y Ortografia en Casa",
    desc: "Hojas de pauta reglada oficiales listas para imprimir y una seleccion de textos literarios complejos y reglas de dictado para practicar la grafia y la ortografia a mano.",
    points: [
      "15 textos seleccionados con dificultad ortografica progresiva para dictados.",
      "Instrucciones detalladas para que los padres actuen como dictadores oficiales.",
      "Hojas pautadas Monserrat imprimibles (interlineado y margenes reglamentarios).",
      "Pautas de correccion de caligrafia y legibilidad."
    ]
  },
  {
    dir: "./public/apuntes",
    name: "guia_completa_monserrat.pdf",
    title: "Guia Oficial del Ingresante Monserrat",
    subtitle: "Informacion General, Temarios y Calendario",
    desc: "Documento oficial del Colegio Nacional de Monserrat compilado para brindar claridad sobre el temario general, reglamentos del examen, fechas del calendario y pautas generales de estudio recomendadas.",
    points: [
      "Temario oficial desglosado para las materias de Lengua y Matematica.",
      "Estructura formal del examen (numero de preguntas, duracion, sistema de puntaje).",
      "Preguntas frecuentes sobre el proceso de preinscripcion y examenes.",
      "Cronograma recomendado para la fase final de preparacion."
    ]
  }
];

async function generatePDFStub(file) {
  const destDir = path.resolve(file.dir);
  if (!fs.existsSync(destDir)) {
    fs.mkdirSync(destDir, { recursive: true });
  }

  const destPath = path.join(destDir, file.name);
  console.log(`Generando stub PDF para: ${file.name} en ${destPath}...`);

  const doc = new PDFDocument({
    size: "A4",
    margins: { top: 60, bottom: 60, left: 50, right: 50 },
    bufferPages: true
  });

  const writeStream = fs.createWriteStream(destPath);
  doc.pipe(writeStream);

  // Purple top header line
  doc.rect(0, 0, 595, 12).fill("#7c3aed");

  // Header branding
  doc.fillColor("#94a3b8")
     .font("Helvetica-Bold")
     .fontSize(8)
     .text("INGRESO MONSERRAT", 50, 24)
     .font("Helvetica")
     .text("BIBLIOTECA OFICIAL DE MATERIALES", 50, 34);

  doc.strokeColor("#e2e8f0").lineWidth(1).moveTo(50, 46).lineTo(545, 46).stroke();

  // Document Title
  doc.y = 90;
  doc.fillColor("#1e1b2e").font("Helvetica-Bold").fontSize(22).text(file.title);
  doc.moveDown(0.4);
  
  doc.fillColor("#7c3aed").font("Helvetica-Bold").fontSize(11).text(file.subtitle);
  doc.moveDown(1.5);

  // Description box
  const descY = doc.y;
  doc.save();
  doc.fillColor("#f3f4f6").rect(50, descY, 495, 75).fill();
  doc.strokeColor("#e5e7eb").lineWidth(1).rect(50, descY, 495, 75).stroke();
  doc.fillColor("#374151")
     .font("Helvetica-Oblique")
     .fontSize(10)
     .text(file.desc, 65, descY + 15, { width: 465, lineGap: 4 });
  doc.restore();

  doc.y = descY + 95;

  // Key Highlights header
  doc.fillColor("#1e293b").font("Helvetica-Bold").fontSize(12).text("Contenidos clave del archivo:");
  doc.moveDown(0.5);

  // Bullet points
  file.points.forEach(point => {
    doc.save();
    doc.fillColor("#4b5563").font("Helvetica").fontSize(10);
    doc.x = 65;
    doc.text("• ", { continued: true });
    doc.text(point, { lineGap: 5 });
    doc.restore();
    doc.x = 50;
    doc.moveDown(0.4);
  });

  doc.moveDown(1.5);
  doc.strokeColor("#e2e8f0").lineWidth(1).moveTo(50, doc.y).lineTo(545, doc.y).stroke();
  doc.moveDown(1);

  // Info notice block (yellowish warning box)
  const noticeY = doc.y;
  doc.save();
  doc.fillColor("#fffbeb").rect(50, noticeY, 495, 60).fill();
  doc.strokeColor("#fef3c7").lineWidth(1).rect(50, noticeY, 495, 60).stroke();
  
  doc.fillColor("#d97706").font("Helvetica-Bold").fontSize(12).text("✏️", 65, noticeY + 15);
  doc.fillColor("#78350f")
     .font("Helvetica")
     .fontSize(9)
     .text("Nota para el Administrador: Puedes sobreescribir este archivo en tu servidor con el PDF oficial en cualquier momento usando el mismo nombre de archivo.", 85, noticeY + 15, { width: 440, lineGap: 3 });
  doc.restore();

  // Draw Page Footer
  const range = doc.bufferedPageRange();
  for (let i = range.start; i < range.start + range.count; i++) {
    doc.switchToPage(i);
    
    doc.save();
    doc.strokeColor("#e2e8f0").lineWidth(1).moveTo(50, 796).lineTo(545, 796).stroke();
    doc.fillColor("#94a3b8")
       .font("Helvetica")
       .fontSize(8)
       .text(`Material Didactico Autorizado · Pagina ${i + 1} de ${range.count}`, 50, 804, { align: "right", width: 495 });
    doc.restore();
  }

  doc.end();

  return new Promise((resolve, reject) => {
    writeStream.on("finish", () => {
      console.log(`Archivo generado: ${destPath}`);
      resolve();
    });
    writeStream.on("error", (err) => {
      reject(err);
    });
  });
}

async function run() {
  try {
    for (const file of filesToGenerate) {
      await generatePDFStub(file);
    }
    console.log("¡Todos los stubs de biblioteca fueron generados exitosamente!");
  } catch (err) {
    console.error("Error al generar stubs:", err);
  }
}

run();
