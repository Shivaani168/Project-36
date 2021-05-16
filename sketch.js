var dog,sadDog,happyDog;
var database,foodS,foodStock,foodObj,add,feed;
var fedTime,lastFed;
function preload(){
sadDog=loadImage("Dog.png");
happyDog=loadImage("happy dog.png");
milkImage=loadImage("Milk.png")
}

function setup() {
createCanvas(1000,400);

foodObj = new Food();

database=firebase.database();
foodStock=database.ref("food");
foodStock.on("value",readStock);
  
dog=createSprite(900,250);
dog.addImage(sadDog);
dog.scale=0.15;

feed=createButton("Feed the Dog");
feed.position(600,95);
feed.mousePressed(feedDog);

add=createButton("Add Food");
add.position(800,95);
add.mousePressed(addFood);
}

function draw() {
background(46,139,87);

fill("red")
textSize(30)
text("VIRTUAL PET-1",750,40)

fill("red")
textSize(20)
text("Remaining milk bottles:",70,100)
text("Your pet:",800,180)

fedTime=database.ref('feedTime')
fedTime.on("value",function(data){
lastFed=data.val()})

fill("red")
textSize(15)
if(lastFed>=12){
text("Last Feed : "+ lastFed%12 + " PM", 50,30);
}
else if(lastFed===0){
text("Last Feed : 12 AM",50,30);
}else{
text("Last Feed : "+ lastFed + " AM", 50,30);
}
foodObj.display();
drawSprites();
}

function readStock(data){
foodS=data.val();
foodObj.getStock(foodS)
}

function feedDog(){
if(foodS<=1){
foodS=0;
}
else if(foodS>=0){
foodS=foodS-1
}
dog.addImage(happyDog)
database.ref("/").update({food:foodS})
database.ref("/").update({feedTime:hour()})
milk=createSprite(800,280)
milk.addImage(milkImage)
milk.rotation=55
milk.visible=true
milk.scale=0.1
}

function addFood(){
if(foodS>=0 && foodS<=50){
foodS=foodS+1;
}
dog.addImage(sadDog)
database.ref("/").update({
food:foodS})
}