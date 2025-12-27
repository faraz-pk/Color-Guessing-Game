const colorSquares = document.querySelectorAll('.squares');
const modeEl = document.querySelectorAll('.mode');
const colorEl = document.querySelector('.color');
const resetEl = document.querySelector('.reset');
const resultEl = document.querySelector('.result');
const header = document.querySelector('h1');

let colors = [];
let numOfSquares = 6;
let pickedColor;

onLoad();
function onLoad() {
    colorEl.textContent = pickedColor;
    squaresSetup();
    setupMode();
    reset();
}

resetEl.addEventListener('click', reset);

function squaresSetup() {
    for (let i = 0; i < colorSquares.length; i++){
       colorSquares[i].style.backgroundColor = colors[i];
       colorSquares[i].addEventListener('click', () => {
            let clickedColor = colorSquares[i].style.backgroundColor;
            if (clickedColor === pickedColor) {
                resultEl.textContent = 'Correct!';
                resultEl.style.color = 'green';
                resetEl.textContent = 'Play Again';
                changeColors(pickedColor);
            } else {
                resultEl.textContent = "Incorrect!";
                resultEl.style.color = 'red';
                resetEl.textContent = 'Play Again';
            }
       });
    }
}

function setupMode() {
    for (let i = 0; i < modeEl.length; i++) {
        modeEl[i].addEventListener('click', ()=> {
            for (let i = 0; i < modeEl.length; i++) {
                modeEl[i].classList.remove('selected');
            }
            modeEl[i].classList.add('selected');
            if (modeEl[i].textContent === 'Easy') {
                numOfSquares = 3;
            } else {
                numOfSquares = 6;
            }
            reset();
        });
    }
}

function reset() {
    colors = makeColors(numOfSquares);
    colorEl.textContent = correctColor();
    resetEl.textContent = "New Game";
    resultEl.textContent = "";
    for (let i = 0; i < colorSquares.length; i++) {
        if(colors[i]) { 
            colorSquares[i].style.display = "block";
            colorSquares[i].style.backgroundColor = colors[i];
        }
        else {
            colorSquares[i].style.display = "none";
        }
    }
}

function makeColors(num) {
    let arr = [];
    for (let index = 0; index < num; index++) {
        let r = Math.floor(Math.random() * 256);
        let g = Math.floor(Math.random() * 256);
        let b  =Math.floor(Math.random() * 256);
        let color = `rgb(${r}, ${g}, ${b})`
        arr.push(color);
    }
    return arr;
}

function correctColor() {
    let randomPick = Math.floor(Math.random() * colors.length);
    pickedColor = colors[randomPick];
    return pickedColor;
}

function changeColors(color) {
    for (let i = 0; i < colorSquares.length; i++) {
        header.style.backgroundColor = color;
        colorSquares[i].style.backgroundColor = color;
    }
}