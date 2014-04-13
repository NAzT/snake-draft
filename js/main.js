remove_flag = true
var speed = 1  ;


var direction_mngr = new DirectionManager();

var Cell = generate_cell({
    width: 450,
    height: 450,
    MAX_ROW: 20,    
    MAX_COL: 20,
});

var DRAWER = DrawerManager.get_drawer({
    width: 450,
    height: 450,
    MAX_ROW: 20,    
    MAX_COL: 20,
});




Array.prototype.hasCell = function(item) {
    this.forEach(function(c, k) {
        // console.log(c, item)
        if (item.row == c.row && item.column == c.column) {
            return true;
        }
    });
}

$(document).ready(function () {
    var canvas = DRAWER.get_prepared_canvas();
    ctx = canvas.getContext("2d");

    canvas = DRAWER.draw_grid(canvas);




    window.snake = [];
    window.foods = [];
    snake[0] = new Cell(0, 1)
    snake[1] = new Cell(0, 2)
    snake[2] = new Cell(0, 3)
    snake[3] = new Cell(0, 4)

    foods = [new Cell(4, 5), new Cell(6, 6)]

    draw = function draw(argument) {
        var head = snake[0];

        // eat food
        foods.forEach(function(c, k) {
          if (c.row == head.row && c.column == head.column) {
            snake.push(foods[k]);
            foods[k] = (new Cell()).random()
            speed++;
            if(typeof game_loop != "undefined")  clearInterval(game_loop);
            game_loop = setInterval(draw, 1000/speed);
          }

        });


        // remove tail

        var tail = snake.pop();

        DRAWER.paint_cell(canvas, {row: tail.row, column: tail.column, color: 'white'});

        tail.mutate({row: head.row, column: head.column})


        var current_snake_direction = direction_mngr.get_heading_direction_string();

        snake_action[current_snake_direction](tail);

        snake.unshift(tail);


        DRAWER.draw_squares(foods, { canvas: canvas, color: 'red'})
        DRAWER.draw_squares(snake, { canvas: canvas, color: 'blue'})


    }

    if(typeof game_loop != "undefined")  clearInterval(game_loop);
    // game_loop = setInterval(draw, 1000/speed);





    $canvas = $('#canvas');

    $canvas.click(function (e) {
        var cell = DRAWER.get_cursor_position(e);
        var options = { row: cell.row, column: cell.column, color: 'green'};
        // DRAWER.draw_grid($canvas[0])
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
