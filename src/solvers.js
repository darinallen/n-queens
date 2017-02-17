/*           _
   ___  ___ | |_   _____ _ __ ___
  / __|/ _ \| \ \ / / _ \ '__/ __|
  \__ \ (_) | |\ V /  __/ |  \__ \
  |___/\___/|_| \_/ \___|_|  |___/

*/

// hint: you'll need to do a full-search of all possible arrangements of pieces!
// (There are also optimizations that will allow you to skip a lot of the dead search space)
// take a look at solversSpec.js to see what the tests are expecting


// return a matrix (an array of arrays) representing a single nxn chessboard, with n rooks placed such that none of them can attack each other

// window.createMatrix = function(n) {
//   var matrix = new Array(n);
//   matrix.fill([]);
//   for (var i = 0; i < matrix.length; i++) {
//     matrix[i].push(0);
//   }
//   return matrix;
// }

window.findNRooksSolution = function(n) {
  var solution;
  var board = new Board({n:n});
  var size = board.get('n');
  for(var i = 0; i < size; i++) {
    for(var j = 0; j < size; j++) {
      board.togglePiece(i, j);
      if(board.hasAnyRooksConflicts()) {
        board.togglePiece(i, j);
      }
    }
    solution = board.rows();
  }
  console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution));
  return solution;
};

// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {
  var solutionCount = 0;
  var initBoard = new Board({n:n});
  var boardSolution = function (board, row, col) {
    if(col === row) {
      solutionCount++;
      return;
    }
    for(var i = 0; i < n; i++) {
      board.togglePiece(row, i);
      if(!board.hasAnyRooksConflicts()) {
        boardSolution(board, row+1, col);
      }
      board.togglePiece(row, i);
    }
  };
  boardSolution(initBoard, 0, n);

  console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return solutionCount;
};

// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {
  var solution = [];
  var initBoard = new Board({n:n});

  if(n === 2 || n === 3) {
    return initBoard.rows();
  }

  var boardSolution = function (board, row, cols, pieces) {
    if(pieces === 0) {
      for (var i = 0; i < n; i++) {
        solution[i] = board.rows()[i].slice();
      }
      return;
    }
    for(var i = 0; i < n; i++) {
      board.togglePiece(row, i);
      if(!board.hasAnyQueensConflicts()) {
        boardSolution(board, row+1, cols, pieces - 1);
      }
      board.togglePiece(row, i);
    }
  };
  boardSolution(initBoard, 0, n, n);

  console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
  return solution;
};

// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  var solutionCount = 0;
  var initBoard = new Board({n:n});
  var boardSolution = function (board, row, cols) {
    if(cols === row) {
      solutionCount++;
      return;
    }
    for(var i = 0; i < n; i++) {
      board.togglePiece(row, i);
      if(!board.hasAnyQueensConflicts()) {
        boardSolution(board, row+1, cols);
      }
      board.togglePiece(row, i);
    }
  };
  boardSolution(initBoard, 0, n);

  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};
