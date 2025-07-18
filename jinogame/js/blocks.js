//prepare var
	var countGoldCol = 0;


//BLOCKS
//CREATE
var block = [];
	
	//GENERATE

var  startWall = block[0] = body.create(-vw(5),-vh(10),vw(5),vh(100),0,0,0);

var  UB1_a = block[1] = body.create(vw(60),vh(47),vw(15),vw(5),0,0,0);
var  UB1_b = block[2] = body.create(vw(65),vh(5),vw(5),vw(5),0,0,0);
var  UB1_c = block[3] = body.create(vw(90),vh(56),vw(5),vw(5),0,0,0); 

var  UB2_a = block[4] = body.create(vw(120),vh(56),vw(25),vw(5),0,0,0);
var  UB2_b = block[5] = body.create(vw(150),vh(36),vw(25),vw(5),0,0,0);

//sino updown
var sinolr1 = block[6] = body.create(vw(250),vh(56),vw(10),vw(5),0,0,0);
var sinolr2 = block[7] = body.create(vw(278),vh(36),vw(10),vw(5),0,0,0);

//ub3
var  UB3_a = block[8] = body.create(vw(300),vh(56),vw(25),vw(55),0,0,0);
var  UB3_b = block[9] = body.create(vw(345),vh(40),vw(25),vw(55),0,0,0);
//var  UB3_c = block[10] = body.create(vw(325),vh(0),vw(25),vw(55),0,0,0);


//COINS
var coin = [];
	coin.push(body.create(vw(50),vh(70),coinBronze.width,coinBronze.height,0,0,0));
	coin.push(body.create(vw(55),vh(70),coinBronze.width,coinBronze.height,0,0,0));
	coin.push(body.create(vw(60),vh(70),coinBronze.width,coinBronze.height,0,0,0));
	//C2
	coin.push(body.create(vw(120),vh(45),coinBronze.width,coinBronze.height,0,0,0));
	coin.push(body.create(vw(125),vh(45),coinBronze.width,coinBronze.height,0,0,0));
	coin.push(body.create(vw(130),vh(45),coinBronze.width,coinBronze.height,0,0,0));
	coin.push(body.create(vw(135),vh(45),coinBronze.width,coinBronze.height,0,0,0));
	coin.push(body.create(vw(140),vh(45),coinBronze.width,coinBronze.height,0,0,0));
	//c3
	coin.push(body.create(vw(150),vh(26),coinBronze.width,coinBronze.height,0,0,0));
	coin.push(body.create(vw(155),vh(26),coinBronze.width,coinBronze.height,0,0,0));
	coin.push(body.create(vw(160),vh(26),coinBronze.width,coinBronze.height,0,0,0));
	coin.push(body.create(vw(165),vh(26),coinBronze.width,coinBronze.height,0,0,0));
	coin.push(body.create(vw(170),vh(26),coinBronze.width,coinBronze.height,0,0,0));
	//c3
		coin.push(body.create(vw(190),vh(70),coinBronze.width,coinBronze.height,0,0,0));
	coin.push(body.create(vw(195),vh(70),coinBronze.width,coinBronze.height,0,0,0));
	coin.push(body.create(vw(200),vh(70),coinBronze.width,coinBronze.height,0,0,0));
	coin.push(body.create(vw(205),vh(70),coinBronze.width,coinBronze.height,0,0,0));
	coin.push(body.create(vw(210),vh(70),coinBronze.width,coinBronze.height,0,0,0));

	coin.push(body.create(vw(255),vh(10),coinBronze.width,coinBronze.height,0,0,0));
	coin.push(body.create(vw(260),vh(10),coinBronze.width,coinBronze.height,0,0,0));

//Keys
var key = [];
	key.push(body.create(vw(42),vh(30),keyGreen.width,keyGreen.height,0,0,0));
	key.push(body.create(vw(190),vh(15),keyGreen.width,keyGreen.height,0,0,0));
	key.push(body.create(vw(300),vh(10),keyGreen.width,keyGreen.height,0,0,0));


//HUD
var hud = [];
	hud.push(body.create(vw(150),vh(70),hud_gem_yellow.width,hud_gem_yellow.height,0,0,0));



