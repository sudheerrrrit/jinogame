// GAME

//Start translation
ctx.translate(vw(30),vh(3));

loop();

function loop (){
	ctx.clearRect(-vw(100),-vh(100),vw(100)*10,vh(300));


//ASSETS
	drawAssets();

//ENVIRONMENT
	drawEnv();

//BLOCKS
	drawBlocks()

//Enemies
	drawEnemies()

//PLAYER
	drawPlayer();


	requestAnimationFrame(loop);
}
//ctx.rotate(0.05);