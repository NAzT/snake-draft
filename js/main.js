
function drawGrid (ctx, width, height, cw) {
    var gridColor = "#eee";

    // verical
    for (var x = 0.5; x < width; x += cw) {
        console.log(x)
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
    var canvas = $("#canvas")[0];
    var ctx = canvas.getContext("2d");
    var width = $("#canvas").width();
    var height = $("#canvas").height();

    //Lets save the cell width in a variable for easy control
    var cw = 50;

    var kBoardWidth = width;
    var kBoardHeight= height;
    var kPieceWidth = cw;
    var kPieceHeight= cw;

    drawGrid(ctx, width, height, cw);

    //Lets first create a generic function to paint cells
    function paint_cell(x, y) {
        ctx.fillStyle = "blue";
        ctx.fillRect(x * cw, y * cw, cw, cw);
        ctx.strokeStyle = "white";
        ctx.strokeRect(x * cw, y * cw, cw, cw);
    }

    for (var i = 10; i < 30; i++) {
        paint_cell(10, i);
        paint_cell(i, 0);
    };

    console.log("----------", $('#canvas'));
    $canvas = $('#canvas');

    $canvas.click(function (e) {
        var cell = getCursorPosition(e);
        paint_cell(cell.column, cell.row)
        console.log('pos', cell);
    })


    function getCursorPosition(e) {

      function Cell(row, column) {
          this.row = row;
          this.column = column;
      }

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