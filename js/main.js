var PAINTER = DrawerManager.get_drawer({
    width: 450,
    height: 450,
    MAX_ROW: 20,    
    MAX_COL: 20,
});

// $(canvas).click(function (e) {
//     var cell = SNAKE.get_cursor_position(e);
//     var options = { row: cell.row, column: cell.column, color: 'green'};
//     // SNAKE.draw_grid($canvas[0])
//     SNAKE.paint_cell(canvas, options)
// })

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


