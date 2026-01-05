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
