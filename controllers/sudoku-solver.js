const { checker } = require("./puzzleChecker");
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
  }
  checkPlacement(objAnalysis, value) {
    const obj = {};
    const arr = [];

    if (objAnalysis.possible.has(value) || objAnalysis.number != ".") {
      obj.valid = true;
    }
    if (objAnalysis.row.has(value)) {
      obj.valid = false;
      arr.push("row");
    }
    if (objAnalysis.column.has(value)) {
      obj.valid = false;
      arr.push("column");
    }
    if (objAnalysis.region.has(value)) {
      obj.valid = false;
      arr.push("region");
    }
    if (arr.length != 0) {
      obj.conflict = arr;
    }
    return obj;
  }

  solve(puzzleString, map) {
    let iteration = [...puzzleString];

    const iterator = () => {
      for (const v of map.values()) {
        const location = checker(v, iteration);
        if (location.number != ".") {
          if (
            location.row.has(location.number) ||
            location.column.has(location.number) ||
            location.region.has(location.number)
          ) {
            return { error: "Puzzle cannot be solved" };
          }
        }
        if (location.number == ".") {
          if (location.possible.size == 1) {
            iteration[v.index] = [...location.possible][0];
            iterator();
          }
        }
      }
    };
    iterator();
    if (iterator()) {
      return { error: "Puzzle cannot be solved" };
    }

    let stringResponse = "";
    iteration.forEach((x) => {
      stringResponse = stringResponse + x;
    });
    return { solution: stringResponse };
  }
}

module.exports = SudokuSolver;
