'use strict';
// Selecting Element 
const player0El = document.querySelector(`.player--0`);
const player1El = document.querySelector(`.player--1`);
const score0El = document.querySelector(`#score--0`) // id seçimini böylede yapabiliriz sadece başına . yerine # koyuyoruz.
const score1El = document.getElementById(`score--1`) // burada hiç birşey kullanmıyoruz direk id yazıyoruz. 
const corrent0El = document.getElementById(`current--0`);
const corrent1El = document.getElementById(`current--1`);
const diceEl = document.querySelector(`.dice`);
const btnRoll = document.querySelector(`.btn--roll`);
const btnNew = document.querySelector(`.btn--new`);
const btnHold = document.querySelector(`.btn--hold`);

// Starting Conditions 
let scores , activePlayer , currentScore ,playing ;

const init = function(){
    score0El.textContent = 0; // skorları sıfıra eşitledik.
    score1El.textContent = 0;
    diceEl.classList.add(`hidden`); // zarı görünmez yaptık. 

    scores=[0,0];
    currentScore = 0;
    activePlayer=0;
    playing=true;
    corrent0El.textContent = 0;
    corrent1El.textContent = 0;
    player0El.classList.remove(`player--winner`);
    player1El.classList.remove(`player--winner`);
    player0El.classList.add(`player--active`);
    player1El.classList.remove(`player--active`);
}
init();

const switchPlayer = function(){
    document.getElementById(`current--${activePlayer}`).textContent = 0;
    currentScore=0;
    activePlayer = activePlayer === 0 ? 1 : 0;
    player0El.classList.toggle(`player--active`);
    player1El.classList.toggle(`player--active`);
}

//Rolling dice functionlity
btnRoll.addEventListener(`click` , function(){
    if ( playing) {
    // 1. Genarating a random dice roll 
    const dice = Math.trunc (Math.random() * 6 ) + 1;  
    // 2. Display dice 
    diceEl.classList.remove(`hidden`);
    diceEl.src = `dice-${dice}.png`;
    // 3. Check for rolled 1 
    if ( dice !== 1) {
          // Add dice to current score 
          currentScore += dice ;
          document.getElementById(`current--${activePlayer}`).textContent = currentScore;
    }else {
          // Switch to next player 
          switchPlayer();
    }
      
    }
})

btnHold.addEventListener(`click`,function(){
    if (playing) {
    // 1. Add current score to active player's score
    scores[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent = scores[activePlayer];
    // 2. Check if player's score is >= 100 
    if (scores[activePlayer] >= 50) {
        // Switch to the next player
        playing = false ;
        diceEl.classList.add(`hidden`);
        document.querySelector(`.player--${activePlayer}`).classList.add(`player--winner`);
        document.querySelector(`.player--${activePlayer}`).classList.add(`player--active`);
    }else{
        // Finish the game 
        switchPlayer();
    }
  }
})

btnNew.addEventListener(`click` , init);