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
        var isNavbar = false;
        var isLink = false;
        var isClose = false;
        var isScrollBtn = false;

        // Check if hovering over navbar or its children
        if (el.closest && el.closest('.navbar')) {
            isNavbar = true;
        }
        if (el.classList.contains('navbar')) {
            isNavbar = true;
        }

        // Check if hovering scroll-to-top button
        if (el.closest && el.closest('.scroll-top-btn')) {
            isScrollBtn = true;
        }
        if (el.classList.contains('scroll-top-btn')) {
            isScrollBtn = true;
        }

        // Check if hovering close button
        if (el.classList.contains('close-lightbox') || (el.closest && el.closest('.close-lightbox'))) {
            isClose = true;
        }

        // Check if hovering a link or button (but not navbar)
        if (!isNavbar && !isScrollBtn) {
            if (el.tagName === 'A' || el.tagName === 'BUTTON') {
                isLink = true;
            } else if (el.closest && (el.closest('a') || el.closest('button'))) {
                isLink = true;
            }
        }

        // Remove all states first
        cursor.classList.remove('is-hovering', 'is-pointer');

        // Apply appropriate state
        if (isNavbar || isScrollBtn) {
            cursor.classList.add('is-pointer');
        } else if (isClose) {
            cursor.classList.add('is-hovering');
            cursorText.textContent = 'CLOSE';
        } else if (isLink) {
            cursor.classList.add('is-hovering');
            cursorText.textContent = 'OPEN';
        } else {
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


// ========== FADE BLUR SCROLL ANIMATION ==========
(function() {
    var fadeElements = document.querySelectorAll('.fade-blur');

    if (!fadeElements.length) return;

    var observer = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    fadeElements.forEach(function(el) {
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


// ========== NAVBAR ACTIVE STATE ==========
(function() {
    var navLinks = document.querySelectorAll('.nav-link');

    if (!navLinks.length) return;

    // Collect sections
    var sections = [];
    navLinks.forEach(function(link) {
        var sectionId = link.getAttribute('data-section');
        var sectionEl = document.getElementById(sectionId);
        if (sectionEl) {
            sections.push({ id: sectionId, el: sectionEl, link: link });
        }
    });

    // Smooth scroll on click
    navLinks.forEach(function(link) {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            var targetId = this.getAttribute('data-section');
            var targetEl = document.getElementById(targetId);
            if (targetEl) {
                var offset = 100;
                var targetPos = targetEl.getBoundingClientRect().top + window.pageYOffset - offset;

                window.scrollTo({
                    top: targetPos,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Scroll handler for active state
    function onScroll() {
        var scrollY = window.pageYOffset || document.documentElement.scrollTop;
        var windowHeight = window.innerHeight;

        var currentSection = null;

        for (var i = sections.length - 1; i >= 0; i--) {
            var rect = sections[i].el.getBoundingClientRect();
            if (rect.top <= windowHeight * 0.4) {
                currentSection = sections[i].id;
                break;
            }
        }

        if (scrollY < 50) {
            currentSection = 'home';
        }

        navLinks.forEach(function(link) {
            if (link.getAttribute('data-section') === currentSection) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        });
    }

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
})();


// ========== SCROLL TO TOP BUTTON ==========
(function() {
    var scrollTopBtn = document.getElementById('scrollTopBtn');

    if (!scrollTopBtn) return;

    var showThreshold = 300;

    function toggleButton() {
        var scrollY = window.pageYOffset || document.documentElement.scrollTop;

        if (scrollY > showThreshold) {
            scrollTopBtn.classList.add('visible');
        } else {
            scrollTopBtn.classList.remove('visible');
        }
    }

    scrollTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    window.addEventListener('scroll', toggleButton, { passive: true });
    toggleButton();
})();


// ========== FETCH ROBLOX GAME DATA ==========
(function() {
    var gameCard = document.querySelector('.game-card');
    if (!gameCard) return;

    var gameThumb = document.getElementById('gameThumb');
    var thumbLoader = document.getElementById('thumbLoader');
    var gamePlaying = document.getElementById('gamePlaying');
    var gameVisits = document.getElementById('gameVisits');

    // The Place ID from the URL
    var placeId = '118637423917462';

    // Format large numbers
    function formatNumber(num) {
        if (num >= 1000000000) {
            return (num / 1000000000).toFixed(1) + 'B';
        }
        if (num >= 1000000) {
            return (num / 1000000).toFixed(1) + 'M';
        }
        if (num >= 1000) {
            return (num / 1000).toFixed(1) + 'K';
        }
        return num.toString();
    }

    // First, get the Universe ID from the Place ID
    fetch('https://apis.roproxy.com/universes/v1/places/' + placeId + '/universe')
        .then(function(response) { return response.json(); })
        .then(function(data) {
            if (data.universeId) {
                var universeId = data.universeId;
                
                // Fetch game thumbnail
                fetch('https://thumbnails.roproxy.com/v1/games/icons?universeIds=' + universeId + '&returnPolicy=PlaceHolder&size=512x512&format=Png&isCircular=false')
                    .then(function(response) { return response.json(); })
                    .then(function(thumbData) {
                        if (thumbData.data && thumbData.data[0] && thumbData.data[0].imageUrl) {
                            gameThumb.src = thumbData.data[0].imageUrl;
                            gameThumb.onload = function() {
                                gameThumb.classList.add('loaded');
                                if (thumbLoader) thumbLoader.style.display = 'none';
                            };
                        }
                    })
                    .catch(function(error) {
                        console.log('Error fetching thumbnail:', error);
                        if (thumbLoader) thumbLoader.innerHTML = '<i class="fa-solid fa-image" style="opacity: 0.3;"></i>';
                    });

                // Fetch game details (visits, playing)
                fetch('https://games.roproxy.com/v1/games?universeIds=' + universeId)
                    .then(function(response) { return response.json(); })
                    .then(function(gameData) {
                        if (gameData.data && gameData.data[0]) {
                            var game = gameData.data[0];
                            
                            // Update playing count
                            if (game.playing !== undefined) {
                                gamePlaying.textContent = formatNumber(game.playing);
                            }
                            
                            // Update visits count
                            if (game.visits !== undefined) {
                                gameVisits.textContent = formatNumber(game.visits);
                            }
                        }
                    })
                    .catch(function(error) {
                        console.log('Error fetching game data:', error);
                    });
            }
        })
        .catch(function(error) {
            console.log('Error fetching universe ID:', error);
            if (thumbLoader) thumbLoader.innerHTML = '<i class="fa-solid fa-exclamation-triangle" style="opacity: 0.3;"></i>';
        });
})();
