"""Build the module entry sheets from the same reviewed data served to the reader.

No downloaded books are included in the public files. Each PDF must remain two pages.
"""
from pathlib import Path
import json
import hashlib
from xml.sax.saxutils import escape
from reportlab.pdfgen import canvas
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle, PageBreak, KeepTogether
from reportlab.lib.styles import ParagraphStyle
from reportlab.lib.colors import HexColor, white
from reportlab.lib.pagesizes import A4
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from pypdf import PdfReader
from reportlab.graphics.shapes import Drawing, Rect, Circle, Line, String, Polygon, Path as DrawPath
from reportlab.graphics import renderSVG

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / 'public' / 'fichas'
OUT.mkdir(parents=True, exist_ok=True)
FONT_DIR = Path('C:/Windows/Fonts')
pdfmetrics.registerFont(TTFont('Ficha', str(FONT_DIR / 'arial.ttf')))
pdfmetrics.registerFont(TTFont('FichaBold', str(FONT_DIR / 'arialbd.ttf')))
INK, BLUE, PALE, LINE = map(HexColor, ['#172c3e', '#174a64', '#e8f2f6', '#b6cbd7'])
styles = {
    'title': ParagraphStyle('title', fontName='FichaBold', fontSize=25, leading=30, textColor=BLUE, spaceAfter=14),
    'h': ParagraphStyle('h', fontName='FichaBold', fontSize=17, leading=22, textColor=BLUE, spaceBefore=10, spaceAfter=8),
    'body': ParagraphStyle('body', fontName='Ficha', fontSize=14, leading=20, textColor=INK, spaceAfter=8),
    'small': ParagraphStyle('small', fontName='Ficha', fontSize=10, leading=14, textColor=INK, spaceAfter=5),
    'node': ParagraphStyle('node', fontName='FichaBold', fontSize=13, leading=17, textColor=INK, alignment=1),
    'edge': ParagraphStyle('edge', fontName='Ficha', fontSize=11, leading=15, textColor=BLUE, alignment=1),
    'th': ParagraphStyle('th', fontName='FichaBold', fontSize=12, leading=16, textColor=white),
    'cell': ParagraphStyle('cell', fontName='Ficha', fontSize=12, leading=17, textColor=INK),
}
SOURCES = {'nap-m4':'Cuadernos para el aula: Matemática 4', 'nap-m5':'Cuadernos para el aula: Matemática 5',
           'nap-l4':'Cuadernos para el aula: Lengua 4', 'novak':'Novak y Cañas: mapas conceptuales',
           'ies-fracciones':'IES/WWC: enseñanza de fracciones'}
def p(text, style='body'):
    return Paragraph(escape(str(text)).replace('\n', '<br/>'), styles[style])

def box(text, color=PALE):
    t=Table([[p(text)]],colWidths=[499])
    t.setStyle(TableStyle([('BACKGROUND',(0,0),(-1,-1),color),('BOX',(0,0),(-1,-1),0.7,LINE),
                          ('LEFTPADDING',(0,0),(-1,-1),14),('RIGHTPADDING',(0,0),(-1,-1),14),
                          ('TOPPADDING',(0,0),(-1,-1),12),('BOTTOMPADDING',(0,0),(-1,-1),8)]))
    return t

def concept_map(relations):
    data=[]
    for r in relations:
        data.append([p(r['desde'],'node'),p(r['enlace']+' →','edge'),p(r['hasta'],'node')])
    t=Table(data,colWidths=[174,151,174],hAlign='LEFT')
    commands=[('VALIGN',(0,0),(-1,-1),'MIDDLE'),('TOPPADDING',(0,0),(-1,-1),11),('BOTTOMPADDING',(0,0),(-1,-1),11)]
    for i in range(len(data)):
        for j in [0,2]: commands.extend([('BACKGROUND',(j,i),(j,i),PALE),('BOX',(j,i),(j,i),0.8,LINE)])
    t.setStyle(TableStyle(commands));return t

