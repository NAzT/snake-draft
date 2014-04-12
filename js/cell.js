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
