


//FLOOR

//CREATE
floor = body.create(-vw(50),vh(80),vw(300),vh(3),0,0,0);


//DRAW
function drawEnv(){
	//floor
	stroke("#111");
	floor.draw();


	//WALL START
	for(var i = 0; i<50 ;i+=5){
		gCenter(50,-vw(i),-vh(50),"y");
	}
	/****************************************************************/
//dor start
ctx.drawImage(dopen_mid,vw(0),vh(70));
ctx.drawImage(dopen_top,vw(0),vh(60));
ctx.drawImage(sign_right,vw(40),vh(70));
//sand under door

//WATER
ctx.drawImage(liquidWaterTop,vw(250.5),vh(80),liquidWaterTop.width,liquidWaterTop.height);

blockGen(liquidWaterTop_mid,10,vw(250.5),vh(80),"x");
for(var i = 0; i<50; i+=10){
	blockGen(liquidWater,10,vw(250.5),vh(90+i),"x");
}

///FLOOR
ctx.drawImage(grassLeft,vw(0),vh(80));

//GENERATE FLOOR
blockGen(grassMid,47,vw(5),vh(80),"x");
blockGen(gcenter,48,vw(5),vh(85),"x");
blockGen(gcenter,48,vw(5),vh(95),"x");
blockGen(gcenter,48,vw(5),vh(100),"x");
blockGen(gcenter,48,vw(5),vh(105),"x");
blockGen(gcenter,48,vw(5),vh(110),"x");
blockGen(gcenter,48,vw(5),vh(115),"x");
blockGen(gcenter,48,vw(5),vh(120),"x");
blockGen(gcenter,48,vw(5),vh(125),"x");
blockGen(grassRight,1,vw(245.5),vh(80),"x");



	//ladder
	ctx.drawImage(ladder_top,vw(140),vh(69.5));
	ctx.drawImage(ladder_top,vw(135),vh(69.5));



	//hills
	ctx.drawImage(hill_large,vw(146),vh(58.3));


//WALL END
	for(var i = 0; i<80 ;i+=5){
		gCenter(90, vw(320+i),-vh(90),"y");
	}

	if(player.position.getX()+player.w>=vw(325)){
		player.position.setX(vw(325)-player.w);
	}

//Last door
ctx.drawImage(door_closedTop,vw(320),vh(38),door_closedTop.width,door_closedTop.height);
ctx.drawImage(door_closedMid,vw(320),vh(47),door_closedMid.width,door_closedMid.height);

}


function gCenter(n, x, y, s){

	for(var i = 0; i<n; i++){

		ctx.drawImage(gcenter,x,y);
		
		if(s=="y"){
			
			y+=gcenter.height;		
			
		}else if(s=="x"){
			x+=gcenter.width;
		}
		
	}

}

function blockGen(img, n, x, y, s){

	for(var i = 0; i<n; i++){

		ctx.drawImage(img,x,y);
		
		if(s=="y"){
			
			y+=img.height;		
			
		}else if(s=="x"){
			x+=img.width;
		}
		
	}

}