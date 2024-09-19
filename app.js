let gameSeq=[]; // store game sequence 
let userSeq=[]; // store user sequence 

let btns=["yellow", "red", "purple", "green"];

let started= false; // initally game not started we have to start by pressing key
let level=0; // initally game level is zero

let h2=document.querySelector("h2");

document.addEventListener("keypress", function()
{
    if(started == false){
        console.log("game started");
        started=true;

        levelUp();
    }
    
}); // this function for start the game by pressing key

function gameFlash(btn){
    btn.classList.add("flash"); // add flash class in css to flash rondom btn
    setTimeout(function() {
        btn.classList.remove("flash");
    }, 250);
}

function userFlash(btn){
    btn.classList.add("userFlash"); // add flash class in css to flash rondom btn
    setTimeout(function() {
        btn.classList.remove("userFlash");
    }, 250);
}

function levelUp() {
    userSeq=[];
    level++;
    h2.innerText= `Level ${level}`;

    let randIdx = Math.floor(Math.random()*3); //select random index 
    let randColor= btns[randIdx]; // it choose index value color
    let randBtn=document.querySelector(`.${randColor}`); // select appropriate btn of that color
    gameSeq.push(randColor);
    console.log(gameSeq); // to know which color,btn game flash
    gameFlash(randBtn);
}

function  checkAns(idx) {
    //console.log("curr level - ", level);
    //let idx=level-1;

    if(userSeq[idx] === gameSeq[idx]){
        if(userSeq.length == gameSeq.length){
            setTimeout(levelUp, 1000);
        }
    } else{
        h2.innerHTML=`Game Over ! your score is <b>${level}</b> <br>Press any key to start again.`;
        document.querySelector("body").style.backgroundColor="red";
        setTimeout( function() {
            document.querySelector("body").style.backgroundColor="white";

        }, 150);
        reset();
    }
}

function btnPress(){
    let btn=this;
    userFlash(btn);

    userColor=btn.getAttribute("id"); // to know which color,btn user press
    userSeq.push(userColor);
    console.log(userSeq);

    checkAns(userSeq.length-1);
}

let allBtns=document.querySelectorAll(".btn"); // access all btn in html
for(btn of allBtns){
    btn.addEventListener("click", btnPress);
}

function reset(){
    started=false;
    gameSeq=[];
    userSeq=[];
    level=0;
}
