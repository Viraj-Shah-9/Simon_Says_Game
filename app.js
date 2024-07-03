let gameSeq = [];
let userSeq = [];
let highScore = 0;

let started = false;
let level = 0;

let h3 = document.querySelector("h3");

let btns =["red", "orange", "green", "purple"]

document.addEventListener("keypress",function (e) {
    if(started == false){
        console.log("Game started");
        started = true;
        
        levelUp();
    }
})

function levelUp(){
    userSeq = [];
    level++;

    h3.innerHTML = `Level ${level} <br>High Score : ${highScore}`;

    let randIdx = Math.floor(Math.random() * 3)
    let randColor = btns[randIdx];
    let randBtn = document.querySelector(`.${randColor}`);
    gameSeq.push(randColor);
    console.log(gameSeq);
    gameFlash(randBtn);
}

function gameFlash(btn){
    btn.classList.add("gameFlash");
    setTimeout(function () {
        btn.classList.remove("gameFlash");
    },250);
}

function userFlash(btn){
    btn.classList.add("userFlash");
    setTimeout(function () {
        btn.classList.remove("userFlash");
    },250);
}

let allBtns = document.querySelectorAll(".box");
for(btn of allBtns){
    btn.addEventListener("click", btnPress);
}

function btnPress(){
    let btn = this;
    userFlash(btn);

    userColor = btn.getAttribute("id");
    userSeq.push(userColor);

    checkAns(userSeq.length - 1);
}

function checkAns(idx){
    if(userSeq[idx] === gameSeq[idx]){
        if(userSeq.length == gameSeq.length){
            setTimeout(levelUp,700);
        }
    } else{
        let body = document.querySelector("body");
        body.classList.add("wrongAnswer");
        isHighScore();
        h3.innerHTML = `Game Over! <br>High Score : ${highScore} <br>Your Score : ${level} <br> Press any key to start.`
        setTimeout(function () {
            body.classList.remove("wrongAnswer");
        },750)
        reset();
    }
}

function isHighScore(){
    if(level > highScore){
        highScore = level;
    }
}

function reset(){
    started = false;
    userSeq = [];
    gameSeq = [];
    level = 0;
}