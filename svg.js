console.log('ayy');

var pic=document.getElementById('america');
var trump = document.getElementById('trump');
var score = document.getElementById('score');
var rectA = [];
var platforms = [];

var intervalID;

var setup = function setup(e) {
    clearInterval(intervalID);
    score.innerHTML = '0';
    
    var scoreNum = 0;

    var up = false;
    var trumpX = 200;//pic.width.baseVal.value / 2;
    var trumpY = 400;//pic.height.baseVal.value / 2;
    var jumpLimit = 180;
    var curJump = 0;

    pic.addEventListener('mousemove', function (e) {
	trumpX = e.clientX - 55;
    });
    var p1, i;

    for (i = 0; i < 4; i++) {
	p1=document.createElementNS('http://www.w3.org/2000/svg','rect');
	console.log(i);
	p1.setAttribute('x',91 * i);
	p1.setAttribute('y',585);
	p1.setAttribute('fill','#ffd700');
	p1.setAttribute('stroke','#c78201');
	p1.setAttribute('width',70);
	p1.setAttribute('height',15);
	platforms.push(p1);
	pic.appendChild(p1);
	console.log(platforms);
	rect = pic.createSVGRect();
	rect.x = 91 * i + 30 ;
	rect.y = 585 + 10;
	rect.height = 15;
	rect.width = 20;
	rectA.push(rect);
	console.log(rectA);
    }
   
			   
    var trumpJump = function trumpJump() {
	
	trump.setAttribute('x', trumpX);
	trump.setAttribute('y', trumpY);

	if ( up ) {
	    trumpY -= 1;
	    curJump += 1;
	}
	else { trumpY += 1 }

	if ( curJump >= jumpLimit ) { up = false; }

	if ( trumpY > pic.height.baseVal.value ) {
	    console.log("Game Over");
	    clearInterval(intervalID);
	}

	if (!up) {
	    if (check_platform()) {
		console.log("I MADE IT GREAT AGAIN");
		up=!up;
		curJump=0;
	    }
	}
	//console.log(curJump);
    }
    intervalID = window.setInterval( trumpJump, 5 );

};

var check_platform = function check_platform() {
    var count = 0;
    var	on = false;
    //console.log("HI");
    while (count < rectA.length) {
	on = on || (pic.checkIntersection(trump, rectA[count]));
	//console.log(on);
	count++;
    }
    return on;
}

var move_platforms = function move_platforms() {
    
}

setup();
