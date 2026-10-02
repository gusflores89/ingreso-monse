import { useEffect, useState } from 'react';

export default function LeerConsigna({texto,onLectura,disabled=false}) {
 const [disponible,setDisponible]=useState(false),[hablando,setHablando]=useState(false),[fallo,setFallo]=useState(false);
 useEffect(()=>{setDisponible(typeof window!=='undefined' && 'speechSynthesis' in window);return ()=>{window.speechSynthesis?.cancel();};},[]);
 useEffect(()=>{window.speechSynthesis?.cancel();setHablando(false);setFallo(false);},[texto]);
 const leer=()=>{
  if(hablando){window.speechSynthesis.cancel();setHablando(false);return;}
  try {
   window.speechSynthesis.cancel();const voz=new SpeechSynthesisUtterance(String(texto || ''));voz.lang='es-AR';voz.rate=0.85;
   const local=window.speechSynthesis.getVoices().find(v=>v.lang.startsWith('es') && v.localService);if(local)voz.voice=local;
   voz.onend=()=>setHablando(false);voz.onerror=()=>{setHablando(false);setFallo(true);};
   setFallo(false);setHablando(true);onLectura?.();window.speechSynthesis.speak(voz);
  }catch{setFallo(true);setHablando(false);}
 };
 return <span style={{display:'inline-block',margin:'8px 0'}}>
  <button type="button" disabled={disabled || !disponible || !texto} onClick={leer}>{hablando?'Detener lectura':'Escuchar consigna'}</button>
  {(!disponible || fallo) && <span role="status" style={{display:'block',fontSize:14}}>La lectura en voz alta no está disponible aquí. Podés pedir que te lean esta consigna.</span>}
 </span>;
}
