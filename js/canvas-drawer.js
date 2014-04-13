


var DrawerManager = (function() {

        var generate_drawer = function(GLOBAL_SETTINGS) {

            function draw_grid(canvas, options) {
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

            var get_cw = function() {
                return GLOBAL_SETTINGS.width / GLOBAL_SETTINGS.MAX_ROW
            }

            var get_prepared_canvas = function(canvas_id) {

                var canvas = document.getElementById(canvas_id || 'canvas')

                canvas.width = GLOBAL_SETTINGS.width;
                canvas.height = GLOBAL_SETTINGS.height;

                return canvas;
            }

            var draw_squares = function (squares, opts) {
                squares.forEach(function (c, k) {
                    var options = {row: c.row, column: c.column, color: opts.color}
                    paint_cell(opts.canvas, options);
                })
            }

            return {
                draw_grid: draw_grid,
                paint_cell: paint_cell,
                draw_squares: draw_squares,
                get_cw: get_cw,
                get_prepared_canvas: get_prepared_canvas
            }
        }
    return {
        get_drawer: function(settings) {
            return generate_drawer (settings);
        }
    }
})()