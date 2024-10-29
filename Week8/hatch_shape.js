let t;
const width = 500
const height = 500
const centerX = width/2
const centerY = height/2
const colors = ["#34332F", "#C3BAAF","#FBC307"]

var shapes = []
var mousePoints = []


// create the shape
function mouseClicked(){
  circle(mouseX, mouseY, 3)
  mousePoints.push([mouseX, mouseY])
}

//save the shape
function keyPressed() {
  shapes.push({'points':mousePoints, 'color':random(colors), 'hatch_num': Math.floor(random(10,40))})
  mousePoints = []

  background( "#F0E6DC")
  console.log("drawing shape", shapes)
  for(const shape of shapes){
    if(shape['points'].length>2){
      
      // draw_shape(shape['points'])
      stroke(shape.color)
      hatch_shape(shape.points, shape.hatch_num)
      hatch_shape2(shape.points, shape.hatch_num)
    }
   
  }
}


function setup(){
  createCanvas(width,height)
  angleMode(DEGREES)
  background( "#F0E6DC")
  t = new Turtle();
  t.show();
  
  strokeWeight(.5)
  let points = [
    [100,200],
    [200,300],
    [300,100],
  ]
  // draw_shape(points)
  hatch_shape(points, 50)
  hatch_shape2(points, 50)


}

function hatch_shape(points, num_hatches){
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

function hatch_shape2(points, num_hatches){
  //determine the startx, start y of the hatches
  let all_vals = points.map((p)=> p[1])
  let minY = Math.min(...all_vals);
  let maxY = Math.max(...all_vals);
  let step = (maxY-minY)/num_hatches;
  
  //now i want to add points for each hatch on the shape
  for (let i = 0; i < num_hatches; i++) {
      let y = minY + i * step;

      let intersections = find_intersection(points,y, 'horizontal')
      t.moveTo(intersections[1], y)
      t.penDown()
      t.moveTo(intersections[0], y)
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
  console.log("INTERSECTIONS", intersections)
  if (intersections.length > 0) {
    return [intersections[0], intersections[intersections.length - 1]];
  } else {
      return [null, null];
  }
}


function draw_shape(points){
  console.log("drawing shape inside", points)
  t.penUp()
  t.moveTo(...points[0])
  t.penDown()

  for(const [x,y] of points){
    t.moveTo(x,y)
    stroke(colors[0])
    strokeWeight(4)
    draw_circle(1)
    strokeWeight(.8)
    t.penDown()
  }
  t.moveTo(...points[0])
  t.penUp()

}

function draw_circle(r){
  const steps  = 50
  const angle = 360/steps
  const step_len = (2*Math.PI*r)/steps
  console.log(step_len)
  t.penDown()
  for(var i=0; i<steps; i++ ){
    t.moveForward(step_len)
    t.turnLeft(angle)
  }
  t.penUp()
}


