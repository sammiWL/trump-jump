console.log('ayy');

var PICWIDTH = 342;
var PICHEIGHT = 600;
var PWIDTH = 70;
var PHEIGHT = 15;
var TWIDTH = 80;
var THEIGHT = 80;

var pic = document.getElementById('america');
var offsetTop = pic.getBoundingClientRect().top - document.body.getBoundingClientRect().top;
var offsetLeft = pic.getBoundingClientRect().left - document.body.getBoundingClientRect().left;
var trump = document.getElementById('trump');
//var score = document.getElementById('score');
var platforms = [];
var rectA = [];

var intervalID;

var setup = function setup(e) {
    clearInterval(intervalID);
    var score = document.getElementById('score');
    score.innerHTML = 0;
    var scoreNum = 0;
    
    var up = false;
    var trumpX = 200;//pic.width.baseVal.value / 2;
    var trumpY = 300;//pic.height.baseVal.value / 2;
    var jumpLimit = 110;
    var curJump = 0;
    var down = 0;
    
    pic.addEventListener('mousemove', function (e) {
	trumpX = e.clientX - 55;
    });
    
    /*
	for (i = 1; i < 2; i++) {
	for (j = 0; j < 1; j++) {
	addPlatform( 91*i, 585 - (j * 150) );
	}
	}*/
    popPlatforms(4);
    
    var trumpJump = function trumpJump() {
	trump.setAttribute('x', trumpX);
	trump.setAttribute('y', trumpY);

	if ( up ) {
	    if (trumpY>-10) {
		trumpY -= 2;
		curJump += 1;
	    } else {
		up=!up;
	    }
	}
	else trumpY += 1;
	 
	

	//if ( curJump >= jumpLimit || trumpY < 200) { up = false; }
	if ( curJump >= jumpLimit) { up = false; }

	if ( trumpY > pic.height.baseVal.value ) {
	    console.log("Game Over");
	    clearInterval(intervalID);
	    clearInterval(intervalID2);
	    clearInterval(intervalID3);
	    var g=document.createElementNS('http://www.w3.org/2000/svg','image');
	    g.setAttribute('height',PICHEIGHT);
	    g.setAttribute('width',PICWIDTH);
	    g.setAttribute('x',0);
	    g.setAttribute('y',0);
	    g.setAttributeNS('http://www.w3.org/1999/xlink','href','game_over.png');
	    pic.appendChild(g);
	}

	if (!up) {
	    var cp = checkPlatform();
	    if (cp != -1) {
		
		up = !up;
		curJump = 0;
		//console.log("CHANGE " + (550 - trumpY));
		console.log("TRUMPY " + (565 - trumpY));
		scoreNum = parseInt(score.innerHTML);
		score.innerHTML = scoreNum + 560 - trumpY;
		//move_platforms((400 - trumpY));
		down = 0;
		console.log(down);
		clean_platforms();
		
		/*create_platforms();
		 */
	    }

	}
	
	//create_platforms();
	//console.log(curJump);
    };
    intervalID = window.setInterval( trumpJump, 1 );
    intervalID2= window.setInterval( slide_plats, 20);
    intervalID3= window.setInterval( gen_plats, 500);
};

var addPlatform = function addPlatform(x, y) {
    p = document.createElementNS('http://www.w3.org/2000/svg','rect');
    p.setAttribute('x', x);
    p.setAttribute('y', y);
    p.setAttribute('fill', '#ffd700');
    p.setAttribute('stroke', '#c78201');
    p.setAttribute('width', PWIDTH);
    p.setAttribute('height', PHEIGHT);
    platforms.push(p);
    pic.appendChild(p);
    //console.log(platforms);
    rect = pic.createSVGRect();
    rect.x = x + 30 ;
    rect.y = y + 10;
    rect.height = 15;
    rect.width = 20;
    rectA.push(rect);
    console.log(rectA);
};

var popPlatforms = function popPlatforms(n) {
    for (i = 0; i < n; i++) {
	x = Math.random() * (PICWIDTH - PWIDTH); 
	y = PICHEIGHT/4 * (i + Math.random());
	addPlatform(x, y);
    }
};

/** Returns index of platform hit, otherwise -1. */
var checkPlatform = function checkPlatform() {
    for (i = 0; i < platforms.length; i++) {
	p = platforms[i];
	rect = pic.createSVGRect();
	rect.x = parseInt(p.getAttribute('x')) + offsetLeft + 0.1 * TWIDTH;
	rect.y = parseInt(p.getAttribute('y')) + offsetTop;
	rect.height = 4;
	rect.width = 20;
	if ( pic.checkIntersection(trump, rect) ) { 
	    return i;
	}
    }
    return -1;
};


var movePlatforms = function movePlatforms() {
    
};


var create_platforms = function create_platform() {
    var x, y, p, i;
    var hidden = false;
    var count = 0;
    var currentY = 0;

    //checks if there platforms hidden that are ready to move down
    while (count < platforms.length) {
	currentY = parseInt(platforms[count].getAttribute('y'));
	hidden = hidden || (currentY < 0);
	if (hidden) break;
	count++;
    }

    var random = Math.floor(Math.random() * 2) + 1;

    //if there are no hidden platforms then a random number will be created
    if (!hidden) {
	count = 0;
	while (count < random) {
	    console.log(i);
	    x = Math.floor(Math.random() * 300);
	    y = Math.floor(Math.random() * 80 - 80);

	    addPlatform(x,y);
	    count++;
	}
    }
}

var move_platforms = function move_platforms(changeY) {
    var count = 0;
    var prevY = 0;
    if (changeY > 70) {
	while (count < platforms.length) {
	    prevY = parseInt(platforms[count].getAttribute('y'));
	    platforms[count].setAttribute('y', prevY + changeY);
	    rectA[count].y = prevY + changeY + 10;
	count++;
	}
    }
}

var slide_plats = function slide_plats() {
    var pY=0;
    for (i=0;i<platforms.length;i++) {
	pY=parseInt(platforms[i].getAttribute('y'));
	platforms[i].setAttribute('y', pY+1);
	rectA[i].y=pY+1;
    }
    console.log('slide');
    //gen_plats();
    console.log('post gen');
}

var gen_plats = function gen_plats() {
    var chance=Math.floor(Math.random()*10);
    console.log(chance);
    if (chance<3) {
	x = Math.floor(Math.random() * 300);
	y = Math.floor(Math.random() * 80 - 80);

	addPlatform(x,y);
	console.log('gen');
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
