// Register ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

// Preloader Animation
const preTl = gsap.timeline();

preTl.to(".preloader-badge", { opacity: 1, y: -10, duration: 0.3, ease: "power2.out", delay: 0.2 })
  .to(".welcome-text", { opacity: 1, y: -10, duration: 0.6, ease: "power2.out" }, "-=0.1")
  // Breathing animation (infinite loop until preloader hides)
  .to(".welcome-text", {
    scale: 1.03,
    opacity: 0.8,
    duration: 1.2,
    repeat: -1,
    yoyo: true,
    ease: "sine.inOut"
  }, "-=0.2")
  .to(".loading-percentage", { opacity: 1, duration: 0.1 }, "-=1")
  .to(".loading-bar", { width: "100%", backgroundColor: "#86d100", duration: 3, ease: "none" }, "-=1")
  .to(".loading-percentage", {
    innerText: 100,
    duration: 3,
    snap: { innerText: 1 },
    onUpdate: function() {
        document.querySelector(".loading-percentage").innerHTML = Math.ceil(this.targets()[0].innerText) + "%";
    }
  }, "-=3")
  .to("#preloader", { 
      opacity: 0, 
      display: "none", 
      duration: 0.4, 
      ease: "power2.inOut",
      onComplete: () => {
          initSafeHero();
      }
  });

function initSafeHero() {
    const heroTl = gsap.timeline();
    heroTl.from(".hero-subline", { y: 20, opacity: 0, duration: 0.8 })
          .from(".hero-content-safe h1", { y: 30, opacity: 0, duration: 0.8 }, "-=0.4")
          .from(".hero-content-safe p", { y: 20, opacity: 0, duration: 0.8 }, "-=0.4")
          .from(".hero-btns-safe", { y: 20, opacity: 0, duration: 0.8 }, "-=0.4")
          .from(".hero-image-safe", { x: 50, opacity: 0, duration: 1.2, ease: "power3.out" }, "-=0.8");
}

// Section Titles Reveal Animation
document.querySelectorAll('.section-title-safe').forEach(titleBlock => {
    gsap.from(titleBlock.querySelector('h2'), {
        scrollTrigger: {
            trigger: titleBlock,
            start: "top 85%",
        },
        y: -30,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out"
    });
    
    const badge = titleBlock.querySelector('.badge-safe');
    if (badge) {
        gsap.from(badge, {
            scrollTrigger: {
                trigger: titleBlock,
                start: "top 85%",
            },
            scale: 0.8,
            opacity: 0,
            duration: 0.6,
            delay: 0.3,
            ease: "back.out(2)"
        });
    }
});

// Floating Feature Cards Reveal
gsap.from(".feature-card-safe", {
    scrollTrigger: {
        trigger: ".features-floating",
        start: "top 85%",
    },
    y: 50,
    opacity: 0,
    duration: 0.8,
    stagger: 0.2,
    ease: "power2.out"
});

// Stats Bar Reveal
gsap.from(".stat-safe", {
    scrollTrigger: {
        trigger: ".stats-bar-safe",
        start: "top 90%",
    },
    scale: 0.9,
    opacity: 0,
    duration: 0.8,
    stagger: 0.15,
    ease: "back.out(1.7)"
});

// Smooth Scroll for Nav Links
document.querySelectorAll('.nav-safe a').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });
});

// Clients Marquee Animation Safe Vision
window.addEventListener('load', () => {
    const marqueeSafe = document.querySelector('.marquee-content-safe');
    if (marqueeSafe) {
        // Force layout recalculation just in case
        const marqueeWidth = marqueeSafe.scrollWidth;
        
        gsap.to(".marquee-content-safe", {
            x: `-${marqueeWidth / 2}px`,
            duration: 35,
            ease: "none",
            repeat: -1
        });
    }
});

// Contact Section Reveal
gsap.from(".contact-safe-container", {
    scrollTrigger: {
        trigger: ".contact-safe-section",
        start: "top 85%",
    },
    y: 40,
    opacity: 0,
    duration: 1,
    ease: "power2.out"
});

// Smart Header - Hide on scroll down, show on scroll up
let lastScrollY = window.scrollY;
const header = document.querySelector('.main-header');

window.addEventListener('scroll', () => {
    if (window.scrollY > lastScrollY && window.scrollY > 100) {
        // Scrolling down & past 100px -> hide
        header.style.transform = 'translateY(-100%)';
    } else {
        // Scrolling up -> show
        header.style.transform = 'translateY(0)';
    }
    lastScrollY = window.scrollY;
});

// Coin Flip Logic for "Working With" section
const allTechImages = [
    "1.png",
    "2.png",
    "3.png",
    "4.png",
    "5.png",
    "6.png"
];

let visibleImages = [allTechImages[0], allTechImages[1], allTechImages[2]];
let hiddenImages = [allTechImages[3], allTechImages[4], allTechImages[5]];

const flipCards = document.querySelectorAll('.flip-card');

if (flipCards.length === 3) {
    setInterval(() => {
        // Pick a random card slot to flip (0, 1, or 2)
        const slotIndex = Math.floor(Math.random() * 3);
        const card = flipCards[slotIndex];
        
        // Pick a random image from the hidden pool
        const hiddenImageIndex = Math.floor(Math.random() * hiddenImages.length);
        const newImageSrc = hiddenImages[hiddenImageIndex];
        
        // Determine which side is currently hidden
        const isFlipped = card.classList.contains('flipped');
        
        // Find the image elements
        const backImg = card.querySelector('.flip-card-back img');
        const frontImg = card.querySelector('.flip-card-front img');
        
        // The image currently visible before the flip
        const oldImageSrc = visibleImages[slotIndex];
        
        if (!isFlipped) {
            // Front is visible, we are flipping to the back
            backImg.src = newImageSrc;
            card.classList.add('flipped');
        } else {
            // Back is visible, we are flipping to the front
            frontImg.src = newImageSrc;
            card.classList.remove('flipped');
        }
        
        // Update state arrays to prevent duplicates
        visibleImages[slotIndex] = newImageSrc;
        hiddenImages[hiddenImageIndex] = oldImageSrc;
        
    }, 2500); // Flip every 2.5 seconds
}
