let score = JSON.parse(localStorage.getItem("score")) || 
{
  wins: 0,
  loses: 0,
  ties: 0,
};
function updateResult(result) 
{
  document.querySelector(".js-result").innerHTML = result;
}
function updateChosenMoves(playerMove, compMove) 
{
  document.querySelector(".js-moves").innerHTML = 
            `You <img src="images/${playerMove}-emoji.png" class="move-icon">  
            <img src="images/${compMove}-emoji.png" class="move-icon"> Computer `;
}
function updateScoreDisplay() 
{
  document.querySelector(
    ".js-score"
  ).innerHTML = `Wins: ${score.wins}, Loses: ${score.loses}, Ties: ${score.ties}`;
}
updateScoreDisplay();

function resetScores() 
{
  score.wins = 0;
  score.loses = 0;
  score.ties = 0;
  localStorage.removeItem("score");
  updateScoreDisplay();
  updateResult("Not Yet Started");
  updateChosenMoves("rock", "rock");
}
function validateWinner(playerMove) 
{
  let computerMove = pickCompMove();
  const winningComb = {
    scissors: {
      rock: false,
      paper: true,
    },
    paper: {
      scissors: false,
      rock: true,
    },
    rock: {
      scissors: true,
      paper: false,
    },
  };
  let result = winningComb[playerMove][computerMove];
  if (result === true) {
    ++score.wins;
    result = "You Win.";
  } else if (result === false) {
    ++score.loses;
    result = "You Lose.";
  } else {
    ++score.ties;
    result = "Tie.";
  }
  // only supports string
  localStorage.setItem("score", JSON.stringify(score)); // it sets what you want to save data even if the website is refreshed
  updateResult(result);
  updateChosenMoves(playerMove, computerMove);
  updateScoreDisplay();
}
function pickCompMove() 
{
  const moves = ["rock", "paper", "scissors"];
  return moves[Math.floor(Math.random() * moves.length)];
}
