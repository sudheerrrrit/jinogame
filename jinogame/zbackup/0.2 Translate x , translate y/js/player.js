//PLAYER

//CREATE
    Gravity = 0.9;
var player = body.create(vw(40),vh(50),vw(5),vh(10),10,0,Gravity);
	player.friction = 0.75;
	player.mass = 20;
    step = 1.3;
    jumpForce =1400;

var playerCollideLR = 0;

var tracker = body.create(vw(50),vh(70),vw(5),vh(10),10,0,0);
	tracker.friction = false;


//DRAW
function drawPlayer(){

	//translate background
	transBG();

	

	//texture
	stroke("red");
	player.draw();


	//Physics

	//tracker.draw();

	//update
	player.update();
	//Motion Acceleration
	player.accelerate(move);


	//Colission
	playerCollisions();

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
			//console.log("true");

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
		tx = 1;
		tracker.position.setY(tracker.position.getY()-tx);
		ctx.translate(-move.getX()*1.5,tx);
	}

	}else if(player.position.getY() >= tracker.position.getY() + vh(3)){

	if(playerCollideLR == false){
		tx = -1;
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

			move.setX(-step);

		}
		if(e.keyCode==R){

			move.setX(+step);

		}

	});

	document.addEventListener('keyup', function(e){

		if(e.keyCode==L){
			move.setX(0);
		}
		if(e.keyCode==R){
			move.setX(0);
		}

	});

	//this.accelerate(move);

}


//JUMP on floor
jump(player,floor,jumpForce);

