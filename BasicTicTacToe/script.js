let players= []; 
let turn = 0;
let gameover = false;

let board =[
    ['','',''],
    ['','',''],
    ['','','']
]; 


const startGame = () =>
{
    let input1=document.getElementById("p1");
    let input2=document.getElementById("p2");

    let player1 = input1.value;
    let player2 = input2.value;

    if(isEmpty(player1) || isEmpty(player2))
    {
       alert("player name is required");
       return;
    }
    
    input1.setAttribute("disabled",true);
    input2.setAttribute("disabled",true);
    

    let game=document.getElementById("game-container");
    game.classList.remove("hide");

    players.push(player1);
    players.push(player2);

    document.getElementById("turn").innerHTML= players[turn % 2] + "'s turn";
};

const calculateWinner = () =>
{

    if(turn < 4)
    {
        return false;
    }
  const winnerCombinations =[
      ["00","01","02"],
      ["10","11","12"],//horizontal line
      ["20","21","22"],

      ["00","10","20"],
      ["01","11","21"],//vertical line
      ["02","12","22"],

      ["00","11","22"],//diagonal
      ["20","11","02"],
  ];

  for(let i=0; i<winnerCombinations.length;i++)
  {
      let val1=winnerCombinations[i][0]; //at i=0;//00
      let val2=winnerCombinations[i][1]; //01
      let val3=winnerCombinations[i][2]; //02

      if((board[val1[0]][val1[1]] !== "" ) &&
      (board[val1[0]][val1[1]] === board[val2[0]][val2[1]]) &&
      (board[val1[0]][val1[1]] === board[val3[0]][val3[1]]))
      {
           return true;
      }
  }
  return false;
};

const isEmpty = (value) => !value || !value.trim();

const handleClick = (el) =>
{
    if(el.innerHTML !== "" || gameover)
    {
        return;
    }
    let id=el.id; // this will give a string e.g: "00"

    let i=parseInt(id[0]);
    let j=parseInt(id[1]);
    //00 i=0 and j=0
    board[i][j]= turn % 2 === 0 ? "X" : "O";
    el.innerHTML= board[i][j];
    
    turn++;

    
    document.getElementById("turn").innerHTML=players[turn % 2] + "'s turn";
    if(turn === 9)
    {
        alert("Game is drawn");
        gameover = ture;
        return;
    }
    if(calculateWinner())
    {
        alert(players[turn % 2]+ " won");
        gameover = true;
        return;
    }
};
