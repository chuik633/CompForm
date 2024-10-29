
class FuzzyImage{
    constructor(img, width, height, fuzzLength, fuzzWeight, stepSize, numIters, shiftCircles, ignoreColors, colorSimilarityThreshold){
        //image size
        this.img = img
        this.width = width
        this.height = height

        //fuzz size
        this.fuzzLength = fuzzLength
        this.fuzzWeight = fuzzWeight

        //sample density
        this.stepSize = stepSize
        this.numIters = numIters
        this.ignoreColors = ignoreColors
        this.colorSimilarityThreshold = colorSimilarityThreshold
        this.innerPosMovement = 'random'
        this.innerPosMag = 2

        //fuzz type
        this.shiftCircles = shiftCircles
        this.noisePosZoom = 0.5
        this.noiseSpeed = .01
        this.noisePosMag = 10

        //fuzz movement
        this.doPosNoise = false
        this.doShiftNoise = false

        //get the data for drawing the fuzz
        this.scaledImg = setScaledImage(img)
        this.main_colors = getMainColors(this.scaledImg, this.colorSimilarityThreshold)
        this.colorPointsData = {}
        this.getImageColorPoints()

    }

    drawFuzzyImage(){  
        // shiftMagnitude=((100-frameCount))%100
        for(const [color, points] of Object.entries(this.colorPointsData)){
            strokeWeight(this.fuzzWeight)
            stroke(color)
            for(let [x,y] of points){
                if(this.doPosNoise){
                    let pos_noise = noise(x*this.noisePosZoom,y*this.noisePosZoom, frameCount*this.noiseSpeed)*this.posNoiseMagnitude
                    this.fuzzyTexture(x+pos_noise,y+pos_noise)
    
                }else{
                   this.fuzzyTexture(x,y)
                }  
                
            }
        }
    
    }

    getImageColorPoints(){
        this.scaledImg.loadPixels();

        //initialize color lists
        for(let mainColor of this.main_colors){
            this.colorPointsData[mainColor] = []
        }

        //iterate through the image
        for (let y = 0; y < this.scaledImg.height; y+= this.stepSize) {
            for (let x = 0; x < this.scaledImg.width; x+= this.stepSize) {
              const inputColor = getQuick(this.scaledImg, x,y);
              this.setColorData(inputColor,x,y)
            }
        }
    
    }
    setColorData(inputColor,x,y,){
        for(let ignoreColor of this.ignoreColors){
            if(colorDistance(ignoreColor, inputColor)< 10){
                return
            }
        }
        let min_dist = 1000
        let closest_color = this.main_colors[0]
        for(let mainColor of this.main_colors){
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
        this.colorPointsData[closest_color].push([x,y])
    }

    fuzzyTexture(x,y){
        strokeWeight(this.fuzzWeight)
        noFill()
        
        for(let i= 0; i<this.numIters; i++){
            
            let x_shift, y_shift
            
            if(this.doShiftNoise){
                x_shift = noise(1,x*.5,frameCount*.1)*this.fuzzLength
                y_shift = noise(2,y*.5,frameCount*.1)*this.fuzzLength
            }else{
                x_shift = random(-this.fuzzLength, this.fuzzLength);
                y_shift = random(-this.fuzzLength, this.fuzzLength); 
            }
            if (dist(0, 0, x_shift, y_shift) > this.fuzzLength) continue;
            
            
            if(this.innerPosMovement == 'noise1'){
                let n = noise(x*this.noisePosZoom,y*this.noisePosZoom, frameCount*this.noiseSpeed)
                let angle = n*(2*Math.PI); 
                let r = n*innerPosMag;
                x = x +Math.cos(angle)*r;
                y = y +Math.sin(angle)*r;
            }
            else if(this.innerPosMovement == 'noise'){
                x = x+noise(x*.1,frameCount*this.noiseSpeed)*this.innerPosMag - this.innerPosMag/2
                y = y+noise(y*.1,frameCount*this.noiseSpeed)*this.innerPosMag - this.innerPosMag/2
            }
            
            if(this.shiftCircles){
                ellipse(x,y,x_shift, y_shift)
            }else{
                line(x, y,x+x_shift, y+y_shift);
            }
        }
    }
    


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











function getQuick(img_input, x, y) {
    const i = (y * img_input.width + x) * 4;
    return [
      img_input.pixels[i],
      img_input.pixels[i + 1],
      img_input.pixels[i + 2],
      img_input.pixels[i + 3],
    ];
}

