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
    var timeline = document.querySelector('.timeline');

    if (!timelineProgress || !timelineItems.length || !timeline) return;

    function updateTimeline() {
        var timelineRect = timeline.getBoundingClientRect();
        var windowHeight = window.innerHeight;

        var scrollStart = windowHeight * 0.7;
        var scrolled = scrollStart - timelineRect.top;
        var totalScroll = timelineRect.height;

        var progress = Math.min(Math.max(scrolled / totalScroll, 0), 1);
        timelineProgress.style.height = (progress * 100) + '%';

        timelineItems.forEach(function(item) {
            var itemRect = item.getBoundingClientRect();
            if (itemRect.top < windowHeight * 0.75) {
                item.classList.add('active');
            }
        });
    }

    window.addEventListener('scroll', updateTimeline, { passive: true });
    updateTimeline();
})();


// ========== NAVBAR ==========
(function() {
    var navbar = document.getElementById('navbar');
    var navLinks = document.querySelectorAll('.nav-link');
    var dockThreshold = 100; // pixels scrolled before docking

    if (!navbar) return;

    // --- Sections for active link tracking ---
    var sections = [];
    navLinks.forEach(function(link) {
        var sectionId = link.getAttribute('data-section');
        var sectionEl = document.getElementById(sectionId);
        if (sectionEl) {
            sections.push({ id: sectionId, el: sectionEl, link: link });
        }
    });

    // --- Smooth scroll on click ---
    navLinks.forEach(function(link) {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            var targetId = this.getAttribute('data-section');
            var targetEl = document.getElementById(targetId);
            if (targetEl) {
                var offset = navbar.classList.contains('docked') ? 80 : 70;
                var targetPos = targetEl.getBoundingClientRect().top + window.pageYOffset - offset;

                window.scrollTo({
                    top: targetPos,
                    behavior: 'smooth'
                });
            }
        });
    });

    // --- Scroll handler: dock navbar + highlight active link ---
    function onScroll() {
        var scrollY = window.pageYOffset || document.documentElement.scrollTop;

        // Dock / undock
        if (scrollY > dockThreshold) {
            navbar.classList.add('docked');
        } else {
            navbar.classList.remove('docked');
        }

        // Active section detection
        var currentSection = null;
        var windowHeight = window.innerHeight;

        for (var i = sections.length - 1; i >= 0; i--) {
            var rect = sections[i].el.getBoundingClientRect();
            // Consider a section "active" when its top is above 40% of viewport
            if (rect.top <= windowHeight * 0.4) {
                currentSection = sections[i].id;
                break;
            }
        }

        // If near top, default to home
        if (scrollY < 50) {
            currentSection = 'home';
        }

        // Update active classes
        navLinks.forEach(function(link) {
            if (link.getAttribute('data-section') === currentSection) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        });
    }

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll(); // Run on load
})();
