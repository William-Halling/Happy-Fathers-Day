// Flip the card and trigger confetti + sound
function openCard() {
  const card = document.getElementById('card');
  card.classList.add('open');

  // Play flip sound
  const flipSound = new Audio('sounds/flip.mp3');
  flipSound.play();

  // Random confetti palette
  const palettes = [
    ['#ff69b4', '#ffb6c1', '#fff0f5'],      // Warm & loving
    ['#4682b4', '#2f4f4f', '#dcdcdc'],      // Classic dad
    ['#ff4500', '#ffd700', '#00ff00']       // Bold celebration
  ];
  const randomPalette = palettes[Math.floor(Math.random() * palettes.length)];

  
  // Trigger confetti burst
  confetti({
    particleCount: 100,
    spread: 70,
    origin: { y: 0.6 },
    colors: randomPalette
  });
}

// Time-based message
const hour = new Date().getHours();
const message = document.querySelector('.message');


if (hour < 12) 
{
  message.textContent = "Good morning Dad! Wishing you a joyful Father's Day.";
} 

else if (hour < 18) 
{
  message.textContent = "Hope you're having a wonderful afternoon, Dad!";
} 
else
{
  message.textContent = "Good evening Dad! Sending love and gratitude your way.";
}


// Slideshow logic
const images = [
  'images/photo1.jpg',
  'images/photo2.jpg',
  'images/photo3.jpg'
];


let current = 0;
const slideshow = document.getElementById('slideshow-image');


setInterval(() => {
  slideshow.style.opacity = 0;
  setTimeout(() => {
    current = (current + 1) % images.length;
    slideshow.src = images[current];
    slideshow.style.opacity = 1;
  }, 500);
}, 4000);
