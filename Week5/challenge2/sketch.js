// require https://cdn.jsdelivr.net/npm/p5@1.4.0/lib/p5.js

// draws a rectangle, where you tell it to!

let amplitude_slider;
let frequency_slider;
let time_speed_slider;



function setup() {
  createCanvas(500, 300);

  createP("Amplitude");
  amplitude_slider = createSlider(0, 100, 50);
  createP("Frequency");
  frequency_slider = createSlider(0, 20, 10,0);
  createP("Speed");
  time_speed_slider = createSlider(0, .25, .01,0);
}

function draw() {
  background("#F1734B");
  ellipseMode(CENTER);

 

  for(let lineNum = 0; lineNum< 80; lineNum ++){
    drawLine(lineNum*8,250,
      250,50)
  }
  
}

function drawLine(startX, startY, endX, endY){
 

  let amplitude = amplitude_slider.value();
  let frequency = frequency_slider.value()
  let time_speed = time_speed_slider.value()

  noiseDetail(1, 0.5);

  fill(255);
  noStroke();

  // study this loop. do you understand how the line of ellipses is created?
  let num_circles = 100
  let radius = 2
  for (i = 0; i < 1; i += 1/num_circles) {
    let x = lerp(startX, endX, i);
    let y = lerp(startY, endY, i);

    // hint: drive offsetX and offsetY with noise() instead of random()
    let offsetX = (noise(
                          i*frequency,
                          time_speed*frameCount
                        ) - 0.5) * amplitude;
    let offsetY = (noise(
                          i*frequency,
                          time_speed*frameCount
                        )  - 0.5) * amplitude;

    ellipse(x + offsetX, y + offsetY, radius, radius);
  }
}
