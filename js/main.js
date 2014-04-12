remove_flag = true
var speed = 5  ;

var GLOBAL_SETTINGS = {
    width: 450,
    height: 450,
    MAX_ROW: 20,
    MAX_COL: 20,
}


var get_cw = function (settings) {
    return settings.width / settings.MAX_ROW
}

function Cell(row, column) {
  this.row = row;
  this.column = column;

  this.mutate = function(val) {
    this.row = val.row;
    this.column = val.column
  }

  this.correct_cell = function() {
    this.row = this.row % GLOBAL_SETTINGS.MAX_ROW;
    this.column %= GLOBAL_SETTINGS.MAX_COL;

    if (this.row <0) {
        this.row = GLOBAL_SETTINGS.MAX_ROW;
    }

    if (this.column < 0) {
        this.column = GLOBAL_SETTINGS.MAX_COL;
    }

  }

}



var DirectionManager = function () {
    var DIRECTION_STRING = {
        107: 'UP',
        106: 'DOWN',
        104: 'LEFT',
        108: 'RIGHT'
    }

    var DIRECTION = {
        UP: 107,
        DOWN: 106,
        LEFT: 104,
        RIGHT: 108
    }

    var _heading = DIRECTION.RIGHT;

    this.get_heading_direction_string = function() {
        return DIRECTION_STRING[_heading];
    }

    this.get_heading_direction = function() {
        return _heading; 
    }

    this.set_heading_direction = function(charCode) {
        switch(charCode) {
            case DIRECTION.LEFT:
                if (_heading != DIRECTION.RIGHT) {
                    _heading = DIRECTION.LEFT;
                }
                break;
            case DIRECTION.DOWN:
                if (_heading != DIRECTION.UP) {
                    _heading = DIRECTION.DOWN;
                }
    
                break;
            case DIRECTION.UP:
                if (_heading != DIRECTION.DOWN) {
                    _heading = DIRECTION.UP;
                }
                break;
            case DIRECTION.RIGHT:
                if (_heading != DIRECTION.LEFT) {
                    _heading = DIRECTION.RIGHT;
                }
                break;
        }
    }

    this.heading = function(direction) {
        return _heading == DIRECTION[direction.toUpperCase()];
    }

}

var direction_mngr = new DirectionManager();
var snake_action = {
    DOWN: function(snake) {
        snake.row++;
    },
    UP: function(snake) {
        snake.row--;
    },
    LEFT: function(snake) {
        snake.column--;
    },
    RIGHT: function(snake) {
        snake.column++;
    }
}


var draw_squares = function (squares, opts) {
    squares.forEach(function (c, k) {
        var options = {row: c.row, column: c.column, color: opts.color}
        DRAWER.paint_cell(opts.canvas, options);
    })
}

var get_prepared_canvas = function(canvas_id) {

    var canvas = document.getElementById(canvas_id || 'canvas')

    canvas.width = GLOBAL_SETTINGS.width;
    canvas.height = GLOBAL_SETTINGS.height;

    return canvas;
}

function getCursorPosition(e) {
    var gCanvasElement = get_prepared_canvas();

    var kBoardWidth = GLOBAL_SETTINGS.width;
    var kBoardHeight= GLOBAL_SETTINGS.height;

    var kPieceWidth = get_cw(GLOBAL_SETTINGS);
    var kPieceHeight= get_cw(GLOBAL_SETTINGS);
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

$(document).ready(function () {

    var width = GLOBAL_SETTINGS.width;
    var height = GLOBAL_SETTINGS.height;

    var canvas = get_prepared_canvas();
    ctx = canvas.getContext("2d");
    canvas = DRAWER.drawGrid(canvas)

    //Lets save the cell width in a variable for easy control
    var COL = GLOBAL_SETTINGS.MAX_COL;
    var ROW = COL;
    var cw = get_cw(GLOBAL_SETTINGS);


    window.snake = [];
    window.foods = [];
    snake[0] = new Cell(0, 1)
    snake[1] = new Cell(0, 2)
    snake[2] = new Cell(0, 3)
    snake[3] = new Cell(0, 4)

    foods = [new Cell(4, 5), new Cell(6, 6)]

    draw = function draw(argument) {
        var head = snake[0];

        foods.forEach(function(c, k) {
          if (c.row == head.row && c.column == head.column) {
            snake.push(foods[k]);
            var cell = new Cell(Math.round(Math.random()*100 % ROW), Math.round(Math.random()*100 % ROW))
            foods[k] = cell;
            speed++;
            if(typeof game_loop != "undefined")  clearInterval(game_loop);
            game_loop = setInterval(draw, 1000/speed);
          }

        });


        // remove tail

        var tail = snake.pop();

        DRAWER.paint_cell(canvas, {row: tail.row, column: tail.column, color: 'white'});

        tail.mutate({row: head.row, column: head.column})

        var heading = direction_mngr.get_heading_direction_string();
        var current_snake_direction = direction_mngr.get_heading_direction_string();

        snake_action[current_snake_direction](tail);

        tail.correct_cell();

        snake.unshift(tail);


        draw_squares(foods, { canvas: canvas, color: 'red'})
        draw_squares(snake, { canvas: canvas, color: 'blue'})


    }

    if(typeof game_loop != "undefined")  clearInterval(game_loop);
    game_loop = setInterval(draw, 1000/speed);


    window.remove_cell = function (x, y) {
        DRAWER.paint_cell(canvas, {row: x, column:  y, color: "white"});
    }


    $canvas = $('#canvas');

    $canvas.click(function (e) {
        var cell = getCursorPosition(e);
        var options = { row: cell.row, column: cell.column, color: 'green'};
        DRAWER.paint_cell(canvas, options)
    })

    // $canvas.mousemove(function (e) {
    //     var cell = getCursorPosition(e);
    //     var options = { row: cell.row, column: cell.column};
    //     if (remove_flag == true) {
    //         options.color = 'white'
    //         DRAWER.paint_cell(canvas, options)
    //     }
    //     else {
    //         options.color = 'red'
    //         DRAWER.paint_cell(canvas, options)
    //     }
    // })


    $('body').on('keypress', function (e) {
        direction_mngr.set_heading_direction(e.charCode);
    })

})


var DRAWER = (function (GLOBAL_SETTINGS) {
    function drawGrid(canvas, options) {
        options = jQuery.extend(GLOBAL_SETTINGS, options)
        var width = options.width || 300;
        var height = options.height || 300;
        var row = options.MAX_ROW|| 10;
        var col = options.MAX_COL || 10;
        var cw = get_cw(options);
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


    //Lets first create a generic function to paint cells
    var paint_cell = function(canvas, options) {
        options = jQuery.extend(GLOBAL_SETTINGS, options)
        var width = options.width || 300;
        var height = options.height || 300;
        var color = options.color || 'blue';

        var row = options.row || options.x || 0 ;
        var col = options.column || options.y || 0;
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
    return {
        drawGrid: drawGrid,
        paint_cell: paint_cell 
    }
})(GLOBAL_SETTINGS)
