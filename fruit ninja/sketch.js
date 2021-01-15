var PLAY = 1;
var END =0;
var gameState = 1; 
var gameOver,gameOverImage;
var sword,swordImage;
var alien1,alien2,alienImage;
var fruitsGroup,fruit1,fruit2,fruit3,fruit4;
var swordSound,gameOverSound;

function preload(){

   swordImage = loadImage("sword.png");
   alienImage = loadAnimation("alien1.png", "alien2.png");
   //alien2 = loadImage("alien2.png");
   fruit1 = loadImage("fruit1.png");
   fruit2 = loadImage("fruit2.png");
   fruit3 = loadImage("fruit3.png");
   fruit4 = loadImage("fruit4.png");
   gameOverImage=loadImage("gameover.png");
   swordSound = loadSound("knifeSwooshSound.mp3")
   gameOverSound = loadSound("gameover.mp3")
 
}
function setup() {
  createCanvas(400, 400);
  
 sword = createSprite(40,200,20,20); 
 sword.addImage(swordImage);
 sword.scale=0.7;
  
  gameOver = createSprite(300,100);
  gameOver.addImage(gameOverImage);
  gameOver.scale=0.5
  gameOver.visible=false;
  
  fruitGroup=createGroup();
  alienGroup=createGroup();
  
  score = 0;
  
}

function draw(){
  background("cyan");
  text("Score: "+ score, 300,50);
  
  if(gameState === PLAY){
    
  sword.y=World.mouseY;
  sword.x=World.mouseX;
  fruits();
 alien(); 
  
  if (fruitGroup.isTouching(sword)){
    fruitGroup.destroyEach();
    score=score+2;
    swordSound.play();
  }
    if (sword.isTouching(alienGroup)){
  fruitGroup.destroyEach();
  fruitGroup.velocityX=0;  
  alienGroup.destroyEach();  
  alienGroup.velocityX=0; 
      gameState=END;
  gameOverSound.play();
  }
  
  }
   else if (gameState === END) {
  
  if (sword.isTouching(alienGroup)){
  fruitGroup.destroyEach();
  fruitGroup.velocityX=0;  
  alienGroup.destroyEach();  
  alienGroup.velocityX=0;  
  }
  sword.addImage(gameOverImage);
  sword.x=200;
  sword.y=200;   
  
   }
  
 
  
  drawSprites();
}
function fruits(){
  if(World.frameCount%80===0){
    fruit=createSprite(400,200,20,20);
    p=Math.round(random(1,2))
    if(p===1){
     fruit.x=400;
     fruit.velocityX=-(7+score/4);
    }
    else if (p===2){
      fruit.x=0;
     fruit.velocityX=(7+score/4);
    }
    fruit.scale=0.2;
    r=Math.round(random(1,4));
    if (r == 1) {
    fruit.addImage(fruit1);
    } else if (r == 2){
    fruit.addImage(fruit2);  
    } else if(r == 3){
     fruit.addImage(fruit3); 
    } else if (r == 4){
     fruit.addImage(fruit4);
    }
    fruit.y=Math.round(random(50,340));
    
    fruit.setLifetime=100;
    fruitGroup.add(fruit);
 } 
}

function alien(){
  if(World.frameCount%200===0){
  alien1=createSprite(400,200,20,20)
  alien1.addAnimation("moving",alienImage)
    alien1.y=Math.round(random(100,300));
    alien1.velocityX=-(8+score/10);
    alien1.setLifetime=50;
    alienGroup.add(alien1);
  }
}