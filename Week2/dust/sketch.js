var particleCount;
var particleData =  [];
const windowWidth = 800;
const windowHeight = 800;

function Particle(x,y, len, direction, brushType, brushWeight){
  this.x = x
  this.y = y
  this.len = len
  this.direction = direction
  this.brushType = brushType
  this.brushWeight = brushWeight 
}

function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);
  translate(- width/2, - height/2)  

  // let available_brushes = ['HB','2B', 'pen', 'cpencil', '2H', 'marker'];
  let available_brushes = ['HB', '2H'];
  brush.noField()

  //randomly determine the number of brush particles
  particleCount = 500
  noFill()
  rect(0,0,1,1)

  //randomly choose positions for the dust around the screen (save the info)
  //for each position, randomly create a marking (save the info)
  for(let i = 0 ; i< particleCount; i++){
    //1. brush styling
    const brushWeight = random(0.001,2)
    const brushType = random(available_brushes)
    
    //2. brush placement
    const max_brush_len = 40
    const x = random(max_brush_len, windowWidth - max_brush_len)
    const y = random(max_brush_len, windowHeight - max_brush_len)
    const len = min(random(0, max_brush_len), random(0, max_brush_len), random(0, max_brush_len))
    const direction = random(180)

    //3. save the information
    const particle = new Particle(x,y, len, direction, brushType, brushWeight)
    particleData.push(particle)
  }
  console.log(brush.box())
}



function draw() {
  background("black")
  angleMode(DEGREES)
  // noFill()
  // rect(0,0,1,1)
  translate(-windowWidth/2,-windowHeight/2)  
  drawSpecs()

}


function drawSpecs(){
  const radius = 250
  for(let i = 0; i< particleData.length; i++){
    var particle = particleData[i]
    
    const distance = dist(particle.x, particle.y, mouseX, mouseY)

    if(distance < radius){
      particle.direction += (1/distance)*200 
    }
    brush.set(particle.brushType, "white", particle.brushWeight)
    brush.flowLine(particle.x, particle.y, particle.len, particle.direction)
  }
  
}

