const Engine = Matter.Engine;
const World= Matter.World;
const Bodies = Matter.Bodies;
var box1;
var ground;

var boxes = [];
var gSlider;
 
 
function setup() {
    createCanvas(400, 400);
    engine = Engine.create();
    world = engine.world;
    Engine.run(engine);

    stroke("orange");
    // A slider is already created for you here
    gSlider = createSlider(0, 100, 50);
    fill("purple");
    gSlider.position(40, 365);
    gSlider.input = map(engine.world.gravity, gSlider.min, gSlider.max, 0, 1);

    var ground_options={
    isStatic:true
    }

    ground = Bodies.rectangle(200,350,400,20,ground_options);
    World.add(world,ground);
}
 
function mousePressed() {
    if (mouseY < 350) {
   boxes.push(new Box(mouseX,mouseY,random(10,40),random(10,40)));      
    }
}
 
function draw() {
    background("black");
    var fVal = gSlider.value();

    for(var i=0; i<boxes.length; i++ ){
        boxes[i].show();
    }

    rectMode(CENTER);
    rect(ground.position.x, ground.position.y,400,20);
    textSize(22);
    text("Gravity:"+fVal,180,385);
}
 


function Box(x, y, width, height, options) {

    var options = { 
        restitution:0.5, 
        friction:0.5,
        density:1,
    }
    this.body = Bodies.rectangle(x,y,width,height,options);
    this.width = width;
    this.height = height;
    World.add(world,this.body);
    this.show = function(){

     var pos = this.body.position;
    var angle = this.body.angle;
      push();
      translate(pos.x, pos.y);
      rotate(angle);
      rectMode(CENTER);
      fill(0,255,255);
      rect(0,0,this.width,this.height);
      pop();
    }
}