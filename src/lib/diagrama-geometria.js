// Primitivas compartidas por la pantalla y el PDF: un solo cálculo de cada figura.
export function crearDiagramaGeometria(d = {}) {
 const trazos=[], textos=[];
 const line=(points,color='#2563eb',dash=false,width=3)=>trazos.push({puntos:points,color,dash,width});
 const text=(x,y,texto,color='#172554',size=14)=>textos.push({x,y,texto:String(texto),color,size});
 const point=(x,y,r,a)=>[x+r*Math.cos(a*Math.PI/180),y-r*Math.sin(a*Math.PI/180)];
 const arc=(x,y,r,start,end,color='#64748b',dash=false,width=1)=>{
  const steps=Math.max(2,Math.ceil(Math.abs(end-start)/2));line(Array.from({length:steps+1},(_,i)=>point(x,y,r,start+(end-start)*i/steps)),color,dash,width);
 };
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
