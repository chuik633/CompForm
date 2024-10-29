
// create an array to hold the possible values
var values = [ 3, 4,5,6,7,8,9];

// create a variable to hold the current position in the deck
var position = 0;
var color_value = 0;
var r_val;
var b_val;

function setup() {
  createCanvas(windowWidth, windowHeight);
  // shuffle the deck first
  background('#f0e7d5')
  angleMode(RADIANS)
  values = shuffle(values);
  fill('black')

  r_val = floor(random(0,255))
  b_val = floor(random(0,255))


}

//found this online to make a regular polygon
function polygon(x, y, radius, npoints) {
  
  angleMode(RADIANS)
  let angle = TWO_PI / npoints;
  beginShape();
  for (let a = 0; a < TWO_PI; a += angle) {
    let sx = x + cos(a) * radius;
    let sy = y + sin(a) * radius;
    vertex(sx, sy);
  }
  endShape(CLOSE);
}

//found this online to make a star shape
function star(x, y, radius1, radius2, npoints) {
  let angle = TWO_PI / npoints;
  let halfAngle = angle / 2.0;
  beginShape();
  for (let a = 0; a < TWO_PI; a += angle) {
    let sx = x + cos(a) * radius2;
    let sy = y + sin(a) * radius2;
    vertex(sx, sy);
    sx = x + cos(a + halfAngle) * radius1;
    sy = y + sin(a + halfAngle) * radius1;
    vertex(sx, sy);
  }
  endShape(CLOSE);
}


function valueFromDeck() {
  // translate(-windowWidth/2, -windowHeight/2)
  // find the value at the current position in the deck
  var v = values[position];

  // change the position for next time
  position++;

  // if that was the last value, shuffle and start over from the top
  if (position == values.length) {
    values = shuffle(values);
    position = 0;
  }

  // return the value
  return v;
}

var delta = 1

function mouseClicked(){
  r_val = floor(random(0,255))
  b_val = floor(random(0,255))

}
var last_X;
var last_Y;

function draw() {
  const npoints = valueFromDeck()
  const radius = random(5, 10)
  fill(r_val,color_value,b_val)
  noStroke()

  //make the color a gradient 
  if(color_value == 255){
    delta = -1
  } 
  if (color_value == 0 ){
    delta = 1
  }
  color_value+=delta
  
  
  polygon(mouseX, mouseY, radius, npoints)
   
  star(random(last_X,mouseX), random(last_Y, mouseY), radius/4, radius/8, npoints)

  if(frameCount%10){
    last_X = mouseX
    last_Y = mouseY
  }

  
}
