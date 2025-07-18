		document.write('<canvas id="canvas"></canvas>');

var canvas = document.getElementById('canvas'),
	ctx = canvas.getContext('2d'),

	Width = canvas.width = window.innerWidth,
	Height = canvas.height = window.innerHeight;



//VIEWPORT UNIT

// vw == viewport width/ w: passed Width
 function vw (w){
 	return (w*window.innerWidth)/100;
 }

function vh (h){
	return (h*window.innerHeight)/100;
}



//engine initialisation
function Engine(){

	this.setScreen = function (x, y){

		Width = canvas.width = x,
		Height = canvas.height = y;

	}

}


function loadImage(image){
	var img = new Image();
		img.src=image;
		return img;
}

function image(img, x, y, w, h){
	var canvas = document.getElementById('canvas'),
		ctx = canvas.getContext('2d');
	
		ctx.drawImage(img, x, y, w, h);
}


// VECTOR

var vector = {
	_x: 1,
	_y: 0,

	create: function(x, y) {
		var obj = Object.create(this);
		obj.setX(x);
		obj.setY(y);
		return obj;
	},

	setX: function(value) {
		this._x = value;
	},

	getX: function() {
		return this._x;
	},

	setY: function(value) {
		this._y = value;
	},

	getY: function() {
		return this._y;
	},

	setAngle: function(angle) {
		var length = this.getLength();
		this._x = Math.cos(angle) * length;
		this._y = Math.sin(angle) * length;
	},

	getAngle: function() {
		return Math.atan2(this._y, this._x);
	},

	setLength: function(length) {
		var angle = this.getAngle();
		this._x = Math.cos(angle) * length;
		this._y = Math.sin(angle) * length;
	},

	getLength: function() {
		return Math.sqrt(this._x * this._x + this._y * this._y);
	},

	add: function(v2) {
		return vector.create(this._x + v2.getX(), this._y + v2.getY());
	},

	subtract: function(v2) {
		return vector.create(this._x - v2.getX(), this._y - v2.getY());
	},

	multiply: function(val) {
		return vector.create(this._x * val, this._y * val);
	},

	divide: function(val) {
		return vector.create(this._x / val, this._y / val);
	},

	addTo: function(v2) {
		this._x += v2.getX();
		this._y += v2.getY();
	},

	subtractFrom: function(v2) {
		this._x -= v2.getX();
		this._y -= v2.getY();
	},

	multiplyBy: function(val) {
		this._x *= val;
		this._y *= val;
	},

	divideBy: function(val) {
		this._x /= val;
		this._y /= val;
	},

	
};
/**************************************************************************/

// REQUIRED
var move = vector.create(0,0);
var t = 10;


// WORLD

function World(body){

	body.update();

}

//DRAWING
function fill (color){
	ctx.fillStyle = color;
}

function stroke(color){
	ctx.strokeStyle = color;
}



// PARTICLE


