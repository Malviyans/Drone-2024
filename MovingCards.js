document.addEventListener("DOMContentLoaded", function () {
    const carousel = document.querySelector('.carousel');
    const images = document.querySelectorAll('.carousel img');
    const nextButton = document.getElementById('next');
    const prevButton = document.getElementById('prev');

    let scrollPosition = 0;
    let totalWidth = 0;
    
    // Calculate the total width of all images (image width + margin)
    images.forEach(img => {
        totalWidth += img.clientWidth + 20; // Add margin between images
    });

    const imageWidth = images[0].clientWidth + 20; // Image width + margin
    
    // Adjust animation duration based on the total width of images
    const animationDuration = totalWidth / 100; // Adjust this to fine-tune speed
    carousel.style.animationDuration = `${animationDuration}s`;

    // Function to handle the next slide
    nextButton.addEventListener('click', () => {
        const maxScroll = totalWidth - carousel.clientWidth;
        if (scrollPosition < maxScroll) {
            scrollPosition += imageWidth;
            carousel.style.transform = `translateX(-${scrollPosition}px)`;
            carousel.style.transition = 'transform 0.5s ease'; // Smooth transition
        }
    });

    // Function to handle the previous slide
    prevButton.addEventListener('click', () => {
        if (scrollPosition > 0) {
            scrollPosition -= imageWidth;
            carousel.style.transform = `translateX(-${scrollPosition}px)`;
            carousel.style.transition = 'transform 0.5s ease'; // Smooth transition
        }
    });

    // Reset the scroll position when the animation completes
    carousel.addEventListener('animationiteration', () => {
        carousel.style.transform = 'translateX(0)'; // Restart from the beginning
        scrollPosition = 0;
    });
});
