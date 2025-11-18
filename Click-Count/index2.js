var nameID = prompt("Enter your name");
console.log("Welcome", nameID);

var currentScore = document.querySelector('#currentScore')
var highScore = document.querySelector('#highScore')
var timer = document.querySelector('#timer')
var clickButton = document.querySelector('#clickButton')
var startButton = document.querySelector('#startButton')
var StatusMessage = document.querySelector('#statusMessage') || document.querySelector('.status-message')
var resetButton = document.querySelector('#resetButton')
var pauseButton = document.querySelector('#pauseButton')
var resumeButton = document.querySelector('#resumeButton')
var nameDis = document.querySelector('#name')

var high = 0;
var timer1 = 30;
var flag = false;
var current = 0;
var timeId = null;
var clickScale = 1;
var gameDuration = 30;

function onWebsite(){
    loadData();
    displayContent();
}

function loadData(){
    var temp = localStorage.getItem('highScore');
    if(temp != null){
        high = parseInt(temp, 10) || 0;
    }
    else{
        high = 0;
    }
}

function displayContent(){
    if (nameDis) nameDis.textContent = nameID;
    if (currentScore) currentScore.textContent = current;
    if (highScore) highScore.textContent = high;
    if (timer) timer.textContent = timer1;

    // TASK 1: Click Counter Turns Red When > 20
    if (currentScore) {
        if (current > 20) {
            currentScore.style.color = 'red';
            currentScore.style.fontWeight = 'bold';
        } else {
            currentScore.style.color = '';
            currentScore.style.fontWeight = '';
        }
    }
}

function endGame(){
    clearInterval(timeId);
    flag = true;
    if (clickButton) clickButton.disabled = true;
    
    // TASK 4: Calculate and show Clicks Per Second (CPS)
    var duration = gameDuration || 1;
    var cps = (current / duration);
    var cpsText = cps.toFixed(2);
    
    if (StatusMessage) {
        StatusMessage.textContent = ` Test complete — ${current} clicks. You clicked ${cpsText} times per second!`;
        StatusMessage.style.fontSize = '18px';
        StatusMessage.style.fontWeight = 'bold';
    } 
    else {
        alert(`You clicked ${current} times.\nCPS: ${cpsText} clicks per second!`);
    }

    // TASK 6: Confetti on New High Score (gold background flash)
    var newHigh = false;
    if(current > high){
        localStorage.setItem('highScore', current);
        high = current;
        if (highScore) highScore.textContent = high;
        newHigh = true;
        
        // Flash gold background for 1 second
        var oldBg = document.body.style.background;
        document.body.style.background = 'gold';
        document.body.style.transition = 'background 0.3s ease';
        setTimeout(function () { 
            document.body.style.background = oldBg;
        }, 1000);
        
       
        alert(' NEW HIGH SCORE! \nYou scored: ' + current);
    }

    // TASK 5: Start Button Says "Play Again" After Game
    if (startButton) {
        startButton.disabled = false;
        startButton.innerText = 'Play Again';
        startButton.style.fontSize = '16px';
        startButton.style.fontWeight = 'bold';
    }

    displayContent();
}

function startGame(){
    if (clickButton) clickButton.disabled = false;
    flag = true;
    
    // Reset values for new game
    current = 0;
    timer1 = 30;
    gameDuration = timer1;
    clickScale = 1;
    
    // TASK 2: "Click Me!" Message Flashes on Start
    if (StatusMessage) {
        StatusMessage.textContent = ' Click Me! ';
        StatusMessage.style.fontSize = '20px';
        StatusMessage.style.color = '#ff6600';
        StatusMessage.style.fontWeight = 'bold';
        setTimeout(function(){ 
            if (StatusMessage) {
                StatusMessage.textContent = '';
                StatusMessage.style.color = '';
                StatusMessage.style.fontSize = '';
            }
        }, 1000);
    }

    // Reset click scale on new round
    if (clickButton) {
        clickButton.style.transform = 'scale(1)';
    }

    // Disable start while running and reset its text
    if (startButton) {
        startButton.disabled = true;
        startButton.innerText = 'Start Game';
    }

    displayContent();

    timeId = setInterval(function(){
        timer1--;
        if(timer1 <= 0){
            endGame();
        }
        displayContent();
    }, 1000);
}

function userclick(){
    if(flag){
        current++;
        
        // TASK 3: Button Grows When You Click (10% bigger, max 2x size)
        clickScale = Math.min(clickScale * 1.1, 2);
        if (clickButton) {
            clickButton.style.transition = 'transform 120ms ease';
            clickButton.style.transform = 'scale(' + clickScale + ')';
        }

        displayContent();
    }
}

function reset(){
    current = 0;
    timer1 = 30;
    timeId = null;
    flag = false;
    clearInterval(timeId);
    
    if (clickButton) {
        clickButton.disabled = true;
        clickButton.style.transform = 'scale(1)';
    }
    
    // Reset click scale
    clickScale = 1;
    
    // Reset status message
    
    if (StatusMessage) {
        StatusMessage.textContent = 'Click "Start Game" to begin!';
        StatusMessage.style.color = '';
        StatusMessage.style.fontSize = '';
        StatusMessage.style.fontWeight = '';
    }
    
    // Reset start button
    if (startButton) {
        startButton.disabled = false;
        startButton.innerText = 'Start Game';
    }
    
    if (pauseButton) pauseButton.disabled = false;
    if (resumeButton) resumeButton.disabled = true;
    
    displayContent();
}

function pause(){
    if (clickButton) clickButton.disabled = true;
    if (resumeButton) resumeButton.disabled = false;
    if (pauseButton) pauseButton.disabled = true;
    clearInterval(timeId);
    flag = false;
    displayContent();
}

function resume(){
    if (clickButton) clickButton.disabled = false;
    if (pauseButton) pauseButton.disabled = false;
    if (resumeButton) resumeButton.disabled = true;
    flag = true;
    
    timeId = setInterval(function(){
        timer1--;
        if(timer1 <= 0){
            endGame();
        }
        displayContent();
    }, 1000);
    
    displayContent();
}

onWebsite();

startButton.addEventListener('click', startGame);
clickButton.addEventListener('click', userclick);
resetButton.addEventListener('click', reset);
pauseButton.addEventListener('click', pause);
resumeButton.addEventListener('click', resume);