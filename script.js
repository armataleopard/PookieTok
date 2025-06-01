document.addEventListener('DOMContentLoaded', () => {
    // Initialize the carousel
    initCarousel();
    
    // Initialize the custom cursor
    initCustomCursor();
    
    // Initialize the eye tracking effect
    initEyeTracking();
    
    // Create floating Pookie eyes
    createFloatingPookies();
    
    // Initialize animations with GSAP
    initAnimations();
});

// Custom Cursor
function initCustomCursor() {
    const cursor = document.querySelector('.cursor');
    const heroSection = document.getElementById('hero');
    
    // Show custom cursor
    cursor.style.display = 'block';
    
    // Move cursor with mouse
    document.addEventListener('mousemove', (e) => {
        // Check if we're over the hero banner
        const heroRect = heroSection.getBoundingClientRect();
        const isOverHero = 
            e.clientX >= heroRect.left && 
            e.clientX <= heroRect.right && 
            e.clientY >= heroRect.top && 
            e.clientY <= heroRect.bottom;
        
        // Only show cursor when not over hero section
        cursor.style.opacity = isOverHero ? '0' : '1';
        
        // Update cursor position
        cursor.style.left = `${e.clientX}px`;
        cursor.style.top = `${e.clientY}px`;
        
        // Change cursor appearance when hovering over buttons or links
        const target = e.target;
        if (target.tagName.toLowerCase() === 'button' || 
            target.tagName.toLowerCase() === 'a' || 
            target.classList.contains('indicator')) {
            cursor.style.transform = 'translate(-50%, -50%) scale(1.5)';
            cursor.style.backgroundPosition = '80% 20%'; // Make Pookie's eyes look happy
        } else {
            cursor.style.transform = 'translate(-50%, -50%) scale(1)';
            cursor.style.backgroundPosition = 'center';
        }
    });
    
    // Hide cursor when leaving window
    document.addEventListener('mouseout', () => {
        cursor.style.opacity = '0';
    });
    
    // Show cursor when entering window
    document.addEventListener('mouseover', () => {
        cursor.style.opacity = '1';
    });
}

// Eye Tracking Effect
function initEyeTracking() {
    const eyes = document.getElementById('pookie-eyes');
    const heroSection = document.getElementById('hero');
    
    heroSection.addEventListener('mousemove', (e) => {
        const heroRect = heroSection.getBoundingClientRect();
        const eyesRect = eyes.getBoundingClientRect();
        
        // Calculate the center of the eyes
        const eyesCenterX = eyesRect.left + eyesRect.width / 2;
        const eyesCenterY = eyesRect.top + eyesRect.height / 2;
        
        // Calculate the angle between the mouse and the eyes
        const deltaX = e.clientX - eyesCenterX;
        const deltaY = e.clientY - eyesCenterY;
        
        // Limit the movement of the "pupils" (actually the whole image)
        const maxMovement = 10; // Maximum pixel movement
        const percentX = (deltaX / (heroRect.width / 2)) * maxMovement;
        const percentY = (deltaY / (heroRect.height / 2)) * maxMovement;
        
        // Apply the transform - subtle movement
        eyes.style.transform = `translate(${percentX}px, ${percentY}px)`;
    });
    
    // Reset when mouse leaves
    heroSection.addEventListener('mouseleave', () => {
        eyes.style.transform = 'translate(0, 0)';
    });
}

// Carousel Functionality
function initCarousel() {
    const track = document.querySelector('.carousel-track');
    const cards = Array.from(document.querySelectorAll('.adventure-card'));
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    const indicators = document.querySelectorAll('.indicator');
    
    let currentIndex = 0;
    const cardWidth = 100; // Width in percentage
    
    // Set initial state
    updateCarousel();
    
    // Set up event listeners
    prevBtn.addEventListener('click', () => {
        currentIndex = (currentIndex === 0) ? cards.length - 1 : currentIndex - 1;
        updateCarousel();
    });
    
    nextBtn.addEventListener('click', () => {
        currentIndex = (currentIndex === cards.length - 1) ? 0 : currentIndex + 1;
        updateCarousel();
    });
    
    indicators.forEach((indicator, index) => {
        indicator.addEventListener('click', () => {
            currentIndex = index;
            updateCarousel();
        });
    });
    
    // Update carousel state
    function updateCarousel() {
        // Move track
        track.style.transform = `translateX(-${currentIndex * cardWidth}%)`;
        
        // Update active card
        cards.forEach((card, index) => {
            if (index === currentIndex) {
                card.classList.add('active');
            } else {
                card.classList.remove('active');
            }
        });
        
        // Update indicators
        indicators.forEach((indicator, index) => {
            if (index === currentIndex) {
                indicator.classList.add('active');
            } else {
                indicator.classList.remove('active');
            }
        });
    }
    
    // Make the first card active by default
    cards[0].classList.add('active');
}

