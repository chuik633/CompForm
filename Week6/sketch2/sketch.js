//image management
let img;
let input;
let padding = 35

//save main colors
let main_colors = []
let colorSimilarityThreshold = 40

function preload(){
  img = loadImage("images/tomato.png")
}

function imageFileHandler(file) { //got help online for this
  if (file.type === 'image') { 
    img = loadImage(file.data, () => {
    console.log("Image uploaded successfully!");
    });
  } else {
    console.log("Not an image file!");
  }
}

function setup() {
  createCanvas(300, 500, WEBGL);
  translate(-width/2, -height/2)

  //create the inputs 
  input = createFileInput(imageFileHandler);
  input.position(padding, 0);
  button = createButton('Upload Image');
  button.position(padding,8)
  button.mousePressed(() => input.elt.click());

  //initial image
  getMainColors()
  drawMainColors()
}

function drawMainColors(){
  background(main_colors[0])
  let ratio = img.width/img.height
  let displayWidth, displayHeight
  imageMode(CENTER)
  if(img.width > img.height){
    displayWidth = width-padding*2
    displayHeight = displayWidth/ratio
    image(img,width/2,padding*2 + displayHeight/2, displayWidth, displayHeight)
    
  }else{
    displayHeight = 200
    displayWidth = displayHeight*ratio
    
    image(img,width/2,padding*2 + displayHeight/2, displayWidth, displayHeight)

  }
  imageMode(CORNER)
  
  brush.load()
  brush.set("cpencil", "#522E0D", 1)
  push()
  translate(width/2, height/2)
  brush.noHatch()
  brush.rect(padding,padding,width - padding*2,height - padding*2)
  noFill()


  let size;
  let maxRowLength = 5
  if(main_colors.length > 5*4){
    maxRowLength = 6
  }
  let gap = 10
  let numRows = ceil(main_colors.length / maxRowLength)
  if(numRows == 1){
    size = (width - padding*4 - gap*(main_colors.length-1))/(main_colors.length)
  } else {
    size = (width - padding*4 - gap*(maxRowLength - 1))/maxRowLength
  }

  for(let i = 0 ; i < numRows; i++){
    for(let j = 0; j< maxRowLength; j++){
      if(i*maxRowLength + j >= main_colors.length ){
        continue
      }
      const color = main_colors[i*maxRowLength + j]
      brush.setHatch("cpencil", color)
      brush.hatch(1, 50, 1)

      brush.rect(
              2*padding + j*(size + gap), //x coordinate
              2.5*padding + displayHeight + i*(size + gap),  // y coordinate
              size, size)


    }
  }
  


  pop()

  
  

}

function getMainColors(){
  //helper functions for determining the main colors
  function colorDistance(c1, c2) {
    let r1 = red(c1), g1 = green(c1), b1 = blue(c1);
    let r2 = red(c2), g2 = green(c2), b2 = blue(c2);
    let distance = dist(r1, g1, b1, r2, g2, b2);
    return distance;
  }
  function colorUnique(c){
    for(const existing_color of main_colors){
      if(colorDistance(existing_color, c) < colorSimilarityThreshold){ //if its close enough to another color
        return false
      }
    }
    return true
  }

  if(img){
    img.loadPixels();
    let stepSize = 1
    for (let y = 0; y < img.height; y+=stepSize) {
      for (let x = 0; x < img.width; x+=stepSize) {
        const inputColor = img.get(x,y);
        if(colorUnique(inputColor)){
          main_colors.push(inputColor)
        }
      }
    }

  }
  
}

function draw() {
  translate(-width/2, -height/2)
  //get the main colors
  getMainColors()


  drawMainColors()
  

}
