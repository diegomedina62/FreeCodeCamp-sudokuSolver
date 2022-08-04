const p1 =
  "..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..";
const entry = "A1";

const rowMap = new Map([
  ["A", new Set([0, 1, 2, 3, 4, 5, 6, 7, 8])],
  ["B", new Set([9, 10, 11, 12, 13, 14, 15, 16, 17])],
  ["C", new Set([18, 19, 20, 21, 22, 23, 24, 25, 26])],
  ["D", new Set([27, 28, 29, 30, 31, 32, 33, 34, 35])],
  ["E", new Set([36, 37, 38, 39, 40, 41, 42, 43, 44])],
  ["F", new Set([45, 46, 47, 48, 49, 50, 51, 52, 53])],
  ["G", new Set([54, 55, 56, 57, 58, 59, 60, 61, 62])],
  ["H", new Set([63, 64, 65, 66, 67, 68, 69, 70, 71])],
  ["I", new Set([72, 73, 74, 75, 76, 77, 78, 79, 80])],
]);

const colMap = new Map([
  ["1", new Set([0, 9, 18, 27, 36, 45, 54, 63, 72])],
  ["2", new Set([1, 10, 19, 28, 37, 46, 55, 64, 73])],
  ["3", new Set([2, 11, 20, 29, 38, 47, 56, 65, 74])],
  ["4", new Set([3, 12, 21, 30, 39, 48, 57, 66, 75])],
  ["5", new Set([4, 13, 22, 31, 40, 49, 58, 67, 76])],
  ["6", new Set([5, 14, 23, 32, 41, 50, 59, 68, 77])],
  ["7", new Set([6, 15, 24, 33, 42, 51, 60, 69, 78])],
  ["8", new Set([7, 16, 25, 34, 43, 52, 61, 70, 79])],
  ["9", new Set([8, 17, 26, 35, 44, 53, 62, 71, 80])],
]);

const regionMap = new Map([
  ["r1", new Set([0, 1, 2, 9, 10, 11, 18, 19, 20])],
  ["r2", new Set([3, 4, 5, 12, 13, 14, 21, 22, 23])],
  ["r3", new Set([6, 7, 8, 15, 16, 17, 24, 25, 26])],
  ["r4", new Set([27, 28, 29, 36, 37, 38, 45, 46, 47])],
  ["r5", new Set([30, 31, 32, 39, 40, 41, 48, 49, 50])],
  ["r6", new Set([33, 34, 35, 42, 43, 44, 51, 52, 53])],
  ["r7", new Set([54, 55, 56, 63, 64, 65, 72, 73, 74])],
  ["r8", new Set([57, 58, 59, 66, 67, 68, 75, 76, 77])],
  ["r9", new Set([60, 61, 62, 69, 70, 71, 78, 79, 80])],
]);

const locator = (coor) => {
  const add = { A: 0, B: 9, C: 18, D: 27, E: 36, F: 45, G: 54, H: 63, I: 72 };

  const row = coor.match(/[abcdefghi]/gi)[0].toUpperCase();
  const col = coor.match(/[1-9]/)[0];
  let index = col - 1 + add[row];
  let region = "";
  for (const v of regionMap.entries()) {
    if (v[1].has(index)) {
      region = v[0];
    }
  }

  return { row: row, column: col, region: region, index: index };
};

const checker = (location, puzzle) => {
  const rowArr = [];
  const colArr = [];
  const regArr = [];
  let obj = { number: puzzle[location.index] };

  for (const v of rowMap.get(location.row)) {
    if (location.index != v && puzzle[v] != ".") {
      rowArr.push(puzzle[v]);
    }
  }
  for (const v of colMap.get(location.column)) {
    if (location.index != v && puzzle[v] != ".") {
      colArr.push(puzzle[v]);
    }
  }
  for (const v of regionMap.get(location.region)) {
    if (location.index != v && puzzle[v] != ".") {
      regArr.push(puzzle[v]);
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
console.log(checker(locator("a1"), p1));
module.exports = { rowMap, colMap, regionMap, locator, checker };
