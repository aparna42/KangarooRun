var PLAY = 1;
var END = 0;
var WIN = 2;
var gameState = PLAY;

var trex, trex_running, trex_collided;
var jungle, invisiblejungle;
var invisibleWall
var shrubsGroup

var obstaclesGroup, obstacle1;

var score = 0;

var gameOver, restart;

function preload() {
  kangaroo_running = loadAnimation("assets/kangaroo1.png", "assets/kangaroo2.png", "assets/kangaroo3.png");
  kangaroo_collided = loadAnimation("assets/kangaroo1.png");
  jungleImage = loadImage("assets/bg.png");
  shrub1 = loadImage("assets/shrub1.png");
  shrub2 = loadImage("assets/shrub2.png");
  shrub3 = loadImage("assets/shrub3.png");
  obstacle1 = loadImage("assets/stone.png");
  gameOverImg = loadImage("assets/gameOver.png");
  restartImg = loadImage("assets/restart.png");
  jumpSound = loadSound("assets/jump.wav");
  collidedSound = loadSound("assets/collided.wav");
}

function setup() {
  createCanvas(800, 400);

  jungle = createSprite(400, 100, 400, 20);
  jungle.addImage("jungle", jungleImage);
  jungle.scale = 0.3
  jungle.x = width / 2;

  //Groups are already added here
  shrubsGroup = new Group();
  obstaclesGroup = new Group();

  invisibleWall = createSprite(400, 400, 800, 20)
  //Changed the format for turning sprites invisible
  invisibleWall.visible = false

  kangaroo = createSprite(50, 200, 20, 50)
  //Changed the format for addAnimation 
  kangaroo.addAnimation("kangaroo", kangaroo_running)
  //Changed scale for the kangaroo
  kangaroo.scale = 0.15


  score = 0;

}



function draw() {
  background(255);

  kangaroo.x = camera.position.x - 270

  if (gameState === PLAY) {
  
    //Code to increase score
    score = score + Math.round(getFrameRate()/30);
    //Modified jungleImage to jungle (use the variable created for the sprite here!)
    jungle.velocityX = -4;

    if (jungle.x < 100) {
      jungle.x = 400;
    }

    if (keyDown("space") && kangaroo.y >= 150) {
      kangaroo.velocityY = -13;
      jumpSound.play();
    }

    kangaroo.velocityY = kangaroo.velocityY + 0.8
    //Call the functions to spawn obstacles and shrubs
    spawnObstacles();
    spwanShrubs();

    if (obstaclesGroup.isTouching(kangaroo)) {
      //----------------------------------------
      //Write code to play collided sound
      //Write code to change gameState to END
      //----------------------------------------
    }
    if (shrubsGroup.isTouching(kangaroo)) {
      //----------------------------------------
      //Write code to destroy each shrub in the shrubsGroup
      //----------------------------------------
    }
  }
  //Added the END state code
  else if (gameState === END) {
    //set velocity of each game object to 0
    kangaroo.velocityY = 0;
    jungle.velocityX = 0;
    obstaclesGroup.setVelocityXEach(0);
    shrubsGroup.setVelocityXEach(0);

    //change the trex animation
    kangaroo.changeAnimation("collided", kangaroo_collided);

    //set lifetime of the game objects so that they are never destroyed
    obstaclesGroup.setLifetimeEach(-1);
    shrubsGroup.setLifetimeEach(-1);

  }


  drawSprites();
  //Kangaroo has to collide with the invisible ground
  kangaroo.collide(invisibleWall);
   //Display score on the screen
   textSize(20);
   fill("black");
   text("Score: "+score, 650,100);

}
function spwanShrubs() {
  if (frameCount % 100 === 0) {
    var spwanShrubs = createSprite(camera.position.x + 500, 330, 40, 10);
    spwanShrubs.velocityX = -6
    spwanShrubs.scale = 0.5
    spwanShrubs.addImage(obstacle1);

    //Lifetime should be added to the spwanShrubs sprite 
    spwanShrubs.lifetime = 400
    //The sprite should be added to the shrubsGroup
    shrubsGroup.add(spwanShrubs);
  }

}
function spawnObstacles() {
  if (frameCount % 150 === 0) {
    var spawnObstacles = createSprite(camera.position.x + 400, 330, 40, 10);
    spawnObstacles.velocityX = -6
    spawnObstacles.scale = 0.15;
    var rand = Math.round(random(1, 6));
    switch (rand) {
      case 1: spawnObstacles.addImage(shrub1);
        break;
      case 2: spawnObstacles.addImage(shrub2);
        break;
      case 3: spawnObstacles.addImage(shrub3);
      default: break;
    }
    spawnObstacles.lifetime = 400
    obstaclesGroup.add(spawnObstacles);
  }

}