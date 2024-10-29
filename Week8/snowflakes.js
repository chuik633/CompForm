let t;
const width = 500
const height = 600
const centerX = width/2
const centerY = height/2
let slider;
let proportion = .4
let plusButton;
let minusButton;
"#D1D031"
const background_color = "#DEACD5"


function setup(){
  createCanvas(width,height)
  angleMode(DEGREES)
  background(background_color)
  t = new Turtle();
  stroke("white")
  drawLeafBig()

  plusButton = createButton("+")
  plusButton.mousePressed(()=>{
    console.log(proportion)
    proportion = Math.max(.1,proportion - .1 )
    background(background_color)
    t.penUp();
    t.moveTo(centerX,centerY)
    drawLeafBig()

  })

  minusButton= createButton("-")
  plusButton.mousePressed(()=>{
    console.log(proportion)
    proportion = Math.min(.9,proportion + .1 )
    background(background_color)
    t.penUp();
    t.moveTo(centerX,centerY)
    drawLeafBig()

  })
  noLoop();
}



function drawLeafBig(){
  t.penDown()
  for(var i = 0; i< 12; i++){
    t.pushState()
    drawLeaf(80)
    t.popState()
    t.turnRight(30)
    
  }

}

function drawLeaf(size){
   //base case
  if(size < .5){
    return
  }

  //recursive case
  t.moveForward(size)
  t.pushState();
  t.turnRight(45)
  drawLeaf(size*proportion)
  t.popState();

  t.pushState();
  t.turnLeft(45)
  drawLeaf(size*proportion)
  t.popState();
}

