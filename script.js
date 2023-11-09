const container = document.querySelector('.container')
const input = document.querySelector('#input')
const boxesContainer = document.querySelector('.boxes-wrapper')
let inputDisplay = document.querySelector('.input-display')
const message = document.querySelector('.message')
const subMessage = document.querySelector('.sub-message')
const hint = document.querySelector('.hint')
let wrongLettersContainer = document.querySelector('.wrong-letters')
const remainingGuess = document.querySelector('.remaining-guess')
const button = document.querySelector('.reset-button')

let randomNumber
let wordLetters
let initialGuess
let wrongLetters = []
let boxes
const words = [
  {
    word: 'Paniki',
    hint: 'Sa araw nahihimbing, sa gabi ay gising.',
  },
  {
    word: 'Gagamba',
    hint: 'Bata pa si Nene marunong nang manahi.',
  },
  {
    word: 'Aso',
    hint: 'Mataas kung nakaupo, mababa kung nakatayo.',
  },
  {
    word: 'Kalapati',
    hint: 'Ibon kong saan man makarating, makababalik kung saan nanggaling.',
  },
  {
    word: 'Sibuyas',
    hint: 'Habang aking hinihiwa, ako ay pinaluluha.',
  },
  {
    word: 'Saranggola',
    hint: 'Buto’t-balat, lumilipad.',
  },
  {
    word: 'Sapatos',
    hint: 'Dala mo, dala ka, dala ka pa ng iyong dala.',
  },
  {
    word: 'Zipper',
    hint: 'Dumaan ang hari, nagkagatan ang mga pari.',
  },
  {
    word: 'Lamesa',
    hint: 'May apat na binti ngunit hindi makalakad.',
  },
  {
    word: 'Bombilya',
    hint: 'Kung gabi ay hinog, sa araw ay hilaw.',
  },
  {
    word: 'Bombilya',
    hint: 'Kung gabi ay hinog, sa araw ay hilaw.',
  },

  /*English */

  {
    word: 'Egg',
    hint: 'What has to be broken before you can use it?',
  },
  {
    word: 'Candle',
    hint: 'Im tall when Im young, and Im short when Im old. What am I?',
  },
  {
    word: 'All of them',
    hint: 'What month of the year has 28 days?',
  },
  {
    word: 'Future',
    hint: 'What is always in front of you but can’t be seen?',
  },
  {
    word: 'The Match',
    hint: 'You walk into a room that contains a match, a kerosene lamp, a candle and a fireplace. What would you light first?',
  },
]

input.addEventListener('keyup', userInput)
button.addEventListener('click', nextCard)

function nextCard() {
  try {
    words.splice(randomNumber, 1)
    start()
  } catch {
    location.reload()
  }
}
function focusAgain() {
  input.focus()
}

function reset() {
  initialGuess = 5
  wrongLetters = []
  boxesContainer.innerHTML = ''
  wrongLettersContainer.textContent = ''
  message.textContent = ''
  subMessage.textContent = 'Give it a try!'
  input.value = ''
  input.addEventListener('focusout', focusAgain)
  input.focus()
}

start()
function start() {
  reset()
  randomNumber = Math.floor(Math.random() * words.length)
  const randomWord = words[randomNumber]
  wordLetters = randomWord.word.split('')
  for (let i = 0; i < wordLetters.length; i++) {
    boxesContainer.innerHTML += `<div class="box"></div>`
  }
  hint.textContent = `Hint: ${randomWord.hint}`
  remainingGuess.textContent = initialGuess
  boxes = document.querySelectorAll('.box')
}

