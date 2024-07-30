const display = document.querySelector("div#game");

const board = document.createElement("div");
board.setAttribute("class", "board");
display.appendChild(board);

function Gameboard() {
    let board = [
        [' ', ' ', ' '],
        [' ', ' ', ' '],
        [' ', ' ', ' ']
    ];

    let boardClasses = [
        ["aa", "ab", "ac"],
        ["ba", "bb", "bc"],
        ["ca", "cb", "cc"]
    ];

    return { board, boardClasses };
}

function Player(name, mark) {
    this.name = name;
    this.mark = mark;
    this.moved = false;
    this.moves = [];
    this.lastMove = "";
    this.score = 0;
    this.won = false;
    this.win = function() {
        this.score++;
        this.won = true;
        game.continue();
    }

}

function Game() {
    this.tie = false;
    this.checkTie = function() {
        if (player1.moves.length === 5 && player2.moves.length === 4) {
	    game.tie = true;
	    game.continue();
	    return;
        }
    }
    this.validMove = function(pos) {
        let p1check = player1.moves.indexOf(pos);
        let p2check = player2.moves.indexOf(pos);
        if (p1check === -1 && p2check === -1) {
            return true;
        }
    }
    
    this.move = function(square) {
        if (player1.moved === false && player2.moved === false || player2.moved === true) {
            player1.lastMove = square.target.className;
            if (game.validMove(player1.lastMove) === true) {
                game.placeMove(player1, player2, player1.lastMove);
                return;
            }
        }
        if (player2.moved === false && player1.moved === true) {
            player2.lastMove = square.target.className;
            if (game.validMove(player2.lastMove) === true) {
                game.placeMove(player2, player1, player2.lastMove);
                return;
            }
        }
    }

    this.placeMove = function(playerMoved, playerWait, pos) {
        let square = document.querySelector(`div.${pos}`);
        square.textContent = `${playerMoved.mark}`;
        
        playerMoved.moves.push(`${pos}`);
        for (let i = 0; i < boardArray.boardClasses.length; i++) {
            for (let j = 0; j < boardArray.boardClasses.length; j++) {
                if (boardArray.boardClasses[i][j] === pos) {
                    boardArray.board[i][j] = `${playerMoved.mark}`;
                } 
            }
        }
        playerMoved.moved = true;
        playerWait.moved = false;
    }

    this.checkWin = function(player, mark) {
        if (player1.moves.length === 5 && player2.moves.length === 4) {
            return;
        }
        let count = 0;
        
        // horizontal
        for (let row = 0; row < 3; row++) {
            for (let col = 0; col < 3; col++) {
                if (boardArray.board[row][col] === mark) {
                    count++;
                    if (count === 3) {
                        player.win();
                        break;
                    }
                } else { count = 0; break; };
            }
            count = 0;
        }

        // vertical
        for (let col = 0; col < 3; col++) {
            for (let row = 0; row < 3; row++) {
                if (boardArray.board[row][col] === mark) {
                    count++;
                    if (count === 3) {
                        player.win();
                        break;
                    }
                } else { count = 0; break; };
            }
            count = 0;
        }

        // cross
        if (boardArray.board[0][0] === mark &&
            boardArray.board[1][1] === mark &&
            boardArray.board[2][2] === mark) {
            player.win();
        } 
        if (boardArray.board[2][0] === mark &&
            boardArray.board[1][1] === mark &&
            boardArray.board[0][2] === mark) {
            player.win();
        }
    }


    this.continue = function() {
        const continueScreen = document.createElement("div");
        display.appendChild(continueScreen);

        player1dom_score.textContent = player1.score;
        player2dom_score.textContent = player2.score;

        const result = document.createElement("div");
        result.setAttribute("class", "result");
        if (player1.won === true) {
            result.textContent = `${player1.name} won!`;
	    player1.won = false;
        }
        if (player2.won === true) {
            result.textContent = `${player2.name} won!`;
	    player2.won = false;
        }
	if (game.tie === true) {
	    result.textContent = "Whoa, it's a tie!";
	    game.tie = false;
	}

        const againButton = document.createElement("button");
        againButton.setAttribute("class", "again");
        againButton.textContent = "Go again?";

        result.appendChild(againButton);
        continueScreen.appendChild(result);

        const buttons = document.querySelectorAll("button");
        buttons.forEach((button) => {
            button.addEventListener("click", (e) => {
                switch (e.target.className) {
                    case "again":
                        display.removeChild(continueScreen);
                        boardArray = new Gameboard();
                        squares.forEach((square) => square.textContent = "");
                        player1.moves = [];
                        player2.moves = [];
                        player1.moved = false;
                        player2.moved = false;
                        display.appendChild(board);
                        break;
                }
            });
        });
    }
}

let player1 = new Player("Player 1", "❌");
let player1dom_name = document.querySelector("div.player1name");
let player1dom_score = document.querySelector("div.player1score");
player1dom_name.textContent = player1.name;
player1dom_score.textContent = player1.score;

let player2 = new Player("Player 2", "⭕");
let player2dom_name = document.querySelector("div.player2name");
let player2dom_score = document.querySelector("div.player2score");
player2dom_name.textContent = player2.name;
player2dom_score.textContent = player2.score;

let game = new Game(player1, player2);
let boardArray = new Gameboard();

for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
        const square = document.createElement("div");
        square.setAttribute("id", "square");
        square.setAttribute("class", `${boardArray.boardClasses[i][j]}`);
        square.textContent = `${boardArray.board[i][j]}`;
        board.appendChild(square);
    }
}

const squares = document.querySelectorAll("div#square");
squares.forEach((square) => {
    square.addEventListener("click", (square) => {
        game.move(square);
        game.checkWin(player1, player1.mark);
        game.checkWin(player2, player2.mark);
	game.checkTie();
    });
});

const showBtn = document.querySelector("button.show-options");
const dialog = document.querySelector("dialog#dialog");
const submit = dialog.querySelector("input#submit");
const userInput = dialog.querySelector("input#userInput");

showBtn.addEventListener("click", () => {
    dialog.showModal();
});

dialog.addEventListener("close", () => {
    console.log(dialog.returnValue ==="default" ? "no return value" : `Return value: ${dialog.returnValue}`);
});

submit.addEventListener("click", (e) => {
    e.preventDefault();
    dialog.close(userInput.value);
});

