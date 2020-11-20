// style font awesome dla poszczególnych graczy
const PLAYER_1 = 'fa-times';
const PLAYER_2 = 'fa-circle';

// możliwe kombinacje
const WINNING_COMBINATIONS = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

// tablice ruchów gracza
let moves_player_1 = [];
let moves_player_2 = [];

let turn = 1;

// uchwyt do wszystkich elementów .box
const boxes = document.querySelectorAll('.box');
boxes.forEach(box => {
    box.addEventListener('click', SimpleClick, { once: true })
});

// definicja funkcji sprawdzającej wygraną
function checkWin() {
    let win_player_1 = false;
    let win_player_2 = false;

    for (let i=0; i<8; i++) {
        for (let j=0; j<3; j++) {
            if ( moves_player_1.indexOf(WINNING_COMBINATIONS[i][j]) > -1 && !win_player_2 ) {
                win_player_1 = true;
                win_player_2 = false;
            }
            else if ( moves_player_2.indexOf(WINNING_COMBINATIONS[i][j]) > -1 && !win_player_1 ) {
                win_player_2 = true;
                win_player_1 = false;
            }
            else {
                win_player_1 = false;
                win_player_2 = false;
                break;
            }
        }
        if (win_player_1 || win_player_2) break;
        
    }

    /*
    if (turn >= 5) {
        WINNING_COMBINATIONS.forEach((combination, index) => {
            if (combination.every(index => moves_player_1.indexOf(index) > -1))
                win = true;
            else if (combination.every(index => moves_player_2.indexOf(index) > -1))
                win = true;
        });
    }
    */

    if (win_player_1)
        alert('Wygrał gracz 1!');
    else if (win_player_2)
        alert('Wygrał gracz 2!');
    else if (turn === 9)
        alert('Remis!');
}

// definicja funkcji klikającej
function SimpleClick(event) {
    if (turn % 2) {
        moves_player_1.push(parseInt(event.target.dataset.index));
        event.target.classList.add('times-color', 'fas', PLAYER_1);
    }
    else {
        moves_player_2.push(parseInt(event.target.dataset.index));
        event.target.classList.add('circle-color', 'far', PLAYER_2);
    }

    if (turn >= 5)
        checkWin();
    
    turn++;
}
