
// require https://cdn.jsdelivr.net/npm/tweakpane@3.0.7/dist/tweakpane.min.js
// require https://cdn.jsdelivr.net/npm/p5@1.4.0/lib/p5.min.js
/* globals Tweakpane */

//layout constants
const width = 500;
const height = 800;
const centerX = width/2
const paddingTop = 200
const paddingSides = 80

//grid constants
const gap = 10
const shift = 10

//color constants
const backgroundColor = "#ADDBAC"
const colors = ['#FED400',"#D5C44E", "#E77326"]


//images and usefull measurements to have globally
let paperTextureImg;
let fishy1, fishy2;
let fish1_height,fish2_height, fish1_width,fish2_width;

//parameters
const params = {
  numRows: 3,
  numCols: 5,
  numFishies: 10
};
const pane = new Tweakpane.Pane();

//I want to adjust the max fishies to be within the grid
pane.addInput(params, "numRows", { min: 0, max: 5 , step:1})
pane.addInput(params, "numCols", { min: 0, max: 10 , step:1})
const numFishiesInput =  pane.addInput(params, "numFishies", { min: 1, max: 50 , step:1});


function preload(){
  fishy1 =  loadImage("fishies/1.png")
  fishy2 =  loadImage("fishies/2.png")
  paperTextureImg = loadImage("fishies/textture.jpg")
}

function aspectHeight(img, w){
  let aspectRatio = img.height / img.width; 
  return w * aspectRatio;
}
function aspectWidth(img, h){
  let aspectRatio = img.width/ img.height; 
  return h * aspectRatio;
}


function setup() {
  noStroke()
  createCanvas(width, height);
  background(backgroundColor)

}


function drawFish1(color, x, y){
  //background
  fill("#000000")
  const roundedness = Math.min(fish1_width/5, fish1_height/3)
  rect(x,y,fish1_width, fish1_height, roundedness)
  fill(color)
  rect(x,y,fish1_width-shift/2, fish1_height-shift/2, roundedness)

  //fish image
  image(fishy1, x, y, fish1_width, fish1_height)
}

function drawFish2(color,x,y){
  //background
  fill("#000000")
  ellipse(x+fish2_width/2, y+fish2_height/2, fish2_width, fish2_height)
  fill(color)
  ellipse(x+fish2_width/2-shift/2, y+fish2_height/2-shift/3, fish2_width-shift, fish2_height-shift/2)

  //fish Image
  image(fishy2, x, y, fish2_width, fish2_height)
}


function drawFishies(){
  //determine fish sizes
  //fishy image info
  fish1_width = (width - paddingSides*2)/(params.numCols )
  fish2_width = fish1_width
  
  fish1_height = aspectHeight(fishy1,fish1_width)
  fish2_height = aspectHeight(fishy2, fish2_width)

  //limit to the smaller of the height or widths
  const alt_height = (height - paddingTop*2)/(params.numRows)
  if(alt_height < fish1_height){
    fish1_width = aspectWidth(fishy1, alt_height)
    fish2_width = aspectWidth(fishy2, alt_height)
    fish1_height = alt_height
    fish2_height = alt_height
  }
  

  //standard the grid
  let gridHeight = Math.max(fish1_height, fish2_height)
  let gridWidth = Math.max(fish1_width, fish2_width)
  // console.log(params.numRows,params.numCols)

  //make the fishies
  let fishcount = 0
  for(let j =0; j<params.numRows; j++){
    for(let i = 0; i< params.numCols ; i++){
    
      const fishcolor = colors[fishcount%colors.length]
      if(fishcount<params.numFishies){
        const x = i*(gridWidth+gap) + paddingSides - 20
        const y = j*(gridHeight+gap) + paddingTop


        if(fishcount%2 == 0){
          drawFish1(fishcolor, x,y)
        }else{
          drawFish2(fishcolor, x,y)
        }
        fishcount ++

      }

    }
  }
} 

function draw() {
  background(backgroundColor)


  drawFishies()

  blendMode(BLEND)

}
