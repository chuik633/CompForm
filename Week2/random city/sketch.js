

const padding = 100
const between = 20

var numRows;
var numCols;
var rowColData;

function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);
  background("black")
  translate(-windowWidth/2,-windowHeight/2)  

  //all the random values are created at setup and then saved
  numRows = random(3,10)
  numCols = random(2,5)

  const wWidth = (windowWidth - 2*padding)/numCols
  const wHeight =(windowHeight - 2*padding)/numRows

  rowColData = [] //save the row Column info

  for(let i = 0; i < numRows; i ++){
    for(let j = 0 ; j< numCols; j ++){
      const wRows = round(random(2, 5))
      const wCols = round(random(2, 5))
      rowColData.push([wRows,wCols])
      windowShape(
              padding + j*(wWidth),
              padding + i*(wHeight), 
              wWidth-between, 
              wHeight - between,
              wRows,
              wCols)
    }
  }


}



function windowShape(x, y, width, height, rows, cols, color = 'white'){
  const gap = 2
  
  const cellWidth = round(width/cols)
  const cellHeight = round(height/rows)

  fill(color)
  for(let i = 0; i< rows; i++){
    for(let j=0; j<cols; j++){
      rect(x + j*(cellWidth),
          y + i*(cellHeight), 
          cellWidth -gap, 
          cellHeight - gap)

    }
  }

}

function draw() {

  const wWidth = (windowWidth - 2*padding)/numCols
  const wHeight =(windowHeight - 2*padding)/numRows
  translate(-windowWidth/2,-windowHeight/2)  

  let index = 0
  for(let i = 0; i < numRows; i ++){
    for(let j = 0 ; j< numCols; j ++){
      const [wRows, wCols] = rowColData[index]
      console.log(rowColData)

      //randomly flicker the windows every 10 milliseconds
      let color
      let light_on = random([2,1,1,1,1,1,1,1,0])
      if (light_on == 1){
        color='#232323'
      }
      else if (light_on == 2){
        color='#E4D569'
      }
      else {
         color = "white"
      }


      
      index++
      windowShape(
              padding + j*(wWidth),
              padding + i*(wHeight), 
              wWidth-between, 
              wHeight - between,
              wRows,
              wCols,
              color)
    }
  }
  
  
}
