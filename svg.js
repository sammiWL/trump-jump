console.log('ayy');

var pic=document.getElementById('america');

var p1=document.createElementNS('http://www.w3.org/2000/svg','rect');

p1.setAttribute('x',200);
p1.setAttribute('y',400);
p1.setAttribute('fill','#ffd700');
p1.setAttribute('stroke','#c78201');
p1.setAttribute('width',70);
p1.setAttribute('height',15);

pic.appendChild(p1);

var platforms=[]
platforms.push(p1);
console.log(platforms);
