// 

const background_color = "#EAE2D5"
const colors = ["#2D2C2F", "#D2B878", "#BB6F4F", "#A5ACAF", "#BECCD0", "#D5C44E", "#D3C9B6", "#D9A595", "#AFA392"]
let hatch_brushes = ["marker", "marker2"]
let stroke_brushes = ["2H", "HB"]

function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);
  // C.createCanvas()
  angleMode(DEGREES)
  translate(-windowWidth/2,-windowHeight/2)  
  background(background_color)
  brush.load()
  noStroke();

  const padding = 40

  //create the grid, by 
  var gridWidth = (windowWidth-2*padding)
  var gridHeight = (windowHeight-2*padding)
  

  let x = padding;
  // console.log(gridWidth, gridHeight)
  fill(background_color)
  rect(padding, padding, gridWidth, gridHeight)
  while(x < gridWidth) {
    console.log("NEW ROW")
    const cellWidth = lowBiasRandom(10, gridWidth - x)
    // const cellWidth = 40
    
    // console.log("x outise = ", x)
    let y = padding;
      
    while(y<gridHeight) {
      const cellHeight = lowBiasRandom(10,  gridHeight - y)
      // const cellHeight = 100

      fill_section(x, x+cellWidth, y, y+cellHeight)
      // rect(x, x+cellWidth, y, y+cellHeight)

      
      y = y + cellHeight
    }
    x = x+ cellWidth
   
    // console.log("x = ", x)
  }
  // console.log("x = ", x)
}

function lowBiasRandom(low, high){
  return min(random(low,high), random(low,high), random(low,high),random(low,high),random(low,high),random(low,high))
}

//grid fill in a section
function fill_section(x_min, x_max, y_min, y_max){
  //random structural elements( number of rows and columns )
  const rows = random(0,20)
  const cols = random(0,20)

  //random brush info (consistent across each section)
  const color = random(colors)
  const brushType = random(stroke_brushes)
  const brushWeight = random(.01,1)
  const hatchDistance = random(2,20)
  const hatchAngle = random(0,180)
  

  //determine the grid info
  const cellHeight = ((y_max - y_min))/rows
  const cellWidth = ((x_max - x_min))/cols

  //give the section a border
  if(random([true, false])){
    brush.set('HB', "#2D2C2F", 1)
    brush.rect(x_min ,
      y_min ,
      cellWidth, 
      cellHeight)
    
  }

  for(let i = 0; i < cols; i ++) {
    for (let j = 0; j< rows; j++){ 
      x = i*cellWidth
      y = j*cellHeight
      makeShape(x + x_min, y+ y_min, cellWidth, cellHeight, color, brushType, brushWeight, hatchDistance, hatchAngle)

    }
  }

  

}

function makeShape(x, y, width, height, color, brushType, brushWeight, hatchDistance, hatchAngle){
  //set up the brush
  brush.set(brushType, color, brushWeight)
  brush.setHatch(brushType, color)
  brush.hatch(hatchDistance, hatchAngle)

  // if(random([true, false])){
  //   fill(color, .1])
  //   rect(x,y, width, height)
  // }

  const field_types = ["zigzag", "seabed", "curved", "truncated"]
  brush.field(random(field_types))
  // brush.noField()

  //draw the shape
  brush.rect(x ,
              y ,
              width, 
              height)
  // rect(x,y, width, height)
  brush.noStroke()
  brush.noHatch()
}

function draw() {



}
