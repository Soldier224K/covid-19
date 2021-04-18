var bg;
var player; 
var germsGroup, maskGroup, sanitizerGroup, vaccineGroup;
var vaccineCount, maskCount, sanitizerCount, score;
var GameState;
var PLAY;
var FAIL;
var WIN;
var NOTENOUGH;
var restart;
var corona,coronaImg;
var border1,border2;
function preload(){
  coronaImg=loadImage("images/corona.png")
    bgImg = loadImage("images/track.jpg");
    curfew= loadImage("images/curfew.png");
    lockdown= loadImage("images/lockdown.png");
    maskImg = loadImage("images/mask.png");
    sanitizer = loadImage("images/sanitizer1.png");
    dr = loadImage("images/dr.png");
    vaccineImg = loadImage("images/vaccine.png");
    restartImg = loadImage("images/restart.png");
    playerAnimation = loadAnimation("images/sprite1.png", "images/sprite2.png", "images/sprite3.png", "images/sprite4.png","images/sprite5.png");
}
function setup(){
    var canvas = createCanvas(700,900);
    
    border1=createSprite(130,450,1,900);
    border2=createSprite(570,450,1,900);

    bg= createSprite(350,0,700,10000);
    bg.addImage(bgImg);
    bg.visible=true;

    player= createSprite(350,700,20,75);
    player.addAnimation("player", playerAnimation);
    player.visible=true;

    corona=createSprite(350,860,20,75);
    corona.addImage(coronaImg)
    corona.scale=0.07
    
    
  

    restart= createSprite(350,575,50,50);
    restart.addImage(restartImg);
    restart.scale=0.7;
    restart.visible = false;
    drGroup=new Group();

    obstaclesGroup = new Group();
    maskGroup = new Group();
    lifelinesGroup = new Group();
    vaccineGroup = new Group();

    GameState= "PLAY"
    vaccineCount= 0;
    maskCount = 0;
    sanitizerCount = 0;
    score = 0;
}
function draw(){

  if(player.collide(border1)){
player.velocityX=0
  }else{
    player.x=player.x-20
  }
  if(player.collide(border2)){
    player.velocityX=0
  }else{
    player.x=player.x+20
  }
  corona.x=player.x
    background("black");
    if(GameState === "PLAY"){

      border1.visible=false;
      border2.visible=false;
    score = score + Math.round(getFrameRate()/60);
    bg.velocityY = 3;
    if(bg.y=== 3750){bg.velocityY=0;player.velocityY= -3; if(player.x===0){player.velocityY=0;}}
    if(keyDown("RIGHT_ARROW")){player.x=player.x+20;}
    if(keyDown("LEFT_ARROW")){player.x=player.x-20;}
    spawnobstacles();
    spawnlifeline();
    spawnMask();
    spawnVaccine();
   
    if(bg.y=== 3750 && vaccineCount !== 2){GameState="NOTENOUGH";}
    if(maskCount===0 && sanitizerCount===0 && obstaclesGroup.collide(player)){
        GameState="FAIL";
        obstaclesGroup.destroyEach();
    }else if(maskCount>0 && obstaclesGroup.collide(player)){
        console.log("FIX THIS!!");
        maskCount = maskCount -1;
        obstaclesGroup.destroyEach();  
    }else if(sanitizerCount>0 && obstaclesGroup.collide(player)){
        console.log("FIX THIS!!");
        sanitizerCount = sanitizerCount -1;
        obstaclesGroup.destroyEach();  
    }
    if(drGroup.collide(player)){
      drGroup.destroyEach();
      maskCount = maskCount + 2;
  }
    
    if(maskGroup.collide(player)){
        maskGroup.destroyEach();
        maskCount = maskCount + 2;
    }
    if(lifelinesGroup.collide(player)){
        lifelinesGroup.destroyEach();
        sanitizerCount = sanitizerCount + 1;
    }
    if(lifelinesGroup.collide(player)){
        vaccineCount = vaccineCount +1;
        lifelinesGroup.destroyEach();
    }
    if(vaccineCount === 2){
        GameState = "WIN";
        console.log("You Won");
    }
    }else if(GameState === "WIN"){
      border1.visible=false;
      border2.visible=false;
        bg.visible = false;
        background("lightgreen");
        maskGroup.destroyEach();
        lifelinesGroup.destroyEach();
        obstaclesGroup.destroyEach();
        vaccineGroup.destroyEach();
        player.velocityY=0;
        corona.visible=false;
        restart.visible= true;
        player.visible = false;
        drGroup.destroyEach();
        textSize(50);
        fill("black");
        stroke ("white");
        strokeWeight(5);
        text("Game Over: You Won",100,450);
        textSize(25);
        text("You are safe..(you are vaccinated).Good Work,Well done!",50,500);
        if(mousePressedOver(restart)) {
            reset();
          }
    }else if(GameState === "FAIL"){
        bg.visible = false;
        border1.visible=false;
      border2.visible=false;
        maskGroup.destroyEach();
        lifelinesGroup.destroyEach();
        obstaclesGroup.destroyEach();
        restart.visible= true;
        vaccineGroup.destroyEach();
        player.velocityY=0;
        player.visible = false;
        corona.visible=false;
        drGroup.destroyEach();
        textSize(50);
        fill("red");
        stroke ("white");
        strokeWeight(5);
        text("Game Over: You Lost",100,450);
        textSize(25);
        text("You Have Been Affected By the Covid 19 Virus",90,500);
        if(mousePressedOver(restart)) {
            reset();
          }
    }else if(GameState === "NOTENOUGH"){
      border1.visible=false;
      border2.visible=false;
        bg.visible = false;
        drGroup.destroyEach();
        maskGroup.destroyEach();
        lifelinesGroup.destroyEach();
        obstaclesGroup.destroyEach();
        restart.visible= true;
        corona.visible=false;
        vaccineGroup.destroyEach();
        player.velocityY=0;
        player.visible = false;
        fill("red");
        stroke ("white");
        strokeWeight(5);
        textSize(25);
        text("Corona Had Killed You",100,400);
        textSize(50);
        text("Game Over: You Lost",100,450);
        textSize(25);
        text("You Have Been Affected By the Covid 19 Virus",90,500);
        if(mousePressedOver(restart)) {
            reset();
          }
    }
    if(vaccineGroup.collide(player)){
      vaccineGroup.destroyEach();
      vaccineCount=vaccineCount+1
    }

    if(vaccineCount===2){
      GameState="WIN"
    }

    
   /// Desrcription();
    spawndr();
    drawSprites();
    textSize(25);
   fill("red");
   stroke ("white");
   strokeWeight(5);
   text("Vaccine Count: "+ vaccineCount, 450,50);
   text(" PowerUp: "+ (maskCount + sanitizerCount), 450,100);
}

