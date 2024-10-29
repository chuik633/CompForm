var mousePositions = []

let palette = ["#7b4800", "#002185", "#003c32", "#fcd300", "#ff2702", "#6b9404"]
const width = 500
const height = 500
function setup () {
    // C.createCanvas()
  createCanvas(width, height, WEBGL);
    angleMode(DEGREES)
    background("#fffceb")
  
    translate(-width/2,-height/2)  
  background("#F1ECE5")
  brush.load()
  
  translate(-width/2, -height/2)


  
}

var noiseLevel = 5
var noiseZoom = 0.1
const memoryLength = 50
const detectionRadius = 200

function draw() {
  background("#F1ECE5")
  colorMode(HSL, 100);
  translate(-width/2, -height/2)
  
  
  for(let i = 0; i< mousePositions.length; i ++){
    let color = palette[0]
    // fill(color)
    
     let n = noise(mousePositions[i].x*noiseZoom,   mousePositions[i].y *noiseZoom)

      //map the noise to a color in the color pallet
      let nColor = palette[round(map(n, 0,1, 0,palette.length))]
 
      

      stroke(nColor)
    noFill()

    // brush.set('HB', nColor, 1)

    rect(mousePositions[i].x ,
    mousePositions[i].y ,
    10,
    10
    )



      let noise_y = noiseLevel/2 - (noise(noiseZoom*mousePositions[i].y))*noiseLevel
      let noise_x = noiseLevel/2 - (noise(noiseZoom*mousePositions[i].x))*noiseLevel
      
      mousePositions[i].y += noise_y
      mousePositions[i].x += noise_x
      
  }
  

}

function mouseMoved(){
    mousePositions.push({
      'x':mouseX,
      'y':mouseY
    })

    // if(mousePositions.length > memoryLength){
    //   mousePositions.shift()
    // }
    // console.log(mousePositions)
}

let clickCount = 0
let delta = 1
var divider = 2
function mouseClicked(){
  

  if(clickCount == 4){
    divider = .5
    delta = -1
  }
  if(clickCount == 0){
    divider = 2
    delta = 1

  }
  clickCount += delta
  // noiseLevel+=delta
  console.log(divider,clickCount, noiseZoom)
  noiseZoom = noiseZoom/divider

}
