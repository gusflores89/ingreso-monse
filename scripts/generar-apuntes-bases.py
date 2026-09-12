import json,re
from pathlib import Path
from reportlab.pdfgen import canvas
from reportlab.lib.colors import HexColor
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.platypus import Paragraph
from reportlab.lib.styles import ParagraphStyle
from xml.sax.saxutils import escape
root=Path(r'C:\Users\gusta\OneDrive\Documentos\Personal\monse\ingreso-monse-2027')
s=(root/'src/lib/apuntes-bases.js').read_text(encoding='utf-8');units=json.loads(s[s.index('['):s.index(';\n',s.index('['))])
pdfmetrics.registerFont(TTFont('Segoe',r'C:\Windows\Fonts\segoeui.ttf'))
pdfmetrics.registerFont(TTFont('SegoeBold',r'C:\Windows\Fonts\segoeuib.ttf'))
for tema in dict.fromkeys(u['tema'] for u in units):
 us=[u for u in units if u['tema']==tema];p=root/'public/apuntes'/('bases-'+tema+'.pdf');c=canvas.Canvas(str(p),pagesize=(595,842));c.setTitle('Primeros pasos: '+tema.replace('_',' '))
 for i,u in enumerate(us):
  c.setFillColor(HexColor('#172554'));c.setFont('SegoeBold',11);c.drawString(48,794,'APRENDER PASO A PASO  /  MATEMÁTICA')
  style=ParagraphStyle('title',fontName='SegoeBold',fontSize=22,leading=29,textColor=HexColor('#172554'));para=Paragraph(escape(u['titulo']),style);w,h=para.wrap(490,120);para.drawOn(c,48,758-h);y=730-h
  style=ParagraphStyle('body',fontName='Segoe',fontSize=13,leading=21,textColor=HexColor('#263449'))
  for text in [u['explicacion'],'Ejemplo: '+u['ejemplo'],*[(str(j+1)+'. '+step) for j,step in enumerate(u['pasos'])], 'Para recordar: '+u['pista']]:
   para=Paragraph(escape(text),style);w,h=para.wrap(490,450);para.drawOn(c,48,y-h);y-=h+18
  for b in u['visual'] or []:
   c.setFont('SegoeBold',11);c.setFillColor(HexColor('#172554'));c.drawString(48,y,b['label']);y-=45;x=48
   for j,peso in enumerate(b['partes']):
    width=440*peso/sum(b['partes']);c.setFillColor(HexColor('#38bdf8' if j<b['pintadas'] else '#e2e8f0'));c.setStrokeColor(HexColor('#334155'));c.rect(x,y,width,30,stroke=1,fill=1);x+=width
   y-=25
  assert y>95,(u['id'],y)
  c.setFillColor(HexColor('#475569'));c.setFont('Segoe',9);c.drawString(48,64,'Material de apoyo de la aplicación. No es un documento oficial del colegio.')
  c.drawString(48,48,'Bases v1 · '+str(i+1)+' / '+str(len(us)));c.showPage()
 c.save();print(p.name, len(us),'páginas')
