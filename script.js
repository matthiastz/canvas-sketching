
var context;

var clickColorList;

var clickSizeList;

var canvasDiv;


var curSize = 5;

// init. process (called at start)
$(document).ready(function(){

    paint = false;
    clickX = new Array();
    clickY = new Array();
    clickDrag = new Array();
    clickColorList = new Array();
    clickSizeList = new Array();

    // drawingColor = document.getElementById("colorpicker").value;
    clickColorList.push(document.getElementById("colorpicker").value);

    // NEW canvas init.
    canvasDiv = document.getElementById("canvasDiv");
    //canvas = document.createElement("canvas");
    //canvas.setAttribute('width', "640px");
    //canvas.setAttribute('height', "480px");
    //canvas.setAttribute('id', 'canvas');
    //canvasDiv.appendChild(canvas);
    //if(typeof G_vmlCanvasManager != 'undefined') {
      //  canvas = G_vmlCanvasManager.initElement(canvas);
    //}

    context = document.getElementById("canvas").getContext("2d");
    context.lineWidth = 5;
});


$("#canvas").mousedown(function(e) {

    //var mouseX = e.pageX - this.offsetLeft;
    //var mouseY = e.pageY - this.offsetTop;

    var mouseX = e.pageX - this.offsetLeft;
    var mouseY = e.pageY - this.offsetTop;

    paint = true;
    addClick(mouseX, mouseY);
    redraw();
});



// TODO: add menu color, paint stroke size
/*
$("#smaller").click(function () {
    curSize--;
    clickSizeList.push(curSize);
    //context.lineWidth--;
});

$("#bigger").click(function () {
    curSize++;
    clickSizeList.push(curSize);
});
*/

$("#canvas").mousemove(function(e) {

    // if already was painted (mouse clicked + hold) then continue drawing
    if(paint) {

        // TODO: write method to calculate actual mouse pos
        addClick(e.pageX - this.offsetLeft, e.pageY - this.offsetTop, true);
        redraw();

    }

});

// TODO: calculate pos correct

// TODO: init + update color correct

$("#canvas").mouseup(function(e) {
    paint = false;
});

$('#canvas').mouseleave(function(e){
    paint = false;
});

function addClick(x, y, dragging) {

    // push the elements to the arrays
    clickX.push(x);
    clickY.push(y);
    clickDrag.push(dragging);

    // push the current size
    //clickSizeList.push(curSize);
    clickSizeList.push(document.getElementById("sizeRange").value);


    clickColorList.push(document.getElementById("colorpicker").value);
}

var clickX = new Array();
var clickY = new Array();
var clickDrag = new Array();
var paint;


// clear the whole canvas AND delete all painted elements (dots)
document.getElementById("clearCanvas").onclick = function () {
    clearWholeCanvas();
    clickX = new Array();
    clickY = new Array();
    clickDrag = new Array();
};

function clearWholeCanvas() {
    context.clearRect(0, 0, context.canvas.width, context.canvas.height);
}

// TODO: radiergummi -> weiße farbe

// schleife rahmen -> z index

function redraw() {
    // TODO: more efficient implementation (clear whole canvas, redraw everything)

    // Clears the canvas
    //clearWholeCanvas();
  

  context.lineJoin = "round";
  //context.lineWidth = 10;

  // TODO: source of problem -> everything gets repainted -> every stroke width is now overwritten
  for(var i=0; i < clickX.length; i++) {
      context.beginPath();
      if(clickDrag[i] && i){
        context.moveTo(clickX[i-1], clickY[i-1]);   // move painter to pos ....
      } else {
        context.moveTo(clickX[i]-1, clickY[i]);
      }
      context.lineTo(clickX[i], clickY[i]);     // draw a line to x / y
      context.closePath();
      context.strokeStyle = clickColorList[i];
      //context.lineWidth = radius;

      context.lineWidth = clickSizeList[i];
      //context.strokeStyle = drawingColor;
      context.stroke();
  }

}



// retrieve the selected color from the color picker
function setDrawingColorFromColorPicker(color) {
    //drawingColor = color;
    clickColorList.push(color);
}

/*

var context;
var canvas;

$(document).ready(function(){


    context = document.getElementById("canvas").getContext("2d");
});

$("#canvas").mousedown(function(e){

    var mouseX = e.pageX - this.offsetLeft;
    var mouseY = e.pageY - this.offsetTop;

    paint = true;
    addClick(mouseX, mouseY);
    redraw();
});

$("#canvas").mousemove(function(e){
    if(paint){
        addClick(e.pageX - this.offsetLeft, e.pageY - this.offsetTop, true);
        redraw();
    }
});

$("#canvas").mouseup(function(e){
    paint = false;
});

$("#canvas").mouseleave(function(e){
    paint = false;
});

var clickX = new Array();
var clickY = new Array();
var clickDrag = new Array();
var paint;

function addClick(x, y, dragging)
{
    clickX.push(x);
    clickY.push(y);
    clickDrag.push(dragging);
}

function redraw(){
    context.clearRect(0, 0, context.canvas.width, context.canvas.height); // Clears the canvas

    context.strokeStyle = "#df4b26";
    context.lineJoin = "round";
    context.lineWidth = 5;

    for(var i=0; i < clickX.length; i++) {
        context.beginPath();
        if(clickDrag[i] && i){
            context.moveTo(clickX[i-1], clickY[i-1]);
        }else{
            context.moveTo(clickX[i]-1, clickY[i]);
        }
        context.lineTo(clickX[i], clickY[i]);
        context.closePath();
        context.stroke();
    }
}

*/



