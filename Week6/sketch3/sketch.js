//image management
let img;
let input;
let padding = 35

//save main colors
let main_colors = []
let main_colors2 = [] //method 2
let main_colors_lists = {}
let main_colors_averages = {}
let colorSimilarityThreshold = 100

function preload(){
  img = loadImage("images/test.png")
}

function setup() {
  createCanvas(padding*2 + img.width, padding*2+ img.height + 100);
  background("black")


  // getMainColors() 
  getMainColors()
  background(main_colors[0])
  getMainColors()
  drawMainColors(main_colors)
  // getMainColors2()
  // background(main_colors2[0])
  // drawLimitedColorImage(main_colors2)
  // drawMainColors(main_colors2)
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

//helper functions for determining the main colors
function colorDistance(c1, c2) {
  let r1 = red(c1), g1 = green(c1), b1 = blue(c1);
  let r2 = red(c2), g2 = green(c2), b2 = blue(c2);
  let distance = dist(r1, g1, b1, r2, g2, b2);
  return distance;
}


function getMainColors2(){
  //determine the main colors2
  function colorUnique2(c){
    for(const existing_color of main_colors2){
      if(colorDistance(existing_color, c) < colorSimilarityThreshold){ //if its close enough to another color
        return [false, existing_color]
      }
    }
    return [true, c]
  }

 
  
  //determine the main colors based on the number of occurences
  img.loadPixels();
  for (let y = 0; y < img.height; y++) {
    for (let x = 0; x < img.width; x++) {
      const inputColor = getQuick(img, x,y);
      [unique, pallete_color]= colorUnique2(inputColor)

      if(unique){
        main_colors_lists[color(inputColor)] = [inputColor]
      }else{
        main_colors_lists[color(pallete_color)].push(inputColor)
      }

    }
  }

  //now average out each color
  function get_avg_color(colors) {
    let rSum = 0, gSum = 0, bSum = 0, aSum = 0;

    let totalColors = colors.length;
  
    for(const color of colors){
      rSum += red(color)
      gSum += green(color)
      bSum += blue(color)
      aSum += alpha(color)
    }
  
    let avgR = rSum / totalColors;
    let avgG = gSum/ totalColors;
    let avgB = bSum /totalColors;
    let avgA = aSum /totalColors;
  
    try{
      let avgColor = color(avgR, avgG, avgB, avgA)
      return avgColor;
    }catch{
      console.log("ISSUE")
      console.log(avgR, avgG, avgB, avgA)
    }
    
    
  }


  for (let key in main_colors_lists) {

      const avgColor = get_avg_color(main_colors_lists[key]);
      main_colors2.push(avgColor); // Store the average color for each group
      main_colors_averages[color(key)] = avgColor //store the key to average color for later
      // console.log(main_colors_lists[key])
  }
  // console.log(main_colors2)




  img.updatePixels();
}


function getMainColors(){
  function colorUnique(c){
    for(const existing_color of main_colors){
      if(colorDistance(existing_color, c) < colorSimilarityThreshold){ //if its close enough to another color
        return [false, existing_color]
      }
    }
    return [true, c] //it is unique
  }
  
  //load the pixels 
  img.loadPixels();
  for (let y = 0; y < img.height; y++) {
    for (let x = 0; x < img.width; x++) {
      const inputColor = getQuick(img, x,y);
      [unique, color ]= colorUnique(inputColor)

      if(unique){
        main_colors.push(inputColor)
      }

      noStroke()
      fill(color)
      rect(padding+x,padding+y, 10,10)

    }
  }
  img.updatePixels();
}

function drawLimitedColorImage(palette){
  console.log("Main color")
  console.log(main_colors_lists)
  //gets the nearest color in the palette using the threshold
  function getNearestColor(color){
    for(const palette_color in palette){
      let og_color = main_colors_averages[palette_color]
      let color_list = main_colors_lists[og_color]

      if (color_list.includes(color)){
        return palette_color
      }

     
    }
    return "#FFFF"
  }
  img.loadPixels();
  for (let y = 0; y < img.height; y++) {
    for (let x = 0; x < img.width; x++) {
      const inputColor = getQuick(img, x,y);
      const color = getNearestColor(inputColor)
      console.log(color)
      
      
      noStroke()
      fill(color)
      rect(padding+x,padding+y, 10,10)
    }
  }
  img.updatePixels();
}



function drawMainColors(main_colors){
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

      fill(color)
      stroke(main_colors[1])

      rect(
        padding+ gap + j*(size + gap), //x coordinate
          img.height+  50+   i*(size + gap),  // y coordinate
              size, size)
        noStroke()

    }
  }
  


}
// function draw() {
//   //get the main colors
  

// }
