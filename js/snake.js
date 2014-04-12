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