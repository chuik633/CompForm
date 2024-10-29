const width = 700
const height = 700
var palete3 = [
  "#7FA2CA",
  "#FFFFFA"

]
var palete2 = [
  "#FEC7BB",
  "#A1CD86"

]
var palete1 = [
  "#7FA2CA",
  "#F1734B",

]
var palete = [
  "#F5F1E7",
  "#E1DAC3",
]


function setUpColorPallets(palette, numIters){
  var rbgPalete = []
  for(let i = 0; i< palette.length; i++){
    rbgPalete.push(hexToRgb(palette[i]))

  }
  palette = rbgPalete

  function oneIter(){
    var newPalette = []
    for(let i = 0; i< palette.length-1; i++){
      var newColor = interpolate_colors(palette[i], palette[i+1])
      newPalette.push(palette[i])
      newPalette.push(newColor)
    }
    newPalette.push(palette[palette.length-1])
    palette =  newPalette

    // console.log(newPalette)
  }

  for(let iter = 0; iter< numIters; iter++){
    oneIter()
  }

  return palette
  

}



function interpolate_colors(a,b){
  let colorA = a
  let colorB = b
  return lerpColor(colorA, colorB, .5)
}

function hexToRgb(hex) {
  hex = hex.replace('#', '');

  var bigint = parseInt(hex, 16);

  var r = (bigint >> 16) & 255;
  var g = (bigint >> 8) & 255;
  var b = bigint & 255;

  return color(r, g, b);
}

function setup() {
  createCanvas(width, height, WEBGL); 
  translate(-width/2, -height/2)
  background("#7FA2CA")
  brush.load()

  noStroke()

  //set up the color palets
  palete = setUpColorPallets(palete, 6)
  palete1 = setUpColorPallets(palete1, 6)
  palete2 = setUpColorPallets(palete2, 6)
  palete3 = setUpColorPallets(palete3, 3)
  // createFabric(palete, 2,2, 1)
  createFabric(palete2,10,1, 10)
  createFabric(palete, 1,4, 4)
  createFabric(palete1,20,20, 10)
  createFabric(palete3,30,20, 10)
}


function house(x,y, w, h){
  fill('black')
  // brush.set('marker', 'black', 2)
  rect(x,y, w, h/2)
  // polygon([[x,y], [x+w, y], [x+(w)/2,y- h/2]])
}



function createFabric(colorPalete, pixelSizeX, pixelSizeY, gap) {
  const noiseFactor = 0.05
  
  for(i=0; i<width; i+=pixelSizeX +gap ){
    for(j = 0; j<height; j+=pixelSizeY + gap){
      //base the noise off of the i and j position
      let n = noise(i*noiseFactor, j*noiseFactor)
        //map the noise to a color
      let idx = round(map(n,0,1,0,colorPalete.length))
      let color = colorPalete[idx]

      fill(color)
      brush.set('HB', color, 1.5)
      brush.rect(i,j, pixelSizeX +n*5,pixelSizeY+n*5)
      
    }
  }

}




