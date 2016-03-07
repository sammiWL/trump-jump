console.log('ayy');

var pic=document.getElementById('america');
var trump = document.getElementById('trump');
var score = document.getElementById('score');

var intervalID;

var setup = function setup() {
	clearInterval(intervalID);
	score.innerHTML = '0';

	var scoreNum = 0;

	var up = true;
	var trumpX = pic.width.baseVal.value / 2;
	var trumpY = pic.height.baseVal.value / 2;
	var jumpLimit = 150;
	var curJump = 0;

	var trumpJump = function trumpJump() {
		trump.setAttribute('x', trumpX);
		trump.setAttribute('y', trumpY);

		if ( up ) { trumpY -= 1; curJump += 1 }
		else { trumpY += 1 }

		if ( curJump >= jumpLimit ) { up = false; }

		if ( trumpY > pic.height.baseVal.value ) { console.log("Game Over") }

		//document.onmousemove {}

	}
	intervalID = window.setInterval( trumpJump, 5 );
};

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

setup();
