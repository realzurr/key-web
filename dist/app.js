/*
Copyright (c) 2026 realzurr (https://github.com/realzurr).
Original game: Kye 2.0, Copyright (c) 1992 Colin Garbutt.
Web implementation: GPL-3.0-only with attribution term under section 7(b).
See LICENSE and ATTRIBUTION.md (or LICENSE.txt and ATTRIBUTION.txt).
*/
'use strict';
const $=id=>document.getElementById(id), {Game,parse,monsters,sliders,timers}=KyeEngine;
const canvas=$('board'),ctx=canvas.getContext('2d'),T=32;let packs={},pack='DEFAULT.KYE',index=0,game,paused=true,mode='ready',keys=new Set(),pointer=null,last=0,elapsed=0,completed={};
try{completed=JSON.parse(localStorage.getItem('kye-completed')||'{}');}catch{}
for(const [name,text] of Object.entries(LEVEL_FILES))packs[name]=parse(text);
for(const name of Object.keys(packs).sort((a,b)=>a==='DEFAULT.KYE'?-1:1))$('pack').add(new Option(name==='DEFAULT.KYE'?'Original · 15 fases':name,name));
function list(){const s=$('level');s.replaceChildren();packs[pack].forEach((l,i)=>s.add(new Option(`${String(i+1).padStart(2,'0')}  ${l.name}${completed[pack+':'+l.name]?'  ✓':''}`,i)));s.value=index;}
function overlay(title,text,button,icon='✦'){mode=button==='Continuar'?'paused':mode;$('overlay').classList.remove('hidden');$('overlay-title').textContent=title;$('overlay-text').textContent=text;$('play').textContent=button;$('overlay-icon').textContent=icon;}
function load(){keys.clear();pointer=null;game=new Game(packs[pack][index]);paused=true;mode='ready';list();$('level-label').textContent=`${String(index+1).padStart(2,'0')} / ${packs[pack].length}`;$('level-name').textContent=game.level.name;$('hint').textContent=game.level.hint;$('pause').innerHTML='Ⅱ <span>Pausar</span>';overlay('Pronto para o labirinto?',game.level.hint,'Começar a jogar');render();stats();}
function resume(){paused=false;mode='playing';$('overlay').classList.add('hidden');$('pause').innerHTML='Ⅱ <span>Pausar</span>';canvas.focus();}
function togglePause(){if(game.won||game.over||mode==='ready')return;if(paused)resume();else{paused=true;keys.clear();pointer=null;overlay('Uma pausa para pensar.','O labirinto espera por você.','Continuar','Ⅱ');$('pause').innerHTML='▶ <span>Continuar</span>';}}
$('play').onclick=()=>{if(mode==='won'){index=(index+1)%packs[pack].length;load();resume();}else if(mode==='over'){load();resume();}else resume();};$('pause').onclick=togglePause;$('touch-pause').onclick=togglePause;$('restart').onclick=()=>{load();resume();};$('pack').onchange=e=>{pack=e.target.value;index=0;load();};$('level').onchange=e=>{index=+e.target.value;load();};
$('file').onchange=async e=>{const f=e.target.files[0];if(!f)return;try{if(f.size>2e6)throw Error('O limite é 2 MB.');const levels=parse(await f.text());packs[f.name]=levels;if(![...$('pack').options].some(o=>o.value===f.name))$('pack').add(new Option(f.name,f.name));pack=f.name;index=0;$('pack').value=pack;load();$('notice').textContent=`${levels.length} fase(s) carregada(s).`;}catch(err){$('notice').textContent='Não foi possível abrir: '+err.message;}e.target.value='';};
$('help').onclick=()=>{if(!paused)togglePause();$('help-dialog').showModal();};$('close-help').onclick=()=>$('help-dialog').close();
const keymap={ArrowUp:[0,-1],ArrowDown:[0,1],ArrowLeft:[-1,0],ArrowRight:[1,0],w:[0,-1],s:[0,1],a:[-1,0],d:[1,0],Numpad1:[-1,1],Numpad2:[0,1],Numpad3:[1,1],Numpad4:[-1,0],Numpad6:[1,0],Numpad7:[-1,-1],Numpad8:[0,-1],Numpad9:[1,-1]};
document.addEventListener('keydown',e=>{if(['SELECT','INPUT','BUTTON'].includes(e.target.tagName)||$('help-dialog').open)return;const k=keymap[e.code]?e.code:e.key.length===1?e.key.toLowerCase():e.key;if(keymap[k]){e.preventDefault();if(mode==='ready')resume();keys.add(k);}if(!e.repeat&&k==='p')togglePause();if(!e.repeat&&k==='r'){load();resume();}if(k===' '&&mode==='ready'){e.preventDefault();resume();}});document.addEventListener('keyup',e=>{keys.delete(e.code);keys.delete(e.key.toLowerCase());keys.delete(e.key);});
window.addEventListener('blur',()=>{keys.clear();pointer=null;if(!paused)togglePause();});document.addEventListener('visibilitychange',()=>{if(document.hidden&&!paused)togglePause();});
function point(e){const r=canvas.getBoundingClientRect();pointer=[Math.floor((e.clientX-r.left)/r.width*30),Math.floor((e.clientY-r.top)/r.height*20)];}
canvas.addEventListener('pointerdown',e=>{if(paused)return;canvas.setPointerCapture(e.pointerId);point(e);});canvas.addEventListener('pointermove',e=>{if(pointer)point(e);});canvas.addEventListener('pointerup',()=>pointer=null);canvas.addEventListener('pointercancel',()=>pointer=null);
let touch=null;document.querySelectorAll('[data-dir]').forEach(b=>{b.onpointerdown=e=>{e.preventDefault();b.setPointerCapture(e.pointerId);if(mode==='ready')resume();touch=b.dataset.dir.split(',').map(Number);};b.onpointerup=b.onpointercancel=()=>touch=null;});
function stats(){$('gems').textContent=`${game.total-game.diamonds} / ${game.total}`;$('lives').textContent='♥ '.repeat(game.lives)+'♡ '.repeat(3-game.lives);$('time').textContent=`${String(Math.floor(game.time/60)).padStart(2,'0')}:${String(Math.floor(game.time%60)).padStart(2,'0')}`;$('moves').textContent=game.moves;}
function circle(x,y,r,color){ctx.fillStyle=color;ctx.beginPath();ctx.arc(x,y,r,0,Math.PI*2);ctx.fill();}
function rect(x,y,w,h,color,r=0){ctx.fillStyle=color;ctx.beginPath();ctx.roundRect(x,y,w,h,r);ctx.fill();}
function text(s,x,y,color,size=20){ctx.fillStyle=color;ctx.font=`bold ${size}px monospace`;ctx.textAlign='center';ctx.textBaseline='middle';ctx.fillText(s,x,y+1);}
function arrow(o,x,y,color){const dx=o.dx,dy=o.dy;ctx.save();ctx.translate(x,y);ctx.rotate(Math.atan2(dy,dx));ctx.strokeStyle=color;ctx.lineWidth=2.5;ctx.lineCap='round';ctx.beginPath();ctx.moveTo(-6,0);ctx.lineTo(6,0);ctx.lineTo(1,-5);ctx.moveTo(6,0);ctx.lineTo(1,5);ctx.stroke();ctx.restore();}
function render(){
 ctx.fillStyle='#19253c';ctx.fillRect(0,0,960,640);
 for(let y=0;y<20;y++)for(let x=0;x<30;x++){
  rect(x*T+1,y*T+1,30,30,(x+y)%2?'#22334b':'#263a50');
  circle(x*T+16,y*T+16,.65,'#354961');
 }
 for(const o of game.entities){
  if(!o.alive||(o.c==='K'&&game.invulnerable&&game.tickCount%2))continue;
  ctx.save();ctx.translate(o.x*T,o.y*T);KyeArt.drawPiece(ctx,o,game.tickCount);ctx.restore();
 }
}
function frame(t){if(!last)last=t;elapsed+=Math.min(t-last,200);last=t;while(elapsed>=100){elapsed-=100;if(!paused){let dx=0,dy=0;if(touch)[dx,dy]=touch;else if(keys.size){for(const k of keys){const d=keymap[k];if(d){dx+=d[0];dy+=d[1];}}dx=Math.sign(dx);dy=Math.sign(dy);}else if(pointer){dx=Math.sign(pointer[0]-game.player.x);dy=Math.sign(pointer[1]-game.player.y);if(dx&&dy){if(game.at(game.player.x+dx,game.player.y))dx=0;else if(game.at(game.player.x,game.player.y+dy))dy=0;}}game.step(dx,dy);game.tick();if(game.won){paused=true;mode='won';completed[pack+':'+game.level.name]=true;try{localStorage.setItem('kye-completed',JSON.stringify(completed));}catch{}list();overlay(index===packs[pack].length-1?'Coleção concluída!':'Labirinto resolvido!',game.level.message,index===packs[pack].length-1?'Jogar novamente':'Próximo labirinto','◆');}else if(game.over){paused=true;mode='over';overlay('Vamos tentar de novo?','Cada tentativa revela um novo caminho.','Tentar novamente','↻');}stats();}}render();requestAnimationFrame(frame);}
load();requestAnimationFrame(frame);
