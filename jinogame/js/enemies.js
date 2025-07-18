

//slimes
var slime = [];
var slime_sheet = [];
		
		for(var i = 0; i<3 ;i++){
			//body
			slime.push(body.create(vw(

				i*60+150

				),vh(76.5),50,28,0,0,0));
			//sprite	
			slime_sheet.push(new SpriteSheet(slime_walk,50,28,10,2));

		}

//fly
var fly = [];
var fly_sheet = [];
		
		for(var i = 0; i<8 ;i++){
			//body
			fly.push(body.create(

			vw(Math.floor(Math.random()*900)+200),

			vh(Math.floor(Math.random()*65)+10)

			,72,26,0,0,0));
			//sprite	
			fly_sheet.push(new SpriteSheet(flyFly,72,36,10,2));

		}

function drawEnemies(){

//Draw slimes
	for(var i=0; i<slime.length; i++){

		slime_sheet[i].update();
		slime_sheet[i].draw(slime[i].position.getX(),slime[i].position.getY());
	
		//slime Walk
		slime[i].update();
		slime[i].position.setX(slime[i].position.getX()-2);
		//slime[i].draw();


		//ctx.fillRect(slime[i].position.getX(),slime[i].position.getY(),50,28);

	}


//draw fly
	for(var i=0; i<fly.length; i++){

	fly_sheet[i].update();
		fly_sheet[i].draw(fly[i].position.getX(),fly[i].position.getY());
	
		//flyFly
		fly[i].update();
		fly[i].position.setX(fly[i].position.getX()-3);

	}

		//POP SLIMES
		removeSlime();

}




function removeSlime(){

	for(var i = 0;i<slime.length;i++){

		if(slime[i].rightCollide(block[0])){

			slime[i].position.setX(vw(900));
		}

	}

} 