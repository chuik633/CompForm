let textImg;
let fullImg;
let outlines;
let person;

const width =480
const height = 700

function preload(){
    textImg = loadImage('ski/text.png')
    fullImg = loadImage('ski/nodetail.png')
    outlines = loadImage('ski/outlines.png')
    person = loadImage('ski/person.png')
}


let main_image;
let back_image;
let text_image;


function setup(){
    background("#FCFBE9")
    createCanvas(width,height)
    back_image = new FuzzyImage(
        fullImg,
        width, 
        height, 
        10, //fuzz length
        .1,  //fuzz weight
        4, //step size
        20, //num iters
        true,  //circles
        [],
        80 //similarity threshold
       )

       back_image.drawFuzzyImage()
    main_image = new FuzzyImage(
         fullImg,
         width, 
         height, 
         30, //fuzz length
         .05,  //fuzz weight
         2, //step size
         10, //num iters
         false,  //circles
         [],//ignore colors
         80 //similarity threshold

        )

    main_image.drawFuzzyImage()
    text_image = new FuzzyImage(
        textImg,
        width, 
        height, 
        50, //fuzz length
        .2,  //fuzz weight
        2, //step size
        10, //num iters
        true,  //circles
        [],//ignore colors
        100 //similarity threshold
       )
    
}
function draw(){
    main_image.fuzzLength = noise(frameCount*.1)*40
    main_image.drawFuzzyImage()

    text_image.fuzzLength = noise(frameCount*.1)*20+10
    text_image.fuzzWeight = noise(frameCount*.1)*.3 + .1
    text_image.drawFuzzyImage()

}

