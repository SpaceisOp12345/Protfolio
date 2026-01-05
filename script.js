/* --- SMOOTH REVEAL ANIMATION --- */
const observerOptions = {
    threshold: 0.1, // Trigger when 10% of element is visible
    rootMargin: "0px 0px -50px 0px" // Trigger slightly before bottom
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            // Add the class that removes the blur and opacity
            entry.target.classList.add('blur-active');
        }
    });
}, observerOptions);

// Select all elements that need the blur effect
const hiddenElements = document.querySelectorAll('.blur-text, .blur-load');
hiddenElements.forEach((el) => observer.observe(el));


/* --- TYPEWRITER EFFECT --- */
const textToType = "Hii, My name is SpaceisOp. I like to code, play games, and build cool stuff on the internet.";
const typewriterElement = document.getElementById("typewriter-text");
let typeIndex = 0;

function typeWriter() {
    if (typeIndex < textToType.length) {
        typewriterElement.innerHTML += textToType.charAt(typeIndex);
        typeIndex++;
        setTimeout(typeWriter, 40); // Slightly faster typing for smoothness
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
