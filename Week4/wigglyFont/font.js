
let font;

//variables
let inputField, fontSizeSlider;
let fontSize = 100
let inputText = "type something"
let inputSize = 200

let centerY;


function preload(){
    font = loadFont('inconsolata.otf')
    
}

function setup(){
    createCanvas(windowWidth, windowHeight);
    centerY = windowHeight/3
    textFont(font)
   
    //Input text
    
    inputField = createInput('')
    inputField.attribute('placeholder', 'type text here')
    inputField.position(windowWidth/2 - inputSize/2 ,centerY + 80)
    inputField.size(inputSize)

    //slider for the font size
    fontSizeSlider = createSlider(2,100)
    fontSizeSlider.position(windowWidth/2 - inputSize/2,  centerY + 150)
    fontSizeSlider.size(200)

   

}

function draw(){
    background("white")
    fill("black")
    textSize(10)
    text("font-size", windowWidth/2 - 90, centerY + 145)
    fontSize = fontSizeSlider.value()
    fontMaker(inputText, frameCount)

}

function keyPressed(){
    if(keyCode == ENTER){
        inputText = inputField.value()
        console.log(Math.round(windowWidth/inputText.length))
        resetSliderMax(Math.round(windowWidth/inputText.length))
    }
}

function resetSliderMax(newMax){
    fontSizeSlider.remove()
    fontSizeSlider = createSlider(2,newMax)
    fontSizeSlider.position(windowWidth/2 - inputSize/2,  centerY + 150)
    fontSizeSlider.size(200)
}

function fontMaker(inputText, frameCount){
    let x,y;
    const letters = inputText.split("")
    //save the global font size
    let squishedFontSize = fontSize
    // console.log(letters)

    // squeeze the width to fit
    
    while((letters.length)*squishedFontSize > windowWidth){
        squishedFontSize -=1
    }
    let textWidth = (letters.length)*squishedFontSize
    x = windowWidth/2 - textWidth/2

    // console.log("numlines:", num_lines)
    y = centerY
 
    for(const letter of letters){
        stroke("white")
        fill("black")
        rect(x, y - squishedFontSize/2, squishedFontSize, squishedFontSize)
        let points = font.textToPoints(
            letter, 
            x, // x
            y, // y
            squishedFontSize, // fontsize
            { sampleFactor:  0.5 });
        
        let formattedPoints = []
        for (let p of points) {
            formattedPoints.push([p.x, p.y])
        }
        noiseToShape(formattedPoints, frameCount, "white")
        x +=squishedFontSize
    }

}

function noiseToShape(points, timeStamp, color){

    function y_line(point1, point2, input_x){
      //y=mx + b
      let [x1,y1] = point1
      let [x2,y2] = point2
      let m = (y2-y1)/(x2-x1)
  
      let output_y = m*(input_x-x1) +y1 
      return output_y
    }
  
    function add_points(points){
      var newPoints = []
      for(let i = 0; i<points.length; i++){
        let nextPointIdx = (i+1)%(points.length)
        let nextPoint = points[nextPointIdx]
        let currPoint = points[i]
        let midpoint_x = (currPoint[0]+nextPoint[0])/2
  
        midpoint_y = y_line(currPoint, nextPoint, midpoint_x)
  
        newPoints.push(currPoint)
        newPoints.push([midpoint_x, midpoint_y])
      }
      return newPoints
    }
  
    const numIters = 6 // number of interpolation iterations
    for(let i = 0; i<numIters; i++){
      points = add_points(points)
    }
    
  
    const noiseZoom = 0.02
    const noiseLevel = 20
  
    const animationSpeed = .01
    //Create the shape
    fill(color)
    // rect(100,100,100,100)
    beginShape()
    for(let i = 0; i<points.length; i++){
      let x = points[i][0]
      let y = points[i][1]
      let n = noise(x*noiseZoom,y*noiseZoom, timeStamp*animationSpeed)*noiseLevel
      vertex(x + n,y + n)
    }
    endShape(CLOSE)
  
  }
  