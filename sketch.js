var tower,towerImg;
var door,doorImg,doorGroup;
var climber,climberImg,climberGroup;
var ghost,ghostImg1,ghostImg2;
var invisibleground,invisiblegroundGroup;
var gameState='play';
var sound;

function preload(){
  towerImg=loadImage('tower.png');
  doorImg=loadImage('door.png');
  climberImg=loadImage('climber.png');
  ghostImg1=loadImage('ghost-standing.png');
  ghostImg2=loadImage('ghost-jumping.png');
  sound=loadSound('spooky.wav');



}

function setup () {
  createCanvas(600,600);
  tower=createSprite(300,300);
  tower.addImage('tower',towerImg);
  tower.velocityY=1;
  
  ghost=createSprite(200,200,50,50);
  ghost.addImage('ghoststand',ghostImg1);
  ghost.scale=0.4;
  
  sound.loop();
  
  doorGroup=new Group();
  climberGroup=new Group();
  invisiblegroundGroup=new Group();
}

function draw (){
  background('black');
  if(gameState==='play'){
     
     
  if(tower.y>600){
     tower.y=tower.width/2;
     }
  if(keyDown('left_arrow')){
    ghost.x=ghost.x-3;
  }
    if(keyDown('right_arrow')){
    ghost.x=ghost.x+3;
  }
  if(keyDown('space')){
    ghost.velocityY=-5;
  }
  ghost.velocityY=ghost.velocityY+0.4;  
 spawnDoor();
  
  if(climberGroup.isTouching(ghost)){
     ghost.velocityY=0;
     }
  if(invisiblegroundGroup.isTouching(ghost)||ghost.y>600){
    ghost.destroy();
   
    gameState='end';
  
  }
    
 
  
  drawSprites();
    
    
  }
if(gameState==='end'){
  stroke('yellow');
  fill('yellow');
  textSize(30);
  text('GAMEOVER',230,240);
}
}


  
function spawnDoor(){
  if(frameCount%150===0){
    
      door=createSprite(200,-50);
      climber=createSprite(200,10);
      invisibleground=createSprite(200,15);
      invisibleground.width=climber.width;
      invisibleground.height=2;
      
      door.addImage(doorImg);
      climber.addImage(climberImg);
    
     door.velocityY=1;
     climber.velocityY=1;
     invisibleground.velocityY=1;
     
    
    door.x=Math.round(random(120,400));
     climber.x=door.x;
    invisibleground.x=door.x;
    
     door.lifetime=800;
     climber.lifetime=800;
     invisibleground.lifetime=800;
    
    invisibleground.debug=true;
   invisiblegroundGroup.add(invisibleground);
     doorGroup.add(door);
     climberGroup.add(climber);
    
     ghost.depth=door.depth;  
    ghost.depth=ghost.depth+1;
  }
}
