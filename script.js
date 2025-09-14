(() => {
  const openBtn = document.getElementById('openBtn');
  const closeBtn = document.getElementById('closeBtn');
  const page1   = document.getElementById('page1');
  const page2   = document.getElementById('page2');
  const slideImg= document.getElementById('slideshow-image');


  const SLIDES = [
    'images/photo1.jpg',
    'images/photo2.jpg',
    'images/photo3.jpg'
  ];


  const PALETTES = [
    ['#ff69b4','#ffb6c1','#fff0f5'],
    ['#4682b4','#2f4f4f','#dcdcdc'],
    ['#ff4500','#ffd700','#00ff00']
  ];


  let currentSlide = 0;


  function showInside() 
  {
    page1.classList.remove('active');
    page2.classList.add('active');


    setTimeout(() => 
    {
      const colors = PALETTES[Math.floor(Math.random()*PALETTES.length)];
      confetti({
        particleCount: 100,
        spread: 80,
        origin: { x: 0.5, y: 0.5 },
        colors
      });

      
    }, 300); // after fade in
  }


  function showFront() 
  {
    page2.classList.remove('active');
    page1.classList.add('active');
  }


  function rotateSlides() 
  {
    slideImg.style.opacity = 0;

    setTimeout(() => 
    {
      currentSlide = (currentSlide + 1) % SLIDES.length;
      slideImg.src = SLIDES[currentSlide];
      slideImg.style.opacity = 1;


    }, 400);

  }


  openBtn.addEventListener('click', showInside);
  closeBtn.addEventListener('click', showFront);
  setInterval(rotateSlides, 4000);

  
})();
