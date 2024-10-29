const width = 500
const height = 700
const padding = {
    'left': 50,
    'top': 50,
    'right': 80,
    'bottom': 100
}


const img_path = "images/cute.png"

//toggle visible parts
const showPoints = false
const showLines = false

const noiseSpeed = .01

//movement of each color point (circle)
const doPosNoise = true
let noisePosZoom = .008
let posNoiseMagnitude = 10

//this changes the behavior of each fuzz (fuzz length etc)
const doShiftNoise = true
let shiftMagnitude = 45 //size of the fuzz
const shiftCircles = true

//this moves around each circle (less defined circles)
const innerPosMovement = 'false'//noise random
let innerPosMag = .08
let noisePosZoomInner = .001

//these impact the density of the image
let num_iters = 2
let stepSize = 1
let fuzzyStrokeWeight = .05


//global info
let img;
let scaledImg;
let main_colors = []
let colorPointsData = {}
let colorSimilarityThreshold = 20


let ignoreColors = [ "#FFFFFF"]
ignoreColors = [ "#FFFFFF", "#9E8A80", "#98867A"]
ignoreColors =["#FCFBE9"]
// ignoreColors=[]



function preload(){
    img = loadImage(img_path)
}
function getQuick(img_input, x, y) {
    const i = (y * img_input.width + x) * 4;
    return [
      img_input.pixels[i],
      img_input.pixels[i + 1],
      img_input.pixels[i + 2],
      img_input.pixels[i + 3],
    ];
}

function setScaledImage(){
    let aspect_ratio = img.height/img.width
    let scaledWidth, scaledHeight;
    if(aspect_ratio<1){
        scaledWidth = Math.floor(width - padding.left-padding.right)
        scaledHeight = Math.floor(scaledWidth * aspect_ratio);
        
    }else{
        scaledHeight = Math.floor(height - padding.top - padding.bottom)
        scaledWidth = Math.floor(scaledHeight / aspect_ratio);
    }
    
    scaledImg = createImage(scaledWidth, scaledHeight);
    scaledImg.copy(img, 0, 0, img.width, img.height, 0, 0, scaledImg.width, scaledImg.height);
    scaledImg.loadPixels();
}

function getImageColorPoints(){
    scaledImg.loadPixels();

    //initialize color lists
    for(let mainColor of main_colors){
        colorPointsData[mainColor] = []
    }

    //helper to set color info
    function setColorData(inputColor,x,y){
        for(let ignoreColor of ignoreColors){
            if(colorDistance(ignoreColor, inputColor)< colorSimilarityThreshold){
                return
            }
        }
        let min_dist = 1000
        let closest_color = main_colors[0]
        for(let mainColor of main_colors){
            let color_dist = colorDistance(mainColor, inputColor)
            if(color_dist< min_dist){
                min_dist = color_dist
                closest_color = mainColor
            }
        }
        colorPointsData[closest_color].push([x,y])

    }

    //iterate through the image
    for (let y = 0; y < scaledImg.height; y+= stepSize) {
        for (let x = 0; x < scaledImg.width; x+= stepSize) {
          const inputColor = getQuick(scaledImg, x,y);
          setColorData(inputColor,x,y)
        }
    }

}


function setup(){
    createCanvas(width, height)
    background("#FCFBE9")
    // background("white")

    //get the main colors
    setScaledImage()
    main_colors = getMainColors(scaledImg)
    // main_colors = [
    //     "#EDE5E5",
    //     "#DEA828",
    //     "#B84F3A",
    //     "#2F2826",
    // ]

    apple = [
        "#CB6265",
        "#E94D39",
        "#F0624E",
        "#F5A36F",
        "#EEE2BD",
        "#F6E9E1",
        "#B75B36",
        "#DD9351",
        "#E7AA6A",
        "#3F1417",
        "#96263F",
        "#9A615E",
        "#F07538",
        "#D33725"
    ]
    getImageColorPoints()
    drawFuzzyImage(shiftMagnitude)
    
}


function draw(){
    background("white")
    background("#FCFBE9")
    drawFuzzyImage(shiftMagnitude)
   
    // if(doShiftNoise){
    //     let shift_noise = noise(frameCount*noiseSpeed)*shiftMagnitude
    //     drawFuzzyImage(shift_noise)
    // }else{
    //     drawFuzzyImage(shiftMagnitude)
    // }
    
}

function drawFuzzyImage(fuzz_length){
    shiftMagnitude=((100-frameCount))%100
    //draw it
    for(const [color, points] of Object.entries(colorPointsData)){
        
        stroke(color)
        // noStroke()
        for(let [x,y] of points){
            x += padding.left
            y += padding.top 
            
            if(doPosNoise){
                let pos_noise = noise(x*noisePosZoom,y*noisePosZoom, frameCount*noiseSpeed)*posNoiseMagnitude
                fuzzyTexture(x+pos_noise,y+pos_noise, fuzz_length)

            }else{
                fuzzyTexture(x,y, fuzz_length)
            }  
            
        }
    }

}


