/* --- CUSTOM CURSOR --- */
const cursor = document.getElementById('custom-cursor');
const cursorText = document.getElementById('cursor-text');

let mouseX = 0, mouseY = 0;
let cursorX = 0, cursorY = 0;
let isClicked = false;
let isHovering = false;

// Track mouse position
window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
});

window.addEventListener('mousedown', () => {
    isClicked = true;
    cursor.classList.add('clicked');
});

window.addEventListener('mouseup', () => {
    isClicked = false;
    cursor.classList.remove('clicked');
});

window.addEventListener('mouseover', (e) => {
    const tag = e.target.tagName;
    const isLink = tag === 'A' || tag === 'BUTTON' || e.target.closest('a') || e.target.closest('button');
    
    if (isLink) {
        isHovering = true;
        cursor.classList.add('hovering');
        cursorText.textContent = 'OPEN';
    } else {
        isHovering = false;
        cursor.classList.remove('hovering');
        cursorText.textContent = 'VIEW';
    }
});

// Smooth spring-like cursor follow using lerp
function animateCursor() {
    const ease = 0.15; // Lower = smoother/slower, Higher = snappier
    cursorX += (mouseX - cursorX) * ease;
    cursorY += (mouseY - cursorY) * ease;
    
    cursor.style.left = cursorX + 'px';
    cursor.style.top = cursorY + 'px';
    
    requestAnimationFrame(animateCursor);
}
animateCursor();

// Hide cursor when mouse leaves window
document.addEventListener('mouseleave', () => {
    cursor.style.opacity = '0';
});
document.addEventListener('mouseenter', () => {
    cursor.style.opacity = '1';
});


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
