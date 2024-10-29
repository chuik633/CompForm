
const noiseSpeed = .01

//movement of each color point (circle)
const doPosNoise = true
let noisePosZoom = .008
let posNoiseMagnitude = 10

//this changes the behavior of each fuzz (fuzz length etc)
const doShiftNoise = false
let shiftMagnitude = 20 //size of the fuzz
const shiftCircles = false

//this moves around each circle (less defined circles)
const innerPosMovement = 'false'//noise random
let innerPosMag = .08
let noisePosZoomInner = .001

//these impact the density of the image
let num_iters = 20
let stepSize = 3
let fuzzyStrokeWeight = .05

let colorSimilarityThreshold = 80

let ignoreColors = []


function createFuzzyImage(img){
    scaledImg = setScaledImage(img)
    main_colors = getMainColors(scaledImg)
    console.log("main_colors", main_colors)
    colorPointsData = getImageColorPoints(scaledImg, main_colors)
    console.log("color data", colorPointsData)
    drawFuzzyImage(colorPointsData)

}

function setScaledImage(img){
    let aspect_ratio = img.height/img.width
    let scaledWidth, scaledHeight;
    if(aspect_ratio<1){
        scaledWidth = Math.floor(width)
        scaledHeight = Math.floor(scaledWidth * aspect_ratio);
        
    }else{
        scaledHeight = Math.floor(height)
        scaledWidth = Math.floor(scaledHeight / aspect_ratio);
    }
    
    scaledImg = createImage(scaledWidth, scaledHeight);
    scaledImg.copy(img, 0, 0, img.width, img.height, 0, 0, scaledImg.width, scaledImg.height);
    scaledImg.loadPixels();
    return scaledImg
}

function getImageColorPoints(scaledImg,main_colors){
    let colorPointsData = {}
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
            if(color_dist == 0){
                closest_color = mainColor
                break
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
    console.log(colorPointsData[0])
    return colorPointsData

}


    


function drawFuzzyImage(colorPointsData){
    // shiftMagnitude=((100-frameCount))%100
    //draw it
    for(const [color, points] of Object.entries(colorPointsData)){
        
        stroke(color)
        // noStroke()
        for(let [x,y] of points){
            if(doPosNoise){
                let pos_noise = noise(x*noisePosZoom,y*noisePosZoom, frameCount*noiseSpeed)*posNoiseMagnitude
                fuzzyTexture(x+pos_noise,y+pos_noise, shiftMagnitude)

            }else{
                fuzzyTexture(x,y, shiftMagnitude)
            }  
            
        }
    }

}


function fuzzyTexture(x,y,shift_bound){
    strokeWeight(fuzzyStrokeWeight)
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



function getQuick(img_input, x, y) {
    const i = (y * img_input.width + x) * 4;
    return [
      img_input.pixels[i],
      img_input.pixels[i + 1],
      img_input.pixels[i + 2],
      img_input.pixels[i + 3],
    ];
}
