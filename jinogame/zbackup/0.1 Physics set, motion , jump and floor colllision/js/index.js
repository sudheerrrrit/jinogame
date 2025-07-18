// GAME



loop();

function loop (){
	ctx.clearRect(-vw(100),-vh(10),vw(100)*5,vh(100)*2);

//ENVIRONMENT
	drawEnv();



//PLAYER
	drawPlayer();




	requestAnimationFrame(loop);
}