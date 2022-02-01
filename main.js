//Create an array contains all winning sets.
var winningComb = [
  ["1", "2", "3"],
  ["4", "5", "6"],
  ["7", "8", "9"],
  ["1", "4", "7"],
  ["2", "5", "8"],
  ["3", "6", "9"],
  ["1", "5", "9"],
  ["3", "5", "7"],
];

//Create an object literal for each player, which contains name, symbol, moves, and socres. each time the player makes a move, add the box id into their moves. If their moves contain any of the winning set, they win the game.
var user1 = {
  name: "Reza",
  symbol: "O",
  moves: [],
  score: 0,
};

var user2 = {
  name: "Jeremey",
  symbol: "X",
  moves: [],
  score: 0,
};

var modal = document.querySelector(".modal");
var chessBoard = document.querySelectorAll(".chess-board");
var scoreBoard = document.querySelector("h3");
var modalDisplay = document.querySelector(".winner-info");

//Create a variable to indicate the current player.
var currentPlayer = user1;
var numOfMoves = 0;

//Create a function to update popups and show which player win the game

var modalUpdate = function () {
  var modalDisplay = document.querySelector(".winner-info");
  if (numOfMoves === 9) {
    modalDisplay.textContent = "It's even";
  } else {
    modalDisplay.textContent = `${currentPlayer.name} wins`;
  }
};

//Create a function to update score board.
var updateScore = function () {
  scoreBoard.textContent = `${user1.name}: ${user1.score} -- VS -- ${user2.name}: ${user2.score}`;
};
//Create a function to switch player.
var switchPlayer = function () {
  currentPlayer == user1 ? (currentPlayer = user2) : (currentPlayer = user1);
};

//Create a function to reset the game.
var restart = function () {
  currentPlayer = user1;
  user1.moves = [];
  user2.moves = [];
  modal.classList.add("hidden");
  for (var i = 0; i < chessBoard.length; i++) {
    chessBoard[i].textContent = "";
  }
  numOfMoves = 0;
  updateScore();
};

//Create a function to check if any player win the game. By checking if their moves contains any winning set.
//and also check if the game is even, by checking how many moves have taken.
var isWon = function () {
  var containsAll = false;
  var isContain = function (userMoves, winningSet) {
    return winningSet.every(function (element) {
      return userMoves.includes(element);
    });
  };
  for (var i = 0; i < winningComb.length; i++) {
    if (isContain(currentPlayer.moves, winningComb[i])) {
      containsAll = true;
    }
  }
  if (containsAll) {
    modalDisplay.textContent = `${currentPlayer.name} wins`;
    modal.classList.remove("hidden");
    currentPlayer.score += 1;
  } else if (numOfMoves === 9) {
    modalDisplay.textContent = "It's even";
    modal.classList.remove("hidden");
  }
};

//Create a function to draw the user's symbol when they click the box.
var usersMove = function (event) {
  if (event.target.tagName === "DIV") {
    //if the box player has clicked has no symbol yet, draw user's symbol.
    if (event.target.textContent === "") {
      event.target.textContent = currentPlayer.symbol;
      //add the box id into user's moves
      currentPlayer.moves.push(event.target.id);
      numOfMoves += 1;
      isWon();
      switchPlayer();
    }
  }
};

updateScore();

document.querySelector("section").addEventListener("click", usersMove);
document.querySelector(".restart").addEventListener("click", restart);
