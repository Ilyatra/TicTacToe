const Board = function (s, needToWin) {
     field = [];
     const size = s;
     const cellNum = size * size;
     let turnCount = 0;

     const makeField = () => {
        const fieldElem = document.querySelector('.field');
        let row = [];
        let colNum = 0;
        let rowNum = 0;
        fieldElem.classList.remove('field_15x15', 'field_3x3');
        fieldElem.classList.add(`field_${size}x${size}`);

        for (let i = 0; i < cellNum; i++) {
            let squareElem = document.createElement('div');
            squareElem.classList.add('field__cell', `cell_${size}x${size}`);
            squareElem.dataset.coords = rowNum + ':' + colNum;
            row.push(' ');
            squareElem.addEventListener('click', clickHandler);
            fieldElem.append(squareElem);
            colNum++;
            if (colNum == size) {
                colNum = 0;
                rowNum++;
                field.push(row);
                row = [];
            }
        }
     }

     const winnerCheck = (player, pos) => {
        const [startRow, startCol] = pos.split(':');
        let winner = '';

        const test1 = (startRow, startCol, testingLine ,player) => {
            let inLine = 1;
            let i = 1;
            const testCases = {
                horizon: () => field[+startRow][+startCol + i],
                horizonRevers: () => field[+startRow][+startCol - i],
                vertical: () => field[+startRow + i][+startCol],
                verticalRevers: () => field[+startRow - i][+startCol],
                firstDiagonal: () => field[+startRow + i][+startCol + i],
                firstDiagonalRevers: () => field[+startRow - i][+startCol - i],
                secondDiagonal: () => field[+startRow - i][+startCol + i],
                secondDiagonalRevers: () => field[+startRow + i][+startCol - i],
            }

            try {
                do {
                    if (testCases[testingLine]() != player) {
                        i = 1;
                        break;
                    }
                    i++;
                    inLine++;
                } while (true);
            } catch {
                i = 1;
            }
            
            try {
                do {
                    if (testCases[testingLine + 'Revers']() != player) {
                        i = 1;
                        break;
                    }
                    i++;
                    inLine++;
                } while (true);
            } catch {
                i = 1;
            }
            return inLine;
        }

        const testArr = ['horizon', 'vertical', 'firstDiagonal', 'secondDiagonal'];
        testArr.forEach((val) => {
            if (test1(startRow, startCol, val, player) == needToWin){
                winner = player;
            }
        })

        if (cellNum == turnCount) return 'Draw';
        return winner;
     }

     const fieldUpdate = (cellCoords, sym) => {
        let [row, col] = cellCoords.split(':');
        field[row][col] = sym;
     }

     const clickHandler = (event) => {
         if (event.target.innerHTML === '') {
            const sym = player.turn();
            turnCount++;
            fieldUpdate(event.target.dataset.coords, sym);
            event.target.innerHTML = sym;
            // winnerCheck(sym, event.target.dataset.coords)
            console.log(winnerCheck(sym, event.target.dataset.coords));
         }else{
            return;
         }
     }
     return {makeField, field};
}

const ScoreTab = function () {
    const tabElem = document.querySelector('.score-tab');
    return;
}

const Player = function () {
    let currentPlayer = 'X';

    const turn = () => {
        const result = currentPlayer;
        if (currentPlayer === 'X') {
            currentPlayer = 'O';
        }else{
            currentPlayer = 'X'
        }
        
        return result;
    }

    return {turn, }
}

const Ai = function () {
    return 1;
}

const ControlTab = function () {
    const restartButton = document.querySelector('[name="restart"]');
    const modeSwitch = document.querySelector('[name="mode-switch"]');
    const mainElem = document.querySelector('main');

    const modeSwitchHandler = (event) => {
        if (event.target.innerHTML !== 'Gomoku') {
            board = Board(3, 3);
            event.target.innerHTML = 'Gomoku';
        }else{
            board = Board(15, 5);
            event.target.innerHTML = 'Tic-Tac-Toe';
        }
        
        while (mainElem.firstChild) {
            mainElem.firstChild.remove();
        }
        player = Player();
        board.makeField();
    }

    const restartHandler = (event) =>{
        if (event.target.innerHTML !== 'Gomoku') {
            board = Board(3, 3);
        }else{
            board = Board(15, 5);
        }
        while (mainElem.firstChild) {
            mainElem.firstChild.remove();
        }
        player = Player();
        board.makeField();
    }

    restartButton.addEventListener('click', restartHandler);
    modeSwitch.addEventListener('click', modeSwitchHandler);
}

let player = Player();
let board = Board(3, 3);
const controlTab = ControlTab();
board.makeField();