// Floating Pookies Animation
function createFloatingPookies() {
    const floatingPookiesContainer = document.querySelector('.floating-pookies');
    const numberOfPookies = 15;
    
    for (let i = 0; i < numberOfPookies; i++) {
        const pookie = document.createElement('div');
        pookie.classList.add('floating-pookie');
        
        // Style the floating pookie
        pookie.style.position = 'absolute';
        pookie.style.width = `${Math.random() * 20 + 20}px`; // Random size between 20-40px
        pookie.style.height = pookie.style.width;
        pookie.style.backgroundImage = 'url("banner.jpg")';
        pookie.style.backgroundSize = '200%';
        pookie.style.backgroundPosition = 'center';
        pookie.style.borderRadius = '50%';
        pookie.style.opacity = `${Math.random() * 0.4 + 0.1}`; // Random opacity between 0.1-0.5
        
        // Random starting position
        pookie.style.left = `${Math.random() * 100}%`;
        pookie.style.top = `${Math.random() * 100}%`;
        
        // Append to container
        floatingPookiesContainer.appendChild(pookie);
        
        // Animate with GSAP
        animateFloatingPookie(pookie);
    }
}

// Animate individual floating pookie
function animateFloatingPookie(pookie) {
    const duration = Math.random() * 10 + 10; // Random duration between 10-20 seconds
    
    gsap.to(pookie, {
        y: `-=${Math.random() * 200 + 100}`, // Float upward by 100-300px
        x: `+=${Math.random() * 100 - 50}`, // Drift slightly left or right
        duration: duration,
        ease: "none",
        opacity: 0,
        onComplete: function() {
            // Reset position after animation completes
            pookie.style.top = `${Math.random() * 100 + 100}%`; // Start from below
            pookie.style.left = `${Math.random() * 100}%`;
            pookie.style.opacity = `${Math.random() * 0.4 + 0.1}`;
            
            // Restart animation
            animateFloatingPookie(pookie);
        }
    });
}

// GSAP Animations
function initAnimations() {
    // Hero section entrance animation
    gsap.from('.title', {
        y: 50,
        opacity: 0,
        duration: 1,
        ease: 'power3.out'
    });
    
    gsap.from('.tagline', {
        y: 30,
        opacity: 0,
        duration: 1,
        delay: 0.3,
        ease: 'power3.out'
    });
    
    gsap.from('.hero-image', {
        scale: 0.8,
        opacity: 0,
        duration: 1.2,
        delay: 0.5,
        ease: 'back.out(1.7)'
    });
    
    // Scroll animations
    const sections = document.querySelectorAll('section:not(.hero-section)');
    
    sections.forEach(section => {
        gsap.from(section, {
            scrollTrigger: {
                trigger: section,
                start: 'top 80%',
            },
            y: 30,
            opacity: 0,
            duration: 0.8,
            ease: 'power2.out'
        });
    });
    
    // Twitter button hover effect
    const twitterBtn = document.querySelector('.twitter-btn');
    
    twitterBtn.addEventListener('mouseenter', () => {
        gsap.to(twitterBtn, {
            scale: 1.05,
            duration: 0.3,
            ease: 'power1.out'
        });
    });
    
    twitterBtn.addEventListener('mouseleave', () => {
        gsap.to(twitterBtn, {
            scale: 1,
            duration: 0.3,
            ease: 'power1.out'
        });
    });
} 