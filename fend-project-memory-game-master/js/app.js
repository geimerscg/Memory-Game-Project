
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
//sets variables for the timer function
let timer = document.querySelector('.timer');
let min = 0;
let sec = 0;
let interval;
//selects the stars for the rating system
let stars = document.querySelectorAll('.fa-star');
//sets a variable to track the number of player moves
let moves = 0;
let moveCounter = document.querySelector('.moves');
//creates an array of open cards to track matches
let openCards = [];

//creates each card dynamically
function generateCard(card) {
  return `<li class="card" data-card=${card}><i class="fa ${card}"></i></li>`;
};

//sets a timer for the game
function startTimer(){
  interval = setInterval(function(){
    timer.innerHTML = minute+"mins "+second+"secs";
    second++;
    if(second == 60){
        minute++;
        second = 0;
    }
    if(minute == 60){
        hour++;
        minute = 0;
    }
 },1000);
};


//sets rules for cards matching and flipping
function cardCheck() {
  //if cards match
  if (openCards.length == 2) {
    if (openCards[0].dataset.card == openCards[1].dataset.card) {
      openCards[0].classList.add('match', 'open', 'show');
      openCards[1].classList.add('match', 'open', 'show');
      openCards = [];
    }




    //if cards don't match
    else
    (setTimeout(function() {
        for (const card of openCards) {
          card.classList.remove('open', 'show');
        };
        openCards = [];
      }, 1000)
    )
  }
}


//tracks player moves and time
function movesAndTimer() {
  moves++;
  moveCounter.innerText = moves;
  //starts the timer once a move is made
  if(moves == 1){
      second = 0;
      minute = 0;
      hour = 0;
      startTimer();
  };
};

//sets the rules for the star rating system
function starRating() {
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
  };
}

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


//creates the deck dynamically and shuffles the cards
function createDeck() {
  moves = 0;
  let deck = document.querySelector('.deck')
  let cardHTML = shuffle(cards).map(function(card) {
    return generateCard(card);
  });
  deck.innerHTML = cardHTML.join('');
  //resets timer upon game start
  let timer = document.querySelector(".timer");
  timer.innerHTML = "0 mins 0 secs";
  //starts the game
  gameCode();
};

//adds event listeners and tracks timer/moves/rating
function gameCode() {
  //creates an array to set event handlers on the cards
  let allCards = document.querySelectorAll('.card');
  for (const eachCard of allCards) {
  eachCard.addEventListener('click', function(){
      if (!eachCard.classList.contains('open') && !eachCard.classList.contains('show')) {
      openCards.push(eachCard);
      eachCard.classList.add('open', 'show');

      //check for matches
      cardCheck();


      //keeps track of the number of player moves
      movesAndTimer();


      //changes the star rating to drop with more moves
      starRating();
      }
  }
  );
  }
}

createDeck();
