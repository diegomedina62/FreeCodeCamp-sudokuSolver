class SudokuSolver {
  validate(puzzleString, map) {
    if (!puzzleString) {
      return { error: "Required field missing" };
    }
    if (/[^0-9.]/g.test(puzzleString)) {
      return { error: "Invalid characters in puzzle" };
    }
    if (!(puzzleString.length == 81)) {
      return { error: "Expected puzzle to be 81 characters long" };
    }

    // for (let i = 0; i < 81; i++) {
    //   let obj = possible(i, map);
    //   if (
    //     obj.row.has(obj.number) ||
    //     obj.column.has(obj.number) ||
    //     obj.region.has(obj.number)
    //   ) {
    //     return { error: "Puzzle cannot be solved" };
    //   }
    // }
  }
  checkPlacement(objAnalysis, value) {
    const obj = {};
    const arr = [];

    if (objAnalysis.possible.has(value) || objAnalysis.number != ".") {
      return { valid: true };
    }
    if (objAnalysis.row.has(value)) {
      arr.push("row");
    }
    if (objAnalysis.column.has(value)) {
      arr.push("column");
    }
    if (objAnalysis.region.has(value)) {
      arr.push("region");
    }

    if (arr) {
      obj.valid = false;
      obj.conflict = arr;
      return obj;
    }
  }
  // checkRowPlacement(puzzleString, row, column, value) {}
  // checkColPlacement(puzzleString, row, column, value) {}
  // checkRegionPlacement(puzzleString, row, column, value) {}

  solve(puzzleString) {}
}

module.exports = SudokuSolver;
