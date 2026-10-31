const assert=require('node:assert/strict');
const fs=require('node:fs');
const vm=require('node:vm');
const {Game,parse}=require('./dist/engine.js');
const context={window:{}};vm.runInNewContext(fs.readFileSync('./dist/levels.js','utf8'),context);
for(const [name,text] of Object.entries(context.window.LEVEL_FILES)){const levels=parse(text);for(const l of levels){const g=new Game(l,()=>.75);assert.equal(g.cells.length,600);assert(g.player);for(let t=0;t<500;t++){g.tick();for(const o of g.entities.filter(o=>o.alive))assert.equal(g.at(o.x,o.y),o,`${name} ${l.name}: entidade sobreposta`);}}console.log(name+': '+levels.length+' fases válidas');}
function level(items){let rows=Array.from({length:20},(_,y)=>Array.from({length:30},(_,x)=>x===0||x===29||y===0||y===19?'5':' '));rows[2][2]='K';for(const [x,y,c] of items)rows[y][x]=c;return {name:'TEST',hint:'',message:'',rows:rows.map(r=>r.join(''))};}
let g=new Game(level([[3,2,'*']]));assert(g.step(1,0));assert(g.won);
g=new Game(level([[3,2,'b'],[6,2,'*']]));assert(g.step(1,0));assert.equal(g.at(4,2).c,'b');
g=new Game(level([[3,2,'b'],[4,2,'5'],[6,2,'*']]));assert.equal(g.step(1,0),false);
g=new Game(level([[3,2,'g'],[6,2,'*']]));assert.equal(g.step(1,0),false);
g=new Game(level([[3,2,'f'],[6,2,'*']]));assert(g.step(1,0));assert(g.step(1,0));assert.equal(g.at(3,2).c,'f');
g=new Game(level([[3,2,'H'],[6,2,'*']]));g.step(1,0);assert.equal(g.lives,2);
g=new Game(level([[4,2,'E'],[6,2,'*']]));g.step(1,0);assert.equal(g.lives,2);
g=new Game(level([[4,4,'r'],[6,2,'*']]));g.tick();assert.equal(g.at(5,4).c,'r');
g=new Game(level([[4,4,'b'],[6,4,'S'],[6,2,'*']]));g.tick();assert.equal(g.at(5,4).c,'b');
assert.throws(()=>parse('1\nX\nhint\nmessage\nshort'));
console.log('Coleta, vitória, empurrões, colisões, portas, vidas, setas, ímãs e importação: OK');
