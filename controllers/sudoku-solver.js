class SudokuSolver {

  validate(puzzleString) {
    if(!puzzleString){
      return {  error: 'Required field missing'  }  
    }
    if((/[^0-9.]/g.test(puzzleString))){
      return { error: 'Invalid characters in puzzle' }
    }
    if(!(puzzleString.length == 81)){
      return { error: 'Expected puzzle to be 81 characters long' } 
    }
    
  }

  checkRowPlacement(puzzleString, row, column, value) {

  }

  checkColPlacement(puzzleString, row, column, value) {

  }

  checkRegionPlacement(puzzleString, row, column, value) {

  }

  solve(puzzleString) {
    
  }
}

module.exports = SudokuSolver;

