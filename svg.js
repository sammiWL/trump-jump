console.log('ayy');

var PICWIDTH = 342;
var PICHEIGHT = 600;
var PWIDTH = 70;
var PHEIGHT = 15;
var TWIDTH = 80;
var THEIGHT = 80;

var pic = document.getElementById('america');
var reset = document.getElementById('setup');
//var score = document.getElementById('score');
var platforms = [];
var rectA = [];

var intervalID, intervalID2, intervalID3;

var setup = function setup(e) {
    var startTime = getCurrentTime();
    var score = document.getElementById('score');
    score.innerHTML = 0;
    var scoreNum = 0;
    
    var up = false;
    var trumpX = 160;//pic.width.baseVal.value / 2;
    var trumpY = 0;//pic.height.baseVal.value / 2;
    var jumpLimit = 110;
    var curJump = 0;
    var down = 0;


    genFlag();
    var trump = genTrump();
    var trumpChin = genTrumpChin();
    
    pic.addEventListener('mousemove', function (e) {
	trumpX = e.clientX - 68;
    });
    
    popPlatforms(4);
    
    var trumpJump = function trumpJump() {
	trump.setAttribute('x', trumpX);
	trump.setAttribute('y', trumpY);
	trumpChin.setAttribute("x", trumpX + 35); 
	trumpChin.setAttribute("y", trumpY + 55);
	
	if ( up ) {
	    if (trumpY>-10) {
		trumpY -= 2;
		curJump += 1;
	    } else {
		up=!up;
	    }
	}
	else trumpY += 1;
	 
	if ( curJump >= jumpLimit) { up = false; }

	if ( trumpY > pic.height.baseVal.value ) {
	    console.log("Game Over");
	    clearLoops();
	    genGameOver();
	}

	if (!up) {
	    if (checkPlatforms(trumpChin)) {
		up = !up;
		curJump = 0;		
		clean_platforms(PICHEIGHT);	
	    }
	}

	scoreNum = Math.floor((getCurrentTime() - startTime) / 100);
	score.innerHTML = scoreNum;
    };
    
    intervalID  = window.setInterval( trumpJump, 1);
    intervalID2 = window.setInterval( slide_plats, 10);
    intervalID3 = window.setInterval( gen_plats, 300);
};

var start = function start() {
    clearLoops();
    clean_platforms(0);
    pic.innerHTML = '';
    platforms = [];
    rectA = [];
    setup();
}

var getCurrentTime = function getCurrentTime() {
    var time = new Date();
    return time.getTime();
}

var genFlag = function genFlag() {
    var flag = document.createElementNS("http://www.w3.org/2000/svg", 'image');
    flag.setAttribute("height", 650);
    flag.setAttribute("width", 400);
    flag.setAttribute("x", -29);
    flag.setAttribute("y", 0);
    flag.setAttributeNS('http://www.w3.org/1999/xlink','href','flag.svg');
    pic.appendChild(flag);
}

var genTrump = function genTrump() {
    var trump = document.createElementNS("http://www.w3.org/2000/svg", 'image');
    trump.setAttribute("height", 80);
    trump.setAttribute("width", 80);
    trump.setAttributeNS('http://www.w3.org/1999/xlink','href','mini-trump.png');
    pic.appendChild(trump);
    return trump;
}

var genTrumpChin = function genTrumpChin() {
    var trumpChin = document.createElementNS("http://www.w3.org/2000/svg", "rect");
    trumpChin.setAttribute("x", 196); 
    trumpChin.setAttribute("y", 35);
    trumpChin.setAttribute("fill-opacity", 0);
    trumpChin.setAttribute("width","10");
    trumpChin.setAttribute("height","10");
    pic.appendChild(trumpChin);

    return trumpChin;
}

var genGameOver = function genGameOver() {
    var g=document.createElementNS('http://www.w3.org/2000/svg','image');
    g.setAttribute('height',PICHEIGHT);
    g.setAttribute('width',PICWIDTH);
    g.setAttribute('x',0);
    g.setAttribute('y',0);
    g.setAttributeNS('http://www.w3.org/1999/xlink','href','game_over.png');
    pic.appendChild(g);
}

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

    rect = pic.createSVGRect();
    rect.x = x;
    rect.y = y + 10;
    rect.height = 1;
    rect.width = PWIDTH;
    rectA.push(rect);

};

var clearLoops = function clearLoops() {
    clearInterval(intervalID);
    clearInterval(intervalID2);
    clearInterval(intervalID3);
}

var popPlatforms = function popPlatforms(n) {
    for (i = 0; i < n; i++) {
	x = Math.random() * (PICWIDTH - PWIDTH); 
	y = (PICHEIGHT/4 * (i + Math.random()) - 50);
	addPlatform(x, y);
    }
};

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
	rectA[i].y += 1;
    }
}

var gen_plats = function gen_plats() {
    var count = 0;
    var hidden = false;
    
    while (count < platforms.length) {
	currentY = parseInt(platforms[count].getAttribute('y'));
	hidden = hidden || (currentY < 0);
	if (hidden) break;
	count++;
    }
    
    if (!hidden) {
	x = Math.floor(Math.random() * 300);
	y = Math.floor(Math.random() * 50 - 110);
	addPlatform(x,y);
	console.log('gen');
    }
}

var clean_platforms = function clean_platforms(maxY) {
    var count = 0;
    var currentY = 0;
    while (count < platforms.length) {
	currentY = parseInt(platforms[count].getAttribute('y'));
	console.log(currentY);
	if (currentY > maxY) {
	    console.log(platforms[count]);
	    if (pic.hasChildNodes()) {
		pic.removeChild(platforms[count]);
	    }
	    platforms.shift();
	    rectA.shift();
	}
	else break;
    }
}

var checkPlatforms = function checkPlatforms(chin) {
    var count = 0;
    while (count < rectA.length) {
	if (pic.checkIntersection(chin, rectA[count])) return true;
	count++;
    }
    return false; 
}

setup();
reset.addEventListener('click',start);
