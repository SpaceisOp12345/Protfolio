/* --- SCROLL ANIMATION --- */
const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add('show-element');
        }
    });
});

const animatedElements = document.querySelectorAll('.animate-on-scroll');
animatedElements.forEach((el) => observer.observe(el));


/* --- TYPEWRITER --- */
const text = "Hii, My name is SpaceisOp. I like to code, play games, and build cool stuff on the internet.";
const textElement = document.getElementById("typewriter-text");
let index = 0;

function typeWriter() {
    if (index < text.length) {
        textElement.innerHTML += text.charAt(index);
        index++;
        setTimeout(typeWriter, 40);
    }
}
window.onload = typeWriter;


/* --- LIGHTBOX --- */
const lightbox = document.getElementById('lightbox');
const zoomImg = document.getElementById('zoom-img');
const closeBtn = document.querySelector('.close-lightbox');

// Select all images (Gallery + Proofs)
const images = document.querySelectorAll('.grid-item img, .proof-box img');

images.forEach(img => {
    img.addEventListener('click', () => {
        lightbox.classList.add('active');
        zoomImg.src = img.src;
    });
});

closeBtn.addEventListener('click', () => {
    lightbox.classList.remove('active');
});

lightbox.addEventListener('click', (e) => {
    if (e.target !== zoomImg) {
        lightbox.classList.remove('active');
    }
});
