/* Original Canvas artwork. Drawing only: no changes to game state. */
(function(root){
function drawPiece(ctx,o,tick=0){
 const c=o.c,phase=tick*.28+(o.x||0)*.7+(o.y||0),wiggle=Math.sin(phase),pi=Math.PI;
 const disk=(x,y,r,col)=>{ctx.fillStyle=col;ctx.beginPath();ctx.arc(x,y,r,0,pi*2);ctx.fill();};
 const box=(x,y,w,h,col,r=2)=>{ctx.fillStyle=col;ctx.beginPath();ctx.roundRect(x,y,w,h,r);ctx.fill();};
 const line=(points,col,w=1.5)=>{ctx.strokeStyle=col;ctx.lineWidth=w;ctx.lineCap='round';ctx.lineJoin='round';ctx.beginPath();points.forEach(([x,y],i)=>i?ctx.lineTo(x,y):ctx.moveTo(x,y));ctx.stroke();};
 const shape=(points,col)=>{ctx.fillStyle=col;ctx.beginPath();points.forEach(([x,y],i)=>i?ctx.lineTo(x,y):ctx.moveTo(x,y));ctx.closePath();ctx.fill();};
 const label=(s,x,y,col,size=10)=>{ctx.fillStyle=col;ctx.font=`bold ${size}px sans-serif`;ctx.textAlign='center';ctx.textBaseline='middle';ctx.fillText(s,x,y);};
 const eye=(x,y,r=2)=>{disk(x,y,r,'#fff9dd');disk(x+.5,y+.3,r*.48,'#17213d');};
 const arrow=(dx,dy,col)=>{ctx.save();ctx.rotate(Math.atan2(dy,dx));line([[-6,0],[6,0],[1,-5]],col,2.3);line([[6,0],[1,5]],col,2.3);ctx.restore();};
 ctx.save();ctx.translate(16,16);
 if('123456789'.includes(c)){
  const corners={1:[2,2,2,13],2:[2,2,13,13],3:[2,2,13,2],4:[13,2,2,13],5:[2,2,2,2],6:[2,13,13,2],7:[13,2,2,2],8:[13,13,2,2],9:[2,13,2,2]};
  box(-15,-14,30,30,'#27374f',corners[c]);box(-15,-15,30,28,'#657bb2',corners[c]);
  ctx.save();ctx.beginPath();ctx.roundRect(-15,-15,30,28,corners[c]);ctx.clip();
  box(-15,-14,30,3,'#a4b8e2',0);line([[-15,0],[15,0]],'#3c5286',1);line([[0,-11],[0,-1]],'#3c5286',1);line([[-9,2],[-9,11]],'#3c5286',1);line([[10,2],[10,11]],'#3c5286',1);ctx.restore();
 }else if(c==='K'){
  disk(0,2,12,'#101d3555');disk(0,0,12,'#3c9e35');disk(0,-1,10.5,'#8cec4c');disk(-4,-5,4,'#c7ff81');eye(-4,-2,2.7);eye(4,-2,2.7);disk(-7,3,2,'#ffac80');disk(7,3,2,'#ffac80');line([[-3,4],[0,6],[3,4]],'#32642e',1.5);
 }else if(c==='*'){
  disk(0,0,13,'#4bd8ff12');shape([[0,-13],[9,-6],[11,0],[0,13],[-11,0],[-9,-6]],'#159dd7');shape([[0,-13],[9,-6],[0,-2],[-9,-6]],'#b7ffff');shape([[-9,-6],[0,-2],[0,13],[-11,0]],'#59e7ff');shape([[9,-6],[11,0],[0,13],[0,-2]],'#3485ec');line([[-9,-6],[9,-6]],'#e2ffff',.8);line([[-9,-6],[0,13],[9,-6]],'#9efaff',.8);const s=1.5+wiggle;line([[9,-13],[9,-13+s*2]],'#fff3bd',1);line([[9-s,-13+s],[9+s,-13+s]],'#fff3bd',1);
 }else if(c==='e'){
  box(-11,-10,22,23,'#98592e',3);box(-11,-12,22,20,'#e5b45f',3);box(-8,-9,16,3,'#ffe0a1',1);disk(-5,0,1,'#b77f40');disk(4,4,1.4,'#b77f40');disk(5,-3,1,'#b77f40');
 }else if('bBac'.includes(c)||o.timer){
  if(c==='B'){disk(0,2,12,'#502f32');disk(0,0,12,'#d38d43');disk(-2,-2,9,'#f2b761');line([[-7,-5],[-3,-8],[1,-8]],'#ffe0a2',2);line([[4,4],[7,1]],'#af6e38',1.5);}
  else if(o.timer){box(-13,-12,26,26,'#7d2945',4);box(-11,-12,22,22,'#eb6477',3);box(-7,-8,14,14,'#47223c',2);label(String(Math.ceil(o.timer/30)),0,-.5,'#ffe5a0',13);disk(-8,10,1,'#ffd47e');disk(8,10,1,'#ffd47e');}
  else if(c==='a'||c==='c'){box(-13,-12,26,26,'#6340a0',4);box(-11,-12,22,22,'#b38bf0',3);label(c==='a'?'↷':'↶',0,0,'#342457',25);disk(-8,-9,1,'#f1d9ff');disk(8,8,1,'#6947a1');}
  else{box(-13,-12,26,26,'#79402e',2);box(-12,-13,24,24,'#d28b46',2);box(-9,-10,18,18,'#a85f33',1);line([[-8,-8],[8,8]],'#e4ac64',3);line([[8,-8],[-8,8]],'#e4ac64',3);for(const x of [-10,10])for(const y of [-11,9])disk(x,y,1,'#ffe2a2');}
 }else if('Ss'.includes(c)){
  // A bar magnet's red/blue poles sit on its actual attraction axis.
  if(c==='s')ctx.rotate(pi/2);
  box(-13,-9,26,20,'#14233a',4);box(-13,-11,13,20,'#f15c66',3);box(0,-11,13,20,'#408ee8',3);box(-11,-9,9,3,'#ffaaa4',1);box(2,-9,9,3,'#9ad7ff',1);box(-2,-11,4,20,'#d8e2ee',1);label('N',-7,1,'#fff4dc',8);label('S',7,1,'#eefaff',8);
  for(const s of [-1,1]){const reach=2+(wiggle+1);line([[s*15,-7],[s*(14+reach),-4],[s*(14+reach),3],[s*15,6]],s<0?'#ff8893':'#72c6ff',1);}
 }else if(c==='~'){
  // Coiled snake: curved body, scales, head, forked tongue.
  const w=wiggle*1.2;line([[-12,9],[-7,10],[-3,7],[-7,3],[-9,-2],[-4,-6],[2,-3],[3,3],[8,5]],'#183f35',8);
  line([[-12,9],[-7,10],[-3,7],[-7,3],[-9,-2],[-4,-6],[2,-3],[3,3],[8,5]],'#5ed272',5.5);
  for(const [x,y] of [[-7,8],[-7,2],[-6,-5],[1,-1],[3,4]])disk(x,y,1,'#c7f275');
  line([[8,0],[11+w,-4],[10+w,-7]],'#ff6287',1);line([[11+w,-4],[14+w,-5]],'#ff6287',1);box(4,-2,10,9,'#7ee785',4);eye(7,0,1.5);eye(12,1,1.5);
 }else if(c==='['){
  // Eight jointed legs, violet abdomen, two bright eyes and fangs.
  for(const side of [-1,1])for(let i=0;i<4;i++){const y=-7+i*4,jog=Math.sin(phase+i*pi/2)*1.3;line([[side*4,y+2],[side*(9+i%2*2),y-4+jog],[side*14,y-1+jog]],'#b898ee',1.6);}
  disk(0,-4,7,'#4a286e');disk(-1,-5,5,'#8d51b9');disk(-2,-7,2,'#b179df');disk(0,5,6,'#43234f');eye(-2.5,5,2);eye(2.5,5,2);line([[-2,10],[-3,12]],'#fff0d3',1.5);line([[2,10],[3,12]],'#fff0d3',1.5);
 }else if(c==='E'){
  // Red jaw monster with an open mouth and individual teeth.
  disk(0,1,12,'#9e3040');disk(0,-1,11,'#f26962');shape([[-10,-8],[-10,-14],[-4,-10]],'#ffd09b');shape([[5,-10],[11,-14],[10,-7]],'#ffd09b');box(-9,1,18,8,'#572039',4);for(const x of [-6,0,6])shape([[x-2,1],[x+2,1],[x,5+wiggle]],'#fff7d9');for(const x of [-4,4])shape([[x-2,9],[x+2,9],[x,6]],'#fff7d9');eye(-4,-5,2.5);eye(4,-5,2.5);line([[-7,-9],[-2,-8]],'#9f253e',1.5);line([[2,-8],[7,-9]],'#9f253e',1.5);
 }else if(c==='T'){
  // Turquoise whirlwind creature, visually distinct from the spider.
  ctx.save();ctx.rotate(tick*.12);for(let i=0;i<4;i++){ctx.rotate(pi/2);line([[0,0],[5,-5],[11,-3],[13,3],[9,8]],'#41c9d2',4);line([[6,-5],[10,-3]],'#a8ffff',1.5);}ctx.restore();disk(0,0,7,'#238ba6');eye(-2.5,-1,2);eye(2.5,-1,2);disk(0,4,1.5,'#154269');
 }else if(c==='C'){
  // Amber slime with uneven lobes and a squash-and-stretch silhouette.
  const b=wiggle*.7;disk(-7,6,5,'#c6741f');disk(7,6,5,'#c6741f');disk(0,1+b,11,'#edaa26');disk(-3,-4+b,7,'#ffcd4e');disk(-5,-7+b,2,'#ffe9a0');eye(-4,0,2.7);eye(4,0,2.7);box(-3,5,6,2,'#965324',1);disk(8,5,1,'#ffdd6b');
 }else if('udlr^v<>'.includes(c)){
  if('^v<>'.includes(c)){disk(0,2,12,'#94501c');disk(0,0,12,'#f6ab2d');disk(-2,-3,8,'#ffd269');line([[-7,-6],[-3,-9]],'#fff3b7',2);}
  else{box(-13,-12,26,26,'#155e86',3);box(-12,-13,24,23,'#369de1',3);box(-9,-10,18,3,'#8cdbff',1);for(const x of [-10,10])disk(x,8,1,'#bcf2ff');}
  arrow(o.dx,o.dy,'^v<>'.includes(c)?'#6f3a1b':'#e4faff');
 }else if('UDLR'.includes(c)){
  box(-11,-11,22,24,'#854f20',4);box(-10,-13,20,22,'#f5c33e',4);disk(-10,5,3,'#5a5770');disk(10,5,3,'#5a5770');box(-7,-8,14,8,'#493c59',2);disk(-3,-5,1.5,'#fff3a5');disk(3,-5,1.5,'#fff3a5');ctx.save();ctx.translate(0,5);ctx.scale(.55,.55);arrow(o.dx,o.dy,'#795122');ctx.restore();
 }else if(c==='H'){
  const color=o.cool?'#f3a35c':'#b18aff';ctx.save();ctx.rotate(tick*.08);ctx.scale(1,.65);for(let r=13;r>=7;r-=3){ctx.strokeStyle=r===13?'#7747ba':color;ctx.lineWidth=2;ctx.beginPath();ctx.ellipse(0,0,r,r,0,0,pi*2);ctx.stroke();}ctx.restore();disk(0,0,6,'#090d24');disk(-8,-7,1,'#ffe2ff');
 }else if('hifg'.includes(c)){
  box(-14,-14,28,28,'#1b747a',3);box(-11,-11,22,22,'#193f55',2);line([[-11,-11],[-11,11]],'#72e8d4',2);line([[11,-11],[11,11]],'#72e8d4',2);arrow(o.dx,o.dy,'#80ffe3');
 }else if('AF'.includes(c)){
  box(-13,-13,26,27,'#754439',4);disk(0,0,12,'#e78b45');disk(0,0,8,'#733d50');ctx.save();ctx.rotate(o.angle*pi/2);box(-5,-15,10,15,'#acc8d6',2);box(-6,-15,12,4,'#e6f6ff',1);ctx.restore();disk(0,0,4,c==='F'?'#ffcf53':'#67cafa');
 }
 ctx.restore();
}
root.KyeArt={drawPiece};
})(typeof window==='undefined'?globalThis:window);
