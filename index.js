const time = document.querySelector("#time-left");
const result = document.querySelector("#result");
const button = document.querySelector("#start-pause");

const squares = document.querySelectorAll(".board div");
const logLeft = document.querySelectorAll(".log-left");
const logRight = document.querySelectorAll(".log-right");

const carLeft = document.querySelectorAll(".car-left");
const carRight = document.querySelectorAll(".car-right");

let timerID = null;
let timerOutcome = null;
let currentIndex = 76;
const WIDTH = 9;
let timeLimit;
let started = false;

function moveFrog(e){
  squares[currentIndex].classList.remove("frog");
  switch (e.key){
    case 'ArrowLeft':
      if (currentIndex % WIDTH !== 0) currentIndex -= 1;
      break;
    case 'ArrowRight':
      if (currentIndex % WIDTH < WIDTH - 1) currentIndex += 1;
      break;
    case 'ArrowUp':
      if (currentIndex - WIDTH >= 0) currentIndex -= WIDTH;
      break;
   case 'ArrowDown':
    if (currentIndex + WIDTH < WIDTH * WIDTH) currentIndex += WIDTH;
      break;
  }
  squares[currentIndex].classList.add("frog");
}



function autoMoveElements(){
  timeLimit -= 1;
  time.textContent = timeLimit;
  logLeft.forEach(left => moveLogLeft(left));
  logRight.forEach(right => moveLogRight(right));
  carLeft.forEach(left => moveCarLeft(left));
  carRight.forEach(right => moveCarRight(right));
}

function moveLogLeft(left){
  switch (true){
    case left.classList.contains('l1'):
      left.classList.remove('l1')
      left.classList.add('l2')
      break;
    case left.classList.contains('l2'):
      left.classList.remove('l2')
      left.classList.add('l3')
      break;
    case left.classList.contains('l3'):
      left.classList.remove('l3')
      left.classList.add('l4')
      break;
    case left.classList.contains('l4'):
      left.classList.remove('l4')
      left.classList.add('l5')
    break;
      case left.classList.contains('l5'):
        left.classList.remove('l5')
        left.classList.add('l1')
        break;
  }
}
function moveLogRight(right){
  switch (true){
    case right.classList.contains('l1'):
      right.classList.remove('l1')
      right.classList.add('l5')
      break;
    case right.classList.contains('l2'):
      right.classList.remove('l2')
      right.classList.add('l1')
      break;
    case right.classList.contains('l3'):
      right.classList.remove('l3')
      right.classList.add('l2')
      break;
    case right.classList.contains('l4'):
      right.classList.remove('l4')
      right.classList.add('l3')
    break;
      case right.classList.contains('l5'):
        right.classList.remove('l5')
        right.classList.add('l4')
        break;
  }
}

function moveCarLeft(left){
  switch (true){
    case left.classList.contains('c1'):
      left.classList.remove('c1')
      left.classList.add('c2')
      break;
    case left.classList.contains('c2'):
      left.classList.remove('c2')
      left.classList.add('c3')
      break;
    case left.classList.contains('c3'):
      left.classList.remove('c3')
      left.classList.add('c1')
      break;
  }
}
function moveCarRight(right){
  switch (true){
    case right.classList.contains('c1'):
      right.classList.remove('c1')
      right.classList.add('c3')
      break;
    case right.classList.contains('c2'):
      right.classList.remove('c2')
      right.classList.add('c1')
      break;
    case right.classList.contains('c3'):
      right.classList.remove('c3')
      right.classList.add('c2')
      break;
  }
}


function checkLose(){
  const currentPosition = squares[currentIndex]
  if (currentPosition.classList.contains('c1') ||
      currentPosition.classList.contains('l4') ||
      currentPosition.classList.contains('l5') ||
      timeLimit <= 0
  ){
    result.textContent = 'GAME OVER!';
    clearInterval(timerID);
    clearInterval(timerOutcome);
    timerID = null;
    timerOutcome = null;
    currentPosition.classList.remove('frog');
    document.removeEventListener('keyup', moveFrog);
    started = false;
    button.textContent = "START";
  }
}

function checkWin(){
  if (squares[currentIndex].classList.contains('ending-block')){
    result.textContent = 'SUCCESS!';
    clearInterval(timerID);
    clearInterval(timerOutcome);
    timerID = null;
    timerOutcome = null;
    document.removeEventListener('keyup', moveFrog);
    started = false;
    button.textContent = "START";
  }
}
function checkOutcome(){
  checkWin();
  checkLose();
}

function resetVariables(){
  result.textContent = "";
  squares[currentIndex].classList.remove('frog');
  currentIndex = 76;
  squares[currentIndex].classList.add('frog');
  timeLimit = 20;
  
}

button.addEventListener('click', function(){
  // not started
  if (!started){
    resetVariables();
    timerID = setInterval(autoMoveElements, 1000);
    timerOutcome = setInterval(checkOutcome, 50);
    document.addEventListener("keyup", moveFrog);
    button.textContent = "PAUSE";
    started = true;
  // has started
  }else {
    // to pause
    if (timerID != null){
      clearInterval(timerID);
      clearInterval(timerOutcome);
      timerID = null;
      timerOutcome = null;
      document.removeEventListener("keyup", moveFrog);
      button.textContent = "START";
    }
    // to restart
    else{
      timerID = setInterval(autoMoveElements, 1000);
      timerOutcome = setInterval(checkOutcome, 50);
      document.addEventListener("keyup", moveFrog);
      button.textContent = "PAUSE";
    }
  }
});