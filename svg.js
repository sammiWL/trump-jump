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
    var p, i, j;

    for (i = 0; i < 4; i++) {
	for (j = 0; j < 4; j++) {
	    p = document.createElementNS('http://www.w3.org/2000/svg','rect');
	    console.log(i);
	    p.setAttribute('x',91 * i);
	    p.setAttribute('y',585 - (j * 150));
	    p.setAttribute('fill','#ffd700');
	    p.setAttribute('stroke','#c78201');
	    p.setAttribute('width',70);
	    p.setAttribute('height',15);
	    platforms.push(p);
	    pic.appendChild(p);
	    console.log(platforms);
	    rect = pic.createSVGRect();
	    rect.x = 91 * i + 30 ;
	    rect.y = 585 + 10 - (j * 100);
	    rect.height = 15;
	    rect.width = 20;
	    rectA.push(rect);
	    console.log(rectA);
	}
    }
   
			   
    var trumpJump = function trumpxJump() {
	
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
	    var change = check_platforms();
	    console.log(change + "CHANGE");
	    if (change > 0) {
		console.log("I MADE IT GREAT AGAIN");
		up=!up;
		curJump=0;
		move_platforms(change);
		clean_platforms();
		create_platforms();
	    }

	    //create_platforms();
	}

	//console.log(curJump);
    }
    intervalID = window.setInterval( trumpJump, 5 );
    
};

var create_platforms = function create_platform() {
    var x, y, p, i;
    var anyless50 = false;
    var count = 0;
    var currentY = 0;
    while (count < platforms.length) {
	currentY = parseInt(platforms[count].getAttribute('y'));
	console.log(currentY);
	console.log("WHYYY");
	//console.log(currentY);
	anyless50 = anyless50 || (currentY < 50);
	if (anyless50) break;
	count++;
    }

    if (!anyless50) {
	p=document.createElementNS('http://www.w3.org/2000/svg','rect');
	console.log(i);
	x = Math.floor(Math.random() * 330);
	y = Math.floor(Math.random() * 50) - 50;
	p.setAttribute('x',x);
	p.setAttribute('y',y);
	p.setAttribute('fill','#ffd700');
	p.setAttribute('stroke','#c78201');
	p.setAttribute('width',70);
	p.setAttribute('height',15);
	platforms.push(p);
	pic.appendChild(p);
	console.log(platforms);
	rect = pic.createSVGRect();
	rect.x = x + 30 ;
	rect.y = y + 10;
	rect.height = 15;
	rect.width = 20;
	rectA.push(rect);
	console.log(rectA);
    }
}

var check_platforms = function check_platforms() {
    var count = 0;
    var	change = 0;
    
    //console.log("HI");
    while (count < rectA.length) {
	if (pic.checkIntersection(trump, rectA[count])) {
	    change = parseInt(platforms[count].getAttribute('y'));
	    break;
	}
	//console.log(on);
	count++;
    }
    console.log(change + "THIS IS THE CHANGE");
    return change;
}

var move_platforms = function move_platforms(changeY) {
    var count = 0;
    var prevY = 0;
    while (count < platforms.length) {
	prevY = parseInt(platforms[count].getAttribute('y'));
	//console.log(prevY + changeY);
	platforms[count].setAttribute('y', prevY + changeY);
	//console.log(platforms);
	rectA[count].y = prevY + changeY + 10;
	count++;
    }
}

var clean_platforms = function clean_platforms() {
    var count = 0;
    var currentY = 0;
    while (count < platforms.length) {
	currentY = parseInt(platforms[count].getAttribute('y'));
	console.log(currentY);
	if (currentY > 600) {
	    platforms.shift();
	    rectA.shift();
	    console.log(platforms);
	}
	else {
	    break;
	}
	
    }
}

setup();
