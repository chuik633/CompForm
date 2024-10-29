// create the circle to test this thing
var circle = new Path.Circle(new Point(300,300),300)
circle.fillColor = '#FBC307';


//svg
var svgItem = project.importSVG(document.getElementById('svg').innerHTML);
svgItem.position = view.center;
svgItem.scale(2.2);

//svg version 2
var svg = project.importSVG(document.getElementById('svg'));
console.log(svg)
console.log(svg._children)
var svg_paths  = []
console.log(svg._children.length)
for(var i = 0; i< svg._children.length; i++){
    var child = svg._children[i]
    if(child instanceof Path){
        svg_paths.push(child)
    }
    
}

//circle for the mouse
var mouse_circle = new Path.Circle(view.center,120)
mouse_circle.fillColor = '#E77326';
// mouse_circle.blendMode = "multiply"

var mouse_circle_2 = new Path.Circle(view.center,50)
mouse_circle_2.fillColor = '#E77326';
mouse_circle_2.blendMode = 'multiply';
//track the mouse
function onMouseMove(event) {
    subtractShape(circle, event, "#1F2120")
    // subtractShape(svgItem, event)
    for(var i=0;i<svg_paths.length; i++){
        subtractShape(svg_paths[i], event)
    }

}

function subtractShape(path, event){
    mouse_circle.position = event.point
    var subtract_mouse_shape = mouse_circle.subtract(path)
    subtract_mouse_shape.fillColor= path.fillColor;
    subtract_mouse_shape.removeOnMove();

    mouse_circle_2.position = event.point
    var subtract_mouse_shape2= mouse_circle_2.subtract(path)
    subtract_mouse_shape2.fillColor= path.fillColor;
    subtract_mouse_shape2.removeOnMove();


}
