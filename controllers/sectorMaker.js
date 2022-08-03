const p1 =
  "9.9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6.6";

const indexFinder = (coor) => {
  const row = coor.match(/[abcdefghi]/gi)[0].toUpperCase();
  const col = coor.match(/[1-9]/g)[0];
  return col - 1 + add[row];
};

function mapCreator(puzzle) {
  const indexRow = {
    A: new Set([0, 1, 2, 3, 4, 5, 6, 7, 8]),
    B: new Set([9, 10, 11, 12, 13, 14, 15, 16, 17]),
    C: new Set([18, 19, 20, 21, 22, 23, 24, 25, 26]),
    D: new Set([27, 28, 29, 30, 31, 32, 33, 34, 35]),
    E: new Set([36, 37, 38, 39, 40, 41, 42, 43, 44]),
    F: new Set([45, 46, 47, 48, 49, 50, 51, 52, 53]),
    G: new Set([54, 55, 56, 57, 58, 59, 60, 61, 62]),
    H: new Set([63, 64, 65, 66, 67, 68, 69, 70, 71]),
    I: new Set([72, 73, 74, 75, 76, 77, 78, 79, 80]),
  };
  const indexCol = {
    c1: new Set([0, 9, 18, 27, 36, 45, 54, 63, 72]),
    c2: new Set([1, 10, 19, 28, 37, 46, 55, 64, 73]),
    c3: new Set([2, 11, 20, 29, 38, 47, 56, 65, 74]),
    c4: new Set([3, 12, 21, 30, 39, 48, 57, 66, 75]),
    c5: new Set([4, 13, 22, 31, 40, 49, 58, 67, 76]),
    c6: new Set([5, 14, 23, 32, 41, 50, 59, 68, 77]),
    c7: new Set([6, 15, 24, 33, 42, 51, 60, 69, 78]),
    c8: new Set([7, 16, 25, 34, 43, 52, 61, 70, 79]),
    c9: new Set([8, 17, 26, 35, 44, 53, 62, 71, 80]),
  };
  const indexReg = {
    r1: new Set([0, 1, 2, 9, 10, 11, 18, 19, 20]),
    r2: new Set([3, 4, 5, 12, 13, 14, 21, 22, 23]),
    r3: new Set([6, 7, 8, 15, 16, 17, 24, 25, 26]),
    r4: new Set([27, 28, 29, 36, 37, 38, 45, 46, 47]),
    r5: new Set([30, 31, 32, 39, 40, 41, 48, 49, 50]),
    r6: new Set([33, 34, 35, 42, 43, 44, 51, 52, 53]),
    r7: new Set([54, 55, 56, 63, 64, 65, 72, 73, 74]),
    r8: new Set([57, 58, 59, 66, 67, 68, 75, 76, 77]),
    r9: new Set([60, 61, 62, 69, 70, 71, 78, 79, 80]),
  };

  const sudokuReader = (index, puzzle) => {
    const obj = {};
    obj.row = Object.entries(indexRow).filter((x) => x[1].has(index))[0][0];
    obj.col = Object.entries(indexCol).filter((x) => x[1].has(index))[0][0];
    obj.reg = Object.entries(indexReg).filter((x) => x[1].has(index))[0][0];
    obj.number = puzzle[index];
    return obj;
  };

  const sudoku = new Map();
  for (let i = 0; i < 81; i++) {
    sudoku.set(i, sudokuReader(i, puzzle));
  }
  return sudoku;
}

const possible = (index, map) => {
  const rowArr = [];
  const colArr = [];
  const regArr = [];
  let obj = { number: map.get(index).number };

  for (const v of map.entries()) {
    if (v[0] != index) {
      if (v[1].row == map.get(index).row && v[1].number != ".") {
        rowArr.push(v[1].number);
      }
      if (v[1].col == map.get(index).col && v[1].number != ".") {
        colArr.push(v[1].number);
      }
      if (v[1].reg == map.get(index).reg && v[1].number != ".") {
        regArr.push(v[1].number);
      }
    }
  }

  obj.row = new Set(rowArr);
  obj.column = new Set(colArr);
  obj.region = new Set(regArr);

  let possible = [];

  for (let i = 1; i < 10; i++) {
    if (
      obj.number != i &&
      !obj.row.has(i.toString()) &&
      !obj.column.has(i.toString()) &&
      !obj.region.has(i.toString())
    ) {
      possible.push(i.toString());
    }
  }
  obj.possible = new Set(possible);
  return obj;
};

module.exports = { mapCreator, possible };
