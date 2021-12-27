
const rock= document.getElementById('rock');
const paper= document.getElementById('paper');
const scissors= document.getElementById('scissors');
const score = document.querySelector('.score');
const mainDiv = document.querySelector('main');

let scoreCount=0;


//the player choice output  
const outputDivOne= document.createElement('div')
outputDivOne.id='outputDivOne';
const divPlayerChoice= document.createElement('div');
const imgPlayerChoice= document.createElement('img');
divPlayerChoice.appendChild(imgPlayerChoice);
const playerText= document.createTextNode('YOU PICKED');
outputDivOne.appendChild(divPlayerChoice);
outputDivOne.appendChild(playerText);


//computer choice output
const outputDivTwo= document.createElement('div');
outputDivTwo.id='outputDivTwo';
const divComputerChoice= document.createElement('div');
const imgComputerChoice= document.createElement('img');
divComputerChoice.appendChild(imgComputerChoice);
const emptyCircle= document.createElement('div');
emptyCircle.id= 'emptyCircle';
const computerText = document.createTextNode('THE HOUSE PICKED');

outputDivTwo.appendChild(emptyCircle); //by default there is empty circle, when round is played, computer result is added and this is removed
outputDivTwo.appendChild(computerText);


// output of each round (the actual result i.e YOU WIN or YOU LOSE will be added in the respective fns of the three event listeners)
const roundResultDiv= document.createElement('div');
roundResultDiv.id=('roundResultDiv')
const result= document.createElement('div');
roundResultDiv.appendChild(result);
const playerWin= document.createTextNode('YOU WIN');
const computerWin= document.createTextNode('YOU LOSE');
const draw= document.createTextNode('DRAW');
const btnPlayAgain= document.createElement('button');
btnPlayAgain.textContent= 'PLAY AGAIN';
btnPlayAgain.id='playAgain';
roundResultDiv.appendChild(btnPlayAgain);


function playCallback() {
    let childrenNodeList= mainDiv.children;
    for(let eachChild of childrenNodeList)
    {
        eachChild.style.display='none';
    }
    outputDivOne.style.display='flex';
    outputDivTwo.style.display='flex';
    roundResultDiv.style.display='flex';

    mainDiv.appendChild(outputDivOne);
    mainDiv.appendChild(outputDivTwo);

    const computerChoice= computerPlay();
    divComputerChoice.id= computerChoice;
    const computerImgSrc= computerChoice==='paper'?
                            './images/icon-paper.svg' :
                          computerChoice==='scissors'? 
                          "./images/icon-scissors.svg" :
                          "./images/icon-rock.svg";

    imgComputerChoice.src= computerImgSrc;

    if(document.getElementById('emptyCircle')) 
    {setTimeout(()=>{
        outputDivTwo.removeChild(emptyCircle);
        outputDivTwo.insertBefore(divComputerChoice, computerText);
    }, 300);}


    //chk if there is empty div present, if yes, remove it.

    

    return computerChoice;
}

function displayResult(resultCode){
    if(resultCode===1)
    {   
        result.appendChild(playerWin);
        mainDiv.insertAdjacentElement("afterend", roundResultDiv);
        score.textContent= ++scoreCount;
    }
    else if(resultCode===-1)
    {
        result.appendChild(computerWin);
        mainDiv.insertAdjacentElement("afterend", roundResultDiv);
    }
    else
    {
        result.appendChild(draw);
        mainDiv.insertAdjacentElement("afterend", roundResultDiv);
    }
}

//PLAYER CHOSE ROCK
rock.addEventListener('click', ()=>{
   
    let computerChoice = playCallback();
    divPlayerChoice.id= 'rock';
    imgPlayerChoice.src="./images/icon-rock.svg";
    let resultCode = playRound('rock', computerChoice);
    result.textContent='';
    displayResult(resultCode);

})

// PLAYER CHOSE PAPER

paper.addEventListener('click', ()=>{
    let computerChoice = playCallback();
    divPlayerChoice.id= 'paper';
    imgPlayerChoice.src="./images/icon-paper.svg";
    let resultCode = playRound('paper', computerChoice);
    result.textContent='';
    displayResult(resultCode);
})


