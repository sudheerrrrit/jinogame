//PLAYER
 pstand = new Image();
 pstand.src = 'assets/platform/base/Player/p2/p2_stand.png';
 //stand left
 pstandL = new Image();
 pstandL.src = 'assets/platform/base/Player/p2/p2_stand_left.png';
 //duck
 pduck = new Image();
 pduck.src = 'assets/platform/base/Player/p2/p2_duck.png';
 //duck left
 pduckL = new Image();
 pduckL.src = 'assets/platform/base/Player/p2/p2_duck_left.png';

 pjump = new Image();
 pjump.src = 'assets/platform/base/Player/p2/p2_jump.png';

//CREATE
    Gravity = 2;
var player = body.create(vw(0),vh(50),vw(3),vh(13),10,0,Gravity);
	player.friction = 0.75;
	player.mass = 20;
	jumpForce =2200;
	dir = "R";
	player.life = 3;
	player.key = 0;
	arrayLife = [];
	var plife = "";

pStatus = "stand";

//load sprite
	var psrc = 'assets/platform/base/Player/p2/p2_walk.png';
	var psprite = new SpriteSheet(psrc,70,94,1.5,11);
//left
	var p2_walk_left = 'assets/platform/base/Player/p2/p2_walk_left.png';
	var p2_walk_left = new SpriteSheet(p2_walk_left,70,94,1.5,11);

//ON MOBILE
	if(window.innerWidth <= 765 ){
    
    step = 0.9;
   
   }
//ON LARGER
   else{
  
   	step = 2.1;
  
   }
/*********************************************************/

//SPRITE SHEET
player_sprite = document.getElementById("player");
//set size
player_sprite.style.width = vw(6);
player_sprite.style.height = vh(12);
//set position




var playerCollideLR = 0;

//TRACKER
var tracker = body.create(vw(50),vh(61),vw(5),vh(10),10,0,0);
	tracker.friction = false;


//DRAW
var count = vw(0);
function drawPlayer(){
	//console.log(player.position.getX());
	//translate background
	transBG();

	//sprite
	
	//draw life
	//ctx.drawImage(hud_heartFull,player.position.getX()-vw(30),vh(5),hud_heartFull.width,hud_heartFull.height);

	//texture
	stroke("red");
	//player.draw();
	//update sprite
	//updateSprite();
	spriteShift();

	//Physics

	//tracker.draw();

	//update
	player.update();
	//Motion Acceleration
	player.accelerate(move);

	

	//Colission
	playerCollisions();




//FALLEN DOWN
offsetBottom();


//STOP TRANS ON COLLIDE
StopTransOnCollide();

//PLAYER hited
slimHitPlayer();
flyHitPlayer();

//GAME OVER
gameOver();

//WINNING
youWin();

}



//PLAYER LIFE
for(var i=0; i<player.life; i++){		
	arrayLife[i] = new playerLife(i);
}

function playerLife(i){
	plife = document.getElementById('plife');
	life = document.createElement('div');
	life.id = "life"+(i+1)+"";
	

	//append life

		plife.appendChild(life);
		life.style.margin = "5px "+(40*i)+"px";

		this.target = document.getElementById("life"+(i+1)+"");
}

//SPRITE

function spriteShift(){

	if(pStatus=="stand"){
	
		ctx.drawImage(pstand,player.position.getX()-vw(1),player.position.getY(),player.w+vw(2),player.h);

	}

	if(pStatus == "stand_left"){

		ctx.drawImage(pstandL,player.position.getX()-vw(1),player.position.getY(),player.w+vw(2),player.h);

	}

	if(pStatus == "duck"){

		ctx.drawImage(pduck,player.position.getX()-vw(1),player.position.getY(),player.w+vw(2),player.h);

	}

	if(pStatus == "duck_left"){

		ctx.drawImage(pduckL,player.position.getX()-vw(1),player.position.getY(),player.w+vw(2),player.h);

	}

	if(pStatus=="walk"){
		psprite.update();
		psprite.draw(player.position.getX()-vw(1),player.position.getY()-vh(0.9));
	}

	if(pStatus == "walk_left"){

		p2_walk_left.update();
		p2_walk_left.draw(player.position.getX()-vw(1),player.position.getY()-vh(0.9));
	}

}

function updateSprite(){

	player_sprite.style.left = vw(30)+vw(3.6);
	player_sprite.style.top = player.position.getY()+vh(5.5);
}



//PHYSICS
function playerCollisions(){
	
	//FLOOR
	player.setRectCollision(floor);

	//BLOCKS
	for(var i = 0; i<block.length; i++){

		player.setRectCollision(block[i]);

		//CHECK LRCollision
		if(player.leftCollide(block[i]) || player.rightCollide(block[i])){

			playerCollideLR = true;
			console.log("true");

		}else{

			playerCollideLR = false;

		}



	}
}