function drawBlocks(){
	//drawBlocks
	for(var i=0;i<block.length;i++){
		stroke("red");
		//block[i].draw();
	}

	//draw Keys
	for(var i=0;i<key.length;i++){
		key[i].draw();
	}

//BUP1
	blockGen(boxAlt,1,vw(60),vh(47),"x");
	blockGen(boxAlt,1,vw(65),vh(47),"x");
	blockGen(boxAlt,1,vw(70),vh(47),"x");

	blockGen(boxAlt,5,vw(119.6),vh(56),"x");
	blockGen(boxAlt,5,vw(149.6),vh(36),"x");

	//
	blockGen(boxCoin,1,vw(65),vh(5),"x");
	//
	blockGen(box,1,vw(90),vh(56),"x");


	//sinolr1
	blockGen(grass,2,sinolr1.position.getX(),sinolr1.position.getY(),"x");
	blockGen(grass,2,sinolr2.position.getX(),sinolr2.position.getY(),"x");

	//gen block2
	blockGen(grassRight,5,vw(300),vh(56),"x");
	blockGen(gcenter,5,vw(300),vh(61),"x");
	blockGen(gcenter,5,vw(300),vh(66),"x");
	blockGen(gcenter,5,vw(300),vh(71),"x");
	blockGen(gcenter,5,vw(300),vh(76),"x");
	blockGen(gcenter,5,vw(300),vh(81),"x");
	blockGen(gcenter,5,vw(300),vh(86),"x");
	blockGen(gcenter,5,vw(300),vh(91),"x");
	blockGen(gcenter,5,vw(300),vh(96),"x");
	blockGen(gcenter,5,vw(300),vh(101),"x");
	blockGen(gcenter,5,vw(300),vh(106),"x");
	blockGen(gcenter,5,vw(300),vh(111),"x");
	blockGen(gcenter,5,vw(300),vh(116),"x");
	blockGen(gcenter,5,vw(300),vh(121),"x");
	blockGen(gcenter,5,vw(300),vh(126),"x");

//EATING
	eatKey();
	eatCoin();
	eatHud();	


	//draw KEYS
	for(var i=0;i<key.length;i++){
		blockGen(keyGreen,1,key[i].position.getX(),key[i].position.getY(),"x");
	}

	//draw coins
	for(var i=0;i<coin.length;i++){
		blockGen(coinGold,1,coin[i].position.getX(),coin[i].position.getY(),"x");
	}
	

//SINO MOVE UD
	block[6].position.setX(block[6].position.getX()-Math.sin(t));
	t+=0.01;

	block[7].position.setX(block[7].position.getX()+Math.sin(t));
	t+=0.01;

	//CHECK PLAYER COIN COLLISION
	
	goldBlock();


}

//GOLD BLOCK
function goldBlock(){


	if(player.bottomCollide(UB1_b)){

		if(countGoldCol<7){
		//play sound
		Acoin.play();
		countGoldCol++;
	
		}
	}else{
			if(countGoldCol>=7){
				blockGen(boxCoin_disabled,1,vw(65),vh(5),"x");
			}
		}

}




function eatCoin(){

for(var i=0;i<coin.length;i++){

	if(player.rightCollide(coin[i]) || player.leftCollide(coin[i])){
		
		coin[i].position.setY(-vh(50));

		//play sound
		Acoin.play();



	}
}

}

//EAT KEYS
function eatKey(){

for(var i=0;i<key.length;i++){

	if(player.rightCollide(key[i]) || player.leftCollide(key[i])){
		
		key[i].position.setY(-vh(50));

		//play sound
		Acoin.play();
		player.key++;

		for(var i=0; i<player.key;i++){
			document.getElementById('key'+player.key+'').style.display = "block";
		}
	}
}

}

//eat HUD
function eatHud(){

for(var i=0;i<hud.length;i++){

	if(player.rightCollide(hud[i]) || player.leftCollide(hud[i])){
		
		hud[i].position.setY(-vh(50));

		//play sound
		Acoin.play();

	}
}

}