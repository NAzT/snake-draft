var mousedown_flag = false;
var toggler = true;

PAINTER = DrawerManager.get_drawer({
    width: 450,
    height: 450,
    MAX_ROW: 20,    
    MAX_COL: 20,
});



var $canvas = $(PAINTER.get_prepared_canvas());
$('body').append($canvas);

PAINTER.draw_grid();


// PAINTER.draw_grid();

// snake_game.start();

$canvas.click(function(e) {
    toggler = !toggler;
})

$canvas.mousedown(function (e) {
    mousedown_flag = true;
})

$canvas.mouseup(function(e) {
    mousedown_flag = false;
})

$canvas.mousemove(function (e) {
    console.log("MOVE");
    var cell = PAINTER.get_cursor_position(e);
    var options = { row: cell.row, column: cell.column};
    if (mousedown_flag == true) {
        options.color = 'green'
        PAINTER.paint_cell(this, options)
    }

    // if (toggler) {
    //     options.color = 'white'
    //     PAINTER.paint_cell(this, options)
    // }
    // else {
    //     options.color = 'white'
    //     PAINTER.paint_cell(this, options)
    // }
})


