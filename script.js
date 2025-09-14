document.addEventListener('DOMContentLoaded', function() {
  const openBtn = document.getElementById('openBtn');
  const closeBtn = document.getElementById('closeBtn');
  const page1 = document.getElementById('page1');
  const page2 = document.getElementById('page2');
  const audioControl = document.getElementById('audioControl');
  const backgroundMusic = document.getElementById('backgroundMusic');
  const prevBtn = document.getElementById('prevBtn');
  const nextBtn = document.getElementById('nextBtn');
  const dots = document.querySelectorAll('.gallery-dot');
  const card = document.querySelector('.card');
  
  // Photo gallery variables
  const photos = document.querySelectorAll('.gallery-photo');
  let currentPhotoIndex = 0;
  let photoInterval;

  // Function to create confetti
  function createConfetti() {
    const colors = ['#ff4d4d', '#ffeb3b', '#4caf50', '#2196f3', '#9c27b0', '#FF9800', '#00BCD4'];
    
    for (let i = 0; i < 70; i++) {
      const confetti = document.createElement('div');
      confetti.className = 'confetti';
      confetti.style.left = Math.random() * 100 + 'vw';
      confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
      confetti.style.width = (8 + Math.random() * 12) + 'px';
      confetti.style.height = (8 + Math.random() * 12) + 'px';
      confetti.style.borderRadius = Math.random() > 0.5 ? '50%' : '0';
      confetti.style.animation = `fall ${3 + Math.random() * 5}s linear forwards`;
      confetti.style.animationDelay = Math.random() * 2 + 's';
      document.body.appendChild(confetti);
      
      // Remove confetti after animation completes
      setTimeout(() => {
        if (confetti.parentNode) {
          confetti.remove();
        }
      }, 8000);
    }
  }
  
  // Function to show a specific photo
  function showPhoto(index) {
    // Remove active class from all photos and dots
    photos.forEach(photo => photo.classList.remove('active'));
    dots.forEach(dot => dot.classList.remove('active'));
    
    // Add active class to current photo and dot
    photos[index].classList.add('active');
    dots[index].classList.add('active');
    
    currentPhotoIndex = index;
  }
  
  // Function to show next photo
  function nextPhoto() {
    let nextIndex = (currentPhotoIndex + 1) % photos.length;
    showPhoto(nextIndex);
  }
  
  // Function to show previous photo
  function prevPhoto() {
    let prevIndex = (currentPhotoIndex - 1 + photos.length) % photos.length;
    showPhoto(prevIndex);
  }
  
  // Function to start automatic photo rotation
  function startPhotoRotation() {
    clearInterval(photoInterval);
    photoInterval = setInterval(nextPhoto, 4000); // Change photo every 4 seconds
  }
  
  // Function to stop automatic photo rotation
  function stopPhotoRotation() {
    clearInterval(photoInterval);
  }
  
  // Add click event to flip the card
  card.addEventListener('click', function() {
    page1.hidden = !page1.hidden;
    page2.hidden = !page2.hidden;
    
    if (page2.hidden === false) {
      createConfetti();
      startPhotoRotation(); // Start rotation when card is opened
    } else {
      stopPhotoRotation(); // Stop rotation when card is closed
    }
  });
  
  // Add click event to the buttons
  openBtn.addEventListener('click', function(e) {
    e.stopPropagation();
    page1.hidden = true;
    page2.hidden = false;
    createConfetti();
    startPhotoRotation();
  });
  
  closeBtn.addEventListener('click', function(e) {
    e.stopPropagation();
    page1.hidden = false;
    page2.hidden = true;
    createConfetti();
    stopPhotoRotation();
  });
  
  // Audio control
  audioControl.addEventListener('click', function(e) {
    e.stopPropagation();
    if (backgroundMusic.paused) {
      backgroundMusic.play();
      this.innerHTML = '<i class="fas fa-volume-up"></i>';
    } else {
      backgroundMusic.pause();
      this.innerHTML = '<i class="fas fa-volume-mute"></i>';
    }
  });
  
  // Gallery controls
  nextBtn.addEventListener('click', function(e) {
    e.stopPropagation();
    nextPhoto();
  });
  
  prevBtn.addEventListener('click', function(e) {
    e.stopPropagation();
    prevPhoto();
  });
  
  // Dot navigation
  dots.forEach(dot => {
    dot.addEventListener('click', function(e) {
      e.stopPropagation();
      const index = parseInt(this.getAttribute('data-index'));
      showPhoto(index);
    });
  });
  
  // Initialize the photo gallery
  showPhoto(0);
});