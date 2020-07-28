const message = document.querySelector('.message');
const button = document.querySelector('button');
const gameArea = document.querySelector('.gameArea');
const results = document.querySelector('.results');
const directions = document.querySelector('.directions');
let inPlay = false;
let playArea = {};
let count = 0;

function showMessage(notification){
    message.innerHTML = `<h3>${notification}</h3>`;
}

function showBox(){
    playArea.timer = setTimeout(myBox, random(4000));
}

function myBox(){
    //create a shape element
    let element = document.createElement('div');
    element.classList.add('box');
    element.style.top = random(setTopMargin()) + 'px';
    element.style.left = random(setLeftMargin()) + 'px';
    element.style.backgroundColor = getColor();
    element.start = new Date().getTime();
    element.addEventListener('click', hit);
    gameArea.appendChild(element);
}

// Pick a random hex color
function getColor(){
    function col(){
        let hex = random(255).toString(16);
        //always return 2 values, even if a 0 is apended
        return ('0' + String(hex)).substr(-2);
    }
    return '#' + col() + col() + col();
}

 //Adjust top margin so circle is not on the edge
function setTopMargin(){
    let maxHeight = gameArea.clientHeight;
    if (maxHeight <= 100){
        maxHeight = maxHeight + 200;
    } else {
        maxHeight = maxHeight - 200;
    }
    return maxHeight;
}

//Adjust left margin so circle is not on the edge
function setLeftMargin(){
    let maxWidth = gameArea.clientWidth;
    if (maxWidth <= 100){
        maxWidth = maxWidth + 200;
    } else {
        maxWidth = maxWidth - 200;
    }
    
    return maxWidth;
}

function hit(e){
    let start = e.target.start;
    let end = new Date().getTime();
    let duration = (end-start)/1000;
    let maxDuration = 1;
    
    clearTimeout(playArea.timer);
    showMessage('It took you ' + duration + ' seconds to collect products');
    if (duration > maxDuration){
        gameArea.children[0].remove();
        results.innerHTML = `<h3>Can do better! <span id="loser">!</span> Your score was ${count}.<br> Click the start button to play again!</h3>`;
        resetGame();
    } else {
        gameArea.children[0].remove();
        playArea.timer = setTimeout(myBox, random(4000));
        count++;
        if (count === 30){
            results.innerHTML = `<h3 >You reached ${renderCount(count)}! <span id="winner">You win!</span> <br> now that you've collected alot of products <br> let's help you sell them to make money .</h3>`;
            resetGame();
        } else {
            results.innerHTML = `<h3 >Score: ${renderCount(count)} of 30 </h3>`;
        }
    }
}

function renderCount(count){
    return count;
}

function random(number){
    let tempVal = Math.floor(Math.random()*number);
    return tempVal;
}

function resetGame(){
    clearTimeout(playArea.timer);
    inPlay = false;
    button.style.display = 'block';
}

showMessage('Click Start to Begin!');

button.addEventListener('click', function(){
    //start game play
        inPlay = true;
        //hide the button
        button.style.display = 'none';
        directions.style.display = 'none';
        results.innerHTML = '';
        count = 0;
    //notify user of start
    showMessage('Starting...');

    showBox();
})