function fuzzyTexture(x,y,shift_bound){
    
    strokeWeight(fuzzyStrokeWeight)
    // strokeWeight(1)
    noFill()
    for(let i= 0; i<num_iters; i++){
        let x_shift, y_shift
        
        if(doShiftNoise){
            x_shift = noise(1,x*.5,frameCount*.1)*shiftMagnitude
            y_shift = noise(2,y*.5,frameCount*.1)*shiftMagnitude
        }else{
            x_shift = random(-shift_bound, shift_bound);
            y_shift = random(-shift_bound, shift_bound);
             
        }
        if (dist(0, 0, x_shift, y_shift) > shift_bound) continue;
        
        
        if(innerPosMovement == 'noise1'){
            let n = noise(x*noisePosZoomInner,y*noisePosZoomInner, frameCount*noiseSpeed)
            let angle = n*(2*Math.PI); 
            let r = n*innerPosMag;
            x = x +Math.cos(angle)*r;
            y = y +Math.sin(angle)*r;
        }
        else if(innerPosMovement == 'noise'){
            x = x+noise(x*noisePosZoomInner,frameCount*noiseSpeed)*innerPosMag - innerPosMag/2
            y = y+noise(y*noisePosZoomInner,frameCount*noiseSpeed)*innerPosMag - innerPosMag/2
        }
        
        if(shiftCircles){
            ellipse(x,y,x_shift, y_shift)
        }else{
            line(x, y,x+x_shift, y+y_shift);
        }

        
    }
}

function getGridPoints(points, x_hatches, y_hatches){
    let grid_points = []
    //determine the startx, start x of the hatches
    let allX_vals = points.map((p)=> p[0])
    let minX = Math.min(...allX_vals);
    let maxX = Math.max(...allX_vals);
    let stepX = (maxX-minX)/x_hatches;

    // //determine the starty, start y of the hatches
    let all_vals = points.map((p)=> p[1])
    let minY = Math.min(...all_vals);
    let maxY = Math.max(...all_vals);
    let stepY = (maxY-minY)/y_hatches;

    //now i want to add points for each hatch on the shape
    for (let i = 0; i < x_hatches; i++) {
        let x = minX + i * stepX;
        let [yEndPoint1, yEndPoint2]= find_intersection(points,x, 'vertical')
        if(showLines){
            line(x,yEndPoint1, x,yEndPoint2)
        }
        

        //end points
        grid_points.push([x,yEndPoint1])
        grid_points.push([x,yEndPoint2])

        //now get the veritcal point
        for(let y = yEndPoint1; y<yEndPoint2; y+=stepY){
            let [xEndPoint1, xEndPoint2]= find_intersection(points,y, 'horizontal')
            if(showLines){
                line(xEndPoint1, y,xEndPoint2, y)
            }

            //end points
            grid_points.push([xEndPoint1, y])
            grid_points.push([xEndPoint2, y])

            //inner points
            for(let innerX = xEndPoint1; innerX<xEndPoint2; innerX+=stepX){
                grid_points.push([innerX, y])
            }

        }
    }

    if(showPoints){
        for(const [x,y] of grid_points){
            circle(x,y, 3)
        }
    }
    return grid_points
    
}


function find_intersection(points, coord, direction){
    let idx = 0
    if(direction == "horizontal"){
        idx = 1
    }
    let idx2 = (idx+1)%2
    //look at the x value crosssection of the shape made by points 
    //and get the intersection points
    let intersections = []
    for(let i =0; i<points.length; i++){
        const p1 = points[i]
        const p2 = points[(i+1)%points.length] //wrap arround to first point again
        if ((p1[idx] <= coord &&coord<=p2[idx]) || (p2[idx]<= coord && coord<=p1[idx])) { //btw x points
            //lerp: output =a+(b−a)⋅t
            let t = (coord -p1[idx]) / (p2[idx] - p1[idx])
            let y = lerp(p1[idx2], p2[idx2], t);
            intersections.push(y);
        }
    }
    intersections.sort((a, b) => a - b);
    if (intersections.length > 0) {
        return [intersections[0], intersections[intersections.length - 1]];
    } else {
        return [null, null];
    }
}

function outline_shape(points){
    beginShape()
    for(const [x,y] of points){
        vertex(x,y)
    }
    endShape(CLOSE)
}



// saveFrame - a utility function to save the current frame out with a nicely formatted name
// format: name_####.extension
// name: prefix for file name
// frameNumber: number of the frame to be exported
// (1, 2, 3, ...), will be zero padded for you
// extension: jpg or png, controls file name and image format
// maxFrame: checked against frameNumber, frames beyond maxFrame are not saved
function saveFrame(name, frameNumber, extension, maxFrame) {
    // don't save frames once we reach the max
    if (maxFrame && frameNumber > maxFrame) {
      return;
    }
  
    if (!extension) {
      extension = "png";
    }
    // remove the decimal part (just in case)
    frameNumber = floor(frameNumber);
    // zero-pad the number (e.g. 13 -> 0013);
    var paddedNumber = ("0000" + frameNumber).substr(-4, 4);
  
    save(name + "_" + paddedNumber + "." + extension);
}



