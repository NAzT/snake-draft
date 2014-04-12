

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
