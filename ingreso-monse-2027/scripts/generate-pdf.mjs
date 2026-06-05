import fs from "fs";
import path from "path";
import PDFDocument from "pdfkit";
import { DIAPOSITIVAS_CATALOG } from "../src/lib/diapositivas.js";

// Helper to clean Math expressions
function cleanMathExpressions(mathContent) {
  let clean = mathContent;
  // Replace \pm with ±
  clean = clean.replace(/\\pm/g, " ± ");
  // Replace \times with × and \div with ÷
  clean = clean.replace(/\\times/g, " × ");
  clean = clean.replace(/\\div/g, " ÷ ");
  // Replace \rightarrow with →
  clean = clean.replace(/\\rightarrow/g, " → ");
  // Replace \frac{a}{b} with a/b, wrapping in parentheses if it has operations
  clean = clean.replace(/\\frac\s*\{([^{}]+)\}\s*\{([^{}]+)\}/g, (m, p1, p2) => {
    const numCleaned = cleanMathExpressions(p1.trim());
    const denCleaned = cleanMathExpressions(p2.trim());
    const num = numCleaned.includes("+") || numCleaned.includes("-") || numCleaned.includes(" ") || numCleaned.includes("×") || numCleaned.includes("÷") || numCleaned.includes("±") || numCleaned.includes("→") ? `(${numCleaned})` : numCleaned;
    const den = denCleaned.includes("+") || denCleaned.includes("-") || denCleaned.includes(" ") || denCleaned.includes("×") || denCleaned.includes("÷") || denCleaned.includes("±") || denCleaned.includes("→") ? `(${denCleaned})` : denCleaned;
    return `${num}/${den}`;
  });
  // Replace \text{something} with something
  clean = clean.replace(/\\text\s*\{([^{}]+)\}/g, "$1");
  // Replace \quad with spaces
  clean = clean.replace(/\\quad/g, "  ");
  return clean;
}

function cleanMathText(text) {
  if (text === null || text === undefined) return "";
  let s = String(text);
  
  // Parse block math $$...$$
  s = s.replace(/\$\$(.*?)\$\$/g, (match, mathContent) => {
    return cleanMathExpressions(mathContent);
  });
  
  // Parse inline math $...$
  s = s.replace(/\$(.*?)\$/g, (match, mathContent) => {
    return cleanMathExpressions(mathContent);
  });
  
  return s;
}

