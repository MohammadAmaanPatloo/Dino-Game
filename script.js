score = 0; // Variable to store the score
cross = true; // Variable to track if the dino has crossed the obstacle

audio = new Audio('music.mp3'); // Creating an audio object for background music
audiogo = new Audio('gameover.mp3'); // Creating an audio object for game over sound

setTimeout(() => {
    audio.play() // Start playing the background music after 1 second
}, 1000);

document.onkeydown = function (e) {
    console.log("Key code is: ", e.keyCode) // Logging the key code when a key is pressed
    if (e.keyCode == 38) {
        dino = document.querySelector('.dino');
        dino.classList.add('animateDino'); // Adding the 'animateDino' class to the dino element
        setTimeout(() => {
            dino.classList.remove('animateDino') // Removing the 'animateDino' class after 700 milliseconds
        }, 700);
    }
    if (e.keyCode == 39) {
        dino = document.querySelector('.dino');
        dinoX = parseInt(window.getComputedStyle(dino, null).getPropertyValue('left'));
        dino.style.left = dinoX + 112 + "px"; // Moving the dino to the right
    }
    if (e.keyCode == 37) {
        dino = document.querySelector('.dino');
        dinoX = parseInt(window.getComputedStyle(dino, null).getPropertyValue('left'));
        dino.style.left = (dinoX - 112) + "px"; // Moving the dino to the left
    }
}

setInterval(() => {
    dino = document.querySelector('.dino');
    gameOver = document.querySelector('.gameOver');
    obstacle = document.querySelector('.obstacle');

    dx = parseInt(window.getComputedStyle(dino, null).getPropertyValue('left'));
    dy = parseInt(window.getComputedStyle(dino, null).getPropertyValue('top'));

    ox = parseInt(window.getComputedStyle(obstacle, null).getPropertyValue('left'));
    oy = parseInt(window.getComputedStyle(obstacle, null).getPropertyValue('top'));

    offsetX = Math.abs(dx - ox);
    offsetY = Math.abs(dy - oy);

    if (offsetX < 73 && offsetY < 52) {
        gameOver.innerHTML = "Game Over - Reload to Play Again"
        obstacle.classList.remove('obstacleAni') // Removing the 'obstacleAni' class to stop the obstacle animation
        audiogo.play(); // Playing the game over sound
        setTimeout(() => {
            audiogo.pause();
            audio.pause(); // Pausing the background music after 1 second
        }, 1000);
    }
    else if (offsetX < 145 && cross) {
        score += 1; //Increasing the score by 1
        updateScore(score);
        cross = false;
        setTimeout(() => {
            cross = true;
        }, 1000);
        setTimeout(() => {
            aniDur = parseFloat(window.getComputedStyle(obstacle, null).getPropertyValue('animation-duration'));
            newDur = aniDur - 0.1; // Reducing the animation duration of the obstacle
            obstacle.style.animationDuration = newDur + 's';
            console.log('New animation duration: ', newDur)
        }, 500);

    }

}, 10);

function updateScore(score) {
    scoreCont.innerHTML = "Your Score: " + score // Updating the score in the HTML
}
function restartGame() {
    location.reload(); // Reloads the page to restart the game
}