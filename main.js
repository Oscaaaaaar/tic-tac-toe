//Create an array contains all winning sets.
var winningComb = [
  ["1", "5", "9"],
  ["3", "5", "7"],
  ["1", "2", "3"],
  ["1", "4", "7"],
  ["7", "8", "9"],
  ["3", "6", "9"],
  ["4", "5", "6"],
  ["2", "5", "8"],
];

//Create an object literal for each player, which contains name, symbol, moves, and socres. each time the player makes a move, add the box id into their moves. If their moves contain any of the winning set, they win the game.
var user1 = {
  name: "",
  symbol: "O",
  moves: [],
  score: 0,
};

var user2 = {
  name: "",
  symbol: "X",
  moves: [],
  score: 0,
};

var currentPlayer = user1;
var submitBtn = document.querySelector(".submit");
var user1Input = document.querySelector(".user1-input");
var user2Input = document.querySelector(".user2-input");
var modal = document.querySelector(".modal");
var chessBoard = document.querySelectorAll(".chess-board");
var scoreBoard = document.querySelector("h3");
var modalDisplay = document.querySelector(".winner-info");
var numOfMoves = 0;

var naming = function () {
  user1.name = user1Input.value;
  user2.name = user2Input.value;
  document.querySelector(".user-info").classList.add("hidden");
  updateScore();
  document.querySelector("section").addEventListener("click", usersMove);
};

submitBtn.addEventListener("click", naming);

//

//Create a variable to indicate the current player.

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
  scoreBoard.textContent = `${user1.name}(${user1.symbol}): ${user1.score} -- VS -- ${user2.name}(${user2.symbol}): ${user2.score}`;
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
      break;
    }
  }
  if (containsAll) {
    modalDisplay.textContent = `${currentPlayer.name} wins`;
    modal.classList.remove("hidden");
    currentPlayer.score += 1;
    return true;
  } else if (numOfMoves === 9) {
    modalDisplay.textContent = "It's even";
    modal.classList.remove("hidden");
    return true;
  }
  return false;
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

//Create a function to let Alphago moves
var alphaGoMove = function () {
  //Create a function to set the alphaGo's priority of moving.
  //1. if alpha have 2 in a row and the 3nd one is empty, make a move there
  //2. if player have 2 in a row already, make a move on 3rd one.
  //3. if box5 is empty, make a move there
  //4. move prior to ["1", "3", "7", "9", "2", "4", "6", "8"];
  var checkAny2s = function (user) {
    for (var i = 0; i < winningComb.length; i++) {
      console.log("test1");
      if (
        user.moves.includes(winningComb[i][0]) &&
        user.moves.includes(winningComb[i][1]) &&
        document.querySelector(`.box${winningComb[i][2]}`).textContent == ""
      ) {
        document.querySelector(`.box${winningComb[i][2]}`).textContent = "X";
        user2.moves.push(`${winningComb[i][2]}`);
        return true;
      } else if (
        user.moves.includes(winningComb[i][0]) &&
        user.moves.includes(winningComb[i][2]) &&
        document.querySelector(`.box${winningComb[i][1]}`).textContent == ""
      ) {
        document.querySelector(`.box${winningComb[i][1]}`).textContent = "X";
        user2.moves.push(`${winningComb[i][1]}`);
        return true;
      } else if (
        user.moves.includes(winningComb[i][1]) &&
        user.moves.includes(winningComb[i][2]) &&
        document.querySelector(`.box${winningComb[i][0]}`).textContent == ""
      ) {
        document.querySelector(`.box${winningComb[i][0]}`).textContent = "X";
        user2.moves.push(`${winningComb[i][0]}`);
        return true;
      }
    }
  };
  var checkAny2Spaces = function () {
    var bestMove = [];
    for (var i = 0; i < winningComb.length; i++) {
      if (
        user1.moves.includes(winningComb[i][0]) &&
        document.querySelector(`.box${winningComb[i][1]}`).textContent == "" &&
        document.querySelector(`.box${winningComb[i][2]}`).textContent == ""
      ) {
        bestMove.push(`.box${winningComb[i][1]}`);
        bestMove.push(`.box${winningComb[i][2]}`);
      } else if (
        user1.moves.includes(winningComb[i][1]) &&
        document.querySelector(`.box${winningComb[i][0]}`).textContent == "" &&
        document.querySelector(`.box${winningComb[i][2]}`).textContent == ""
      ) {
        bestMove.push(`.box${winningComb[i][0]}`);
        bestMove.push(`.box${winningComb[i][2]}`);
      } else if (
        user1.moves.includes(winningComb[i][2]) &&
        document.querySelector(`.box${winningComb[i][0]}`).textContent == "" &&
        document.querySelector(`.box${winningComb[i][1]}`).textContent == ""
      ) {
        bestMove.push(`.box${winningComb[i][0]}`);
        bestMove.push(`.box${winningComb[i][1]}`);
      }
    }
    var mostCount = 0;
    for (var j = 1; j < 10; j++) {
      var count = 0;
      for (var i = 0; i < bestMove.length; i++) {
        if (bestMove[i] == String(j)) {
          count += 1;
        }
        if (count > mostCount) {
          mostCount = count;
        }
      }
    }
    var mostContained = String(mostCount);
    console.log(`.box${mostContained}`);
    if (mostContained != "0") {
      document.querySelector(`.box${mostContained}`).textContent = "X";
      user2.moves.push(`${winningComb[i][2]}`);
      return true;
    }
  };

  if (!checkAny2s(user2)) {
    if (!checkAny2s(user1)) {
      if (document.querySelector(".box5").textContent == "") {
        document.querySelector(".box5").textContent = "X";
        user2.moves.push("5");
      } else if (!checkAny2Spaces(user1)) {
        var drawOrder = ["1", "3", "7", "9", "2", "4", "6", "8"];
        for (var i = 0; i < drawOrder.length; i++) {
          if (document.querySelector(`.box${drawOrder[i]}`).textContent == "") {
            document.querySelector(`.box${drawOrder[i]}`).textContent = "X";
            user2.moves.push(`${drawOrder[i]}`);
            break;
          }
        }
      }
    }
  }
};

//if player have 2 in a row, draw the 3rd box.
//if box5 is empty, draw box5
//if have one winningset element and others 2 are empty. draw one

//draw box1-3-7-9
//else, draw 2,4,6,8

var usersMoveVsAlpha = function (event) {
  if (event.target.tagName === "DIV") {
    //if the box player has clicked has no symbol yet, draw user's symbol.
    if (event.target.textContent === "") {
      event.target.textContent = currentPlayer.symbol;
      //add the box id into user's moves
      currentPlayer.moves.push(event.target.id);
      numOfMoves += 1;
      if (!isWon()) {
        switchPlayer();
        console.log("alpha turn");
        alphaGoMove();
        numOfMoves += 1;
        isWon();
        switchPlayer();
      }
    }
  }
};
//Create a function to VS AlphaGo.
var alphaGo = function () {
  user1.name = "You";
  user2.name = "AlphaGo";
  document.querySelector(".user-info").classList.add("hidden");
  updateScore();
  currentPlayer = user1;
  document.querySelector("section").addEventListener("click", usersMoveVsAlpha);
};

updateScore();

submitBtn.addEventListener("click", naming);
document.querySelector(".alpha-go").addEventListener("click", alphaGo);
document.querySelector(".restart").addEventListener("click", restart);
