let canvasWidth = 600;
let canvasHeight = 600;
let scaleFactor = 10;


function setup() {
  createCanvas(canvasWidth, canvasHeight);
  let canvasCenterX = canvasWidth/2;
  let canvasCenterY = canvasHeight/2;
  let max_n = (canvasWidth**2 + canvasHeight**2)**.5;

  let primes = primeList(max_n);

  background("#2b2d36");
  noFill();

  for(i =1; i<max_n; i++){
    let r = i**.5
    if(primes.includes(i)){
      strokeWeight(1);
      stroke("white");

      output = checkIfPrimeSumSquare(i)
      if (output != false){
        a = output[0];
        b = output[1];
        
        strokeWeight(2);
        stroke("#d17c36")
        circle(canvasCenterX+a*scaleFactor, canvasCenterY+b*scaleFactor, 2);

        stroke("#add136")
        circle(canvasCenterX-a*scaleFactor, canvasCenterY-b*scaleFactor, 2);

        stroke("#73d1cb")
        circle(canvasCenterX-a*scaleFactor, canvasCenterY+b*scaleFactor, 2);

        stroke("#7381d1")
        circle(canvasCenterX+a*scaleFactor, canvasCenterY-b*scaleFactor, 2);

        stroke("#de578f")
        circle(canvasCenterX+b*scaleFactor, canvasCenterY+a*scaleFactor, 2);

        stroke("#de6657")
        circle(canvasCenterX-b*scaleFactor, canvasCenterY-a*scaleFactor, 2);

        stroke("#dec757")
        circle(canvasCenterX-b*scaleFactor, canvasCenterY+a*scaleFactor, 2);

        stroke("#f0dd7d")
        circle(canvasCenterX+b*scaleFactor, canvasCenterY-a*scaleFactor, 2);
        strokeWeight(.2);

        stroke("white")
        circle(canvasCenterX, canvasCenterY, 2*r*scaleFactor);
      }

    } else {
      strokeWeight(1);
      stroke("grey");
    }
    
  }
  // // line(canvasCenterX, canvasHeight, canvasCenterX, canvasCenterY);


}

function draw() {
}


function primeList(n) {
  let prime_list = []
 
  for (let i=2; i<=n; i++){
    let prime = true
    for (let j=2; j<=(i/2); j++){
      if (i % j == 0){ //found a divisor
        prime = false;
        break;
      }
    }
    //didn't find a divisor so add it as a prime
    if (prime){
      prime_list.push(i)
    } 
    
  }

  return prime_list;
}

function checkIfPrimeSumSquare(p){
  for(a=1; a<p; a ++){
    b = p - (a**2);
    if(b<0){
      return false
    }
    if (floor(b**.5) == b**.5) { //check if its a perfect square
      return [a, b**.5]
    }
  }
  //else didn't find a square root
  return false

}