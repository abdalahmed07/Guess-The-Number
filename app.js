let secretNumber = Math.floor(Math.random() * 100) + 1;
let attempts = 0;
const maxAttempts = 10;
let previousGuesses = [];

// DOM elements
const guessInput = document.getElementById("guess");
const submitBtn = document.getElementById("submit");
const message = document.getElementById("message");
const attemptsDisplay = document.getElementById("attempts");
const restartBtn = document.getElementById("restart");
const guessesDisplay = document.createElement("p"); // new element

// Add the guessesDisplay below attempts
attemptsDisplay.insertAdjacentElement("afterend", guessesDisplay);

// Submit Guess
submitBtn.addEventListener("click", () => {
  const userGuess = Number(guessInput.value);

  // Validate input
  if (!userGuess || userGuess < 1 || userGuess > 100) {
    message.textContent = "Please enter a number between 1 and 100.";
    message.style.color = "#f87171";
    return;
  }

  // Update attempts and guesses
  attempts++;
  previousGuesses.push(userGuess);

  // Check result
  if (userGuess === secretNumber) {
    message.textContent = `🎉 Correct! The number was ${secretNumber}.`;
    message.style.color = "#22c55e";
    endGame();
  } else if (attempts >= maxAttempts) {
    message.textContent = `❌ Game Over! The number was ${secretNumber}.`;
    message.style.color = "#ef4444";
    endGame();
  } else if (userGuess < secretNumber) {
    message.textContent = "Too low! Try again.";
    message.style.color = "#facc15";
  } else {
    message.textContent = "Too high! Try again.";
    message.style.color = "#facc15";
  }

  // Update UI
  attemptsDisplay.textContent = `Attempts: ${attempts}`;
  guessesDisplay.innerHTML = `Previous Guesses: <strong>${previousGuesses.join(", ")}</strong>`;
  guessInput.value = "";
});

// End Game
function endGame() {
  guessInput.disabled = true;
  submitBtn.disabled = true;
  restartBtn.style.display = "inline-block";
}

// Restart Game
restartBtn.addEventListener("click", () => {
  secretNumber = Math.floor(Math.random() * 100) + 1;
  attempts = 0;
  previousGuesses = [];
  guessInput.value = "";
  message.textContent = "";
  message.style.color = "#f1f5f9";
  guessInput.disabled = false;
  submitBtn.disabled = false;
  attemptsDisplay.textContent = "Attempts: 0";
  guessesDisplay.textContent = "";
  restartBtn.style.display = "none";
});