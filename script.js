document.addEventListener('DOMContentLoaded', function () {
  const openBtn  = document.getElementById('openBtn');
  const closeBtn = document.getElementById('closeBtn');
  const page1    = document.getElementById('page1');
  const page2    = document.getElementById('page2');

  const audioControl    = document.getElementById('audioControl');
  const backgroundMusic = document.getElementById('backgroundMusic');

  const prevBtn = document.getElementById('prevBtn');
  const nextBtn = document.getElementById('nextBtn');

  const dots   = document.querySelectorAll('.gallery-dot');
  const photos = document.querySelectorAll('.gallery-photo');

  const confettiContainer = document.querySelector('.confetti-container');

  let currentPhotoIndex = 0;
  let photoInterval;

  // Confetti inside the card only
  function createConfetti() {
    if (!confettiContainer) return;
    const colors = ['#ff4d4d', '#ffeb3b', '#4caf50', '#2196f3', '#9c27b0', '#FF9800', '#00BCD4'];
    const pieces = 80; // slightly more for visibility

    for (let i = 0; i < pieces; i++) {
      const confetti = document.createElement('div');
      confetti.className = 'confetti';

      confetti.style.left = Math.random() * 100 + '%';
      confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
      confetti.style.width  = (8 + Math.random() * 12) + 'px';
      confetti.style.height = (8 + Math.random() * 12) + 'px';
      confetti.style.borderRadius = Math.random() > 0.5 ? '50%' : '0';

      const duration = 3 + Math.random() * 5;
      const delay    = Math.random() * 1.2;

      confetti.style.animation = `fallInCard ${duration}s linear ${delay}s forwards`;
      confettiContainer.appendChild(confetti);

      setTimeout(() => { if (confetti.parentNode) confetti.remove(); }, (duration + delay + 0.25) * 1000);
    }
  }

  // Slideshow helpers
  function showPhoto(index) {
    if (!photos.length) return;
    photos.forEach(p => p.classList.remove('active'));
    dots.forEach(d => d.classList.remove('active'));
    photos[index].classList.add('active');
    if (dots[index]) dots[index].classList.add('active');
    currentPhotoIndex = index;
  }

  function nextPhoto() {
    if (!photos.length) return;
    showPhoto((currentPhotoIndex + 1) % photos.length);
  }

  function prevPhoto() {
    if (!photos.length) return;
    showPhoto((currentPhotoIndex - 1 + photos.length) % photos.length);
  }

  function startPhotoRotation() {
    clearInterval(photoInterval);
    if (photos.length > 1) photoInterval = setInterval(nextPhoto, 4000); // every 4s
  }

  function stopPhotoRotation() {
    clearInterval(photoInterval);
  }

  // Open/Close (buttons only)
  if (openBtn && closeBtn && page1 && page2) {
    openBtn.addEventListener('click', function (e) {
      e.stopPropagation();
      page1.hidden = true;
      page2.hidden = false;
      openBtn.setAttribute('aria-expanded', 'true');
      createConfetti();       // confetti on open
      startPhotoRotation();
    });

    closeBtn.addEventListener('click', function (e) {
      e.stopPropagation();
      page2.hidden = true;
      page1.hidden = false;
      openBtn.setAttribute('aria-expanded', 'false');
      createConfetti();       // confetti on close too (optional)
      stopPhotoRotation();
    });
  }

  // Audio control (optional)
  if (audioControl && backgroundMusic) {
    audioControl.addEventListener('click', function (e) {
      e.stopPropagation();
      if (backgroundMusic.paused) {
        backgroundMusic.play().catch(()=>{ /* autoplay may be blocked until user interacts */ });
        audioControl.innerHTML = '<i class="fas fa-volume-up"></i>';
      } else {
        backgroundMusic.pause();
        audioControl.innerHTML = '<i class="fas fa-volume-mute"></i>';
      }
    });
  }

  // Gallery controls
  if (nextBtn) nextBtn.addEventListener('click', function (e) { e.stopPropagation(); nextPhoto(); });
  if (prevBtn) prevBtn.addEventListener('click', function (e) { e.stopPropagation(); prevPhoto(); });

  dots.forEach(dot => {
    dot.addEventListener('click', function (e) {
      e.stopPropagation();
      const index = parseInt(this.getAttribute('data-index'), 10);
      if (!Number.isNaN(index)) showPhoto(index);
    });
  });

  // Initialize first slide
  showPhoto(0);
});
