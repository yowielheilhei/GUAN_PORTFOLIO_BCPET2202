/* ==========================================================================
   PORTFOLIO INTERACTIVITY LOGIC
   ========================================================================== */

document.addEventListener("DOMContentLoaded", () => {

  /* ----------------------------------------------------------------------
       1. GALLERY CAROUSEL LOGIC
       ---------------------------------------------------------------------- */
    const images = document.querySelectorAll('.gallery-carousel img');
    const projectTitle = document.querySelector('.project-item.full-width h3');
    const projectDesc = document.querySelector('.project-item.full-width p');
    
    // Grab the new buttons
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    
    let positions = ['pos-1', 'pos-2', 'pos-3', 'pos-4', 'pos-5'];

    const projectDetails = [
        {
            title: "F L O W E R S",
            desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit..."
        },
        {
            title: "R I Z A L",
            desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit..."
        },
        {
            title: "M E D Y O   S H O R T   F I L M",
            desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit..."
        },
        {
            title: "P L A T E S",
            desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit..."
        },
        {
            title: "H A R A N A",
            desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit..."
        }
    ];

    function renderImages() {
        if (!images.length) return; 
        images.forEach((img, index) => {
            img.classList.remove('pos-1', 'pos-2', 'pos-3', 'pos-4', 'pos-5');
            img.classList.add(positions[index]);
        });
    }

    // NEW: Extracted text swap logic into a reusable function
    function updateCarouselText() {
        const centerIndex = positions.indexOf('pos-3');
        if (projectTitle && projectDesc) {
            projectTitle.classList.add('fade-out');
            projectDesc.classList.add('fade-out');

            setTimeout(() => {
                projectTitle.textContent = projectDetails[centerIndex].title;
                projectDesc.textContent = projectDetails[centerIndex].desc;

                projectTitle.classList.remove('fade-out');
                projectDesc.classList.remove('fade-out');
            }, 300); 
        }
    }

    renderImages();

    // 1. Logic for clicking the Images directly
    images.forEach((img, index) => {
        img.addEventListener('click', () => {
            let currentPos = positions[index];

            if (currentPos === 'pos-3') return; 

            if (currentPos === 'pos-4') {
                positions.unshift(positions.pop());
            } else if (currentPos === 'pos-5') {
                positions.unshift(positions.pop());
                positions.unshift(positions.pop());
            } else if (currentPos === 'pos-2') {
                positions.push(positions.shift());
            } else if (currentPos === 'pos-1') {
                positions.push(positions.shift());
                positions.push(positions.shift());
            }
            renderImages();
            updateCarouselText();
        });
    });

    // 2. NEW: Logic for clicking the Buttons
    if (prevBtn && nextBtn) {
        // Next button moves carousel to the left
        nextBtn.addEventListener('click', () => {
            positions.unshift(positions.pop());
            renderImages();
            updateCarouselText();
        });

        // Prev button moves carousel to the right
        prevBtn.addEventListener('click', () => {
            positions.push(positions.shift());
            renderImages();
            updateCarouselText();
        });
    }


    /* ----------------------------------------------------------------------
       2. MODAL POP-UP LOGIC
       ---------------------------------------------------------------------- */
    const modal = document.getElementById('artistModal');
    const badge = document.getElementById('artistBadge');
    const closeBtn = document.querySelector('.close-modal');

    // Only run if the modal elements actually exist on the page
    if (modal && badge && closeBtn) {
        badge.addEventListener('click', () => {
            modal.classList.add('show');
        });

        closeBtn.addEventListener('click', () => {
            modal.classList.remove('show');
        });

        window.addEventListener('click', (event) => {
            if (event.target === modal) {
                modal.classList.remove('show');
            }
        });
    }


    /* ----------------------------------------------------------------------
       3. SCROLL REVEAL LOGIC
       ---------------------------------------------------------------------- */
    const hiddenElements = document.querySelectorAll('.hidden-scroll');
    
    if (hiddenElements.length > 0) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('show-scroll');
                }
            });
        });

        hiddenElements.forEach((el) => observer.observe(el));
    }

});

/* ----------------------------------------------------------------------
       4. SIDE SCROLL WHEEL LOGIC
       ---------------------------------------------------------------------- */
    const wheel = document.getElementById('scrollWheel');
    const wheelLabels = document.querySelectorAll('.wheel-label');
    const sections = document.querySelectorAll('section');

    if (wheel && wheelLabels.length > 0) {
        
        // 1. Click text to scroll to that section
        wheelLabels.forEach(label => {
            label.addEventListener('click', () => {
                const targetId = label.getAttribute('data-target');
                const targetSection = document.getElementById(targetId);
                if (targetSection) {
                    targetSection.scrollIntoView({ behavior: 'smooth' });
                }
            });
        });

        // 2. Watch the scroll position to rotate the wheel
        const wheelObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                // If a section is taking up at least 50% of the screen...
                if (entry.isIntersecting) {
                    const activeId = entry.target.id;
                    
                    // Find the matching label in the wheel
                    wheelLabels.forEach(label => {
                        if (label.getAttribute('data-target') === activeId) {
                            
                            // Make it dark text
                            label.classList.add('active');
                            
                            // Rotate the whole wheel based on its data-angle
                            const angle = label.getAttribute('data-angle');
                            wheel.style.transform = `rotate(${angle}deg)`;
                            
                        } else {
                            label.classList.remove('active');
                        }
                    });
                }
            });
        }, { threshold: 0.5 }); // 50% of the section must be visible to trigger

        // Tell the observer to watch all your main sections
        sections.forEach(section => {
            wheelObserver.observe(section);
        });
    }

    /* ----------------------------------------------------------------------
       5. AUTO-HIDE SCROLL WHEEL LOGIC
       ---------------------------------------------------------------------- */
    const sideNav = document.querySelector('.side-scroll-nav');
    let scrollTimer;

    if (sideNav) {
        // Show the wheel immediately when the page loads
        sideNav.classList.add('is-visible');
        
        // Hide it after 2 seconds if they don't scroll
        scrollTimer = setTimeout(() => {
            sideNav.classList.remove('is-visible');
        }, 2000);

        // Listen for any scrolling on the page
        window.addEventListener('scroll', () => {
            
            // 1. Show the wheel because the user is scrolling
            sideNav.classList.add('is-visible');

            // 2. Clear the old timer so it doesn't hide while we are still scrolling
            clearTimeout(scrollTimer);

            // 3. Set a new timer to hide the wheel 1.5 seconds after they STOP scrolling
            scrollTimer = setTimeout(() => {
                sideNav.classList.remove('is-visible');
            }, 500); // 1500 milliseconds = 1.5 seconds
        });
    }