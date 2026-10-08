// Primitivas compartidas por la pantalla y el PDF: un solo cálculo de cada figura.
export function crearDiagramaGeometria(d = {}) {
 const trazos=[], textos=[];
 const line=(points,color='#2563eb',dash=false,width=3)=>trazos.push({puntos:points,color,dash,width});
 const text=(x,y,texto,color='#172554',size=14)=>textos.push({x,y,texto:String(texto),color,size});
 const point=(x,y,r,a)=>[x+r*Math.cos(a*Math.PI/180),y-r*Math.sin(a*Math.PI/180)];
 const arc=(x,y,r,start,end,color='#64748b',dash=false,width=1)=>{
  const steps=Math.max(2,Math.ceil(Math.abs(end-start)/2));line(Array.from({length:steps+1},(_,i)=>point(x,y,r,start+(end-start)*i/steps)),color,dash,width);
 };
 if(d.tipo==='canjes'){
  const base=d.base||10,ad=Math.floor(d.a/base),au=d.a%base,bd=Math.floor(d.b/base),bu=d.b%base;
  const sumar=d.operacion==='suma',dd=sumar?ad+bd:ad-(au<bu?1:0),uu=sumar?au+bu:au+(au<bu?base:0);
  text(240,23,d.titulo||'La cantidad se conserva al cambiar las piezas','#172554',15);
  text(240,45,base===100?'Cada cuadrado entero tiene 100 centésimos.':'Cada barra tiene 10 unidades. Cada punto es una unidad.','#475569',12);
  const resultado=sumar?d.a+d.b:d.a-d.b;
  const filas=[{label:sumar?'Juntamos':'Al empezar',d:sumar?ad+bd:ad,u:sumar?au+bu:au},
   {label:sumar?'Canje de 10':'Abrimos una pieza',d:sumar?Math.floor(resultado/base):dd,u:sumar?resultado%base:uu},
   d.resolver?{label:'Quedan',d:Math.floor(resultado/base),u:resultado%base}:{label:sumar?'Contá las piezas':'Ahora quitá',d:sumar?0:bd,u:sumar?0:bu}];
  filas.forEach((f,i)=>{const y=73+i*77;text(70,y+16,f.label,'#172554',12);
   for(let k=0;k<f.d;k++){const x=143+k*(base===100?23:15),w=base===100?20:10,h=base===100?20:40;
    line([[x,y],[x+w,y],[x+w,y+h],[x,y+h],[x,y]],'#2563eb',false,1);
    for(let j=1;j<10;j++){line([[x,y+j*h/10],[x+w,y+j*h/10]],'#60a5fa',false,.6);if(base===100)line([[x+j*w/10,y],[x+j*w/10,y+h]],'#60a5fa',false,.6);}
   }
   const cols=base===100?20:10,dx=base===100?5:10;
   for(let k=0;k<f.u;k++)arc(340+(k%cols)*dx,y+5+Math.floor(k/cols)*(base===100?5:13),base===100?1.2:3,0,360,'#b45309',false,1.5);
  });
  text(240,299,base===100?'Un entero se puede abrir en 100 partes iguales.':'Abrir o cerrar una barra no agrega ni quita fichas.','#475569',12);
  return {trazos,textos,ancho:480,alto:310};
 }
 if(d.tipo==='reparto_decenas'){
  const grandes=Math.floor(d.total/d.grupos/10),resto=d.total-grandes*10*d.grupos;
  text(240,24,`${d.total} fichas en ${d.grupos} grupos iguales`,'#172554',16);
  text(240,46,'Una barra contiene diez fichas. Los puntos son fichas sueltas.','#475569',12);
  text(240,71,d.resolver?'Cada grupo recibe las mismas piezas.':`Ya repartimos las barras. Faltan estas ${resto} fichas:`,'#172554',13);
  if(!d.resolver)for(let k=0;k<resto;k++)arc(130+(k%16)*14,94+Math.floor(k/16)*15,3,0,360,'#b45309',false,2);
  const w=430/d.grupos;
  for(let i=0;i<d.grupos;i++){const x=25+i*w,y=139;line([[x,y],[x+w-6,y],[x+w-6,263],[x,263],[x,y]],'#64748b',false,1);
   text(x+w/2-3,159,'Grupo '+(i+1),'#172554',12);
   for(let k=0;k<grandes;k++){const xx=x+13+k*20;line([[xx,175],[xx+12,175],[xx+12,225],[xx,225],[xx,175]],'#2563eb',false,1);for(let j=1;j<10;j++)line([[xx,175+j*5],[xx+12,175+j*5]],'#60a5fa',false,1);}
   if(d.resolver)for(let k=0;k<resto/d.grupos;k++)arc(x+13+k*13,246,3,0,360,'#b45309',false,2);
  }
  text(240,294,d.resolver?'Contá barras y fichas de un solo grupo.':'Repartí las fichas sueltas de a una, por turnos.','#475569',13);
  return {trazos,textos,ancho:480,alto:310};
 }
 if(d.tipo==='porcion_comparada'){
  const max=Math.max(d.cantidad,d.porcion,d.denominador),w=335/max;
  text(240,25,'Comparamos con partes del mismo tamaño','#172554',16);
  [{n:d.cantidad,label:'Cantidad'},{n:d.porcion,label:'Una porción'}].forEach((f,i)=>{const y=65+i*86;text(68,y+22,f.label,'#172554',13);
   for(let j=0;j<f.n;j++){const x=125+j*w;line([[x,y],[x+w,y],[x+w,y+35],[x,y+35],[x,y]],i?'#15803d':'#2563eb',false,2);}
   text(285,y+58,`${f.n} partes de 1/${d.denominador}`,'#172554',13);
  });
  const end=125+d.denominador*w;line([[125,243],[end,243]],'#475569',false,2);text((125+end)/2,268,'Esta longitud representa 1 litro.','#475569',12);
  text(240,299,'¿Cuántas porciones, o qué parte de una, tenemos?','#172554',13);
  return {trazos,textos,ancho:480,alto:310};
 }
 if(d.tipo==='liquidos'){
  text(240,22,d.titulo || 'La misma cantidad en otra forma','#172554',16);
  text(28,38,'mL','#475569',10);
  const rs=d.recipientes||[],cols=Math.min(rs.length,3),cw=450/cols;
  rs.forEach((r,i)=>{const x=15+(i%cols)*cw+cw/2-32,y=(rs.length<=3?58:42)+Math.floor(i/cols)*132,cap=r.capacidad||1000,h=rs.length<=3?145:80;
   line([[x,y],[x,y+h],[x+64,y+h],[x+64,y],[x,y]],'#475569',false,2);
   line([[x+64,y+14],[x+77,y+14],[x+77,y+h-18],[x+64,y+h-18]],'#475569',false,2);
   for(let yy=y+h-2;yy>=y+h-h*r.ml/cap;yy-=3)line([[x+2,yy],[x+62,yy]],'#f59e0b',false,3);
   [0,.5,1].forEach(v=>{line([[x,y+h-v*h],[x+10,y+h-v*h]],'#172554',false,1);text(x-18,y+h-v*h+3,cap*v,'#172554',10);});
   text(x+32,y+h+20,r.label || r.ml+' mL','#172554',13);
   text(x+32,y+h+37,r.detalle || (r.ml/1000).toLocaleString('es-AR')+' L','#9a3412',13);
   if(d.operadores?.[i])text(15+(i+1)*cw,y+h/2,d.operadores[i],'#172554',22);
  });return {trazos,textos,ancho:480,alto:310};
 }
 if(d.tipo==='posicional'){
  if(d.despues){
   text(240,24,d.titulo||'Cada cifra cambia de posición','#172554',15);
   const w=130;
   d.columnas.forEach((c,i)=>text(105+i*w,52,c.nombre,'#172554',14));
   [d.columnas,d.despues].forEach((fila,j)=>fila.forEach((c,i)=>{const x=40+i*w,y=65+j*140;
    line([[x,y],[x+w,y],[x+w,y+72],[x,y+72],[x,y]],'#64748b',false,1);
    for(let k=0;k<c.cantidad;k++)arc(x+28+(k%3)*30,y+20+Math.floor(k/3)*24,5,0,360,'#2563eb',false,2);
    text(x+w/2,y+91,c.cantidad+' × '+c.valor,'#172554',13);
   }));
   text(240,184,d.operacion||'× 10: cada posición pasa a valer diez veces','#9a3412',14);
   return {trazos,textos,ancho:480,alto:310};
  }
  text(240,28,d.titulo||'Cada posición vale diez veces la siguiente','#172554',15);
  (d.columnas||[]).forEach((c,i)=>{const w=420/d.columnas.length,x=30+i*w;
   text(x+w/2,63,c.nombre,'#172554',14);line([[x,76],[x+w,76],[x+w,238],[x,238],[x,76]],'#64748b',false,1);
   for(let n=0;n<c.cantidad;n++){const xx=x+15+(n%3)*24,yy=92+Math.floor(n/3)*42;line([[xx,yy],[xx+15,yy],[xx+15,yy+25],[xx,yy+25],[xx,yy]],'#2563eb',false,2);}
   text(x+w/2,267,c.cantidad+' × '+c.valor,'#172554',14);
  });return {trazos,textos,ancho:480,alto:310};
 }
 if(d.tipo==='fracciones_grupos'){
  text(240,24,'Cada barra completa es un entero','#172554',16);
  (d.casos||[]).forEach((c,i)=>{const y=62+i*80; text(68,y+22,c.label,'#172554',13);
   for(let b=0;b<Math.ceil(c.pintadas/c.partes);b++){
    const x0=145+b*145,w=130/c.partes;
    for(let k=0;k<c.partes;k++){const x=x0+k*w;line([[x,y],[x+w,y],[x+w,y+36],[x,y+36],[x,y]],'#475569',false,1);
     if(b*c.partes+k<c.pintadas)for(let z=x+3;z<x+w;z+=5)line([[z,y+3],[z,y+33]],'#38bdf8',false,2);
    }
   }
  });return {trazos,textos,ancho:480,alto:310};
 }
 if(d.tipo==='mapa'){
  text(240,28,d.titulo || 'Una idea paso a paso','#172554',17);
  const wrap=(s,max=43)=>{const rows=[''];for(const word of String(s).split(/\s+/)){if((rows.at(-1)+' '+word).trim().length>max)rows.push(word);else rows[rows.length-1]=(rows.at(-1)+' '+word).trim();}return rows;};
  (d.nodos||[]).slice(0,3).forEach((n,i)=>{const y=48+i*86;
   line([[24,y],[456,y],[456,y+70],[24,y+70],[24,y]],'#4b7991',false,2);
   text(240,y+21,n.titulo,'#174a64',15);
   wrap(n.texto).slice(0,2).forEach((s,j)=>text(240,y+43+j*17,s,'#172554',13));
   if(i<Math.min(d.nodos.length,3)-1)line([[240,y+72],[240,y+83],[236,y+79],[240,y+83],[244,y+79]],'#b45309',false,2);
  });return {trazos,textos,ancho:480,alto:310};
 }
 if(d.tipo==='recta'){
  const min=d.min??0,max=d.max??1,paso=d.paso??(max-min)/4,x=v=>48+(v-min)*384/(max-min);
  text(240,34,d.titulo || 'Ubicamos cantidades','#172554',17);line([[48,150],[432,150]],'#475569',false,2);
  for(let i=0;i<=Math.round((max-min)/paso);i++){const v=min+i*paso;line([[x(v),143],[x(v),157]],'#64748b',false,1);text(x(v),183,Number(v.toFixed(4)).toLocaleString('es-AR'),'#172554',13);}
  (d.marcas||[]).forEach((m,i)=>{const px=x(m.valor);arc(px,150,6,0,360,'#b45309',false,3);text(px,110-(i%2)*25,m.label ?? m.valor,'#9a3412',14);line([[px,119-(i%2)*25],[px,141]],'#b45309',true,1);});
  return {trazos,textos,ancho:480,alto:310};
 }
 if(d.tipo==='barras'){
  const paso=d.paso||1,max=Math.ceil(Math.max(...d.valores)/paso)*paso,x0=60,y0=240,h=170,w=365;
  text(240,25,d.titulo || 'Leemos un gráfico','#172554',17);
  for(let v=0;v<=max;v+=paso){const y=y0-v/max*h;line([[x0,y],[440,y]],'#cbd5e1',false,1);text(35,y+4,v,'#172554',12);}
  line([[x0,60],[x0,y0],[440,y0]],'#475569',false,2);
  d.valores.forEach((v,i)=>{const x=x0+(i+.2)*w/d.valores.length,bw=.6*w/d.valores.length,y=y0-v/max*h;line([[x,y0],[x,y],[x+bw,y],[x+bw,y0]],'#2563eb',false,3);for(let z=x+5;z<x+bw;z+=8)line([[z,y0],[z,y]],'#93c5fd',false,3);text(x+bw/2,264,d.etiquetas[i],'#172554',12);});
  text(240,294,d.unidad || 'Cada marca de la escala tiene el mismo valor.','#475569',12);return {trazos,textos,ancho:480,alto:310};
 }
 if(d.tipo==='semiplano'){
  text(240,28,'Una parte del plano: la recta continúa','#172554',16);
  const py=v=>160-(v-(d.recta_y||0))*55;
  for(let yy=60;yy<160;yy+=13)line([[30,yy],[450,yy]],'#dbeafe',false,8);
  for(let yy=177;yy<275;yy+=13)line([[30,yy],[450,yy]],'#fef3c7',false,8);
  line([[30,160],[450,160]],'#475569',false,2);line([[39,154],[30,160],[39,166]],'#475569',false,2);line([[441,154],[450,160],[441,166]],'#475569',false,2);text(455,149,'r');
  (d.puntos||[]).forEach(p=>{const x=240+p.x*65,y=py(p.y);arc(x,y,4,0,360,'#9a3412',false,3);text(x+14,y-9,p.label,'#172554',15);});
  return {trazos,textos,ancho:480,alto:310};
 }
 if(d.tipo==='rectas'){
  const arrow=(x,y,dir)=>line([[x-dir*9,y-6],[x,y],[x-dir*9,y+6]],'#2563eb',false,2);
  text(240,40,d.titulo || ({recta:'Sigue en ambos sentidos',semirrecta:'Empieza y sigue',segmento:'Tiene dos extremos',paralelas:'No se cruzan',secantes:'Se cruzan'})[d.clase],'#172554',17);
  line([[70,145],[410,145]]);
  if(d.clase==='recta'||d.clase==='paralelas'||d.clase==='secantes'){arrow(70,145,-1);arrow(410,145,1);}else{arc(70,145,4,0,360,'#9a3412',false,3);text(70,174,'A');if(d.clase==='semirrecta')arrow(410,145,1);else{arc(410,145,4,0,360,'#9a3412',false,3);text(410,174,'B');}}
  if(d.clase==='paralelas'){line([[70,220],[410,220]]);arrow(70,220,-1);arrow(410,220,1);}
  if(d.clase==='secantes')line([[125,75],[350,235]]);
  return {trazos,textos,ancho:480,alto:310};
 }
 if(d.tipo==='fracciones'){
  text(240,24,d.titulo || 'El mismo entero en cada barra','#172554',15);
  let tachadas=false;
  d.barras.forEach((b,r)=>{
   const y=58+r*74,x0=125,w=330/b.partes.length,h=34;
   text(62,y+21,b.label,'#172554',13);
   b.partes.forEach((state,j)=>{
    const x=x0+j*w;
    line([[x,y],[x+w,y],[x+w,y+h],[x,y+h],[x,y]],'#475569',false,1);
    if(state==='p'||state==='s'||state==='q'){
     const color=state==='s'?'#15803d':'#2563eb';
     for(let dy=6;dy<h;dy+=6)line([[x+3,y+dy],[x+w-3,y+dy]],color,false,2);
    }
    if(state==='q'){
     tachadas=true;
     line([[x+2,y+2],[x+w-2,y+h-2]],'#991b1b',false,3);
     line([[x+w-2,y+2],[x+2,y+h-2]],'#991b1b',false,3);
    }
   });
  });
  text(240,296,tachadas?'Las partes tachadas ya no cuentan.':'Las rayas marcan la parte que miramos.','#334155',13);
  return {trazos,textos,ancho:480,alto:310};
 }
 if(d.tipo==='arreglo'){
  const cols=d.columnas,rows=d.filas,dx=28,dy=20,x0=(480-(cols-1)*dx)/2,y0=58;
  text(240,25,d.seleccionadas!==undefined?'Tomamos las filas con flecha':'Cada fila es un grupo','#172554',16);
  for(let r=0;r<rows;r++){
   const y=y0+r*dy,removed=d.quitar_ultima && r===rows-1;
   text(48,y+4,'Fila '+(r+1),'#475569',12);
   if(d.seleccionadas!==undefined && r<d.seleccionadas){line([[84,y-8],[94,y],[84,y+8]],'#172554',false,2);}
   for(let c=0;c<cols;c++)arc(x0+c*dx,y,6,0,360,removed?'#b91c1c':'#2563eb',false,2);
   if(removed)line([[x0-12,y-8],[x0+(cols-1)*dx+12,y+8]],'#b91c1c',false,2);
   if(d.separar===r+1)line([[92,y+10],[425,y+10]],'#15803d',true,1);
  }
  if(d.sobrantes!==undefined){
   text(90,285,'Aparte:','#172554',14);
   for(let n=0;n<d.sobrantes;n++)arc(160+n*28,281,6,0,360,'#9a3412',false,2);
   if(d.sobrantes===0)text(240,285,'No quedó ninguna','#172554',14);
  }
  return {trazos,textos,ancho:480,alto:310};
 }
 if(d.tipo==='saltos'){
  const max=Math.max(...d.series.map(s=>s.paso*s.cantidad)),x=n=>42+n*396/max;
  d.series.forEach((s,i)=>{
   const y=d.series.length===1?150:100+i*130;
   text(240,y-43,'Saltos de '+s.paso,'#172554',16);
   line([[42,y],[438,y]],'#64748b',false,1);
   for(let n=0;n<=max;n++)line([[x(n),y-3],[x(n),y+3]],'#94a3b8',false,1);
   for(let k=0;k<=s.cantidad;k++){
    const px=x(k*s.paso);arc(px,y,3,0,360,'#2563eb',false,2);
    text(px,y+23,d.ocultar_final && k===s.cantidad?'?':k*s.paso,'#172554',14);
    if(k){const start=x((k-1)*s.paso),end=px;line(Array.from({length:17},(_,j)=>{const t=j/16;return [start+(end-start)*t,y-80*t*(1-t)];}),'#2563eb',false,2);line([[px-5,y-8],[px,y],[px+1,y-9]],'#2563eb',false,2);}
   }
  });
  return {trazos,textos,ancho:480,alto:310};
 }
 if(d.tipo==='colecciones'){
  const grupos=d.grupos || [];
  grupos.forEach((g,i)=>{
   const y=30+i*70;
   line([[16,y],[464,y],[464,y+61],[16,y+61],[16,y]],'#94a3b8',false,1);
   text(80,y+33,g.label,'#172554',13);
   for(let j=0;j<g.cantidad;j++)arc(160+(j%10)*(g.separadas?30:25),y+22+Math.floor(j/10)*22,6,0,360,'#2563eb',false,2);
  });
  return {trazos,textos,ancho:480,alto:310};
 }
 if(d.tipo==='datos'){
  text(240,36,'Leemos la situación','#172554',18);
  d.lineas.forEach((label,i)=>{
   const y=70+i*70;
   line([[35,y],[445,y],[445,y+50],[35,y+50],[35,y]],'#94a3b8',false,1);
   text(240,y+31,label,'#172554',16);
  });
  return {trazos,textos,ancho:480,alto:310};
 }
 if(d.tipo==='circunferencia'){
  arc(240,145,95,0,d.semicirculo?180:360,'#2563eb',false,3);
  if(!d.semicirculo || d.incluir_diametro)line([[145,145],[335,145]],'#15803d',false,2);
  text(240,138,'O');
  if(d.radio){line([[240,145],[335,145]],'#c2410c',false,3);text(290,171,'r = '+d.radio+' '+(d.unidad||'cm'),'#9a3412');text(240,268,'Diámetro = '+(2*d.radio)+' '+(d.unidad||'cm'));}
  else text(240,171,'d = '+d.diametro+' '+(d.unidad||'cm'));
  return {trazos,textos,ancho:480,alto:310};
 }
 if(d.tipo==='tramo'){
  const x=90+300*d.parte/d.total;
  line([[90,160],[390,160]]);line([[90,145],[90,175]]);line([[x,145],[x,175]],'#15803d');line([[390,145],[390,175]]);
  text(240,110,'Total: '+d.total+' cm');text((90+x)/2,200,d.parte+' cm');text((x+390)/2,200,'? cm');
  return {trazos,textos,ancho:480,alto:310};
 }
 if(d.tipo==='segmentos'){
  const longest=Math.max(...d.longitudes);
  d.longitudes.forEach((n,i)=>{const y=65+i*75;line([[90,y],[90+280*n/longest,y]]);text(240,y-14,n+' cm');});
  return {trazos,textos,ancho:480,alto:310};
 }
 if(d.tipo==='poligono'){
  const ps=d.puntos,n=ps.length,xs=ps.map(p=>p[0]),ys=ps.map(p=>p[1]);
  const loX=Math.min(...xs),hiX=Math.max(...xs),loY=Math.min(...ys),hiY=Math.max(...ys);
  const scale=Math.min(290/(hiX-loX),165/(hiY-loY));
  const project=([x,y])=>[240+(x-(loX+hiX)/2)*scale,150-(y-(loY+hiY)/2)*scale];
  const p=ps.map(project),center=[p.reduce((a,v)=>a+v[0],0)/n,p.reduce((a,v)=>a+v[1],0)/n];
  const offset=(q,distance)=>{const x=q[0]-center[0],y=q[1]-center[1],norm=Math.hypot(x,y)||1;return [q[0]+distance*x/norm,q[1]+distance*y/norm];};
  if(d.cuadricula){
   const w=hiX,h=hiY,a=n===6?ps[3][0]:w,b=n===6?ps[2][1]:h;
   for(let x=1;x<w;x++)line([project([x,0]),project([x,x<=a?h:b])],'#94a3b8',false,1);
   for(let y=1;y<h;y++)line([project([0,y]),project([y<=b?w:a,y])],'#94a3b8',false,1);
  }
  for(const aux of d.auxiliares||[])line(aux.map(project),'#64748b',true,1);
  for(const [a,b] of d.diagonales||[])line([p[a],p[b]],'#15803d',false,2);
  if(d.division)line([project([0,d.division]),project([ps[3][0],d.division])],'#15803d',true,2);
  line([...p,p[0]],'#2563eb',false,3);
  p.forEach((v,i)=>{
   if(d.vertices?.[i]){const q=offset(v,18);text(q[0],q[1]+4,d.vertices[i]);}
   if(d.angulos?.[i]){const q=offset(v,-30);text(q[0],q[1]+4,d.angulos[i],'#9a3412');}
   if(d.lados?.[i]){
    const next=p[(i+1)%n],dx=next[0]-v[0],dy=next[1]-v[1],len=Math.hypot(dx,dy);
    // Los puntos están en sentido antihorario matemático; la normal queda fuera en SVG.
    text((v[0]+next[0])/2-dy/len*22,(v[1]+next[1])/2+dx/len*22+4,d.lados[i]);
   }
  });
  if(d.nota)text(240,288,d.nota,'#334155',13);
  return {trazos,textos,ancho:480,alto:310};
 }
 if(d.tipo==='mediatriz'){
  const x1=150,x2=330,cy=155,r=115,half=(x2-x1)/2,dy=Math.sqrt(r*r-half*half);
  arc(x1,cy,r,0,360,'#94a3b8',true);arc(x2,cy,r,0,360,'#94a3b8',true);
  line([[x1,cy],[x2,cy]]);line([[240,30],[240,280]],'#15803d');line([[240,155],[252,155],[252,143],[240,143]],'#15803d',false,1);
  text(140,178,'A');text(340,178,'B');text(225,175,'M');text(255,cy-dy,'C');text(255,cy+dy+8,'D');text(190,205,'AB = '+d.longitud+' cm');
  return {trazos,textos,ancho:480,alto:310};
 }
 if(d.tipo!=='angulo')return null;
 const angle=Math.max(5,Math.min(180,Number(d.angulo)||60)),cx=240,cy=d.rectas?155:245,r=d.rectas?120:(d.transportador?198:160);
 const start=d.izquierda?180:0,end=d.izquierda?180-angle:angle;
 if(d.transportador){
  arc(cx,cy,190,0,180);arc(cx,cy,153,0,180,'#cbd5e1');
  for(let n=0;n<=180;n+=10){line([point(cx,cy,180,n),point(cx,cy,190,n)],'#64748b',false,1);const p=point(cx,cy,169,n),q=point(cx,cy,140,n);text(p[0],p[1]+([0,180].includes(n)?16:4),n,'#172554',10);text(q[0],q[1]+([0,180].includes(n)?-6:4),180-n,'#64748b',10);}
 }
 line([[cx,cy],point(cx,cy,r,start)]);line([[cx,cy],point(cx,cy,r,end)],'#c2410c');
 arc(cx,cy,45,Math.min(start,end),Math.max(start,end),'#c2410c',false,2);
 if(d.rectas){line([[cx,cy],point(cx,cy,r,start+180)]);line([[cx,cy],point(cx,cy,r,end+180)],'#c2410c');if(d.opuesto)arc(cx,cy,45,Math.min(start,end)+180,Math.max(start,end)+180,'#15803d',false,4);}
 if(d.medida && !d.divisiones){const p=point(cx,cy,72,start+(end-start)*(d.bisectriz?.72:.5));text(p[0],p[1],angle+'°','#9a3412');}
 if(d.divisiones){
  if(d.medida)text(240,30,'Abertura total: '+angle+'°','#172554',17);
  const divisiones=d.divisiones.filter(n=>n>0&&n<angle).sort((a,b)=>a-b);
  for(const n of divisiones)line([[cx,cy],point(cx,cy,r,d.izquierda?180-n:n)],'#15803d',false,2);
  const limites=[0,...divisiones,angle];
  limites.slice(1).forEach((n,i)=>{const deg=(limites[i]+n)/2,p=point(cx,cy,102,d.izquierda?180-deg:deg);text(p[0],p[1],d.etiquetas_sectores?.[i]||'?', '#9a3412',16);});
 }
 if(d.bisectriz)line([[cx,cy],point(cx,cy,175,(start+end)/2)],'#15803d',false,3);
 if(d.compas){
  const A=point(cx,cy,90,0),B=point(cx,cy,90,angle),P=[A[0]+B[0]-cx,A[1]+B[1]-cy];
  arc(cx,cy,90,0,angle,'#64748b',true);
  for(const C of [A,B]){const dir=Math.atan2(C[1]-P[1],P[0]-C[0])*180/Math.PI;arc(C[0],C[1],90,dir-20,dir+20,'#64748b',true);}
  text(A[0],A[1]+19,'A');text(B[0]-12,B[1]-9,'B');text(P[0]+12,P[1],'P');
 }
 const labels=d.letras||['O','',''];text(cx-12,cy+20,labels[0]);
 for(const [label,deg] of [[labels[1],start],[labels[2],end]])if(label){const p=point(cx,cy,r+15,deg);text(p[0],p[1]+5,label);}
 if(d.transportador)text(cx,285,'Azul: lado inicial · Naranja: lado final','#334155',13);
 return {trazos,textos,ancho:480,alto:310};
}
