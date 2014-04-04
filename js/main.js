$(document).ready(function () {

    console.log("READY")
    //Canvas stuff
    var canvas = $("#canvas")[0];
    var ctx = canvas.getContext("2d");
    var w = $("#canvas").width();
    var h = $("#canvas").height();

    //Lets save the cell width in a variable for easy control
    var cw = 50;
    var width = w;
    var height = h;

    var kBoardWidth = w;
    var kBoardHeight= h;
    var kPieceWidth = cw;
    var kPieceHeight= cw;

    var gridColor = "#009";

    ctx.strokeStyle = "#009"; // Do this once only
    //drawGrid(ctx,cw);

    function drawGrid(ctx, size) {
        ctx.beginPath();
        ctx.fillStyle = gridColor;

        var XSteps = Math.floor(w / cw);
        var x = 0;
        var len = 0;
        console.log('XSteps', XSteps)

        for (var i = 0, len = XSteps; i < len + 1; i++) {
            ctx.moveTo(x, 0);
            ctx.lineTo(x, w);

            ctx.moveTo(0, x);
            ctx.lineTo(w, x);
            x += cw;
        }
        // similar for y
        ctx.stroke();
    }


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
    ctx.strokeStyle = "#eee";
    ctx.stroke();


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

    function Cell(row, column) {
        this.row = row;
        this.column = column;
    }

    console.log("----------", $('#canvas'));
    $canvas = $('#canvas');

    $canvas.click(function (e) {
        console.log("CLICKED");
        var cell = getCursorPosition(e);
        paint_cell(cell.column, cell.row)
        console.log('pos', cell);
    })


    function getCursorPosition(e) {
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