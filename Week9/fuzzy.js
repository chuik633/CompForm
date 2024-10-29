const width = 500
const height = 500

//toggle visible parts
const showPoints = true
const showLines = true

let colors = ["#FBC307","#E77326","#FE4506", "#ECD305"]

// let colors = [
//     "#7A202C",
//     "#CB6265",
//      "#F0624E",
//      "#E94D39",
//      "#F5A36F",
//      "EEE2BD#",
//      "#F5A36F",
//      "#E94D39",
//      "#F0624E",
//      "#CB6265",
     
// ]

//global info
let grid_points = []

function setup(){
    createCanvas(width, height)
    background("#F6E9E1")
    stroke("#FBC307")

    const points2 = [
        [100,100],
        [100,200],
        [200,200]
    ]
    // const points2 = [
    //     [100,100],
    //     [100,200],
    //     [150,400],
    //     [200,200],

     
    // ]
    
    outline_shape(points2)
    grid_points = getGridPoints(points2, 10, 10)

    // grid_points = getGridPoints(points2, 20, 20)
    


    // noLoop()
}

// function draw(){
//     let colorIdx = Math.floor(frameCount/100)
//     stroke(colors[colorIdx%colors.length])
//     strokeWeight(.01)
//     noFill()

    
//     for(const[x,y] of grid_points){
//         fuzzyCircle(x,y, 2, 50)

//     }
//     // fuzzyCircle(mouseX,mouseY, 20, 15)
//     grid_points.push([mouseX,mouseY])
// }


function fuzzyCircle(x,y,r, shift_bound){
    for(let i= 0; i<2; i++){
        const x_shift = random(-shift_bound, shift_bound);
        const y_shift = random(-shift_bound, shift_bound);
        if (dist(0, 0, x_shift, y_shift) > shift_bound) continue;
        circle(x + x_shift, y + y_shift, r);
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
            console.log(xEndPoint1, xEndPoint2)
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

