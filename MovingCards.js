let direction = 1; 
let position = 0;
let isPaused = false; 
const cardWidth = 160;

function autoSlide() {
  if (!isPaused) { 
    const cardsContainer = document.querySelector('.cards');
    const containerWidth = document.querySelector('.card-container').offsetWidth;
    const cardsWidth = cardsContainer.scrollWidth;

   
    const maxPosition = cardsWidth - containerWidth;

    
    position += direction * 1; 

    
    if (position <= 0 || position >= maxPosition) {
      direction *= -1;
    }

   
    cardsContainer.style.transform = `translateX(-${position}px)`;
  }

  
  requestAnimationFrame(autoSlide);
}


autoSlide();


const cardContainer = document.querySelector('.card-container');
cardContainer.addEventListener('mouseenter', () => {
  isPaused = true; 
});
cardContainer.addEventListener('mouseleave', () => {
  isPaused = false; 
});


function moveCards(offset) {
  const cardsContainer = document.querySelector('.cards');
  position += offset; 
  const maxPosition = cardsContainer.scrollWidth - cardContainer.offsetWidth;

  
  if (position < 0) position = 0;
  if (position > maxPosition) position = maxPosition;

 
  cardsContainer.style.transform = `translateX(-${position}px)`;
}


document.querySelector('.left-arrow').addEventListener('click', () => {
  moveCards(-cardWidth); 
});

document.querySelector('.right-arrow').addEventListener('click', () => {
  moveCards(cardWidth); 
});
