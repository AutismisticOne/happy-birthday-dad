const canvas = document.getElementById("trail-canvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let mouse = { x: 0, y: 0 };
let trail = [];

document.addEventListener("mousemove", (e) => {
  mouse.x = e.clientX;
  mouse.y = e.clientY;
});

function drawTrail() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  trail.push({ x: mouse.x, y: mouse.y });
  if (trail.length > 25) trail.shift();

  for (let i = 0; i < trail.length - 1; i++) {
    const p1 = trail[i];
    const p2 = trail[i + 1];
    ctx.beginPath();
    ctx.moveTo(p1.x, p1.y);
    ctx.lineTo(p2.x, p2.y);
    ctx.strokeStyle = `hsla(${(i * 15) % 360}, 100%, 70%, ${(i + 1) / trail.length})`;
    ctx.lineWidth = 2.5;
    ctx.shadowColor = `hsla(${(i * 15) % 360}, 100%, 70%, 0.8)`;
    ctx.shadowBlur = 12;
    ctx.stroke();
  }

  requestAnimationFrame(drawTrail);
}

drawTrail();

window.addEventListener("resize", () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});

// Function to create floating dust bubbles
function createDustBubble() {
  const bubble = document.createElement('div');
  bubble.classList.add('bubble');
  document.body.appendChild(bubble);

  // Random position
  const startX = Math.random() * window.innerWidth;
  const startY = Math.random() * window.innerHeight;

  bubble.style.left = `${startX}px`;
  bubble.style.top = `${startY}px`;

  // Random size and duration for variety
  const size = Math.random() * 5 + 2; // Size between 2px and 7px
  bubble.style.width = `${size}px`;
  bubble.style.height = `${size}px`;

  // Random animation duration for each bubble (to make them look different)
  const duration = Math.random() * 10 + 5; // Duration between 5s and 15s
  bubble.style.animationDuration = `${duration}s`;

  // Remove the bubble when animation ends
  setTimeout(() => {
    bubble.remove();
  }, duration * 1000); // Convert seconds to milliseconds
}

// Create bubbles every 200ms
setInterval(createDustBubble, 200);

// Get the cake emoji element
const cake = document.getElementById("floating-cake");

// Set initial position and speed
let cakeX = Math.random() * window.innerWidth;
let cakeY = Math.random() * window.innerHeight;
let speedX = (Math.random() - 0.5) * 2;
let speedY = (Math.random() - 0.5) * 2;

// Update the cake's position and make it bounce
function moveCake() {
  // Move the cake by speed
  cakeX += speedX;
  cakeY += speedY;

  // Check if the cake hits the edges and reverse its direction
  if (cakeX <= 0 || cakeX >= window.innerWidth - cake.offsetWidth) {
    speedX = -speedX;
  }
  if (cakeY <= 0 || cakeY >= window.innerHeight - cake.offsetHeight) {
    speedY = -speedY;
  }

  // Update the position of the cake emoji
  cake.style.left = cakeX + 'px';
  cake.style.top = cakeY + 'px';
}

// Call the moveCake function repeatedly
setInterval(moveCake, 10);
