let playerScore = 0;
let botScore = 0;
let tie = false;
let playerSelection = null;
let botSelection = null;
const playerAvatar = document.querySelector('.avatar-player');
const botAvatar = document.querySelector('.avatar-bot');
const scoreUI = document.querySelectorAll('.score-points');
const scoreFontSize = window.getComputedStyle(scoreUI[0], null).getPropertyValue('font-size');
const weaponsPlayer = document.querySelectorAll('.item-card');
const weaponsBot = document.querySelectorAll('.item-card-bot');
const modalBlock = document.querySelector('.modal-block');


let end = false;

function startGame() {
    playerAvatar.classList.add('active-img');
    playerAvatar.parentElement.classList.add('active-back');
    for (let i = 0; i < 3; i++) {
        weaponsPlayer[i].addEventListener('click', () => handleClick(i))

    }
}
function handleClick(i) {
    switch (i) {
        case 0:
            playerSelection = 'rock';
            break;
        case 1:
            playerSelection = 'paper';
            break;
        case 2:
            playerSelection = 'scissors';
            break;
    }
    weaponsPlayer[i].classList.add('active-back')
    weaponsPlayer[i].firstChild.nextSibling.classList.add('active-img')

    setTimeout(() => {
        playerAvatar.classList.remove('active-img');
        playerAvatar.parentElement.classList.remove('active-back');
        botAvatar.classList.add('active-img');
        botAvatar.parentElement.classList.add('active-back');
        weaponsBot[randomNumber].classList.add('active-back')
        weaponsBot[randomNumber].firstChild.nextSibling.classList.add('active-img')
    }, 100)

    let randomNumber = Math.floor(Math.random() * 3);
    switch (randomNumber) {
        case 0:
            botSelection = 'rock'
            break;
        case 1:
            botSelection = 'paper'
            break;
        case 2:
            botSelection = 'scissors'
            break;
    }

    setTimeout(() => {

        playRound()
        if (end) {
            endGame()
        }
        console.log('AAAAAA')
        weaponsBot[randomNumber].classList.remove('active-back')
        weaponsBot[randomNumber].firstChild.nextSibling.classList.remove('active-img')
        botAvatar.classList.remove('active-img');
        botAvatar.parentElement.classList.remove('active-back');
        playerAvatar.classList.add('active-img');
        playerAvatar.parentElement.classList.add('active-back');

        if (playerSelection === 'rock') {
            weaponsPlayer[0].classList.toggle('active-back')
            weaponsPlayer[0].firstChild.nextSibling.classList.toggle('active-img')
        } else if (playerSelection === 'paper') {
            weaponsPlayer[1].classList.toggle('active-back')
            weaponsPlayer[1].firstChild.nextSibling.classList.toggle('active-img')
        } else {
            weaponsPlayer[2].classList.toggle('active-back')
            weaponsPlayer[2].firstChild.nextSibling.classList.toggle('active-img')
        }
    }, 800)

}

function updateUI(victor) {
    scoreUI[0].textContent = playerScore;
    scoreUI[1].textContent = botScore;
    if (victor === 'player') {
        scoreUI[0].classList.add('score-anim')
        setTimeout(() => {
            scoreUI[0].classList.remove('score-anim')

        }, 100)
    } else if (victor === 'bot') {
        scoreUI[1].classList.add('score-anim')
        setTimeout(() => {
            scoreUI[1].classList.remove('score-anim')
        }, 100)
    } else {
        scoreUI.forEach((el) => {
            el.classList.add('score-anim')
            setTimeout(() => {
                el.classList.remove('score-anim')
            }, 100)
        })
    }
}

function playRound() {
    console.log(playerScore)

    if (playerSelection === botSelection) {
        updateUI('tie')
    } else if
        ((playerSelection === 'rock' && botSelection === 'scissors') ||
        (playerSelection === 'scissors' && botSelection === 'paper') ||
        (playerSelection === 'paper' && botSelection === 'rock')) {
        playerScore++;
        updateUI('player')
    }
    else {
        botScore++;
        updateUI('bot')
    }
    if (playerScore == 5 || botScore == 5) {
        end = true;
    }


}

function endGame() {
    modalBlock.classList.add('modal-block__animated')
    const restartBtn = document.querySelector('.restart-btn')
    const endText = document.querySelector('.game-text')
    playerScore > botScore ? endText.textContent = 'You won!' : endText.textContent = 'You lost...!'
    restartBtn.addEventListener('click', () => {
        end = false;
        playerScore = 0;
        botScore = 0;
        modalBlock.classList.remove('modal-block__animated')
        updateUI('tie')
    })
}

startGame();