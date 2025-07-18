//PLAYER

//CREATE
    Gravity = 0.5;
var player = body.create(vw(50),vh(50),vw(5),vh(10),10,0,Gravity);
	player.friction = 0.9;
	player.mass = 20;
    step = 0.5;
    jumpForce = 300;


//DRAW
function drawPlayer(){
	//texture
	stroke("red");
	player.draw();


	//Physics



	//update
	player.update();
	//Motion Acceleration
	player.accelerate(move);


	//Colission
	playerCollisions();

}


//PHYSICS
function playerCollisions(){

	player.setRectCollision(floor);

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

