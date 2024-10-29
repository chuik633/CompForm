
//save main colors

function colorDistance(c1, c2) {
    c1 = color(c1)
    c2 = color(c2)
    let r1 = red(c1), g1 = green(c1), b1 = blue(c1);
    let r2 = red(c2), g2 = green(c2), b2 = blue(c2);
    let distance = dist(r1, g1, b1, r2, g2, b2);
    return distance;
  }

function getMainColors(input_img, colorSimilarityThreshold){
    let main_colors = []
  //helper functions for determining the main colors
  
  function colorUnique(c){
    for(const existing_color of main_colors){
      if(colorDistance(existing_color, c) < colorSimilarityThreshold){ //if its close enough to another color
        return false
      }
    }
    return true
  }

  if(input_img){
    input_img.loadPixels();
    let stepSize = 1
    for (let y = 0; y < input_img.height; y+=stepSize) {
      for (let x = 0; x < input_img.width; x+=stepSize) {
        const inputColor = input_img.get(x,y);
        if(colorUnique(inputColor)){
          main_colors.push(color(inputColor))
        }
      }
    }

  }
  return main_colors
  
}


