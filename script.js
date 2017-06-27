var context;
var clickColorList;
var clickSizeList;
var canvasDiv;
var clickXPainted;
var paint;
var clickX;
var clickY;
var clickDrag;
var xOld;
var yOld;
var eventList;

// init. process (called at start)
$(document).ready(function(){

    eventList = new Array();
    xOld = -1;
    yOld = -1;

    paint = false;
    clickX = new Array();
    clickXPainted = new Array();
    clickY = new Array();
    clickDrag = new Array();
    clickColorList = new Array();
    clickSizeList = new Array();

    // drawingColor = document.getElementById("colorpicker").value;
    //clickColorList.push(document.getElementById("colorpicker").value);

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
    context.lineJoin = "round";

    context.shadowBlur = 0.1;
    context.shadowColor = document.getElementById("colorpicker").value;

    // TODO; use value from HTML element
    context.lineWidth = document.getElementById("sizeRange").value;
    context.strokeStyle = document.getElementById("colorpicker").value;
    context.fillStyle = $("#colorpicker").value;

    document.getElementById("canvas").style.cursor = "crosshair";

});

// TODO: radiergummi -> weiße farbe
// TODO: schleife rahmen -> z index
// TODO: other impl. for click than for move
// TODO: hint for line size (circle would be good)
// TODO: pick color from painted area (already painted colors reusable)
// TODO: feature of undoing / redoing action
// TODO: make it possible to activate/deactivate silhouette
// TODO: use multiple silhouettes
// TODO: feature SCREEN DUMP -> png canvas -> ..

// clear the whole canvas AND delete all painted elements (dots)
document.getElementById("clearCanvas").onclick = function () {
    clearWholeCanvas(context);
    clickX = new Array();
    clickXPainted = new Array();
    clickY = new Array();
    clickDrag = new Array();
    updateStrokeSize(document.getElementById("colorpicker").value);
};

function clearWholeCanvas(context) {
    context.clearRect(0, 0, context.canvas.width, context.canvas.height);
    // updateStrokeSize(document.getElementById("colorpicker").value);
}

document.getElementById("canvas").onmousedown = function (e) {

    updateStrokeSize($("#sizeRange").value);

    paint = true;

    var mouseX = e.pageX - this.offsetLeft;
    var mouseY = e.pageY - this.offsetTop;
    context.moveTo(mouseX, mouseY);
    context.beginPath();

};

function drawCircle(x, y, radius) {
    context.fillStyle = document.getElementById("colorpicker").value;
    context.beginPath();
    //setDrawingColorFromColorPicker($("#colorpicker").value);

    context.arc(x, y, radius, 0, 2 * Math.PI, true);

    context.fill();
    context.closePath();
}

document.getElementById("canvas").onmousemove = function (e) {

    var mouseX = e.pageX - this.offsetLeft;
    var mouseY = e.pageY - this.offsetTop;

    if (paint) {
        context.lineTo(mouseX, mouseY);
        // needed! else the lines look like shit
        context.closePath();
        context.stroke();
        context.moveTo(mouseX, mouseY);
    }

};

document.getElementById("canvas").onmouseup = function (e) {
    paint = false;

    // paint the dot on mouseup event -> mousedown had to be called before
    var mouseX = e.pageX - this.offsetLeft;
    var mouseY = e.pageY - this.offsetTop;
    drawCircle(mouseX, mouseY, context.lineWidth / 2);
};


document.getElementById("canvas").onmouseout = function (e) {
    paint = false;
};

function updateStrokeSize(value) {
    //curSize = value;
    context.lineWidth = value;
    context.lineJoin = "round";
}

document.getElementById("clearCanvas").onclick = function () {
    context.clearRect(0, 0, context.canvas.width, context.canvas.height); // Clears the canvas
};

function setDrawingColorFromColorPicker(color) {
    context.strokeStyle = color;
    context.shadowColor = color;
}
