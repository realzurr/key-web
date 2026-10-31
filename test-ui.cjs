const fs=require('node:fs'),vm=require('node:vm'),assert=require('node:assert/strict');
const nodes={},events={};let frame;
const ctx=new Proxy({},{get:()=>()=>{},set:()=>true});
function node(id){return nodes[id]??=( {id,tagName:'DIV',options:[],value:'',textContent:'',classList:{add(){},remove(){}},add(o){this.options.push(o);if(this.options.length===1)this.value=o.value;},replaceChildren(){this.options=[];},addEventListener(type,fn){this[type]=fn;},getContext(){return ctx;},focus(){},showModal(){this.open=true;},close(){this.open=false;}} );}
const env={console,Math,Set,Number,String,Object,Array,Error,JSON,document:{getElementById:node,querySelectorAll:()=>[],addEventListener(t,fn){events[t]=fn;}},localStorage:{getItem:()=>null,setItem(){}},Option:function(text,value){this.text=text;this.value=value;},requestAnimationFrame:fn=>{frame=fn;}};env.window=env;env.window.addEventListener=()=>{};
vm.createContext(env);for(const f of ['levels.js','engine.js','art.js','app.js'])vm.runInContext(fs.readFileSync('./dist/'+f,'utf8'),env);
assert.equal(nodes['level-name'].textContent,'FIRST');assert.equal(nodes.pack.options.length,3);assert.equal(nodes.level.options.length,15);
nodes.play.onclick();frame(100);events.keydown({code:'ArrowRight',key:'ArrowRight',target:{tagName:'CANVAS'},preventDefault(){},repeat:false});frame(200);assert.equal(nodes.gems.textContent,'1 / 1');assert.equal(nodes['overlay-title'].textContent,'Labirinto resolvido!');
nodes.play.onclick();assert.equal(nodes['level-name'].textContent,'SECOND');nodes.pause.onclick();assert.equal(nodes['overlay-title'].textContent,'Uma pausa para pensar.');nodes.play.onclick();nodes.restart.onclick();assert.equal(nodes.moves.textContent,0);
nodes.help.onclick();assert.equal(nodes['help-dialog'].open,true);nodes['close-help'].onclick();assert.equal(nodes['help-dialog'].open,false);
console.log('Interface: inicialização, início, teclado, vitória na primeira fase, próxima fase, pausa, reinício e ajuda OK.');
