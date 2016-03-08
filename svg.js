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
    /*var trumpChin = pic.createSVGRect();
    trumpChin.x = trumpX + 93; 
    trumpChin.y = trumpY + 135;
    trumpChin.height = 30;
    trumpChin.width = 60;*/

    var trumpChin = document.createElementNS("http://www.w3.org/2000/svg", "rect");
    trumpChin.setAttribute("x", trumpX + 35); 
    trumpChin.setAttribute("y", trumpY + 35);
    //trumpChin.setAttribute("fill", "black");
    //trumpChin.setAttribute("stroke", "red");
    trumpChin.setAttribute("fill-opacity", 0);
    trumpChin.setAttribute("width","10");
    trumpChin.setAttribute("height","10");
    //img.setAttribute("xlink:href","dvd.jpg");
    pic.appendChild(trumpChin);

    
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
	trumpChin.setAttribute("x", trumpX + 35); 
	trumpChin.setAttribute("y", trumpY + 55);
	/*trumpChin.x =  + 30 ;
	trumpChin.y = y + 10;
	trumpChin.height = 1;
	trumpChin.width = 20;*/
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
	    //var cp = checkPlatform(trumpChin);
	    //if (cp != -1) {
	    if (check_platforms(trumpChin)) {
		up = !up;
		curJump = 0;
		console.log(trumpX);
		scoreNum = parseInt(score.innerHTML);
		score.innerHTML = scoreNum + 560 - trumpY;
		//move_platforms(1);
		
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
    rect.x = x;
    rect.y = y + 10;
    rect.height = 1;
    rect.width = PWIDTH;
    rectA.push(rect);
    //console.log(rectA);
};

var popPlatforms = function popPlatforms(n) {
    for (i = 0; i < n; i++) {
	x = Math.random() * (PICWIDTH - PWIDTH); 
	y = PICHEIGHT/4 * (i + Math.random());
	addPlatform(x, y);
    }
};

/** Returns index of platform hit, otherwise -1. */
/*var checkPlatform = function checkPlatform(thing) {
    for (i = 0; i < platforms.length; i++) {
	p = platforms[i];
	rect = pic.createSVGRect();
	rect.x = parseInt(p.getAttribute('x')) + offsetLeft + 0.1 * TWIDTH;
	rect.y = parseInt(p.getAttribute('y')) + offsetTop;
	rect.height = 4;
	rect.width = 20;
	if ( pic.checkIntersection(thing, rect) ) { 
	    return i;
	}
    }
    return -1;
};*/


var movePlatforms = function movePlatforms() {
    
};


/*var create_platforms = function create_platform() {
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
}*/

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
    console.log('slide');
    //gen_plats();
    console.log('post gen');
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
    
    //var chance=Math.floor(Math.random()*10);
    //console.log(chance);
    if (!hidden) {//chance<3) {
	x = Math.floor(Math.random() * 300);
	y = Math.floor(Math.random() * 110 - 110);

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

var check_platforms = function check_platforms(chin) {
    var count = 0;
    //console.log("HI");
    while (count < rectA.length) {
	
	if (pic.checkIntersection(chin, rectA[count])) {
	    //change = parseInt(platforms[count].getAttribute('y'))
	    //break;
	    return true;
	}
	//console.log(on);
	count++;
    }
    //console.log(change + "THIS IS THE CHANGE");
    return false; 
}

setup();
