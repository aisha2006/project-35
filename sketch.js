var dog ,dogImage, happyDog;
var food, foodStock, foodS;
var database;
var feedDog, addFood;
var feed, addFoods
var fedTime, lastFed;
var foodObj;

function preload(){
  dogImage=loadImage("images/Dog.png");
  happyDog=loadImage("images/happydog.png");
}

function setup(){

  foodObj = new Food();

  database = firebase.database();
  createCanvas(500,500);

  foodS = database.ref("foodStock");
  foodS.on("value",readStock);

  dog = createSprite(430,430,5,5);
  dog.addImage(dogImage);
  dog.scale = 0.2;

  feed= createButton("feed the dog");
  feed.position(700,95);
  feed.mousePressed(FeedDog);

  addFood= createButton("Add Food");
  addFood.position(700,115);
  addFood.mousePressed(addFoods);
  
  
  console.log(foodS);
}

function draw(){
  background(46, 139, 87);
  /*
  if(foodS!==undefined){

  fedTime=database.ref("FeedTime");
  fedTime.on("value",function(data){
    lastFed=data.val();
  })

*/

  drawSprites();
  
  fill("black");
  text("food stock: "+foodS,200,20);

  foodObj.display();
  }


function readStock(data){
  foodS = data.val();

}

function writeStock(x){
  
  if(x<= 0){
    x=0;
  }

  else{
    x = x-1;
  }

 
    database.ref('/').update({
      food:x
    });
 
}


function addFoods(){
  foodS++
  database.ref('/').update({
    food:foodS
  })

  foodObj.updateFoodStock(foodObj.getFoodStock());
    database.ref('/').update({
      Food:foodObj.getFoodStock()
    })
}

function FeedDog(Food){
    dog.addImage(happyDog);
    /*
    foodObj.updateFoodStock(foodObj.deductFoodStock);
    */ 
   
   foodS--;
   foodObj.foodStock = foodS;

}
