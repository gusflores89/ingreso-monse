// Primitivas compartidas por la pantalla y el PDF: un solo cálculo de cada figura.
export function crearDiagramaGeometria(d = {}) {
 const trazos=[], textos=[];
 const line=(points,color='#2563eb',dash=false,width=3)=>trazos.push({puntos:points,color,dash,width});
 const text=(x,y,texto,color='#172554',size=14)=>textos.push({x,y,texto:String(texto),color,size});
 const point=(x,y,r,a)=>[x+r*Math.cos(a*Math.PI/180),y-r*Math.sin(a*Math.PI/180)];
 const arc=(x,y,r,start,end,color='#64748b',dash=false,width=1)=>{
  const steps=Math.max(2,Math.ceil(Math.abs(end-start)/2));line(Array.from({length:steps+1},(_,i)=>point(x,y,r,start+(end-start)*i/steps)),color,dash,width);
 };
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
  arc(240,145,95,0,360,'#2563eb',false,3);
  line([[145,145],[335,145]],'#15803d',false,2);
  text(240,138,'O');
  if(d.radio){line([[240,145],[335,145]],'#c2410c',false,3);text(290,171,'r = '+d.radio+' cm','#9a3412');text(240,268,'Diámetro = '+(2*d.radio)+' cm');}
  else text(240,171,'d = '+d.diametro+' cm');
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
 const angle=Math.max(5,Math.min(175,Number(d.angulo)||60)),cx=240,cy=d.rectas?155:245,r=d.rectas?120:(d.transportador?198:160);
 const start=d.izquierda?180:0,end=d.izquierda?180-angle:angle;
 if(d.transportador){
  arc(cx,cy,190,0,180);arc(cx,cy,153,0,180,'#cbd5e1');
  for(let n=0;n<=180;n+=10){line([point(cx,cy,180,n),point(cx,cy,190,n)],'#64748b',false,1);const p=point(cx,cy,169,n),q=point(cx,cy,140,n);text(p[0],p[1]+([0,180].includes(n)?16:4),n,'#172554',10);text(q[0],q[1]+([0,180].includes(n)?-6:4),180-n,'#64748b',10);}
 }
 line([[cx,cy],point(cx,cy,r,start)]);line([[cx,cy],point(cx,cy,r,end)],'#c2410c');
 arc(cx,cy,45,Math.min(start,end),Math.max(start,end),'#c2410c',false,2);
 if(d.rectas){line([[cx,cy],point(cx,cy,r,start+180)]);line([[cx,cy],point(cx,cy,r,end+180)],'#c2410c');if(d.opuesto)arc(cx,cy,45,Math.min(start,end)+180,Math.max(start,end)+180,'#15803d',false,4);}
 if(d.medida){const p=point(cx,cy,72,start+(end-start)*(d.bisectriz?.72:.5));text(p[0],p[1],angle+'°','#9a3412');}
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
