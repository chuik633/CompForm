//coords of the bottom of th
const joystickBaseX = 0
const joystickBaseY = 0
const joystickHeight = 100
const joystickWidth = 20

//vairables affected by the joystick
let direction = 0 //poitive means right, negative means left, magnitude means speed
let dotX = 0

function setup () {
  createCanvas(500,500)
  translate(250,250)
  background("#F1ECE5")
  rectMode(CENTER)
  angleMode(RADIANS)
  
}

function drawJoystick(angle){
  //(ROTATE start)
  push();
  rotate(angle);
  
  //stick
  fill("white")
  rect(joystickBaseX, joystickBaseY - joystickHeight/2, joystickWidth, joystickHeight)
  
  //circle
  fill("#F1734B")
  circle(joystickBaseX, joystickBaseY - joystickHeight, 40)
  
  pop();
  //(ROTATE end)
  fill("black")
  rect(joystickBaseX, joystickBaseY, 100, 20)
}


function drawDot(){
  fill("black")
  console.log(dotX)
  if(dotX > 100 - 10){
    direction = -1
  }else if(dotX<-100+10){
    direction = 1
  }
  dotX += direction
  circle(dotX,-200, 10)
  
}

function draw() {
  translate(250,250)
  translate(0,joystickHeight/2)
  background("#F1ECE5")
  textFont('Courier New')
  rectMode(CENTER)
  angleMode(DEGREES)
  
  //get the angle based on the mouse
  let angle = atan2(mouseX - 250, mouseY-250-joystickHeight/2)

  //snap the joy stick so it doesnt go under
  if(0<angle && angle <90){
    angle = 90
  }else if(-90< angle && angle<0){
    angle = 270
  }

  //get direction info based on the mouse
  let relativeX = mouseX - 250
  fill("black")
  if(relativeX>10){
    direction = 1
    if(relativeX>100){//make it faster
      direction = 2
    }
    text("Right",60,-joystickHeight-30)
  }else if(relativeX<-10){
    direction =-1
    if(relativeX<-100){//make it faster
      direction = -2
    }
    text("Left",-80,-joystickHeight-30)
  } else{
    direction = 0
    text("Center",-10,-joystickHeight-30)
    
  }

  drawJoystick(180-angle)

  noFill()
  rect(0,-200,200,50)
  drawDot()

}
