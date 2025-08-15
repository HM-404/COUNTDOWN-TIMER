const countdownElement = document.getElementById("countdown");
const daysElement = document.getElementById("days");
const hoursElement = document.getElementById("hours");
const minutesElement = document.getElementById("minutes");
const secondsElement = document.getElementById("seconds");
const progressBar = document.getElementById("progress-bar");
const fireworksCanvas = document.getElementById("fireworks");
const sound = document.getElementById("sound");

let countdownDate;
let countdownInterval;

// Function to start the countdown
function startCountdown() {
  const dateInput = document.getElementById("target-date").value;
  const timeInput = document.getElementById("target-time").value;

  if (!dateInput || !timeInput) {
    alert("Please select both date and time.");
    return;
  }

  // Combine date and time inputs into a single Date object
  countdownDate = new Date(`${dateInput}T${timeInput}`);

  // Clear any existing countdown interval
  clearInterval(countdownInterval);

  // Start the countdown
  countdownInterval = setInterval(updateTimer, 1000);
}

// Function to update the timer
function updateTimer() {
  const now = new Date().getTime();
  const distance = countdownDate - now;

  // Check if the countdown has expired
  if (distance < 0) {
    clearInterval(countdownInterval);
    countdownElement.innerHTML = "EXPIRED";
    playFireworks();
    sound.play();
    return;
  }

  // Time calculations
  const days = Math.floor(distance / (1000 * 60 * 60 * 24));
  const hours = Math.floor(
    (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
  );
  const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((distance % (1000 * 60)) / 1000);

  // Update countdown display
  daysElement.innerHTML = days < 10 ? "0" + days : days;
  hoursElement.innerHTML = hours < 10 ? "0" + hours : hours;
  minutesElement.innerHTML = minutes < 10 ? "0" + minutes : minutes;
  secondsElement.innerHTML = seconds < 10 ? "0" + seconds : seconds;

  // Update progress bar
  const totalDuration = countdownDate - new Date().getTime();
  const elapsed = new Date().getTime() - (new Date().getTime() - totalDuration);
  const progressPercentage =
    (elapsed / (countdownDate - new Date().getTime())) * 100;
  progressBar.style.width = progressPercentage + "%";
}

// Function to play fireworks
function playFireworks() {
  fireworksCanvas.style.display = "block";
  const ctx = fireworksCanvas.getContext("2d");
  fireworksCanvas.width = window.innerWidth;
  fireworksCanvas.height = window.innerHeight;

  // Fireworks animation logic (basic example)
  for (let i = 0; i < 100; i++) {
    const x = Math.random() * fireworksCanvas.width;
    const y = Math.random() * fireworksCanvas.height;
    const radius = Math.random() * 5 + 5;
    const color = `hsl(${Math.random() * 360}, 100%, 50%)`;
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, Math.PI * 2);
    ctx.fillStyle = color;
    ctx.fill();
  }

  // Hide fireworks after a few seconds
  setTimeout(() => {
    fireworksCanvas.style.display = "none";
  }, 5000);
}

// Event listeners for buttons
document
  .getElementById("start-countdown")
  .addEventListener("click", startCountdown);
document.getElementById("reset-countdown").addEventListener("click", () => {
  clearInterval(countdownInterval);
  countdownElement.innerHTML = "00 days 00 hrs 00 mins 00 secs";
  progressBar.style.width = "0%";
});