var body = {

	position : null,
	velocity : null,
	mass:1,
	bounce:-1,
	friction: 1,

	create: function(x, y, w, h, speed, direction, grav ){
		var obj = Object.create(this);
		obj.position = vector.create(x,y);
		obj.w=w;
		obj.h=h;
		obj.velocity = vector.create(0,0);
		obj.velocity.setLength(speed);
		obj.velocity.setAngle(direction);
		obj.gravity = vector.create(0, grav || 0);
		return obj;
	},

	draw: function(){

		ctx.strokeRect(this.position.getX(),this.position.getY(),this.w,this.h);

	},

	translate: function(x , y){
		var a = vector.create(x,y);
		this.accelerate(a);
	},

	translateX: function(x){
		this.position.setX(x);
	},

	translateY: function(y){
		this.position.setX(y);
	},

	accelerate: function(accel){
		this.velocity.addTo(accel);
	},

	update: function(){
		this.velocity.multiplyBy(this.friction);
		this.velocity.addTo(this.gravity);
		this.position.addTo(this.velocity);
	},

	angleTo: function(p2){
		return Math.atan2(p2.position.getY()-this.position.getY(),p2.position.getX()-this.position.getX());
	},

	distanceTo:function(p2){

		var dy = p2.position.getY()-this.position.getY(),
			dx = p2.position.getX()-this.position.getX();
			return Math.sqrt(dx * dx + dy * dy);
	},

	gravitateTo:function(p2){
		var grav = vector.create(0,0),
			dist = this.distanceTo(p2);

			grav.setLength(p2.mass / (dist * dist));
			grav.setAngle(this.angleTo(p2));

			this.velocity.addTo(grav);
	},

	setFloor : function(floor){
		if(this.position.getY()+this.h>=floor.y){
			this.position.setY(floor.y-this.h);
		}
	},

//OFFSET
 isScreenOffset : function(){
		if(this.position.getX()+this.w<=0 || this.position.getX()+this.w>=width || this.position.getY()+this.h<=0 || this.position.getY()>=height-40){
			return true;
		}
	},


 isOffsetLeft : function(){
	if(this.position.getX()+this.w<=0 ){
			return true;
		}
},

 isOffsetRight : function(){
	if(this.position.getX()+this.w>=width){
			return true;
		}
},

 isOffsetTop : function(){
	if(this.position.getY()+this.h<=0 ){
			return true;
		}
},

 isOffsetBottom : function(){
	if(this.position.getY()>=height-40){
			return true;
		}
},

// BOUND
	bound : function(){
		//OFFSET
	//left
	if(this.position.getX()<=0 ){
			this.position.setX(0);
		}
	//right
	if(this.position.getX()+this.w>=width){
			//this.position.setX(width-this.w);
		}
 	//top
	if(this.position.getY()+this.h<=0 ){
			this.position.setY(0);
		}
	//bottom
	//if(this.position.getY()>=height-40){
			//this.position.setY(height-this.h);
		//}

	},

// RECT PUSH

setRectPush : function(body){
		//top
		if(this.position.getX()+this.w<=body.position.getX()+body.w+this.w && this.position.getX()>=body.position.getX()-this.w && this.position.getY()+this.h<body.position.getY()+20){
				if(this.position.getY()+this.h>=body.position.getY()){
					//this.position.getY()=body.position.getY()-this.h+2;
					body.position.setY(body.position.getY()+3);
				}
		}//right
		if(this.position.getY()>=body.position.getY()-this.h && this.position.getY()+this.h<=body.position.getY()+body.h+this.h && this.position.getX()>=body.position.getX()+body.w-10){
			if(this.position.getX()<=body.position.getX()+body.w ){
				//this.position.getX()=body.position.getX()+this.w+body.w/2.8;
				body.position.setX(body.position.getX()-3);
			}
		}//bottom
		if(this.position.getX()+this.w>=body.position.getX() && this.position.getX()+this.w<=body.position.getX()+body.w+this.w && this.position.getY()<=body.position.getY()+body.h){
			if(this.position.getY()>body.position.getY()+10){

				//this.position.getY()=body.position.getY()+body.h;
				body.position.setY(body.position.getY()-3);
			}
		}//left
		if(this.position.getY()+this.h>=body.position.getY() && this.position.getY()<=body.position.getY()+body.h && this.position.getX()+this.w<=body.position.getX()+10){

			if(this.position.getX()+this.w>=body.position.getX()){
				
				//this.position.getX()=body.position.getX()-this.w;
				body.position.setX(body.position.getX()+3);
			}
		}
	},

	jumpOn : function(floor,jumpForce){

		/*document.addEventListener('keydown', function(e){
			if(this.position.getY()+this.h>=floor.y){		
				if(e.keyCode==83){
					this.velocity.setY(-jumpForce);
				}
			}						
			});

		document.addEventListener('keyup', function(e){
			if(this.position.getY()+this.h>=floor.y){		
				if(e.keyCode==83){
					this.velocity.setY(jumpForce);
				}
			}						
			});*/

		
	},

	setMotion :function (step){

	document.addEventListener('keydown', function(e){

		if(e.keyCode==37){
			move.setX(-step);
		}
		if(e.keyCode==39){
			move.setX(+step);
		}

		if(e.keyCode==38){
			move.setY(+step);
		}

		if(e.keyCode==40){
			move.setY(-step);
		}

	});

	document.addEventListener('keyup', function(e){

		if(e.keyCode==37){
			move.setX(0);
		}
		if(e.keyCode==39){
			move.setX(0);
		}

		if(e.keyCode==38){
			move.setY(0);
		}

		if(e.keyCode==40){
			move.setY(0);
		}

	});

	//this.accelerate(move);

	},

	rightCollide : function(body){
		if(this.position.getY()>=body.position.getY()-this.h && this.position.getY()+this.h<=body.position.getY()+body.h+this.h && this.position.getX()>=body.position.getX()+body.w-10){
			if(this.position.getX()<=body.position.getX()+body.w ){
				return true;
			}
		}
	},

	leftCollide : function (body){
		if(this.position.getY()+this.h>=body.position.getY() && this.position.getY()<=body.position.getY()+body.h && this.position.getX()+this.w<=body.position.getX()+10){

			if(this.position.getX()+this.w>=body.position.getX()){
				
				return true;
			} 
		}
	},

	topCollide : function (body){
		if(this.position.getX()+this.w<=body.position.getX()+body.w+this.w && this.position.getX()>=body.position.getX()-this.w && this.position.getY()+this.h<body.position.getY()+20){
				if(this.position.getY()+this.h>=body.position.getY()){
					return true;
					
				}
			}
	},

	bottomCollide : function(body){
		if(this.position.getX()+this.w>=body.position.getX() && this.position.getX()+this.w<=body.position.getX()+body.w+this.w && this.position.getY()<=body.position.getY()+body.h){
			if(this.position.getY()>body.position.getY()){

				return true;
			}
		}
	},

	setRectCollision : function(body){
		//top
		if(this.position.getX()+this.w<=body.position.getX()+body.w+this.w && this.position.getX()>=body.position.getX()-this.w && this.position.getY()+this.h<body.position.getY()+20){
				if(this.position.getY()+this.h>=body.position.getY()){
					this.position.setY(body.position.getY()-this.h);
					
				}
		}//right
		if(this.position.getY()>=body.position.getY()-this.h && this.position.getY()+this.h<=body.position.getY()+body.h+this.h && this.position.getX()>=body.position.getX()+body.w-10){
			if(this.position.getX()<=body.position.getX()+body.w ){
				this.position.setX(body.position.getX()+body.w);
			}
		}//bottom
		if(this.position.getX()+this.w>=body.position.getX() && this.position.getX()+this.w<=body.position.getX()+body.w+this.w && this.position.getY()<=body.position.getY()+body.h){
			if(this.position.getY()>body.position.getY()){

				this.position.setY(body.position.getY()+body.h);
			}
		}//left
		if(this.position.getY()+this.h>=body.position.getY() && this.position.getY()<=body.position.getY()+body.h && this.position.getX()+this.w<=body.position.getX()+10){

			if(this.position.getX()+this.w>=body.position.getX()){
				
				this.position.setX(body.position.getX()-this.w);
			}
		}
	},

};

