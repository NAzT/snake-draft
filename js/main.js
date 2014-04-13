remove_flag = true
var speed = 5;


var direction_mngr = new DirectionManager();

var Cell = generate_cell({
    width: 450,
    height: 450,
    MAX_ROW: 20,    
    MAX_COL: 20,
});

var SNAKE = DrawerManager.get_drawer({
    width: 450,
    height: 450,
    MAX_ROW: 20,    
    MAX_COL: 20,
});

var PAINTER = DrawerManager.get_drawer({
    width: 450,
    height: 450,
    MAX_ROW: 20,    
    MAX_COL: 20,
});


var canvas = SNAKE.get_prepared_canvas();
jQuery('#container').append(canvas);
canvas = SNAKE.draw_grid(canvas);

window.snake = [];
window.foods = [];
snake[0] = new Cell(0, 1)
snake[1] = new Cell(0, 2)
snake[2] = new Cell(0, 3)
snake[3] = new Cell(0, 4)

foods = [new Cell(4, 5), new Cell(6, 6)]

var draw = function () {
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

    SNAKE.paint_cell(canvas, {row: tail.row, column: tail.column, color: 'white'});

    tail.mutate({row: head.row, column: head.column})


    // update snake's heading direction
    snake_action[direction_mngr.get_heading_direction_string()](tail);

    snake.unshift(tail);


    SNAKE.draw_squares(foods, { canvas: canvas, color: 'red'})
    SNAKE.draw_squares(snake, { canvas: canvas, color: 'blue'})    

}

if(typeof game_loop != "undefined")  clearInterval(game_loop);
game_loop = setInterval(draw, 1000/speed);


$(canvas).click(function (e) {
    var cell = SNAKE.get_cursor_position(e);
    var options = { row: cell.row, column: cell.column, color: 'green'};
    // SNAKE.draw_grid($canvas[0])
    SNAKE.paint_cell(canvas, options)
})

// $canvas.mousemove(function (e) {
//     var cell = getCursorPosition(e);
//     var options = { row: cell.row, column: cell.column};
//     if (remove_flag == true) {
//         options.color = 'white'
//         SNAKE.paint_cell(canvas, options)
//     }
//     else {
//         options.color = 'red'
//         SNAKE.paint_cell(canvas, options)
//     }
// })


$('body').on('keypress', function (e) {
    direction_mngr.set_heading_direction(e.charCode);
})
