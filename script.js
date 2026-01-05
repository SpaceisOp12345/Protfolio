/* --- SCROLL ANIMATION --- */
const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add('show');
        }
    });
});

const hiddenElements = document.querySelectorAll('.hidden, .media-card, .section-title, .subsection-label, .review-card');
hiddenElements.forEach((el) => observer.observe(el));


/* --- 3D TILT EFFECT (HERO CARD) --- */
const card = document.querySelector('.glass-card');
const container = document.querySelector('.hero-section');

// Moving Animation Event
container.addEventListener('mousemove', (e) => {
    let xAxis = (window.innerWidth / 2 - e.pageX) / 25;
    let yAxis = (window.innerHeight / 2 - e.pageY) / 25;
    
    // Limits rotation
    if(xAxis > 20) xAxis = 20; if(xAxis < -20) xAxis = -20;
    if(yAxis > 20) yAxis = 20; if(yAxis < -20) yAxis = -20;

    card.style.transform = `rotateY(${xAxis}deg) rotateX(${yAxis}deg)`;
});

// Animate In (Reset)
container.addEventListener('mouseenter', (e) => {
    card.style.transition = 'none';
});

// Animate Out (Reset)
container.addEventListener('mouseleave', (e) => {
    card.style.transition = 'all 0.5s ease';
    card.style.transform = `rotateY(0deg) rotateX(0deg)`;
});


/* --- TYPEWRITER EFFECT --- */
const textToType = "Hii, My name is SpaceisOp. I like to code, play games, and build cool stuff on the internet.";
const typewriterElement = document.getElementById("typewriter-text");
let typeIndex = 0;

function typeWriter() {
    if (typeIndex < textToType.length) {
        typewriterElement.innerHTML += textToType.charAt(typeIndex);
        typeIndex++;
        setTimeout(typeWriter, 50); // Speed of typing (50ms)
    }
}

// Start typing when page loads
window.onload = typeWriter;


/* --- LIGHTBOX LOGIC --- */
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const closeBtn = document.querySelector('.close-lightbox');
const allImages = document.querySelectorAll('.media-card img, .proof-img');

allImages.forEach(img => {
    img.addEventListener('click', () => {
        lightbox.classList.add('active');
        lightboxImg.src = img.src;
    });
});

closeBtn.addEventListener('click', () => {
    lightbox.classList.remove('active');
});

lightbox.addEventListener('click', (e) => {
    if (e.target !== lightboxImg) {
        lightbox.classList.remove('active');
    }
});
