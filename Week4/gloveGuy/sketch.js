//set up the images
const num_images = {
    'faces':4,
    'eyes':5,
    'legs':4,
    'shoes':3,
    'arms':3
}
let image_positions =  {
  'faces':{
    "width": 400,
    "shift": 0
  },
  'eyes':{
    "width": 50,
    "shift": -10
  },
  'legs':{
    "width": 100,
    "shift": 200
  },
  'shoes':{
    "width": 100,
    "shift": 300
  },
  'arms':{
    "width": 450,
    "shift": 0
  }
}
let faceSelectionData = {
  'arms':2,
  'legs':2,
  'faces':2,
  'eyes':2,
  'shoes':2
}
let paperTextureImg;

//save the face data
let face_data = {}
const width = 900
const height = 600
const midWidth = width*2/3
const midHeight = height/2.5

//save the buttons
const buttonWidth = 40
const buttonHeight = 40
const padding_top = 200
const padding_left = 80
const buttonGap = 15

let buttonData = {}


function preload(){
  //load the images for each
  for(const [feature_name, count] of Object.entries(num_images)){
    let loadedImages = []
    for(var i = 1; i <= count; i++){
      loadedImages.push(loadImage(`assets/images/${feature_name}/${i}.png`))
    }
    face_data[feature_name] = loadedImages
  }

  paperTextureImg = loadImage("assets/images/textture.jpg")
}


function setup() {
  createCanvas(width, height);
  createButtons()
}

//mouse interactions with buttons (hovering, clicking, updating decisions)
let mouseClickCoords = [0,0]

function mouseClicked(){
  mouseClickCoords = [mouseX, mouseY]
}

function buttonInRange(mouseX, mouseY, buttonX, buttonY){
  if(buttonX<=mouseX+ buttonWidth/2 && mouseX+ buttonWidth/2<=buttonX+buttonWidth) {
    if (buttonY<=mouseY+ buttonHeight/2 && mouseY+ buttonHeight/2<=buttonY+buttonHeight){
      return true
    }
  }
  return false
}

function createButtons(mouseX, mouseY){
  let rowIdx = 0
  for(const [feature_name, numCols] of Object.entries(num_images)){
    fill("#48433F")
    textFont("Quicksand");
    textStyle(NORMAL);
    textSize(10)
    text(feature_name.toUpperCase(), padding_left-20, padding_top + rowIdx*(buttonHeight+ buttonGap))

    for(let colIdx = 1; colIdx<=numCols; colIdx++){
      const buttonX = padding_left + (colIdx)*(buttonWidth + buttonGap)
      const buttonY =  padding_top + rowIdx*(buttonHeight+ buttonGap)

      if(buttonInRange(mouseX, mouseY, buttonX, buttonY)){
        // fill("#48433F")
        stroke("#48433F")
        noFill()
        rect(buttonX - buttonWidth/2 - 5,buttonY- buttonHeight/2-5, buttonWidth+10, buttonHeight+10)
      }
      //mouse's last click then update the decision data
      if(buttonInRange(mouseClickCoords[0], mouseClickCoords[1], buttonX, buttonY)){
        faceSelectionData[feature_name] = colIdx-1

        if(feature_name == 'legs'){
          const leg_img = face_data[feature_name][colIdx-1]
          const leg_height = aspectHeight(leg_img, image_positions['legs']['width'])
          // console.log('leg_height', leg_height)
          image_positions['shoes']['shift'] = leg_height + 150
        }
      }
      
      const img = face_data[feature_name][colIdx-1] //draw the button
      image(img, 
        buttonX,
        buttonY, 
        buttonWidth, 
        aspectHeight(img, buttonWidth))
      }

      rowIdx++ //new row for each feature
    }
}


function aspectHeight(img, w){
  let aspectRatio = img.height / img.width; 
  return w * aspectRatio;
}

function drawBody(){
  for(const [feature, num] of Object.entries(faceSelectionData)){
    const img = face_data[feature][num]
    const img_width = image_positions[feature]["width"]
    const img_shift = image_positions[feature]["shift"]
    image(img, midWidth, midHeight+img_shift, img_width, aspectHeight(img, img_width))
  } 
}

  

function draw() {
  blendMode(BLEND)
  imageMode(CENTER)
  background("#ABA19A");
  fill("#48433F")
  textFont("Quicksand");
  textStyle(BOLD);
  textSize(18)
  text("C R E A T E   A   G L O V E   G U Y", 60, 120)
  textStyle(NORMAL);
  drawBody()
  createButtons(mouseX, mouseY)
  blendMode(SCREEN)
  tint(255, 150);
  image(paperTextureImg, width/2, height/2, width, height)
  noTint();



}