/***************************************************************************/

// UTILITIS

var utils={
	distance:function(p0, p1){
		var dx = p1.x - p0.x,
			dy = p1.y - p0.y;
			return Math.sqrt(dx * dx + dy * dy);
	},

	distanceXY:function(x0, y0, x1, y1){
		var dx = x1 - x0,
			dy = y1 - y0;
		return Math.sqrt(dx * dx + dy * dy);
	},

	circleCollision:function(c0, c1){
		return utils.distance(c0,c1) <= c0.radius + c1.radius;
	},

	circlePointCollision: function(x, y, circle){
		return utils.distanceXY(x, y, circle.x, circle.y) < circle.radius;
	},

	pointInRange: function(x, y, rect){
		return utils.inRange(x, rect.x, rect.x + rect.width)&&
			   utils.inRange(y, rect.y, rect.y + rect.height);
	},

	inRange:function(value, min, max){
		return value >= Math.min(min,max) && value <= Math.max(min,max);
	},

	rangeIntersect:function(min0, max0, min1, max1){
		return Math.max(min0,max0)<= Math.min(min1,max1) && Math.min(min0,max0) <= Math.max(min1,max1);
	},

	isRectCollide:function(r0 ,r1){
		return utils.rangeIntersect(r0.position.getX() ,r0.position.getX() + r0.w, r1.position.getX() ,r1.position.getX() + r1.w)&&
			   utils.rangeIntersect(r0.position.getY() ,r0.position.getY() + r0.h, r1.position.getY() ,r1.position.getY() + r1.h);
	},

	circleSolidTo: function (c0, c1){

				var distance = utils.distanceXY(c0.x, c0.y, c1.x, c1.y);
				var dif = c0.x - distance;

				if(utils.circleCollision(c0,c1)){
					if(c0.x>c1.x){

					c0.x = c0.x + dif/90;
					c1.x-dif;

					}else{
					

					c0.x = c0.x - dif/90;
					c1.x-dif;
					}

					if(c0.y>c1.y){

						
					c0.y = c0.y + dif/90;
					c1.y-dif;

					}else{

					c0.y = c0.y - dif/90;
					c1.y-dif;

					}

				}else{
				}
			},
		}
		
