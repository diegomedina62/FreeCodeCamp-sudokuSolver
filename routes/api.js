"use strict";

const SudokuSolver = require("../controllers/sudoku-solver.js");
const {
  rowMap,
  colMap,
  regionMap,
  locator,
  checker,
} = require("../controllers/puzzleChecker");
module.exports = function (app) {
  let solver = new SudokuSolver();

  app.route("/api/check").post((req, res) => {
    // check missing values
    const { puzzle, coordinate, value } = req.body;
    if (!coordinate || !puzzle || !value) {
      return res.json({ error: "Required field(s) missing" });
    }
    // check puzzle
    const validation = solver.validate(puzzle);
    if (validation) {
      return res.json(validation);
    }
    // check coordinate
    if (
      !coordinate.match(/^[abcdefghi]/i) ||
      !coordinate.match(/[1-9]/) ||
      coordinate.length != 2
    ) {
      return res.json({ error: "Invalid coordinate" });
    }
    // check value

    if (value.length > 1 || !/[123456789]/.test(value)) {
      return res.json({ error: "Invalid value" });
    }

    const coorObject = locator(coordinate);
    const objAnalysis = checker(coorObject, puzzle);
    const checkResponse = solver.checkPlacement(objAnalysis, value);
    res.json(checkResponse);
  });

  app.route("/api/solve").post((req, res) => {
    const puzzle = req.body.puzzle;
    const validation = solver.validate(puzzle);

    if (validation) {
      return res.json(validation);
    }

    res.json({
      solution:
        "---------------------------SOLVED---SUDOKU---------------------------------------",
    });
  });
};
