//image management
let img;
let img2;


function preload(){
  img = loadImage("images/1.png")
  img2 = loadImage("images/iteration1.png")
  img2.resize(img2.width / 2, img2.height / 2); 

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
  background('grey')
  noStroke()
  img.loadPixels();
  img2.loadPixels();
  let stepSize = 1
  for (let y = 0; y < max(img2.height, img.height); y+=stepSize) {
    for (let x = 0; x < max(img2.width, img.width); x+=stepSize) {
      const inputColor = getQuick(img, 50+x,50+y);
      const inputColor2 = getQuick(img2, 50+x,50+y);
      let sum=[], avg=[], difference=[], mult = []
      for(i=0;i<4;i++){
        sum.push(inputColor[0] + inputColor2[0])
        avg.push((inputColor[0] + inputColor2[0])/2)
        difference.push(inputColor[0] - inputColor2[0])
        mult.push(inputColor[0]*inputColor2[0])
      }
      fill(...difference);
      const radius = 2
      ellipse(x/3 + 50,y/3 + 50, radius,radius)
    }
  }
  img.updatePixels()
}

