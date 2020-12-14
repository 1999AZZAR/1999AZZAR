// Back to Top Button - Optimized for Performance
// Enhanced with debouncing and requestAnimationFrame for smooth animations

// Get the button with fallback detection
var mybutton = document.getElementById("backToTopBtn");

// Debug: Check if button exists
if (!mybutton) {
    console.warn('Back to top button not found! Looking for alternative selectors...');
    // Try alternative selectors
    mybutton = document.querySelector('[id*="back"], [id*="top"], [class*="back"], [class*="top"]');
    if (mybutton) {
        console.log('Found alternative back to top button:', mybutton);
    } else {
        console.error('No back to top button found in the page');
    }
}

// Performance optimization: debounce scroll events
let scrollTimeout;
let isScrolling = false;
let isVisible = false; // Track button visibility state

// Optimized scroll function with requestAnimationFrame
function optimizedScrollFunction() {
    if (!isScrolling) {
        requestAnimationFrame(() => {
            scrollFunction();
            isScrolling = false;
        });
        isScrolling = true;
    }
}

// Debounced scroll event handler
function debouncedScrollHandler() {
    // Clear the timeout if it exists
    if (scrollTimeout) {
        clearTimeout(scrollTimeout);
    }
    
    // Set a new timeout
    scrollTimeout = setTimeout(optimizedScrollFunction, 10); // 10ms debounce
}

// When the user scrolls down 20px from the top of the document or modal, show the button
window.addEventListener('scroll', debouncedScrollHandler, { passive: true });

// Function to show/hide the button based on scroll position
function scrollFunction() {
    if (!mybutton) return; // Safety check
    
    try {
        // Check if the user has scrolled down on the main page
        const scrollTop = document.body.scrollTop || document.documentElement.scrollTop;
        const threshold = 20;
        
        let shouldShow = false;
        
        if (scrollTop > threshold) {
            shouldShow = true;
        }

        // Check each modal for scroll position (optimized)
        const modals = document.querySelectorAll('.modal-content');
        if (modals.length > 0) {
            for (const modal of modals) {
                if (modal.scrollTop > threshold) {
                    shouldShow = true;
                    break; // Early exit for performance
                }
            }
        }
        
        // Only update DOM if state actually changes
        if (shouldShow && !isVisible) {
            mybutton.classList.add("show");
            mybutton.classList.remove("hide");
            // Enhanced visibility with smooth animation
            mybutton.style.opacity = '1';
            mybutton.style.transform = 'scale(1)';
            mybutton.style.pointerEvents = 'auto';
            isVisible = true;
            console.log('Back to top button shown');
        } else if (!shouldShow && isVisible) {
            mybutton.classList.add("hide");
            mybutton.classList.remove("show");
            // Enhanced hiding with smooth animation
            mybutton.style.opacity = '0';
            mybutton.style.transform = 'scale(0.8)';
            mybutton.style.pointerEvents = 'none';
            isVisible = false;
            console.log('Back to top button hidden');
        }
        
    } catch (error) {
        console.warn('Scroll function error:', error);
    }
}

// Optimized smooth scroll function
function smoothScrollToTop(target = null) {
    const startPosition = target ? target.scrollTop : (document.documentElement.scrollTop || document.body.scrollTop);
    const startTime = performance.now();
    const duration = 500; // 500ms for smooth scroll
    
    console.log('Starting smooth scroll to top from position:', startPosition);
    
    function animateScroll(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        // Easing function for smooth animation
        const easeInOutCubic = progress < 0.5 
            ? 4 * progress * progress * progress 
            : 1 - Math.pow(-2 * progress + 2, 3) / 2;
        
        const currentPosition = startPosition * (1 - easeInOutCubic);
        
        if (target) {
            target.scrollTop = currentPosition;
        } else {
            window.scrollTo(0, currentPosition);
        }
        
        if (progress < 1) {
            requestAnimationFrame(animateScroll);
        } else {
            console.log('Smooth scroll completed');
        }
    }
    
    requestAnimationFrame(animateScroll);
}

