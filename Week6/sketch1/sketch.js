//image management
let img;


function preload(){
  img = loadImage("images/plant.png")
}

function getQuick(img, x, y) {
  const i = (y * img.width + x) * 4;
  return [
    img.pixels[i],
    img.pixels[i + 1],
    img.pixels[i + 2],
    img.pixels[i + 3],
  ];
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  
  img.loadPixels();
  let stepSize = 8
  for (let y = 0; y < img.height; y+=stepSize) {
    for (let x = 0; x < img.width; x+=stepSize) {
      const inputColor = getQuick(img, x,y);
      fill(inputColor[0], inputColor[1], inputColor[2], inputColor[3]);
      noStroke()
      const radius = 6
      ellipse(x + 50,y + 50, radius,radius)
    }
  }
}

let timePress = 0

function draw() {
  background("white")
  img.loadPixels();
  let stepSize = 8
  for (let y = 0; y < img.height;y+=stepSize) {
    for (let x = 0; x < img.width; x+=stepSize) {
      const inputColor = getQuick(img, x,y);
      
      // noStroke()
      noFill()
      stroke(inputColor[0], inputColor[1], inputColor[2], inputColor[3])
      let radius = stepSize - 2
      let distance = dist(mouseX,mouseY, x,y)
      if(distance <1){
        distance == 1
      }
      let magnitude = 10
      if(mouseIsPressed){
        timePress+=1
        magnitude += timePress/5000
      }else{
        timePress=0
      }
      let shrinkage = (1/distance)*radius*magnitude

      if(shrinkage >=radius){
        shrinkage = radius
      }
      if(shrinkage > 1){
        fill(inputColor[0], inputColor[1], inputColor[2], inputColor[3]);

      }
      radius -= shrinkage
      
      
      ellipse(x,y , radius, radius)
    }
  }
  
}
