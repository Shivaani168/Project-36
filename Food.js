class Food {
constructor(){
this.stock=0;
this.image=loadImage("Milk.png");
}
getStock(n){
this.stock=n;
}

display(){
var x=80,y=100;
imageMode(CENTER);
if(this.stock!=0){
for(var i=0;i<this.stock;i++){
if(i%10===0){
x=80;
y=y+50;
}
image(this.image,x,y,50,50);
x=x+30;
}
}
}
}