// Function to generate PDF for a specific topic
async function generatePDFForTopic(key, topicData) {
  console.log(`Generando PDF para: ${key}...`);
  
  const destDir = path.resolve("./public/apuntes");
  if (!fs.existsSync(destDir)) {
    fs.mkdirSync(destDir, { recursive: true });
  }
  
  const destPath = path.join(destDir, `${key}.pdf`);
  const doc = new PDFDocument({
    size: "A4",
    margins: { top: 60, bottom: 60, left: 50, right: 50 },
    bufferPages: true
  });
  
  const writeStream = fs.createWriteStream(destPath);
  doc.pipe(writeStream);
  
  // Header design (runs on each page)
  const addHeader = () => {
    doc.save();
    // Purple header line at the top
    doc.rect(0, 0, 595, 12).fill("#7c3aed");
    
    // Header text
    doc.fillColor("#94a3b8")
       .font("Helvetica-Bold")
       .fontSize(8)
       .text("INGRESO MONSERRAT", 50, 24)
       .font("Helvetica")
       .text("FICHA DE ESTUDIO", 50, 34);
       
    doc.strokeColor("#e2e8f0").lineWidth(1).moveTo(50, 46).lineTo(545, 46).stroke();
    doc.restore();
  };

  // Add header to the first page
  addHeader();
  
  // Title spacing
  doc.y = 70;
  
  // Parse Markdown apunte_completo
  const markdownText = topicData.apunte_completo;
  const lines = markdownText.split("\n");
  
  let inBlockquote = false;
  let blockquoteText = "";
  
  // Render function helper for text lines to clean math and parse bold
  const renderTextLine = (text, fontSize = 10, fontName = "Helvetica", options = {}) => {
    const cleaned = cleanMathText(text);
    
    // Split by ** bold markers
    const parts = cleaned.split(/\*\*([\s\S]*?)\*\*/g);
    const chunks = [];
    parts.forEach((part, index) => {
      if (part !== "") {
        chunks.push({
          text: part,
          isBold: index % 2 === 1
        });
      }
    });
    
    doc.fontSize(fontSize);
    chunks.forEach((chunk, index) => {
      doc.font(chunk.isBold ? `${fontName}-Bold` : fontName);
      
      const isLast = index === chunks.length - 1;
      doc.text(chunk.text, {
        continued: !isLast,
        align: options.align || "left",
        width: options.width,
        lineGap: 4
      });
    });
  };

  for (let i = 0; i < lines.length; i++) {
    const lineRaw = lines[i];
    const lineTrim = lineRaw.trim();
    
    // Check if we are inside or ending a blockquote
    if (lineTrim.startsWith(">")) {
      inBlockquote = true;
      blockquoteText += (blockquoteText ? "\n" : "") + lineTrim.slice(1).trim();
      continue;
    } else if (inBlockquote && !lineTrim.startsWith(">") && lineTrim !== "") {
      // Process accumulated blockquote
      renderBlockquote(doc, blockquoteText);
      blockquoteText = "";
      inBlockquote = false;
    } else if (inBlockquote && lineTrim === "") {
      // Blockquote ends with an empty line
      renderBlockquote(doc, blockquoteText);
      blockquoteText = "";
      inBlockquote = false;
      continue;
    }
    
    if (lineTrim === "") {
      doc.moveDown(0.5);
      continue;
    }
    
    // Title (#)
    if (lineTrim.startsWith("# ")) {
      if (doc.y + 80 > 782) doc.addPage();
      doc.moveDown(1);
      doc.fillColor("#1e1b2e").font("Helvetica-Bold").fontSize(20).text(cleanMathText(lineTrim.slice(2)), { align: "left" });
      doc.moveDown(0.5);
      // Underline title
      doc.strokeColor("#7c3aed").lineWidth(2).moveTo(50, doc.y).lineTo(150, doc.y).stroke();
      doc.moveDown(1);
      continue;
    }
    
    // H2 (##)
    if (lineTrim.startsWith("## ")) {
      if (doc.y + 60 > 782) doc.addPage();
      doc.moveDown(1.2);
      doc.fillColor("#6d28d9").font("Helvetica-Bold").fontSize(14).text(cleanMathText(lineTrim.slice(3)));
      doc.moveDown(0.6);
      continue;
    }
    
    // H3 (###)
    if (lineTrim.startsWith("### ")) {
      if (doc.y + 50 > 782) doc.addPage();
      doc.moveDown(1);
      doc.fillColor("#1e293b").font("Helvetica-Bold").fontSize(11).text(cleanMathText(lineTrim.slice(4)));
      doc.moveDown(0.4);
      continue;
    }
    
    // H4 (####)
    if (lineTrim.startsWith("#### ")) {
      if (doc.y + 40 > 782) doc.addPage();
      doc.moveDown(0.8);
      doc.fillColor("#334155").font("Helvetica-Bold").fontSize(10).text(cleanMathText(lineTrim.slice(5)));
      doc.moveDown(0.4);
      continue;
    }
    
    // Horizontal Rule (---)
    if (lineTrim === "---") {
      doc.moveDown(0.8);
      doc.strokeColor("#e2e8f0").lineWidth(1).moveTo(50, doc.y).lineTo(545, doc.y).stroke();
      doc.moveDown(0.8);
      continue;
    }
    
    // Bullet points (* or -)
    if (lineTrim.startsWith("* ") || lineTrim.startsWith("- ")) {
      doc.save();
      const content = lineTrim.replace(/^[\*\-]\s+/, "");
      doc.fillColor("#334155").font("Helvetica").fontSize(10);
      
      // Indent bullet point
      doc.x = 65;
      doc.text("• ", { continued: true });
      renderTextLine(content, 10, "Helvetica");
      doc.restore();
      // Restore cursor position X
      doc.x = 50;
      doc.moveDown(0.3);
      continue;
    }
    
    // Math Block ($$ ... $$)
    if (lineTrim.startsWith("$$")) {
      let formula = lineTrim;
      if (lineTrim.endsWith("$$") && lineTrim.length > 4) {
        formula = lineTrim.slice(2, -2);
      } else {
        formula = lineTrim.replace(/^\$\$/, "").replace(/\$\$/, "");
      }
      
      const cleanFormula = cleanMathExpressions(formula);
      doc.moveDown(0.8);
      
      if (doc.y + 36 > 782) {
        doc.addPage();
      }
      const originalY = doc.y;
      
      // Box surrounding math formula
      doc.save();
      doc.fillColor("#f5f3ff") // soft-purple background
         .rect(50, originalY, 495, 36)
         .fill();
         
      doc.strokeColor("#ddd6fe") // soft-purple border
         .lineWidth(1)
         .rect(50, originalY, 495, 36)
         .stroke();
         
      doc.fillColor("#7c3aed")
         .font("Courier-Bold")
         .fontSize(11);
         
      doc.text(cleanFormula, 50, originalY + 12, { align: "center", width: 495 });
      doc.restore();
      
      doc.x = 50;
      doc.y = originalY + 36;
      doc.moveDown(0.8);
      continue;
    }
    
    // Standard Paragraph
    doc.fillColor("#334155").font("Helvetica");
    renderTextLine(lineTrim, 10, "Helvetica");
    doc.moveDown(0.5);
  }
  
  // Just in case a blockquote is left at the end
  if (inBlockquote) {
    renderBlockquote(doc, blockquoteText);
  }
  
  // Footer and Page numbering (runs at the end across all pages)
  const range = doc.bufferedPageRange();
  console.log(`[generatePDFForTopic] key: "${key}", pages: ${range.count}`);
  for (let i = range.start; i < range.start + range.count; i++) {
    doc.switchToPage(i);
    
    // Draw headers for subsequent pages
    if (i > range.start) {
      addHeader();
    }
    
    const oldBottomMargin = doc.page.margins.bottom;
    doc.page.margins.bottom = 0;
    
    doc.save();
    // Footer line
    doc.strokeColor("#e2e8f0").lineWidth(1).moveTo(50, 796).lineTo(545, 796).stroke();
    
    // Footer text
    doc.fillColor("#94a3b8")
       .font("Helvetica")
       .fontSize(8)
       .text(`Página ${i + 1} de ${range.count}`, 50, 804, { align: "right", width: 495 });
    doc.restore();
    
    doc.page.margins.bottom = oldBottomMargin;
  }
  
  doc.end();
  
  // Wait for stream to finish writing
  return new Promise((resolve, reject) => {
    writeStream.on("finish", () => {
      console.log(`Ficha PDF guardada en: ${destPath}`);
      resolve();
    });
    writeStream.on("error", (err) => {
      reject(err);
    });
  });
}

