var PLAY = 1;
var END = 0;
var gameState = PLAY;
var monkey, monkey_running;
var banana, bananaImage, obstacle, obstacleImage;
var ground;
var foodGroup, obstacleGroup;
var score;

function preload(){
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png");
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 
}

function setup() {
  createCanvas(600,200);
  
  monkey = createSprite(25,190,10,10);
  monkey.scale = 0.1;
  monkey.addAnimation("monkey_running", monkey_running);
  
  ground = createSprite(300,191,610,10);
  console.log(ground.x);
  
  foodGroup = new Group();
  obstacleGroup = new Group();
  
}

function draw() {
  background("white");
  
  if (gameState === PLAY){
    if (keyDown("space") && monkey.y>=150){
      monkey.velocityY = -12;
    }
    monkey.velocityY = monkey.velocityY + 0.8;
    
    if (ground.x < 305){
      ground.x = 200;
    }
    
    createFood();
    createObstacles();
    
    if (obstacleGroup.isTouching(monkey)){
      gameState = END;
    }
  }
  else if (gameState === END){
    foodGroup.setVelocityXEach(0,0);
    obstacleGroup.setVelocityXEach(0,0);
    
    foodGroup.setLifetimeEach(-1);
    obstacleGroup.setLifetimeEach(-1);
    
    ground.velocityX = 0;
    
  }
  
  monkey.collide(ground); 
  
  drawSprites();
}

function createFood(){
  if (frameCount % 80 === 0){
    banana = createSprite(600,Math.round(random(60,100)),10,10);
    banana.addImage(bananaImage);
    banana.velocityX = -2;
    banana.scale = 0.1;
    banana.lifetime = 400;
    foodGroup.add(banana);
  }
  
}

function createObstacles(){
  if (frameCount % 300 === 0){
    obstacle = createSprite(600,170,10,10);
    obstacle.addImage(obstacleImage);
    obstacle.scale = 0.1;
    obstacle.velocityX = -3;
    obstacle.lifetime = 300;
    obstacleGroup.add(obstacle);
  }
}