function userInput(e) {
  if (e.keyCode <= 64 || event.keyCode >= 91) {
    subMessage.textContent = 'Input letters only!'
    return
  }
  subMessage.textContent = ''

  const lastLetter = input.value[input.value.length - 1].toUpperCase()
  const hasBeenDeclared = wrongLetters.some((letter) => {
    return letter.toUpperCase() == lastLetter
  })
  if (hasBeenDeclared) {
    inputDisplay.textContent = ''
    message.textContent = ''
    subMessage.textContent = 'Its already been declared!'
    return
  }

  inputDisplay.textContent = `"${lastLetter}"`

  const isThere = wordLetters.some((letter) => {
    return letter.toUpperCase() == lastLetter
  })
  const findIndex = wordLetters.reduce((result, letter, index) => {
    if (letter.toUpperCase() == lastLetter) {
      result.push(index)
    }
    return result
  }, [])
  if (isThere) {
    for (let i = 0; i < findIndex.length; i++) {
      boxes[findIndex[i]].innerHTML = `<p>${lastLetter}</p>`
    }
    message.textContent = 'is Correct!'
    message.style.color = 'green'

    const isAllFilledUp = [...boxes].every((box) => {
      return box.children.length === 1
    })
    if (isAllFilledUp) {
      inputDisplay.textContent = ''
      message.textContent = 'GREAT JOB!'
      message.style.color = 'green'
      button.textContent = 'One more game?'
      input.removeEventListener('focusout', focusAgain)
      input.blur()
    }
  } else {
    message.textContent = 'is Wrong!'
    message.style.color = 'red'
    initialGuess--
    remainingGuess.textContent = initialGuess
    wrongLetters.push(lastLetter)
    wrongLettersContainer.textContent = ''
    for (let i = 0; i < wrongLetters.length; i++) {
      wrongLettersContainer.textContent += `${wrongLetters[i]} `
    }
  }
  if (initialGuess < 1) {
    inputDisplay.textContent = ''
    message.textContent = 'GAME OVER!'
    message.style.color = 'red'
    subMessage.textContent = `The word is ${wordLetters.join('').toUpperCase()}`
    button.textContent = 'Restart the game?'
    input.removeEventListener('focusout', focusAgain)
    input.blur()
    for (let i = 0; i < boxes.length; i++) {
      boxes[0].innerHTML = ''
    }
    for (let i = 0; i < boxes.length; i++) {
      boxes[i].innerHTML = `<p>${wordLetters[i].toUpperCase()}</p>`
    }
  }
}

/*timer */

const timer = document.querySelector("#timer");
const startBtn = document.querySelector("#startBtn");
const pauseBtn = document.querySelector("#pauseBtn");
const resetBtn = document.querySelector("#resetBtn");

let startTime = 0;
let elapsedTime = 0;
let currentTime = 0;
let paused = true;
let intervalId;
let hrs = 0;
let mins = 0;
let secs = 0;

startBtn.addEventListener("click", () => {
  if (paused){
    paused = false;
    startTime = Date.now() - elapsedTime;
    intervalId = setInterval(updateTime, 75);
  }
});
pauseBtn.addEventListener("click", () => {
  if(!paused){
    paused = true;
    elapsedTime = Date.now() -  startTime; 
    clearInterval(intervalId);
  }
});
resetBtn.addEventListener("click", () => {
  paused = true;
  clearInterval(intervalId);

     startTime = 0;
     elapsedTime = 0;
     currentTime = 0;

     hrs = 0;
     mins = 0;
     secs = 0;
     timer.textContent = "00:00:00";
});

function updateTime(){
  elapsedTime = Date.now() - startTime;
  
  secs = Math.floor((elapsedTime / 1000) % 60);
  mins = Math.floor((elapsedTime / (1000 * 60)) % 60);
  hrs = Math.floor((elapsedTime / (1000 * 60 * 60)) % 60);

  secs = pad(secs);
  mins = pad(mins);
  hrs = pad(hrs);

  timer.textContent = `${hrs}:${mins}:${secs}`;


  function pad(unit){
    return(("0") + unit).length > 2 ? unit : "0" + unit;

  }

}

/*Game Mode */

/* Game Mode */
// Get the language select element
const languageSelect = document.getElementById("languageSelect");

// Add an event listener to detect language selection changes
languageSelect.addEventListener("change", function() {
  // Get the selected language value
  const selectedLanguage = languageSelect.value;

  // Update the game based on the selected language
  if (selectedLanguage === "en") {
    // English language logic
    // Update game elements, prompts, or messages in English
    console.log("English mode activated");
  } else if (selectedLanguage === "tl") {
    // Tagalog language logic
    // Update game elements, prompts, or messages in Tagalog
    console.log("Tagalog mode activated");
  }
});