function spawnobstacles() {
    if(frameCount % 80 === 0) {
      var obstacle = createSprite(50,50,10,10);
      obstacle.velocityY =  +(6 + 3*score/100);
      var position= random(130,570);
      obstacle.x= position;
      var rand = Math.round(random(1,2));
      switch(rand) {
        case 1: obstacle.addImage(curfew);
                break;
        case 2: obstacle.addImage(lockdown);
                break;
        default: break;
      }
              
      obstacle.scale = 0.2
      obstacle.lifetime = 300;
      obstaclesGroup.add(obstacle);
    }
  }

function spawnMask() {
    if(frameCount % 400 === 0) {
      var mask = createSprite(50,50,10,10);
      mask.velocityY = +(8 + 3*score/100);
      var position= random(130,570);
      mask.x= position;
      mask.addImage(maskImg);

      mask.scale = 0.15;
      mask.lifetime = 300;
      maskGroup.add(mask);
  }
}
function spawnlifeline() {
    if(frameCount % 200 === 0) {
      var lifeline = createSprite(50,50,10,10);
      lifeline.velocityY = +(8 + 3*score/100);
      var position= random(130,570);
      lifeline.x= position;
      lifeline.addImage(sanitizer)
      lifeline.lifetime = 300;
      lifelinesGroup.add(lifeline);
    }
  }
  function spawndr() {
    if(frameCount % 400 === 0) {
      var dr = createSprite(50,50,10,10);
      dr.velocityY = +(8 + 3*score/100);
      var position= random(130,570);
      dr.x= position;
      dr.addImage(dr);

      dr.scale = 0.15;
      dr.lifetime = 300;
      drGroup.add(dr);
  }
}

function spawnVaccine() {
    if(bg.y=== 3000) {
    console.log("get vaccinated")
      var vaccine = createSprite(50,50,10,10);
      vaccine.velocityY = +(6 + 3*score/100);
      var position= random(130,570);
      vaccine.x= position;
      vaccine.addImage(vaccineImg);


      vaccine.scale = 0.5;
      vaccine.lifetime = 300;
      vaccineGroup.add(vaccine);
    }

  if(bg.y=== 1725 && vaccineCount===0) {
    console.log("It's a chance");
      var vaccine = createSprite(50,50,10,10);
      vaccine.velocityY = 10;
      var position= random(130,570);
      vaccine.x= position;
      vaccine.addImage(vaccineImg);
              
    
      vaccine.lifetime = 300;
      vaccineGroup.add(vaccine);
    }
  }
  

function reset(){
  border1.visible=false;
      border2.visible=false;
    GameState="PLAY";
    bg.visible=true;
    player.visible=true;
    restart.visible=false;
    corona.visible=true;    vaccineCount=0; 
    sanitizerCount=0;
    maskCount=0;
    score=0;
    bg.y=0;
    bg.velocityY = 3;
}
function Desrcription(){
  if (dr.collide(player)){
  player.velocityX=0
  bg.velocityY=0
  vaccineGroup.velocityY=0;
  obstaclesGroup.velocityY=0
  drGroup.velocityY=0
  lifelinesGroup.velocityY=0;

  player.visible=false;
  corona.visible=false;
  obstaclesGroup.visible=false;
  bg.visible=false;
  vaccine.visible=false;
  lifelinesGroup.visible=false;
  drGroup.visible=false;
  
  background("black")

  fill("red");
  stroke ("white");
  strokeWeight(5);
  textSize(25);
  text("Use mask Regulary.",50,200);
  textSize(25);
  text("Go out of home only if neccesary.",50,250);
  textSize(25);
  text("Wash Your hands atlteast after every 3hrs by Soap or else use Sanitizer ",50,300);
  textSize(25);
  text("Believe on Vaccine!Please... not for us but for Your family and for Yourself",50,350);
  textSize(25);
  text("Take proper diet and do some exercise at home(To increse your immunity)",50,400);
  textSize(25);
  text("Follow Social Distancing ...Support Govt. in this situations",90,450);
}

if(keyDown("space")){
  player.velocityX=0
  bg.velocityY=0
  obstaclesGroup.velocityY=0
  drGroup.velocityY=0
  lifelinesGroup.velocityY=
  vaccine.velocityY = +(6 + 3*score/100);

  player.visible=true;
  corona.visible=true;
  obstaclesGroup.visible=true;
  bg.visible=true;
  lifelinesGroup.visible=true;
  drGroup.visible=true;
  vaccineGroup=true;
}
}