def example_table(v):
    cols=len(v['cabeceras'])
    data=[[p(c,'th') for c in v['cabeceras']]]+[[p(c,'cell') for c in row] for row in v['filas']]
    t=Table(data,colWidths=[499/cols]*cols,repeatRows=1,hAlign='LEFT')
    t.setStyle(TableStyle([('BACKGROUND',(0,0),(-1,0),BLUE),('ROWBACKGROUNDS',(0,1),(-1,-1),[white,PALE]),
                          ('GRID',(0,0),(-1,-1),0.6,LINE),('VALIGN',(0,0),(-1,-1),'MIDDLE'),
                          ('TOPPADDING',(0,0),(-1,-1),9),('BOTTOMPADDING',(0,0),(-1,-1),9)]))
    return t

def footer(c,doc):
    c.setStrokeColor(LINE);c.line(48,44,A4[0]-48,44)
    c.setFont('Ficha',9);c.setFillColor(INK)
    c.drawString(48,29,'Una primera idea. Seguimos aprendiendo paso a paso.')
    c.drawRightString(A4[0]-48,29,f'{doc.page} / 2')

def diagram(tema):
    d=Drawing(499,150)
    def text(x,y,s,size=12): d.add(String(x,y,s,fontName='Ficha',fontSize=size,fillColor=INK))
    def line(x,y,x2,y2,**kw):d.add(Line(x,y,x2,y2,strokeColor=BLUE,strokeWidth=2,**kw))
    def dot(x,y,color=BLUE):d.add(Circle(x,y,10,fillColor=color,strokeColor=INK,strokeWidth=1))
    if tema=='division_1_digito':
        text(8,131,'8 fichas en total · 4 personas · 2 por persona',14)
        for i,name in enumerate(['Ana','Luz','Leo','Teo']):
            x=8+123*i;d.add(Rect(x,24,111,90,fillColor=PALE,strokeColor=LINE,rx=8,ry=8))
            dot(x+35,70);dot(x+75,70);text(x+34,37,name)
    elif tema=='fracciones_concepto':
        text(8,132,'Todo lo que había en la jarra está en estos 4 vasos.',13)
        for i in range(4):
            x=28+i*120
            d.add(Rect(x,48,61,58,fillColor=white,strokeColor=BLUE,strokeWidth=2))
            d.add(Rect(x+3,49,55,34,fillColor=HexColor('#92cad8'),strokeColor=None))
            text(x+16,29,'1/4')
            if i<3:d.add(Rect(x-7,20,75,93,fillColor=None,strokeColor=HexColor('#a85a13'),strokeWidth=2))
        text(38,3,'Usamos estos 3: 3/4 del total',13);text(389,3,'Queda 1/4',12)
    elif tema=='fracciones_del_resto':
        text(8,132,'8 al principio: 4 usadas y 4 que quedan',14)
        for i in range(8):
            x=32+i*58;dot(x,86,HexColor('#cbd5e1') if i<4 else BLUE)
            if i<4:line(x-11,73,x+11,99)
        d.add(Rect(250,30,227,79,fillColor=None,strokeColor=BLUE,strokeWidth=2))
        d.add(Rect(253,59,107,50,fillColor=None,strokeColor=HexColor('#a85a13'),strokeWidth=3))
        text(30,42,'4 usadas');text(260,42,'Nuevo total: 4 restantes')
        text(250,8,'Guardamos 2 de estas 4: la mitad',12)
    elif tema=='geometria_angulos':
        for x,n in [(80,65),(310,93)]:
            line(x,25,x,25+n);line(x,25,x+n,25)
            a=DrawPath(strokeColor=HexColor('#a85a13'),strokeWidth=3,fillColor=None)
            a.moveTo(x,55);a.curveTo(x+17,55,x+30,42,x+30,25);d.add(a)
            line(x+25,32,x+30,25);line(x+35,32,x+30,25)
            text(x-25,8,'1/4 de vuelta')
        text(12,132,'Distinto largo de las líneas. La misma abertura.',13)
    elif tema=='geometria_triangulos':
        d.add(Polygon([45,35,165,35,85,110],strokeColor=BLUE,strokeWidth=3,fillColor=PALE))
        # Mismas coordenadas rotadas 90 grados, sin deformación.
        d.add(Polygon([400,20,400,140,325,60],strokeColor=BLUE,strokeWidth=3,fillColor=PALE))
        text(192,75,'gira →',16);text(44,13,'3 lados, cerrado');text(320,3,'3 lados, cerrado')
    elif tema=='perimetros_compuestos':
        x,y,s=75,34,80
        d.add(Rect(x,y,2*s,s,fillColor=PALE,strokeColor=BLUE,strokeWidth=3))
        d.add(Line(x+s,y,x+s,y+s,strokeColor=HexColor('#a85a13'),strokeWidth=2,strokeDashArray=[5,4]))
        for i in range(2):text(x+24+i*s,y+s+8,'1 cm');text(x+24+i*s,14,'1 cm')
        text(27,73,'1 cm');text(243,73,'1 cm')
        text(322,102,'Por fuera: 6 cm',14);text(322,72,'La unión queda');text(322,54,'en el interior.');
    else:return None
    return d

