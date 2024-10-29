let t;
const width = 500
const height = 500
const centerX = width/2
const centerY = height/2

let speed = 5
let turnPoints = []
let points = []
let currentpoints = []
let shapes = []

let colors = ['#FBC307', '#F1734B', 'black', 'white']
// colors = ['hatch']

function setup(){
  createCanvas(width,height)
  angleMode(DEGREES)
  background( "#F0E6DC")
  t = new Turtle();
  t.turnLeft(90)
  t.show();

}


function saveTurtleState(){
  if(t.isPenDown){
    const turtle_point = {"x":t.x, "y":t.y}
    //big points
    turnPoints.push(turtle_point)

    //current shape points
    currentpoints.push(turtle_point)

    //all points
    points.push(turtle_point)

  }
  

}
function keyPressed() {
  if(keyCode == ENTER){
    if(t.isPenDown){
      t.penUp()
    }else{
      t.penDown()
    }
  }
  if (keyCode === UP_ARROW) {
    t.turnTo(180+90)
    saveTurtleState()
  } else if (keyCode === DOWN_ARROW) {
    t.turnTo(90)
    saveTurtleState()
  }else if (keyCode === LEFT_ARROW) {
    t.turnTo(90+90)
    saveTurtleState()

  }else if (keyCode === RIGHT_ARROW) {
    t.turnTo(-90+90)
    saveTurtleState()
  }


  
}

function updatePoints(){
  for(const point of points){
    if(t.x == point.x && t.y == point.y){
      console.log("intersection")
      //draw intersection point
      fill('white')
      stroke("black")
      circle(point.x, point.y, 4)

      //save to add to list of points
      turnPoints.push({"x":t.x, "y":t.y})
      let shape_points = [...currentpoints, {"x":t.x, "y":t.y}]

      //save the points as shape
      shapes.push({"points":shape_points, "color":random(colors)})
      currentpoints = []
    }
  }
  console.log(shapes.length)

}

function draw() {
  for(const shape of shapes){
    if(shape.color == 'hatch'){
      // console.log(shape)
      hatch_shape(shape.points, 10)
    }else{
      fill(shape.color)
      beginShape()
      for(const p of shape.points){
        vertex(p.x,p.y)
      }
      endShape(CLOSE)

    }
  }
  //draw state
  for(const point of turnPoints){
    fill('black')
    circle(point.x, point.y, 4)
  }

  //move things
  strokeWeight(.5)
  if (keyIsDown(UP_ARROW) == true || keyIsDown(DOWN_ARROW) == true || keyIsDown(LEFT_ARROW) == true || keyIsDown(RIGHT_ARROW) == true) {
    if(t.x < width-10 && t.x >10){
      t.moveForward(speed)
    }else{
      t.turnRight(180)
      t.moveForward(speed)
    }

    if(t.y < height-10 && t.y >10){
      t.moveForward(speed)
    }else{
      t.turnRight(180)
      t.moveForward(speed)
    }

    //save thi movement increment as a point
    if(t.isPenDown){
      updatePoints()
      points.push({"x":t.x, "y":t.y})
    }
   
  } 

  
}

function hatch_shape(map_points, num_hatches){
  let points = []
  for(const point of map_points){
    points.push([point.x, point.y])
  }
  console.log(points)

  //determine the startx, start y of the hatches
  let allX_vals = points.map((p)=> p[0])
  let minX = Math.min(...allX_vals);
  let maxX = Math.max(...allX_vals);
  let step = (maxX-minX)/num_hatches;
  
  //now i want to add points for each hatch on the shape
  for (let i = 0; i < num_hatches; i++) {
      let x = minX + i * step;

      let intersections = find_intersection(points,x, 'vertical')
      t.moveTo(x, intersections[1])
      t.penDown()
      t.moveTo(x,intersections[0])
      t.penUp()
  }
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
