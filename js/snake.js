!function() {
    var speed = 5;
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

    var settings = {
        width: 450,
        height: 450,
        MAX_ROW: 20,    
        MAX_COL: 20
    }

    var direction_mngr = new DirectionManager();

    // var Cell = generate_cell(settings);


    var SNAKE = DrawerManager.get_drawer(settings)
    var Cell = SNAKE.get_cell_fn();

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

    $('body').on('keypress', function (e) {
        direction_mngr.set_heading_direction(e.charCode);
    })


}();