import { useEffect, useRef } from 'react';

export default function ParticleField({ paused, label }: { paused: boolean; label: string }) {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;
    let w = 0, h = 0, frame = 0, angle = 0.48, previous = 0;
    let active = true, pointerX = 0, pointerY = 0, easedX = 0, easedY = 0;
    const dots: {x:number;y:number;z:number;size:number;t:number}[] = [];
    const rings = 84, segments = 76;
    for (let a = 0; a < rings; a++) {
      const u = a / rings * Math.PI * 2;
      for (let b = 0; b < segments; b++) {
        const v = b / segments * Math.PI * 2;
        const radius = 1.44 + 0.43 * Math.cos(v);
        dots.push({x:radius*Math.cos(u), y:radius*Math.sin(u), z:0.43*Math.sin(v)+0.27*Math.sin(u*3),size:b%5===0?1.1:0.67,t:u});
      }
    }
    function draw() {
      if (!ctx) return;
      ctx.clearRect(0,0,w,h);
      const scale = Math.min(w,h)*0.247;
      const ry = 0.5 + easedX*0.3;
      const rx = 0.72 + easedY*0.25;
      const ca=Math.cos(angle),sa=Math.sin(angle),cx=Math.cos(rx),sx=Math.sin(rx),cy=Math.cos(ry),sy=Math.sin(ry);
      const points = dots.map(p=>{
        const ax=p.x*ca-p.y*sa,ay=p.x*sa+p.y*ca;
        const by=ay*cx-p.z*sx,bz=ay*sx+p.z*cx;
        return {x:ax*cy+bz*sy,y:by,z:-ax*sy+bz*cy,size:p.size,t:p.t};
      }).sort((a,b)=>a.z-b.z);
      const glow=ctx.createRadialGradient(w*.51,h*.5,0,w*.51,h*.5,Math.min(w,h)*.51);
      glow.addColorStop(0,'rgba(28,73,206,0.06)');glow.addColorStop(.52,'rgba(28,73,206,0.12)');glow.addColorStop(1,'rgba(28,73,206,0)');
      ctx.fillStyle=glow;ctx.fillRect(0,0,w,h);
      for(const p of points){
        const depth=5/(5-p.z);
        const px=w*.5+p.x*scale*depth, py=h*.5+p.y*scale*depth;
        const brightness=Math.max(.16,Math.min(1,(p.z+2.1)/3.8));
        ctx.fillStyle=`rgba(${Math.round(46+brightness*76)},${Math.round(98+brightness*82)},255,${brightness*.83})`;
        ctx.beginPath();ctx.arc(px,py,p.size*depth*Math.max(.7,w/760),0,Math.PI*2);ctx.fill();
      }
    }
    function resize(){
      if(!canvas)return;
      const rect=canvas.getBoundingClientRect();w=rect.width;h=rect.height;
      const dpr=Math.min(window.devicePixelRatio||1,1.7);
      canvas.width=Math.round(w*dpr);canvas.height=Math.round(h*dpr);ctx?.setTransform(dpr,0,0,dpr,0,0);draw();
    }
    const observer=new ResizeObserver(resize);observer.observe(canvas);
    const inView=new IntersectionObserver(([entry])=>{active=entry.isIntersecting;});inView.observe(canvas);
    const onPointer=(e:PointerEvent)=>{const r=canvas.getBoundingClientRect();pointerX=(e.clientX-r.left)/r.width-.5;pointerY=(e.clientY-r.top)/r.height-.5;};
    const onLeave=()=>{pointerX=0;pointerY=0;};
    canvas.addEventListener('pointermove',onPointer);canvas.addEventListener('pointerleave',onLeave);
    function animate(now:number){
      if(!paused && active && document.visibilityState==='visible' && now-previous>32){
        angle+=.0035;easedX+=(pointerX-easedX)*.075;easedY+=(pointerY-easedY)*.075;draw();previous=now;
      }
      if(!paused) frame=requestAnimationFrame(animate);
    }
    resize();if(!paused)frame=requestAnimationFrame(animate);
    return()=>{cancelAnimationFrame(frame);observer.disconnect();inView.disconnect();canvas.removeEventListener('pointermove',onPointer);canvas.removeEventListener('pointerleave',onLeave);};
  },[paused]);
  return <canvas ref={ref} className="particle-canvas" role="img" aria-label={label} />;
}
