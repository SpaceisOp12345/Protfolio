/* --- SCROLL FADE IN --- */
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
});

const elements = document.querySelectorAll('.fade-in, .animate-on-scroll, .main-card');
elements.forEach(el => observer.observe(el));

/* --- TYPEWRITER --- */
const bioText = "Hii, My name is SpaceisOp. I like to code, play games, and build cool stuff on the internet.";
const bioElement = document.getElementById("bio-text");
let charIndex = 0;

function typeWriter() {
    if (charIndex < bioText.length) {
        bioElement.innerHTML += bioText.charAt(charIndex);
        charIndex++;
        setTimeout(typeWriter, 35);
    }
}
window.onload = typeWriter;

/* --- ZOOM IMAGE (LIGHTBOX) --- */
const modal = document.getElementById('zoom-modal');
const modalImg = document.getElementById('zoom-target');
const closeBtn = document.querySelector('.close-btn');

// Select all zoomable images
const images = document.querySelectorAll('.media-item img, .proof-img-container img');

images.forEach(img => {
    img.addEventListener('click', () => {
        modal.classList.add('active');
        modalImg.src = img.src;
    });
});

closeBtn.addEventListener('click', () => {
    modal.classList.remove('active');
});

modal.addEventListener('click', (e) => {
    if (e.target !== modalImg) {
        modal.classList.remove('active');
    }
});
