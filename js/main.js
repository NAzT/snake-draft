remove_flag = true
var speed = 10;
var direction = {
    UP: 107,
    DOWN: 106,
    LEFT: 104,
    RIGHT: 108
}

var GLOBAL_SETTINGS = {
    width: 600,
    height: 600,
    MAX_ROW: 20,
    MAX_COL: 20,
}

var heading = direction.DOWN;

function Cell(row, column) {
  this.row = row;
  this.column = column;
}

$(document).ready(function () {
    var width = 400;
    var height = 400;
    var canvas = $("#canvas")[0];
    ctx = canvas.getContext("2d");
    canvas.width = width;
    canvas.height = height;

    canvas = drawGrid(canvas, GLOBAL_SETTINGS)

    //Lets save the cell width in a variable for easy control
    var COL = 20;
    var ROW = COL;
    var cw = width/COL;

    var kBoardWidth = width;
    var kBoardHeight= height;
    var kPieceWidth = cw;
    var kPieceHeight= cw;


    window.snake = [];
    window.food = [];
    snake[0] = new Cell(0, 1)
    snake[1] = new Cell(0, 2)
    snake[2] = new Cell(0, 3)
    snake[3] = new Cell(0, 4)

    foods = [new Cell(5,5), new Cell(6, 6)]

    draw = function draw(argument) {
        var head = snake[0];

        var x_h = head.row
        var y_h = head.column

        if (x_h > COL) {
            x_h = 0;
        }

        if (y_h > ROW) {
            y_h = 0;
        }


        foods.forEach(function(c, k) {
          if (c.row == head.row && c.column == head.column) {
            snake.push(foods[k]);
            var cell = new Cell(Math.round(Math.random()*100 % ROW), Math.round(Math.random()*100 % ROW))
            foods[k] = cell;
          }

        });

        var pc = snake.pop();

        var options = jQuery.extend(GLOBAL_SETTINGS, 
            {row: pc.row, column: pc.column, color: 'white'});

        paint_cell(canvas, options);

        pc.row = head.row
        pc.column = head.column

        if (heading == direction.DOWN) {
            pc.row++;
        }
        else if (heading == direction.UP) {
            pc.row--;
            if (pc.row < 0) {
                pc.row = ROW-1
            }
        }
        else if (heading == direction.LEFT) {
            pc.column--;
            if (pc.column < 0) {
                pc.column = COL-1
            }
        }
        else if (heading == direction.RIGHT) {
            pc.column++;
        }

        pc.row = pc.row % ROW
        pc.column = pc.column % COL
        snake.unshift(pc);



        snake.forEach(function (c, k) {
            var options = {row: pc.row, column: pc.column, color: 'blue'}
            paint_cell(canvas, options)
        })


        foods.forEach(function(c, k) {
          var options = {row: c.row, column: c.column, color: 'red'}
          paint_cell(canvas, options);
        })


    }
    if(typeof game_loop != "undefined")  clearInterval(game_loop);
    game_loop = setInterval(draw, 1000/speed);

    //drawGrid(ctx, width, height, cw);


    //Lets first create a generic function to paint cells
    window.paint_cell = function(canvas, options) {
        options = jQuery.extend(GLOBAL_SETTINGS, options)
        console.log("OPTIONS", options)
        var width = options.width || 300;
        var height = options.height || 300;
        var color = options.color || 'blue';
        var row = options.row;
        var col = options.column;
        var column = col;

        var cw = width/options.MAX_ROW;
        var gridColor = options.color || "#eee";
        var ctx = canvas.getContext("2d");

        jQuery.extend(ctx, { fillStyle: color || "black" })

        settings = {
              fillRect: [column * cw, row * cw, cw, cw],
            strokeRect: [column * cw, row* cw, cw, cw]
        }

        jQuery.each(settings, function(k, v) {
             ctx[k].apply(ctx, v);
        })
 
        return new Cell(row, column);

    }

    window.remove_cell = function (x, y) {
        paint_cell(canvas, {row: x, column:  y, color: "white"});
    }


    $canvas = $('#canvas');

    $canvas.click(function (e) {
        var cell = getCursorPosition(e);
        var options = jQuery.extend(GLOBAL_SETTINGS, { row: cell.row, column: cell.column})
        paint_cell(canvas, options)
        remove_flag = !remove_flag;
    })

    $canvas.mousemove(function (e) {
        var cell = getCursorPosition(e);
        var options = jQuery.extend(GLOBAL_SETTINGS, { row: cell.row, column: cell.column});
        if (remove_flag == true) {
            options.color = 'white'
            paint_cell(canvas, options)
        }
        else {
            options.color = 'red'
            paint_cell(canvas, options)
        }
    })


    $('body').on('keypress', function (e) {
        switch(e.charCode) {
            //h
            // left
            case direction.LEFT:
                if (heading != direction.RIGHT) {
                    heading = direction.LEFT;
                }
                break;
            //j
            //down
            case direction.DOWN:
                if (heading != direction.UP) {
                    heading = direction.DOWN;
                }
                break;
            //k
            //up
            case direction.UP:
                if (heading != direction.DOWN) {
                    heading = direction.UP;
                }
                break;
            //l
            //right
            case direction.RIGHT:
                if (heading != direction.LEFT) {
                    heading = direction.RIGHT;
                }
                break;
        }
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
        var row = Math.floor(y / kPieceWidth);
        var column = Math.floor(x / kPieceHeight);
        var cell = new Cell(row, column);
        return cell;
    }

})


function drawGrid(canvas, options) {
    var width = options.width || 300;
    var height = options.height || 300;
    var row = options.MAX_ROW|| 10;
    var col = options.MAX_COL || 10;
    var cw = width/row;
    var gridColor = options.color || "#eee";

    var ctx = canvas.getContext("2d");
    canvas.width = width;
    canvas.height = height;

    // verical
    for (var x = 0.5; x < width; x += cw) {
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

    return canvas;
}
