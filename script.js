document.addEventListener('DOMContentLoaded', function () {
  const openBtn = document.getElementById('openBtn');
  const closeBtn = document.getElementById('closeBtn');
  const page1 = document.getElementById('page1');
  const page2 = document.getElementById('page2');

  const audioControl = document.getElementById('audioControl');
  const backgroundMusic = document.getElementById('backgroundMusic');

  const prevBtn = document.getElementById('prevBtn');
  const nextBtn = document.getElementById('nextBtn');
  const dots = document.querySelectorAll('.gallery-dot');
  const photos = document.querySelectorAll('.gallery-photo');

  const card = document.querySelector('.card');
  const confettiContainer = document.querySelector('.confetti-container');

  let currentPhotoIndex = 0;
  let photoInterval;

  // --- Confetti inside the card only ---
  function createConfetti() {
    const colors = ['#ff4d4d', '#ffeb3b', '#4caf50', '#2196f3', '#9c27b0', '#FF9800', '#00BCD4'];
    const pieces = 70;

    for (let i = 0; i < pieces; i++) {
      const confetti = document.createElement('div');
      confetti.className = 'confetti';

      // In-card positioning
      confetti.style.left = Math.random() * 100 + '%';
      confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
      confetti.style.width = (8 + Math.random() * 12) + 'px';
      confetti.style.height = (8 + Math.random() * 12) + 'px';
      confetti.style.borderRadius = Math.random() > 0.5 ? '50%' : '0';

      const duration = 3 + Math.random() * 5;
      const delay = Math.random() * 1.5;

      confetti.style.animation = `fallInCard ${duration}s linear ${delay}s forwards`;

      confettiContainer.appendChild(confetti);

      // Clean up
      setTimeout(() => {
        if (confetti.parentNode) confetti.remove();
      }, (duration + delay + 0.2) * 1000);
    }
  }

  // --- Slideshow helpers ---
  function showPhoto(index) {
    photos.forEach(p => p.classList.remove('active'));
    dots.forEach(d => d.classList.remove('active'));
    photos[index].classList.add('active');
    dots[index].classList.add('active');
    currentPhotoIndex = index;
  }

  function nextPhoto() {
    const nextIndex = (currentPhotoIndex + 1) % photos.length;
    showPhoto(nextIndex);
  }

  function prevPhoto() {
    const prevIndex = (currentPhotoIndex - 1 + photos.length) % photos.length;
    showPhoto(prevIndex);
  }

  function startPhotoRotation() {
    clearInterval(photoInterval);
    photoInterval = setInterval(nextPhoto, 4000); // rotate every 4s
  }

  function stopPhotoRotation() {
    clearInterval(photoInterval);
  }

  // --- Open/Close (buttons only) ---
  openBtn.addEventListener('click', function (e) {
    e.stopPropagation();
    page1.hidden = true;
    page2.hidden = false;
    openBtn.setAttribute('aria-expanded', 'true');
    createConfetti();
    startPhotoRotation();
  });

  closeBtn.addEventListener('click', function (e) {
    e.stopPropagation();
    page2.hidden = true;
    page1.hidden = false;
    openBtn.setAttribute('aria-expanded', 'false');
    createConfetti();
    stopPhotoRotation();
  });

  // Remove the old “click anywhere” behavior if it existed
  // (You had a card click listener before—now we don't attach one.)

  // --- Audio control ---
  if (audioControl && backgroundMusic) {
    audioControl.addEventListener('click', function (e) {
      e.stopPropagation();
      if (backgroundMusic.paused) {
        backgroundMusic.play().catch(() => {/* autoplay may be blocked until user interacts */});
        this.innerHTML = '<i class="fas fa-volume-up"></i>';
      } else {
        backgroundMusic.pause();
        this.innerHTML = '<i class="fas fa-volume-mute"></i>';
      }
    });
  }

  // --- Gallery controls ---
  nextBtn.addEventListener('click', function (e) {
    e.stopPropagation();
    nextPhoto();
  });

  prevBtn.addEventListener('click', function (e) {
    e.stopPropagation();
    prevPhoto();
  });

  dots.forEach(dot => {
    dot.addEventListener('click', function (e) {
      e.stopPropagation();
      const index = parseInt(this.getAttribute('data-index'));
      showPhoto(index);
    });
  });

  // Initialize first slide
  showPhoto(0);
});
