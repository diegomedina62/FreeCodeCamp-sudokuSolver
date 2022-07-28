'use strict';

const SudokuSolver = require('../controllers/sudoku-solver.js');

module.exports = function (app) {
  
  let solver = new SudokuSolver();

  app.route('/api/check')
    .post((req, res) => {
      

    });
    
  app.route('/api/solve')
    .post((req, res) => {
      const puzzle=req.body.puzzle
      
      const validation=solver.validate(puzzle)
      
      if(validation){
        return res.json(validation)
      }
      res.json({solution:"---------------------------SOLVED---SUDOKU---------------------------------------"})
    
    });
};
