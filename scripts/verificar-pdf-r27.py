"""Validate every current PDF and render it with Poppler; no student data."""
from pathlib import Path
import json, re, hashlib, subprocess, concurrent.futures
from PIL import Image, ImageOps, ImageDraw
import pdfplumber
ROOT=Path(__file__).resolve().parents[1]
OUT=Path(r'C:\Users\gusta\.codex\visualizations\2026\09\09\01a086d6-a934-77a3-9a28-75f27a213064\implementacion-r27\pdf')
POPPLER=Path(r'C:\Users\gusta\.cache\codex-runtimes\codex-primary-runtime\dependencies\native\poppler\Library\bin\pdftoppm.exe')
OUT.mkdir(parents=True,exist_ok=True)
s=(ROOT/'src/lib/apuntes-bases.js').read_text(encoding='utf-8');units=json.loads(s[s.index('['):s.index(';\n',s.index('['))])
def compact(s):return re.sub(r'\s+','',s)
def check(tema):
 us=[u for u in units if u['tema']==tema];p=ROOT/'public/apuntes'/('bases-'+tema+'.pdf')
 with pdfplumber.open(p) as pdf:
  assert len(pdf.pages)==len(us),(tema,len(pdf.pages),len(us))
  for page,u in zip(pdf.pages,us):
   text=page.extract_text() or ''
   assert compact(u['titulo']) in compact(text),(u['id'],'title missing')
   assert len(text)>150,(u['id'],'empty')
   for c in page.chars:
    assert c['x0']>=5 and c['x1']<=page.width-5,(u['id'],'horizontal clipping',c['text'],c['x0'],c['x1'])
    assert c['top']>=5 and c['bottom']<=page.height-5,(u['id'],'vertical clipping')
 prefix=OUT/tema;prefix.mkdir(exist_ok=True)
 subprocess.run([str(POPPLER),'-scale-to','640','-png',str(p),str(prefix/'pagina')],check=True,stdout=subprocess.DEVNULL,stderr=subprocess.PIPE)
 # Poppler cambia el relleno a dos cifras cuando un PDF supera nueve páginas.
 # Seleccionar esta ejecución evita confundir renders anteriores con páginas nuevas.
 images=[prefix/('pagina-'+str(i).zfill(len(str(len(us))))+'.png') for i in range(1,len(us)+1)]
 assert all(p.exists() for p in images),tema
 # One contact sheet per theme. Original rendered pages remain available for close inspection.
 cols=3;w=330;h=485;rows=(len(images)+cols-1)//cols
 sheet=Image.new('RGB',(cols*w,rows*h),'#e2e8f0');draw=ImageDraw.Draw(sheet)
 for i,impath in enumerate(images):
  im=Image.open(impath).convert('RGB');im.thumbnail((w-16,h-30));x=(i%cols)*w+8;y=(i//cols)*h+22
  sheet.paste(im,(x,y));draw.text((x,y-17),str(i+1)+' / '+str(len(images)),fill='black')
 sheet.save(OUT/(tema+'-contacto.jpg'))
 return {'tema':tema,'url':'/apuntes/'+p.name,'paginas':len(us),'sha256':hashlib.sha256(p.read_bytes()).hexdigest()}
with concurrent.futures.ThreadPoolExecutor(max_workers=4) as pool:
 report=list(pool.map(check,dict.fromkeys(u['tema'] for u in units)))
manifest={'revision':'r27','documentos':report,'total_paginas':sum(r['paginas'] for r in report)}
(OUT/'verificacion.json').write_text(json.dumps(manifest,ensure_ascii=False,indent=2),encoding='utf-8')
(ROOT/'public/apuntes/manifest-r27.json').write_text(json.dumps(manifest,ensure_ascii=False,indent=2)+'\n',encoding='utf-8')
print(json.dumps({'pdfs':len(report),'paginas':manifest['total_paginas'],'renderizados':True}))