// PLAYER CHOSE SCISSORS
scissors.addEventListener('click', ()=>{
    let computerChoice = playCallback();
    divPlayerChoice.id= 'scissors';
    imgPlayerChoice.src="./images/icon-scissors.svg";
    let resultCode = playRound('scissors', computerChoice);
    result.textContent='';
    displayResult(resultCode);
})


//PLAY AGAIN FUNCTION

btnPlayAgain.addEventListener('click', ()=>{
    
    
    let childrenNodeList= mainDiv.children;
    for(let eachChild of childrenNodeList)
    {
        if(eachChild.style.display==='none')
            eachChild.style.display='block';
    }
    outputDivOne.style.display='none';
    outputDivTwo.style.display='none';
    roundResultDiv.style.display='none';

    
    outputDivTwo.removeChild(divComputerChoice); 
    outputDivTwo.insertBefore(emptyCircle, computerText);

})


//RULES

const ruleBtn= document.getElementById('rule-btn');
const cancelBtn = document.getElementById('btn-rules-cancel');
const mainWrapper=  document.getElementById('outer-wrapper');
const rulesWrapper=  document.getElementById('hidden-wrapper');

ruleBtn.addEventListener('click', ()=> {
    mainWrapper.style.display = 'none';
    rulesWrapper.style.display= 'flex';
    document.body.style.backgroundImage='none';
})

cancelBtn.addEventListener('click', ()=> {
    mainWrapper.style.display = 'flex';
    rulesWrapper.style.display= 'none';
    document.body.style.backgroundImage='linear-gradient(hsl(214, 47%, 23%), hsl(237, 49%, 15%))';
})

// funcition to generate a random number between min and max (both included). We're only using it for number between 1 and 3

function random(min,max) 
{ return Math.floor(Math.random() * max-min+1)+ min}


// function that returns either rock, paper or scissors based on the value returned by the random function

function computerPlay(){
    return (
        random(1,3)===1 ? 'rock': 
        random(1,3)===2? 'paper' :
        'scissors')
}


//function where the player's selection and the computer's selection are checked and the output is return in the form of an array.
//The first element of the array is either -1,0,1 which represents whether the player lost, had a draw, or won, respectively.
//The second element of the returning array has the string that delcares who won and why. Eg : "You Win! Rock beats Scissors!"

function playRound(playerSelection, computerSelection)
{
    if(playerSelection===computerSelection)
        return 0;

    else if(playerSelection==='rock')
    {
        if(computerSelection ==='scissors')
            return 1;
        else
            return -1;
    }

    else if(playerSelection==='paper')
    {
        if(computerSelection ==='rock')
            return 1
        else
            return -1
    }

    else {
        if(computerSelection ==='rock')
            return -1
        else
            return 1
    }

}


// the main Game function that keeps score for both player and  computer and runs for a 5 round match. 
//current issue: the prompt gets triggered immediately after you enter your choice. I want some way to delay the next prompt, so that the player can see if the results of the current round. right now it just goes on continuously.

function game(){

    console.log("Let's play Rock, Paper, Scissors!\n")
    let pScore=0;
    let cScore=0;
     for(let i=1;i<=5; i++)
    {
        console.log("Round "+ i)

        const playerSelection= prompt("Enter either Rock, Paper, or Scissors");

        const computerSelection = computerPlay();

        const resultArr= playRound(playerSelection, computerSelection)
        const result= resultArr[1]; //get the output string
        const resCode= resultArr[0]; // get the number i.e -1,0, or 1

        pScore= resCode===1? ++pScore : pScore; 
        cScore= resCode===-1? ++cScore : cScore;

        console.log('You chose '+ playerSelection.toLowerCase())
        console.log('Computer chose '+ computerSelection)
        console.log('Result : ' + result)
        console.log("Your Score : "+ pScore)
        console.log("Computer Score : "+ cScore)
    }

    if(pScore > cScore)
        console.log("You are the Winner!")
    else if(pScore < cScore)
        console.log("The Computer wins this match!")
    else
        console.log("Wow! It is a draw!")
}

// game();