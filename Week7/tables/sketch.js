// language paperscript
// require https://cdnjs.cloudflare.com/ajax/libs/paper.js/0.12.15/paper-full.min.js
var angle = 50
var background_color = "#E7E2DF"
var colors = [
    ["#E1DAA6","#496A41"],
    ["#5678A5","#E7DECC"],
    ["#CCD7B4","#F29848"],
    ["#884341","#D6C384"],
    ["#E8B63F","#ED7B2B"],
]

function angle_to_point(x0,y0, angle, l){
    var radians = angle * (Math.PI / 180);
    var x1 = x0 + l * Math.cos(radians);
    var y1 = y0 - l * Math.sin(radians);

    return [x1,y1]
}

function draw_slant_rect(x0, y0,l, w ,h, colorIdx){
    var fill = colors[colorIdx][0]
    var stroke = colors[colorIdx][1]

    //draw the top rectangle
    var point = angle_to_point(x0,y0,angle, l)
    var x1 = point[0], y1 = point[1];
    var top_points = [
        new Point(x0,y0),
        new Point(x0+w,y0),
        new Point(x1+w,y1),
        new Point(x1,y1)
    ]
    var top_rect = new Path({
        segments: top_points,
        closed: true, 
        fillColor: fill, 
        strokeColor: stroke,
    });
     

    //draw the side rectangle
    var side_points = [
        new Point(x0+w,y0),
        new Point(x1+w,y1),
        new Point(x1+w,y1+h),
        new Point(x0+w,y0+h)
    ]
    var side_rect = new Path({
        segments: side_points,
        closed: true, 
        fillColor: fill, 
        strokeColor: stroke,
    });

    //draw the front rectanlge
    var front_points = [
        new Point(x0,y0),
        new Point(x0+w,y0),
        new Point(x0+w,y0+h),
        new Point(x0,y0+h)
    ]
    var front_rect = new Path({
        segments: front_points,
        closed: true, 
        fillColor: fill, 
        strokeColor: stroke,
    });

}

function draw_table(x0,y0, length, width, height, thickness, colorIdx){
  
    var point = angle_to_point(x0,y0,angle, length)
    var x1 = point[0], y1 = point[1];
    
    var back_legs = angle_to_point(x1,y1,angle, -thickness)
    var x2 = back_legs[0], y2 = back_legs[1];


    //table legs (back)
    draw_slant_rect(
        x2 ,
            y2 ,
            thickness, thickness, height, colorIdx)
    draw_slant_rect(
        x2+width - thickness,
            y2,
            thickness, thickness, height, colorIdx)

    //table legs (front)
    draw_slant_rect(
        x0, 
        y0, 
        thickness, thickness, height, colorIdx)
    
    draw_slant_rect(
        x0+width - thickness,
        y0, 
        thickness, thickness, height, colorIdx)

    //table top
    draw_slant_rect(x0,y0, length, width, thickness, colorIdx)
}


var gap = 150
var cellW = 50
var cellH = 50
for(var i = 0; i < 5; i++){
    for (var j = 0; j < 5 ; j++){
        var colorIdx = Math.floor(Math.random() * 5);
        var table_H = Math.random()*cellH

        draw_table(
            100 + (cellW + gap)*j, //x 
            200 + (cellH + gap)*i, //y
            Math.random()*cellW, //length
            Math.random()*cellW, //width
            table_H,
            Math.random()*10,
            colorIdx

        )

    }
}

