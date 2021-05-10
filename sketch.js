//Create variables here
var database;
var dog,dogImage,dogImage1,food,foodImage,foodStock,foodRef;
var feed;
var fedTime,lastFed,foodRem;
var foodObj;
var gameState=0;
var value;
var milkimg,milkbottle;
var bath;
function preload()
{
  dogimage = loadImage("dogImg.png");
  dogimage2 = loadImage("dogImg1.png");
  milkimg = loadImage("/Milk.png");
  happyDog = loadImage("happy dog.png");
  sadDog = loadImage("Happy.png");
  washroom= loadImage("Wash Room.png");
  bedroom=loadImage("Bed Room.png");
  livingroom=loadImage("Living Room.png")
}

function setup() {
  createCanvas(500, 500);
  foodObj=new Food();
  //foodObj.updateFoodStock(20);

  dog = createSprite(250,300);
  dog.addImage(dogimage);
  dog.scale = 0.2;

  database = firebase.database();
  //food = database.ref('Food');
  //food.on("value",readStock);

  feed = createButton("Feed your dog");
  feed.position(650,100);
  feed.mousePressed(feedDog);

  addFood=createButton("Add Food");
  addFood.position(450,100);
  addFood.mousePressed(addFoods);
  milkbottle = createSprite(150,320);
  milkbottle.addImage(milkimg)
  milkbottle.visible = 0
  milkbottle.scale = 0.1

  var bath=createButton(" I want to take bath");
  bath.position(580,125);
  if(bath.mousePressed(()=>{
     gameState=3;
     database.ref('/').update({'gameState':gameState});
    
  }));
  
  var Sleep=createButton("I am very sleepy");
  Sleep.position(718,125);
  if(Sleep.mousePressed(()=>{
    gameState=4;
    database.ref('/').update({'gameState':gameState});
  }));
  
  var play=createButton("let's play");
  play.position(500,160);
  if(play.mousePressed(()=>{
    gameState=5;
    database.ref('/').update({'gameState':gameState});
  }));
}


function draw() {  
  background(46, 139, 87);
  drawSprites();
   console.log(bath)
  foodObj.display();

  // if(foodS == 0) {
  //   dog.addImage(happyDog);
  //   milkBottle.visible=false;
  // }else{
  //   dog.addImage(sadDog);
  //   milkbottle.visible=true;
  // }
  if(gameState===1) {
    dog.addImage(happyDog);
    dog.scale=0.175;
    dog.y=250;

  }
  if(gameState===2){
    dog.addImage(sadDog);
    dog.scale=0.175;
    milkbottle.visible=false;
    dog.y=250;
  }
  if(gameState===3){
    dog.addImage(washroom);
    dog.scale=1;
    milkbottle.visible=false
  }
  if(gameState===4){
    dog.addImage( bedroom);
    dog.scale=1;
    milkbottle.visible=false
  }
  if(gameState===5){
    dog.addImage(livingroom);
    dog.scale=1;
    milkbottle.visible=false
  }
  fedTime=database.ref('FeedTime');
  fedTime.on("value",function(data){
    lastFed=data.val();
  })
  fill("white");
  textSize(15);
  if(lastFed>=12){
    text("Last Fed : "+ lastFed%12 + " PM", 150,25);
   }else if(lastFed==0){
     text("Last Fed : 12 AM",350,30);
   }else{
     text("Last Fed : "+ lastFed + " AM", 150,25);
   }
   fill(4,23,117)
   textSize(20)
   text(value,400,dog.y-80)
}
function feedDog()
{
  foodObj.getFoodStock();
  if(foodObj.foodStock<=0)
  {
    foodObj.foodStock=0;
    milkbottle.visible=0;
    dog.addImage(dogimage);
  }
  else{
    dog.addImage(dogimage2);
    if(foodObj.foodStock===1)
    {
        milkbottle.visible=0;
        dog.addImage(dogimage);
    }
    else
    milkbottle.visible = 1
    foodObj.updateFoodStock(foodObj.foodStock-1);
    database.ref('/').update({
    Food:foodObj.foodStock,
    FeedTime:hour()
    });
  }
}
function addFoods()
{
  
  foodObj.updateFoodStock(foodObj.foodStock+1);
  database.ref('/').update({
    Food:foodObj.foodStock
  });
}
