/*
* Create a list that holds all of your cards
*/


//creates an array of cards to be shuffled when the game starts
let cards = [
  'fa-diamond', 'fa-diamond',
  'fa-paper-plane-o', 'fa-paper-plane-o',
  'fa-anchor', 'fa-anchor',
  'fa-cube', 'fa-cube',
  'fa-bolt', 'fa-bolt',
  'fa-leaf', 'fa-leaf',
  'fa-bomb', 'fa-bomb',
  'fa-bicycle', 'fa-bicycle',
];

function generateCard(card) {
  return `<li class="card" data-card=${card}><i class="fa ${card}"></i></li>`;
};



/*
* Display the cards on the page
*   - shuffle the list of cards using the provided "shuffle" method below
*   - loop through each card and create its HTML
*   - add each card's HTML to the page
*/

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex;

  while (currentIndex !== 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
  }

  return array;
};


/*
* set up the event listener for a card. If a card is clicked:
*  - display the card's symbol (put this functionality in another function that you call from this one)
*  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
*  - if the list already has another card, check to see if the two cards match
*    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
*    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
*    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
*    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
*/




//creates the deck dynamically and shuffles the cards
function startGame() {
  let deck = document.querySelector('.deck')
  let cardHTML = shuffle(cards).map(function(card) {
    return generateCard(card);
  });
  deck.innerHTML = cardHTML.join('');
};

startGame();

//creates an array to set event handlers on the cards
let allCards = document.querySelectorAll('.card');
let openCards = [];
//sets a variable to track the number of player moves
let moves = 0;
let moveCounter = document.querySelector('.moves');
//creates an array to track the matched cards
let matchedCards = [];
//selects the stars for the rating system
let stars = document.querySelectorAll(".fa-star");

//sets an event listener for each card to respond to clicks and flip the card.
for (const card of allCards) {
card.addEventListener('click', function(){
    if (!card.classList.contains('open') && !card.classList.contains('show')) {
    openCards.push(card);
    card.classList.add('open', 'show');


    //if cards match
    if (openCards.length == 2) {
      if (openCards[0].dataset.card == openCards[1].dataset.card) {
        console.log('they match!!!');
        openCards[0].classList.add('match', 'open', 'show');
        openCards[1].classList.add('match', 'open', 'show');
        matchedCards.push(card);
        openCards = [];
      }




      //if they don't match
      else
      (setTimeout(function() {
          for (const card of openCards) {
            card.classList.remove('open', 'show');
          };
          openCards = [];
        }, 1000)
      )
    }
    console.log(openCards);
    //keeps track of the number of player moves
    moves++;
    moveCounter.innerText = moves;



    //changes the star rating to drop with more moves
    if (moves > 16 && moves < 32){
           for( i= 0; i < 3; i++){
               if(i > 1){
                   stars[i].style.visibility = "hidden";
               }
           }
       }
    else if (moves > 33){
           for( i= 0; i < 3; i++){
               if(i > 0){
                   stars[i].style.visibility = "hidden";
               }
           }
       }


    //finish the game
    if (matchedCards == 8) {
      console.log('game is won');
    }
    else {
      console.log('game still goin');
    }
  }
});
}
