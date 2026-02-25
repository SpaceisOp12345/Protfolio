// ========== CUSTOM CURSOR ==========
(function() {
    var cursor = document.getElementById('customCursor');
    var cursorText = document.getElementById('cursorText');

    if (!cursor || !cursorText) return;

    var mouseX = -200;
    var mouseY = -200;
    var cursorX = -200;
    var cursorY = -200;

    window.addEventListener('mousemove', function(e) {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });

    window.addEventListener('mousedown', function() {
        cursor.classList.add('is-clicked');
    });

    window.addEventListener('mouseup', function() {
        cursor.classList.remove('is-clicked');
    });

    window.addEventListener('mouseover', function(e) {
        var el = e.target;
        var isLink = false;
        var isClose = false;

        // Check if hovering close button
        if (el.classList.contains('close-lightbox') || (el.closest && el.closest('.close-lightbox'))) {
            isClose = true;
        }

        // Check if hovering a link or button
        if (el.tagName === 'A' || el.tagName === 'BUTTON') {
            isLink = true;
        } else if (el.closest && (el.closest('a') || el.closest('button'))) {
            isLink = true;
        }

        if (isClose) {
            cursor.classList.add('is-hovering');
            cursorText.textContent = 'CLOSE';
        } else if (isLink) {
            cursor.classList.add('is-hovering');
            cursorText.textContent = 'OPEN';
        } else {
            cursor.classList.remove('is-hovering');
            cursorText.textContent = 'VIEW';
        }
    });

    document.addEventListener('mouseleave', function() {
        cursor.classList.add('is-hidden');
    });

    document.addEventListener('mouseenter', function() {
        cursor.classList.remove('is-hidden');
    });

    function updateCursor() {
        var ease = 0.12;
        cursorX += (mouseX - cursorX) * ease;
        cursorY += (mouseY - cursorY) * ease;

        cursor.style.left = cursorX + 'px';
        cursor.style.top = cursorY + 'px';

        requestAnimationFrame(updateCursor);
    }
    updateCursor();
})();


// ========== SCROLL ANIMATION ==========
(function() {
    var observer = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
            if (entry.isIntersecting) {
                entry.target.classList.add('show');
            }
        });
    });

    var hiddenElements = document.querySelectorAll('.hidden, .media-card, .section-title, .subsection-label, .review-card');
    hiddenElements.forEach(function(el) {
        observer.observe(el);
    });
})();


// ========== LIGHTBOX ==========
(function() {
    var lightbox = document.getElementById('lightbox');
    var lightboxImg = document.getElementById('lightbox-img');
    var closeBtn = document.querySelector('.close-lightbox');

    if (!lightbox || !lightboxImg || !closeBtn) return;

    var allImages = document.querySelectorAll('.media-card img, .proof-img');

    allImages.forEach(function(img) {
        img.addEventListener('click', function() {
            lightbox.classList.add('active');
            lightboxImg.src = img.src;
        });
    });

    closeBtn.addEventListener('click', function() {
        lightbox.classList.remove('active');
    });

    lightbox.addEventListener('click', function(e) {
        if (e.target !== lightboxImg) {
            lightbox.classList.remove('active');
        }
    });
})();
