/** @format */

function guessingGame() {
  const target = Math.floor(Math.random() * 100);
  let gameOver = false;
  let guesses = 0;
  return function guess(num) {
    if (gameOver) return "The game is over, you already won!";
    guesses++;
    if (num == target) {
      gameOver = true;
      return `You win! You found ${target} in ${guesses} guesses.`;
    }
    if (num < target) return `${num} is too low!`;
    if (num > target) return `${num} is too high!`;
  };
}

module.exports = { guessingGame };
