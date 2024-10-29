let t;
const width = 500
const height = 500
const centerX = width/2
const centerY = height/2

const proportions = [1/3, 1/2, 2/3]
const shades = ["#F0E6DC", "#DCCFC0", "#9F9181", "#5F5244", "#3B3631", "#282623"]

function setup(){
    createCanvas(width,height)
    angleMode(DEGREES)
    background( "#FCF8F4")
    t = new Turtle();
    t.turnLeft(90)
    // t.show();
    // drawLeafBig(200, 200, 50, 5, 1/2)
    

    let weight = .1
    
    for(let i = 0; i< shades.length; i++){
      strokeWeight(.5)
      weight = weight*3
      stroke(shades[i])
      drawGarden(5*i,15*i)
    }
    
  
  }
function drawGarden(min_r, max_r){
  const ground = 300
  let r = 10
  for(var i = 10; i< width-80; i+=r){
    r = random(min_r, max_r)
    let height = random(10, 100)
    t.penUp()
    t.moveTo(i+r,ground)
    t.turnTo(-90)
    t.penDown()
    t.moveForward(height)
    drawLeafBig(
      i+r, 
      ground - height, 
      r, //radius
      random(3,10), //number of petals
      random(proportions) //proportion (complicatedness of it)
    )
    i+=5
  }
}


function drawLeafBig(x,y, radius, numLeaves, proportion){
    // circle(x, y, radius)
    t.penUp()
    t.moveTo(x,y)
    t.penDown()
    for(let i = 0; i< numLeaves; i++){
      t.pushState()
      drawLeaf(radius*(1-proportion), proportion)
      t.popState()
      t.turnRight(360/numLeaves)
    }
  }

function drawLeaf(size, proportion){
     //base case
    if(size < 5){
      return
    }
    t.moveForward(size*proportion,proportion)

     //recursive case
    t.pushState();
    t.turnRight(45)
    drawLeaf(size*proportion, proportion)
    t.popState();
  
    t.pushState();
    t.turnLeft(45)
    drawLeaf(size*proportion,proportion)
    t.popState();
}
  
  