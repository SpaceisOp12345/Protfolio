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

        if (el.classList.contains('close-lightbox') || (el.closest && el.closest('.close-lightbox'))) {
            isClose = true;
        }

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


// ========== PROCESS TIMELINE ==========
(function() {
    var timelineProgress = document.getElementById('timelineProgress');
    var timelineItems = document.querySelectorAll('.timeline-item');
    var timelineSection = document.querySelector('.process-section');
    var timeline = document.querySelector('.timeline');

    if (!timelineProgress || !timelineItems.length || !timelineSection || !timeline) return;

    function updateTimeline() {
        var timelineRect = timeline.getBoundingClientRect();
        var windowHeight = window.innerHeight;

        // Calculate how far the user has scrolled through the timeline
        var timelineTop = timelineRect.top;
        var timelineHeight = timelineRect.height;

        // The progress line starts filling when the timeline enters the viewport
        // and completes when the bottom of the timeline reaches the center of the viewport
        var scrollStart = windowHeight * 0.7; // Start when top is 70% down viewport
        var scrolled = scrollStart - timelineTop;
        var totalScroll = timelineHeight;

        var progress = Math.min(Math.max(scrolled / totalScroll, 0), 1);

        timelineProgress.style.height = (progress * 100) + '%';

        // Activate individual timeline items
        timelineItems.forEach(function(item) {
            var itemRect = item.getBoundingClientRect();
            var itemTop = itemRect.top;

            // Activate when the item's top reaches 75% of the viewport height
            if (itemTop < windowHeight * 0.75) {
                item.classList.add('active');
            }
        });
    }

    // Run on scroll
    window.addEventListener('scroll', updateTimeline, { passive: true });

    // Run on load
    updateTimeline();
})();