/******************************************************************/
// SHAPES

function Rectangle(x, y, w, h, c){
	this.x=x, this.y=y, this.w=w, this.h=h, this.color=c;

	this.draw = function(){
		ctx.strokeStyle="";
		ctx.strokeRect(this.x,this.y,this.w,this.h);
	},

	this.setFloor = function(floor){
		if(this.y+this.h>=floor.y){
			this.y=floor.y-this.h;
		}
	}

}

// MOUSE 

	var mouseX=0,
		mouseY=0;

	document.addEventListener('mousemove', function(e){

		mouseX=e.clientX;
		mouseY=e.clientY;

	});

	function jump(p,floor,jumpForce){
		document.addEventListener('keyup', function(e){
			if(p.position.getY()+p.h>=floor.position.getY() && p.position.getX()>=floor.position.getX()-p.w && p.position.getX()+p.w<=floor.position.getX()+floor.w+p.w && p.position.getY()+p.h<=floor.position.getY()+10){		
				if(e.keyCode==83){
					
					var a = vector.create();
						a.setX(0);
						a.setY(-(jumpForce/p.mass));					
						p.velocity.addTo(a);
						//ty = 0.5;
						//trans.setY(ty);
				}
			}						
			});
			
		document.addEventListener('keyup', function(e){
			//if(p.position.getY()+p.h>=floor.y && p.position.getX()>=floor.x-p.w && p.position.getX()+p.w<=floor.x+floor.w+p.w && p.position.getY()+p.h<=floor.y+10){		
				if(e.keyCode==83){
					
						//ty -= 0.1;
						//trans.setX(ty);
					//
				}
			//}					
			});
	}

	function oscil(body,value){
		body.position.setY(body.position.getY()+Math.sin(t));
		t+=value;
	}

	function isRectCollide (r0 ,r1){
		return utils.rangeIntersect(r0.position.getX() ,r0.position.getX() + r0.w, r1.position.getX() ,r1.position.getX() + r1.w)&&
			   utils.rangeIntersect(r0.position.getY() ,r0.position.getY() + r0.h, r1.position.getY() ,r1.position.getY() + r1.h);
	}