
function Cell(row, column) {
  this.row = row;
  this.column = column;
}

function drawGrid (ctx, width, height, cw) {
    var gridColor = "#eee";

    // verical
    for (var x = 0.5; x < width; x += cw) {
        // console.log(x)
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
    }

    // horizontal
    for (var y = 0.5; y < height; y += cw) {
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
    }

    ctx.strokeStyle = gridColor;
    ctx.stroke();
}


$(document).ready(function () {
    window.snake = 
    draw = function draw(argument) {
        console.log("DRAWING");
    }
    speed = 10;
    if(typeof game_loop != "undefined")  clearInterval(game_loop); 
    game_loop = setInterval(draw, 1000/speed);

    var width = 400;
    var height = 400;
    var canvas = $("#canvas")[0];
    canvas.width = width;
    canvas.height = height;
    var ctx = canvas.getContext("2d");


    //Lets save the cell width in a variable for easy control
    var COL = 10;
    var ROW = 5;
    var cw = width/COL;
    var ch = width/ROW;

    var kBoardWidth = width;
    var kBoardHeight= height;
    var kPieceWidth = cw;
    var kPieceHeight= cw;

    drawGrid(ctx, width, height, cw);

    //Lets first create a generic function to paint cells
    window.paint_cell = function(x, y, color) {
        ctx.fillStyle = color || "blue";
        ctx.fillRect(x * cw, y * cw, cw, cw);
        //ctx.strokeStyle = "white";
        ctx.strokeRect(x * cw, y * cw, cw, cw);

        return new Cell(y, x);

    }

    window.remove_cell = function (x, y) {
        paint_cell(x, y, "white");
    }

    for (var i = 0; i < 1; i++) {
        console.log(paint_cell(0, i));
        //paint_cell(i, 0);
    };

    $canvas = $('#canvas');

    $canvas.click(function (e) {
        var cell = getCursorPosition(e);
        paint_cell(cell.column, cell.row)
        console.log('pos', cell);
    })


    function getCursorPosition(e) {
      console.log("ON E", e);
      var gCanvasElement = $canvas[0];
        /* returns Cell with .row and .column properties */
        var x;
        var y;
        if (e.pageX != undefined && e.pageY != undefined) {
            x = e.pageX;
            y = e.pageY;
        } else {
            x = e.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
            y = e.clientY + document.body.scrollTop + document.documentElement.scrollTop;
        }
        x -= gCanvasElement.offsetLeft;
        y -= gCanvasElement.offsetTop;
        x = Math.min(x, kBoardWidth * kPieceWidth);
        y = Math.min(y, kBoardHeight * kPieceHeight);
        console.log(x, y)
        var cell = new Cell(Math.floor(y / kPieceHeight), Math.floor(x / kPieceWidth));
        return cell;
    }

})