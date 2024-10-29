// require https://cdn.jsdelivr.net/npm/p5@1.4.0/lib/p5.js



// Dot Challenge Starting Point

function setup() {
  createCanvas(windowWidth, windowHeight);
  
  p5grain.setup();
  p5grain.setup({
    ignoreWarnings: true,
    ignoreErrors: true,
});
cursor('mouse.png');
}


const animationSpeed = 0.005

function draw(){
   background("#100F0F");

  // background("black")

  noStroke();
  ellipseMode(CENTER);

  
  colorMode(HSL, 360, 100, 100);

  for (let i = 0; i < 100; i++) {
    
    // these points are not scattered in the same way
    // how can you make the arrangement match the challenge?
    const noiseFrequency = 8;
    let x = noise(i * noiseFrequency, 0,
                  animationSpeed*frameCount) * width;
    
    let y = noise(i * noiseFrequency, 100,
                  animationSpeed*frameCount) * height;
  
    
    

    // the diameter shouldn't always be 10, it needs to vary
    const noiseFrequencyDiameter = .04
    let noiseVal =noise(noiseFrequencyDiameter*x,
                        noiseFrequencyDiameter*y, animationSpeed*frameCount)
    const diameter_min = 1
    const diameter_max = 30
    let diameter = noiseVal*(diameter_max-diameter_min) + diameter_min        
    let mouse_dist = dist(mouseX, mouseY, x, y)
    let shadingMax = 90-(mouse_dist/max(width, height))*90

    //darker sootsprites are bigger
    let shading = map(diameter, diameter_min, diameter_max,shadingMax, 0)
    let hueVal =  map(diameter, diameter_min, diameter_max,0,360)

    fill(0,0,shading)

    // ellipse(x, y, diameter, diameter);
   
    let eyes_open = false
    

      
   
      
    if(mouse_dist < 100){
      eyes_open = true //open the eyes nearby
      let point_push_mag = 1/(mouse_dist+1)*100

      console.log(point_push_mag)
      let nextX = noise(i * noiseFrequency, 0,
                    animationSpeed*
                        (frameCount + point_push_mag*5)) * width;
      let nextY = noise(i * noiseFrequency, 100,
                    animationSpeed*
                        (frameCount + point_push_mag*5)) * height;

      x = lerp(x, nextX, point_push_mag)
      y = lerp(y, nextY, point_push_mag)
      
    }
   

    sootSprite(x,y,diameter, eyes_open)
  }

  

  if(mouseIsPressed === true){
    cursor('mouse.png',0,8)

  }else{
    cursor('mouse.png')
  }
  applyMonochromaticGrain(30);


}

function sootSprite(x, y, diameter, eyes_open){
  // fill("black")
  ellipse(x, y, diameter, diameter);
  if(eyes_open){
    fill("white")
    let eyeD = diameter/3
    let eyeD2 = diameter/7
    let eyeX = x - diameter/7
    let eyeY = y

    ellipse(eyeX, eyeY, eyeD, eyeD)
    ellipse(eyeX +eyeD, eyeY, eyeD, eyeD)

    fill("black")
    ellipse(eyeX, eyeY, eyeD2, eyeD2)
    ellipse(eyeX +eyeD, eyeY, eyeD2, eyeD2)
  }
  
}