// When the user clicks on the button, scroll to the top of the document or modal
if (mybutton) {
    mybutton.addEventListener('click', function(e) {
        e.preventDefault();
        console.log('Back to top button clicked');
        
        try {
            // Check if any modal is currently displayed
            const openModal = document.querySelector('.modal[style*="display: block"]');
            if (openModal) {
                console.log('Modal detected, scrolling modal to top');
                // Scroll to the top of the modal content
                const modalContent = openModal.querySelector('.modal-content');
                if (modalContent) {
                    smoothScrollToTop(modalContent);
                } else {
                    smoothScrollToTop(openModal);
                }
            } else {
                console.log('No modal detected, scrolling page to top');
                // Scroll to the top of the main document
                smoothScrollToTop();
            }
        } catch (error) {
            console.warn('Scroll to top error:', error);
            // Fallback to basic scroll
            try {
                window.scrollTo({ top: 0, behavior: 'smooth' });
                console.log('Using fallback smooth scroll');
            } catch (fallbackError) {
                // Ultimate fallback
                window.scrollTo(0, 0);
                console.log('Using basic scroll fallback');
            }
        }
    });
    
    // Ensure button is positioned correctly (left side) and make it bigger/more visible
    if (mybutton.style) {
        // Positioning - ALWAYS force left position regardless of RTL
        mybutton.style.position = 'fixed';
        mybutton.style.left = '20px';
        mybutton.style.right = 'auto'; // Override any CSS right positioning
        mybutton.style.bottom = '20px';
        mybutton.style.zIndex = '9999';
        
        // Force LTR direction for the button itself to prevent RTL interference
        mybutton.style.direction = 'ltr';
        
        // Size and visibility improvements
        mybutton.style.width = '60px';
        mybutton.style.height = '60px';
        mybutton.style.borderRadius = '50%';
        mybutton.style.fontSize = '24px';
        mybutton.style.fontWeight = 'bold';
        
        // Colors and visibility
        mybutton.style.backgroundColor = '#007bff';
        mybutton.style.color = 'white';
        mybutton.style.border = '3px solid #0056b3';
        mybutton.style.cursor = 'pointer';
        
        // Shadow for better visibility
        mybutton.style.boxShadow = '0 4px 12px rgba(0, 123, 255, 0.4)';
        
        // Smooth transitions
        mybutton.style.transition = 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
        
        // Important: Override any RTL CSS rules that might affect positioning
        mybutton.style.setProperty('left', '20px', 'important');
        mybutton.style.setProperty('right', 'auto', 'important');
        mybutton.style.setProperty('direction', 'ltr', 'important');
        
        // Ensure it's visible by default but hidden
        mybutton.style.opacity = '0';
        mybutton.style.transform = 'scale(0.8)';
        
        // Preserve existing content (logo) or add arrow as fallback
        if (!mybutton.innerHTML.trim() || mybutton.innerHTML.includes('Back to top')) {
            // Only add fallback if there's no existing content or just text
            mybutton.innerHTML = '↑';
        }
        
        // Ensure the button centers its content (logo or arrow)
        mybutton.style.display = 'flex';
        mybutton.style.alignItems = 'center';
        mybutton.style.justifyContent = 'center';
        
        // If there's an image (logo), style it appropriately
        const logoImg = mybutton.querySelector('img');
        if (logoImg) {
            logoImg.style.width = '36px';
            logoImg.style.height = '36px';
            logoImg.style.objectFit = 'contain';
            logoImg.style.filter = 'brightness(0) invert(1)'; // Make it white
        }
        
        // Add hover effects for better interaction
        mybutton.addEventListener('mouseenter', function() {
            if (isVisible) {
                mybutton.style.transform = 'scale(1.1)';
                mybutton.style.backgroundColor = '#0056b3';
                mybutton.style.boxShadow = '0 6px 20px rgba(0, 123, 255, 0.6)';
            }
        });
        
        mybutton.addEventListener('mouseleave', function() {
            if (isVisible) {
                mybutton.style.transform = 'scale(1)';
                mybutton.style.backgroundColor = '#007bff';
                mybutton.style.boxShadow = '0 4px 12px rgba(0, 123, 255, 0.4)';
            }
        });
        
        // Add active/click effect
        mybutton.addEventListener('mousedown', function() {
            if (isVisible) {
                mybutton.style.transform = 'scale(0.95)';
            }
        });
        
        mybutton.addEventListener('mouseup', function() {
            if (isVisible) {
                mybutton.style.transform = 'scale(1.1)'; // Keep hover effect
            }
        });
        
        console.log('Back to top button positioned on the left with enhanced visibility');
    }
} else {
    console.error('Back to top button element not found - functionality disabled');
}

// Performance optimization: Pause scroll handling when page is hidden
document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
        // Clear any pending scroll timeouts
        if (scrollTimeout) {
            clearTimeout(scrollTimeout);
        }
        console.log('Page hidden, pausing scroll detection');
    } else {
        console.log('Page visible, resuming scroll detection');
        // Re-check scroll position when page becomes visible
        setTimeout(scrollFunction, 100);
    }
});

// Initialize button state on load
document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM loaded, initializing back to top button');
    
    if (mybutton) {
        // Initial state
        mybutton.classList.add("hide");
        mybutton.classList.remove("show");
        mybutton.style.opacity = '0';
        mybutton.style.transform = 'scale(0.8)';
        mybutton.style.pointerEvents = 'none';
        isVisible = false;
        
        // Run scroll function once to set initial state
        scrollFunction();
        
        console.log('Back to top button initialized successfully');
    } else {
        console.error('Back to top button initialization failed - element not found');
    }
});

// Additional fallback: try to initialize after a short delay if DOM isn't ready
setTimeout(() => {
    if (!mybutton) {
        mybutton = document.getElementById("backToTopBtn");
        if (mybutton) {
            console.log('Back to top button found on delayed initialization');
            // Re-run initialization with enhanced styling
            mybutton.classList.add("hide");
            mybutton.classList.remove("show");
            mybutton.style.opacity = '0';
            mybutton.style.transform = 'scale(0.8)';
            mybutton.style.pointerEvents = 'none';
            isVisible = false;
            scrollFunction();
        }
    }
}, 500);