//TRANSLATE BG SIDE
function transBG(){

	//LR
	if(playerCollideLR == false){
		ctx.translate(-move.getX()*1.5,move.getY());

	}



	track();
	
	//Track translation y
tx = 0;
function track(){


	if(player.position.getY() <= tracker.position.getY()){			

	if(playerCollideLR == false){
		tx = 9.5;
		tracker.position.setY(tracker.position.getY()-tx);
		ctx.translate(-move.getX()*1.5,tx);
	}

	}else if(player.position.getY() >= tracker.position.getY() + vh(3)){

	if(playerCollideLR == false){
		tx = -9.5;
		tracker.position.setY(tracker.position.getY()-tx);
		ctx.translate(-move.getX()*1.5,tx);
	}


	}else{

	if(playerCollideLR == false){
		tx=0;
		tracker.position.setY(tracker.position.getY()-tx);
		ctx.translate(-move.getX()*1.5,tx);
	}

	}

}

} 



//MOTION
MotionLR(37,39);
function MotionLR (L, R){

	document.addEventListener('keydown', function(e){

		if(e.keyCode==L){
			dir = "L";
			pStatus = "walk_left";
			move.setX(-step);

		}
		if(e.keyCode==R  && player.position.getX()<=vw(320)){
			dir = "R";
			pStatus = "walk";
			move.setX(+step);


		}

	});

	document.addEventListener('keyup', function(e){

		if(e.keyCode==L){
			move.setX(0);
			pStatus = "stand_left";
		}
		if(e.keyCode==R){
			move.setX(0);
			pStatus = "stand";
		}

	});

	//this.accelerate(move);

}

//DUCKING
Duck(40);
function Duck(d){
	document.addEventListener('keydown', function(e){

		if(e.keyCode==d){
			
			if(dir=="R"){
				pStatus = "duck";
			}else{
				pStatus = "duck_left";
			}

			player.h = vh(11);

		}
	});	

	document.addEventListener('keyup', function(e){

		if(e.keyCode==d){

			if(dir=="R"){
				
				pStatus = "stand";
			
			}else{

				pStatus = "stand_left";

			}


			player.h = vh(13);

		}
	});		
}



//JUMP ON BLOCKS
jump(player,floor,jumpForce);
for(var i = 0; i<block.length;i++){
	jump(player,block[i],jumpForce);
}





//GAME OVER REPOSITIONNING

function offsetBottom(){

	if(player.position.getY()>=Height){
		
		player.position.setY(vh(60));
		player.position.setX(player.position.getX()-vw(30));
		ctx.translate(vw(28),0);
	}


}


//PLAYER COLLIDE SLIM
function slimHitPlayer(){

	for(var i =0; i<slime.length; i++){

		if(player.leftCollide(slime[i]) || player.rightCollide(slime[i])){

			player.position.setY(player.position.getY()-vw(2));
			
				player.life--;

				if(player.life>=0){
					arrayLife[player.life].target.style.display = "none";
				}
		}

	}


}

//PLAYER COLLIDE fly
function flyHitPlayer(){

	for(var i =0; i<fly.length; i++){

		if(player.leftCollide(fly[i]) || player.rightCollide(fly[i])){

			player.position.setY(player.position.getY()-vw(2));
			
				player.life--;

				if(player.life>=0){
					arrayLife[player.life].target.style.display = "none";
				}
		}

	}


}

function gameOver(){
	if(player.life<=0 || player.position.getY()>=vh(95)){
		document.location.assign("index.html");
	}
}

function youWin(){

	if(player.key>=3 && player.position.getX()>=vw(320)){
		alert("you win");
	}

}














































function StopTransOnCollide(){


if(player.leftCollide(block[0]) || player.rightCollide(block[0])){

			playerCollideLR = true;

		}
else if(player.leftCollide(block[1]) || player.rightCollide(block[1])){

			playerCollideLR = true;

		}

else if(player.leftCollide(block[2]) || player.rightCollide(block[2])){

			playerCollideLR = true;

		}

else if(player.leftCollide(block[3]) || player.rightCollide(block[3])){

			playerCollideLR = true;

		}
else if(player.leftCollide(block[4]) || player.rightCollide(block[4])){

			playerCollideLR = true;

		}
else if(player.leftCollide(block[5]) || player.rightCollide(block[5])){

			playerCollideLR = true;

		}
else if(player.leftCollide(block[6]) || player.rightCollide(block[6])){

			playerCollideLR = true;

		}
else if(player.leftCollide(block[7]) || player.rightCollide(block[7])){

			playerCollideLR = true;

		}
else if(player.leftCollide(block[8]) || player.rightCollide(block[8])){

			playerCollideLR = true;

		}		
		else{

			playerCollideLR = false;

		}

}