manifest=[]
for f in json.loads((ROOT/'src/lib/fichas-modulos.json').read_text(encoding='utf-8')):
    file=OUT/(f['tema']+'.pdf')
    flow=[p('LEER · RELACIONAR · PROBAR','small'),p(f['title'],'title'),p(f['proposito']),p('Para empezar: '+f['prerrequisito'],'small'),
          p('Una situación para empezar','h'),box(f['situacion']),Spacer(1,12),
          p('Cómo se conectan las ideas','h'),concept_map(f['relaciones']),Spacer(1,12),
          p(f['ejemplo']['titulo'],'h')]
    drawing=diagram(f['tema'])
    if drawing:
        folder=OUT/'diagramas';folder.mkdir(exist_ok=True)
        renderSVG.drawToFile(drawing,str(folder/(f['tema']+'.svg')))
        flow += [drawing,Spacer(1,8)]
    elif f['visual']['tipo']=='tabla':flow+=[example_table(f['visual']),Spacer(1,8)]
    flow += [PageBreak(),p('Miremos el ejemplo paso a paso','title')]
    flow += [p(f'{i+1}. {s}') for i,s in enumerate(f['ejemplo']['pasos'])]
    flow += [p('La misma idea en otro lugar','h'),box(f['otroContexto']['texto']),Spacer(1,6),p(f['otroContexto']['conexion']),
             p('Una diferencia importante','h'),box(f['contraste']['texto']+' '+f['contraste']['explicacion'],HexColor('#fff1d9')),
             p('Para conversar, sin nota','h'),p(f['comprobacion']['pregunta'])]
    flow += [p(f'{chr(65+i)}. {s}') for i,s in enumerate(f['comprobacion']['opciones'])]
    flow += [Spacer(1,5),p('Si necesitás ayuda: '+f['comprobacion']['pista'],'small'),
             p('Lo vemos juntas: '+f['comprobacion']['explicacion'],'small'),
             p('Redacción y ejemplos propios. Referencias de enfoque: '+ '; '.join(SOURCES[s] for s in f['fuentes'])+'.','small')]
    doc=SimpleDocTemplate(str(file),pagesize=A4,leftMargin=48,rightMargin=48,topMargin=40,bottomMargin=58,
                          title=f['title'],author='Ingreso Monserrat - material pedagógico',pageCompression=1)
    doc.build(flow,onFirstPage=footer,onLaterPages=footer)
    reader=PdfReader(file)
    assert len(reader.pages)==2, f"{f['tema']}: {len(reader.pages)} páginas; revisar maquetación"
    for page in reader.pages:assert len(page.extract_text() or '')>80
    manifest.append({'tema':f['tema'],'archivo':file.name,'paginas':2,'sha256':hashlib.sha256(file.read_bytes()).hexdigest()})
(OUT/'manifest.json').write_text(json.dumps({'version':1,'fichas':manifest},ensure_ascii=False,indent=2),encoding='utf-8')
print(f'{len(manifest)} fichas, {len(manifest)*2} páginas, generadas y comprobadas.')
