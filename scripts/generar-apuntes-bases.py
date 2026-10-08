import json,re,sys,subprocess,os
from pathlib import Path
from reportlab.pdfgen import canvas
from reportlab.lib.colors import HexColor
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.platypus import Paragraph
from reportlab.lib.styles import ParagraphStyle
from xml.sax.saxutils import escape
root=Path(__file__).resolve().parents[1]
s=(root/'src/lib/apuntes-bases.js').read_text(encoding='utf-8');units=json.loads(s[s.index('['):s.index(';\n',s.index('['))])
pdfmetrics.registerFont(TTFont('Segoe',r'C:\Windows\Fonts\segoeui.ttf'))
pdfmetrics.registerFont(TTFont('SegoeBold',r'C:\Windows\Fonts\segoeuib.ttf'))
diagram_js="const fs=require('fs'),vm=require('vm');const s=fs.readFileSync(process.argv[1],'utf8').replace(/^export /gm,'');const make=vm.runInNewContext(s+';crearDiagramaGeometria');const items=JSON.parse(fs.readFileSync(0,'utf8'));process.stdout.write(JSON.stringify(items.map(make)));"
visuals=[u['visual'] for u in units if isinstance(u['visual'],dict) and u['visual'].get('tipo')!='lectura']
rendered=json.loads(subprocess.check_output([os.environ.get('NODE_BINARY','node'),'-e',diagram_js,str(root/'src/lib/diagrama-geometria.js')],input=json.dumps(visuals),encoding='utf-8')) if visuals else []
diagrams={json.dumps(v,sort_keys=True):d for v,d in zip(visuals,rendered)}
temas_lengua=set(re.findall(r'tema: "([^"]+)"', (root/'src/lib/curriculum.js').read_text(encoding='utf-8').split('export const CURRICULUM_LENGUA = [')[1].split('];')[0]))
for tema in dict.fromkeys(u['tema'] for u in units):
 if '--temas' in sys.argv and tema not in sys.argv[sys.argv.index('--temas')+1].split(','): continue
 if '--lengua' in sys.argv and not any(u['tema']==tema and u['id'].startswith('leng_') for u in units): continue
 us=[u for u in units if u['tema']==tema];p=root/'public/apuntes'/('bases-'+tema+'.pdf');c=canvas.Canvas(str(p),pagesize=(595,842));c.setTitle('Primeros pasos: '+tema.replace('_',' '))
 for i,u in enumerate(us):
  c.setFillColor(HexColor('#172554'));c.setFont('SegoeBold',11);c.drawString(48,794,'APRENDER PASO A PASO  /  '+('LENGUA' if u['tema'] in temas_lengua else 'MATEMÁTICA'))
  style=ParagraphStyle('title',fontName='SegoeBold',fontSize=22,leading=29,textColor=HexColor('#172554'));para=Paragraph(escape(u['titulo']),style);w,h=para.wrap(490,120);para.drawOn(c,48,758-h);y=730-h
  style=ParagraphStyle('body',fontName='Segoe',fontSize=13,leading=21,textColor=HexColor('#263449'))
  lectura=['Texto para releer: '+u['visual']['texto']] if isinstance(u['visual'],dict) and u['visual'].get('tipo')=='lectura' else []
  bloques=[]
  for text in [*lectura,u['explicacion'],'Ejemplo: '+u['ejemplo'],*[(str(j+1)+'. '+step) for j,step in enumerate(u['pasos'])], 'Para recordar: '+u['pista']]:
   para=Paragraph(escape(text).replace("\n", "<br/>"),style);w,h=para.wrap(490,450);bloques.append((para,h))
  texto_alto=sum(h+14 for _,h in bloques)
  if isinstance(u['visual'],dict) and u['visual'].get('tipo')!='lectura':
   diagram=diagrams[json.dumps(u['visual'],sort_keys=True)];assert diagram,u['id'];scale=min(440/480,(y-texto_alto-119)/310);assert scale>=.65,(u['id'],y-texto_alto)
   left=(595-480*scale)/2
   for line in diagram['trazos']:
    c.setStrokeColor(HexColor(line['color']));c.setLineWidth(line['width']*scale);c.setDash([5*scale,4*scale] if line['dash'] else [])
    points=line['puntos'];path=c.beginPath();path.moveTo(left+points[0][0]*scale,y-points[0][1]*scale)
    for x1,y1 in points[1:]:path.lineTo(left+x1*scale,y-y1*scale)
    c.drawPath(path)
   c.setDash([])
   for label in diagram['textos']:
    c.setFillColor(HexColor(label['color']));c.setFont('Segoe',label['size']*scale);c.drawCentredString(left+label['x']*scale,y-label['y']*scale,label['texto'])
   y-=310*scale+14
  for b in u['visual'] if isinstance(u['visual'],list) else []:
   c.setFont('SegoeBold',11);c.setFillColor(HexColor('#172554'));c.drawString(48,y,b['label']);y-=45;x=48
   for j,peso in enumerate(b['partes']):
    width=440*peso/sum(b['partes']);c.setFillColor(HexColor('#38bdf8' if j<b['pintadas'] else '#e2e8f0'));c.setStrokeColor(HexColor('#334155'));c.rect(x,y,width,30,stroke=1,fill=1);x+=width
   y-=25
  for para,h in bloques:
   para.drawOn(c,48,y-h);y-=h+14
  assert y>95,(u['id'],y)
  c.setFillColor(HexColor('#475569'));c.setFont('Segoe',9);c.drawString(48,64,'Material de apoyo de la aplicación. No es un documento oficial del colegio.')
  c.drawString(48,48,'Bases ampliadas · '+str(i+1)+' / '+str(len(us)));c.showPage()
 c.save();print(p.name, len(us),'páginas')