// Helper to draw blockquotes (Tips, Warnings, Problems)
function renderBlockquote(doc, text) {
  doc.moveDown(0.8);
  
  const cleanText = cleanMathText(text);
  doc.font("Helvetica-Oblique").fontSize(10);
  const textHeight = doc.heightOfString(cleanText, { width: 460, lineGap: 3 });
  const boxHeight = textHeight + 16;
  
  // Prevent splitting across page breaks
  if (doc.y + boxHeight > 782) {
    doc.addPage();
  }
  
  const startY = doc.y;
  
  doc.save();
  
  doc.fillColor("#fffbeb") // soft-orange background
     .rect(50, startY, 495, boxHeight)
     .fill();
     
  doc.strokeColor("#fef3c7") // border color
     .lineWidth(1)
     .rect(50, startY, 495, boxHeight)
     .stroke();
     
  // Thick left accent border in gold
  doc.fillColor("#f59e0b")
     .rect(50, startY, 5, boxHeight)
     .fill();
     
  // Draw blockquote text
  doc.fillColor("#78350f");
  doc.x = 65;
  
  const parts = cleanText.split(/\*\*([\s\S]*?)\*\*/g);
  parts.forEach((part, index) => {
    const isBold = index % 2 === 1;
    doc.font(isBold ? "Helvetica-BoldOblique" : "Helvetica-Oblique");
    const isLast = index === parts.length - 1;
    if (index === 0) {
      doc.text(part, 65, startY + 8, {
        continued: !isLast,
        width: 460,
        lineGap: 3
      });
    } else {
      doc.text(part, {
        continued: !isLast,
        width: 460,
        lineGap: 3
      });
    }
  });
  
  doc.restore();
  doc.x = 50;
  doc.y = startY + boxHeight;
  doc.moveDown(0.8);
}

// Generate all PDFs
async function run() {
  try {
    for (const [key, topicData] of Object.entries(DIAPOSITIVAS_CATALOG)) {
      await generatePDFForTopic(key, topicData);
    }
    console.log("¡Todos los PDFs fueron generados exitosamente!");
  } catch (err) {
    console.error("Error al generar los PDFs:", err);
  }
}

run();
