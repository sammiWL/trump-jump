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

    for (i = 0; i < 4; i+=2) {
		addPlatform( 91*i, 585 );
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
	    if (checkPlatform() != -1) {
		console.log("I MADE IT GREAT AGAIN");
		up = !up;
		curJump = 0;
	    }
	}
	//console.log(curJump);
    };
    intervalID = window.setInterval( trumpJump, 5 );
};

var addPlatform = function addPlatform(x, y) {
	p = document.createElementNS('http://www.w3.org/2000/svg','rect');
	p.setAttribute('x', x);
	p.setAttribute('y', y);
	p.setAttribute('fill', '#ffd700');
	p.setAttribute('stroke', '#c78201');
	p.setAttribute('width', 70);
	p.setAttribute('height', 15);
	platforms.push(p);
	pic.appendChild(p);
	console.log(platforms);
};

/** Returns index of platform hit, otherwise -1. */
var checkPlatform = function checkPlatform() {
	for (i = 0; i < platforms.length; i++) {
		p = platforms[i];
		rect = pic.createSVGRect();
		rect.x = parseInt(p.getAttribute('x')) + 30;
		rect.y = parseInt(p.getAttribute('y')) + 10;
		rect.height = 15;
		rect.width = 20;
		if ( pic.checkIntersection(trump, rect) ) { 
			return i;
		}
	}
	return -1;
};

	
var movePlatforms = function movePlatforms() {
    
};

setup();
