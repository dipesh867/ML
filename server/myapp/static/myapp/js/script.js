// Animation and Interactivity for BKVM School Website

document.addEventListener('DOMContentLoaded', function() {
  // Add page transition effect
  document.body.classList.add('page-transition');
  
  // Initialize navbar functionality
  initNavbar();
  
  // Initialize scroll reveal animations
  initScrollReveal();
  
  // Initialize gallery image effects
  initGalleryEffects();
  
  // Include navbar and footer
  includeHTML();
  
  // Initialize form enhancements
  initFormEnhancements();
  
  // Initialize contact form handling
  initContactForm();
  
  // Initialize achievement count-up animation
  initAchievementCountUp();
});

// Handle navbar interactions
function initNavbar() {
  const navbar = document.querySelector('.navbar');
  const navbarToggle = document.querySelector('.navbar-toggle');
  const navbarMenu = document.querySelector('.navbar-menu');
  const menuClose = document.querySelector('.menu-close');
  
  // Toggle menu on mobile
  if (navbarToggle) {
    navbarToggle.addEventListener('click', function(e) {
      e.stopPropagation(); // Prevent immediate close on document click
      navbarMenu.classList.toggle('active');
      navbarToggle.classList.toggle('active');
      document.body.classList.toggle('menu-open');
    });
  }
  
  // Close menu button
  if (menuClose) {
    menuClose.addEventListener('click', function() {
      navbarMenu.classList.remove('active');
      navbarToggle.classList.remove('active');
      document.body.classList.remove('menu-open');
    });
  }
  
  // Close menu when clicking outside
  document.addEventListener('click', function(e) {
    if (navbarMenu && navbarMenu.classList.contains('active') && 
        !navbarMenu.contains(e.target) && 
        !navbarToggle.contains(e.target)) {
      navbarMenu.classList.remove('active');
      if (navbarToggle) navbarToggle.classList.remove('active');
      document.body.classList.remove('menu-open');
    }
  });
  
  // Change navbar on scroll
  window.addEventListener('scroll', function() {
    if (window.scrollY > 50) {
      navbar.classList.add('navbar-scrolled');
      navbar.classList.remove('navbar-transparent');
    } else {
      navbar.classList.remove('navbar-scrolled');
      navbar.classList.add('navbar-transparent');
    }
  });
  
  // Trigger scroll event on page load
  window.dispatchEvent(new Event('scroll'));
}

// Handle scroll reveal animations
function initScrollReveal() {
  const revealElements = document.querySelectorAll('.reveal');
  
  function checkReveal() {
    const windowHeight = window.innerHeight;
    const revealPoint = 150;
    
    revealElements.forEach(element => {
      const elementTop = element.getBoundingClientRect().top;
      
      if (elementTop < windowHeight - revealPoint) {
        element.classList.add('active');
      } else {
        element.classList.remove('active');
      }
    });
  }
  
  // Check on scroll
  window.addEventListener('scroll', checkReveal);
  
  // Check on page load
  checkReveal();
}

// Handle gallery image effects
function initGalleryEffects() {
  const galleryItems = document.querySelectorAll('.gallery-item');
  
  galleryItems.forEach(item => {
    // Create overlay element if it doesn't exist
    if (!item.querySelector('.gallery-overlay')) {
      const title = item.getAttribute('data-title') || '';
      const category = item.getAttribute('data-category') || '';
      
      const overlay = document.createElement('div');
      overlay.className = 'gallery-overlay';
      overlay.innerHTML = `
        <h3>${title}</h3>
        <p>${category}</p>
      `;
      
      item.appendChild(overlay);  
    }
  });
  
  // Gallery filtering functionality
  const galleryTabs = document.querySelectorAll('.gallery-tab');
  const galleryGrid = document.querySelector('.gallery-grid');
  
  if (galleryTabs.length > 0 && galleryGrid) {
    galleryTabs.forEach(tab => {
      tab.addEventListener('click', function() {
        // Remove active class from all tabs
        galleryTabs.forEach(t => t.classList.remove('active'));
        
        // Add active class to clicked tab
        this.classList.add('active');
        
        const category = this.getAttribute('data-category');
        const items = galleryGrid.querySelectorAll('.gallery-item');
        
        items.forEach(item => {
          if (category === 'all' || item.getAttribute('data-category') === category) {
            item.style.display = 'block';
            
            // Add animation
            item.classList.add('fade-in');
            setTimeout(() => {
              item.classList.remove('fade-in');
            }, 500);
          } else {
            item.style.display = 'none';
          }
        });
      });
    });
  }
  
  // Gallery modal functionality
  const modal = document.getElementById('gallery-modal');
  const modalImg = document.getElementById('modal-image');
  const modalCaption = document.getElementById('modal-caption');
  const modalClose = document.querySelector('.modal-close');
  const modalPrev = document.querySelector('.modal-prev');
  const modalNext = document.querySelector('.modal-next');
  
  if (galleryItems.length > 0 && modal) {
    let currentIndex = 0;
    
    // Open modal on image click
    galleryItems.forEach((item, index) => {
      item.addEventListener('click', function() {
        const img = item.querySelector('img');
        const caption = item.querySelector('.gallery-caption h3');
        
        modal.style.display = 'block';
        modalImg.src = img.src;
        modalCaption.textContent = caption ? caption.textContent : '';
        currentIndex = index;
        
        // Disable scrolling when modal is open
        document.body.style.overflow = 'hidden';
      });
    });
    
    // Close modal
    modalClose.addEventListener('click', function() {
      modal.style.display = 'none';
      document.body.style.overflow = 'auto';
    });
    
    // Previous image
    modalPrev.addEventListener('click', function() {
      currentIndex = (currentIndex - 1 + galleryItems.length) % galleryItems.length;
      const img = galleryItems[currentIndex].querySelector('img');
      const caption = galleryItems[currentIndex].querySelector('.gallery-caption h3');
      
      modalImg.src = img.src;
      modalCaption.textContent = caption ? caption.textContent : '';
    });
    
    // Next image
    modalNext.addEventListener('click', function() {
      currentIndex = (currentIndex + 1) % galleryItems.length;
      const img = galleryItems[currentIndex].querySelector('img');
      const caption = galleryItems[currentIndex].querySelector('.gallery-caption h3');
      
      modalImg.src = img.src;
      modalCaption.textContent = caption ? caption.textContent : '';
    });
    
    // Close modal on escape key
    document.addEventListener('keydown', function(e) {
      if (e.key === 'Escape') {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
      }
      
      if (e.key === 'ArrowLeft') {
        modalPrev.click();
      }
      
      if (e.key === 'ArrowRight') {
        modalNext.click();
      }
    });
  }
}

// Include HTML components (navbar and footer)
function includeHTML() {
  const navbarContainer = document.getElementById('navbar-container');
  const footerContainer = document.getElementById('footer-container');
  
  // Load navbar
  if (navbarContainer) {
    fetch('navbar.html')
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.text();
      })
      .then(data => {
        navbarContainer.innerHTML = data;
        initNavbar(); // Reinitialize navbar after loading
      })
      .catch(error => {
        console.error('Error loading navbar:', error);
        navbarContainer.innerHTML = '<p>Error loading navbar. Please refresh the page.</p>';
      });
  }
  
  // Load footer
  if (footerContainer) {
    fetch('footer.html')
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.text();
      })
      .then(data => {
        footerContainer.innerHTML = data;
        // Initialize any footer specific functionality if needed
        initScrollReveal(); // Re-check for new elements to animate
      })
      .catch(error => {
        console.error('Error loading footer:', error);
        footerContainer.innerHTML = '<p>Error loading footer. Please refresh the page.</p>';
      });
  }
}

// Parallax effect for hero section
window.addEventListener('scroll', function() {
  const heroSection = document.querySelector('.hero');
  if (heroSection) {
    const heroBg = heroSection.querySelector('.hero-bg');
    const scrollPosition = window.scrollY;
    
    // Apply parallax effect
    if (heroBg) {
      heroBg.style.transform = `scale(1.1) translateY(${scrollPosition * 0.05}px)`;
    }
  }
});

// Add smooth scroll for anchor links
document.addEventListener('click', function(e) {
  if (e.target.tagName === 'A' && e.target.getAttribute('href') && e.target.getAttribute('href').startsWith('#')) {
    
    const targetId = e.target.getAttribute('href');
    const targetElement = document.querySelector(targetId);
    
    if (targetElement) {
      window.scrollTo({
        top: targetElement.offsetTop - 100,
        behavior: 'smooth'
      });
    }
  }
});

// Enhance form interactions
function initFormEnhancements() {
  const formInputs = document.querySelectorAll('input, textarea, select');
  
  formInputs.forEach(input => {
    // Add focus effect to parent container
    const inputContainer = input.closest('.form-group');
    
    if (inputContainer) {
      // If input has a value on load, add active class
      if (input.value) {
        inputContainer.classList.add('input-active');
      }
      
      // Add focus styles
      input.addEventListener('focus', function() {
        inputContainer.classList.add('input-focused');
      });
      
      input.addEventListener('blur', function() {
        inputContainer.classList.remove('input-focused');
        
        if (this.value) {
          inputContainer.classList.add('input-active');
        } else {
          inputContainer.classList.remove('input-active');
        }
      });
    }
  });
  
  // Add custom styling for form elements
  const formControls = document.querySelectorAll('.form-control');
  
  formControls.forEach(control => {
    control.style.transition = 'all 0.3s ease';
    control.style.borderLeft = '4px solid transparent';
    
    control.addEventListener('focus', function() {
      this.style.borderLeft = '4px solid var(--primary)';
      this.style.boxShadow = '0 0 10px rgba(220, 38, 38, 0.2)';
    });
    
    control.addEventListener('blur', function() {
      if (!this.value) {
        this.style.borderLeft = '4px solid transparent';
      }
      this.style.boxShadow = 'none';
    });
  });
}

// Handle contact form submission
// function initContactForm() {
//   const contactForm = document.getElementById('contact-form');
//   const formSuccess = document.getElementById('form-success');
  
//   if (contactForm) {
//     contactForm.addEventListener('submit', function(e) {
//     //   e.preventDefault();
      
//       // In a real implementation, you would send the form data to a server here
//       // For demo purposes, we'll just show the success message
//       if (formSuccess) {
//         formSuccess.style.display = 'block';
//         contactForm.reset();
        
//         // Scroll to success message
//         formSuccess.scrollIntoView({ behavior: 'smooth' });
        
//         // Hide success message after 5 seconds
//         setTimeout(() => {
//           formSuccess.style.display = 'none';
//         }, 5000);
//       }
//     });
//   }
// }

// Add dynamic accent color effect to section titles
document.addEventListener('DOMContentLoaded', function() {
  const sectionTitles = document.querySelectorAll('.section-title');
  
  sectionTitles.forEach(title => {
    // Create gradient background effect on hover
    title.addEventListener('mouseover', function() {
      this.classList.add('gradient-text');
    });
    
    title.addEventListener('mouseout', function() {
      this.classList.remove('gradient-text');
    });
  });
});

// Handle achievement count-up animations
function initAchievementCountUp() {
  const countUpElements = document.querySelectorAll('.count-up');
  
  function startCountUp() {
    countUpElements.forEach(element => {
      const elementTop = element.getBoundingClientRect().top;
      const windowHeight = window.innerHeight;
      
      if (elementTop < windowHeight - 100) {
        // Add a class to trigger a subtle bounce effect
        element.classList.add('animated');
        
        // Apply a subtle glow effect when in view
        element.style.textShadow = '0 0 15px rgba(255, 255, 255, 0.5)';
        
        // Remove the animation class after animation completes
        setTimeout(() => {
          element.classList.remove('animated');
        }, 1500);
      }
    });
  }
  
  // Check on scroll
  window.addEventListener('scroll', startCountUp);
  
  // Check on page load
  startCountUp();
  
  // Add CSS for the animated class
  const style = document.createElement('style');
  style.textContent = `
    @keyframes countBounce {
      0%, 100% { transform: translateY(0); }
      50% { transform: translateY(-10px); }
    }
    
    .count-up.animated {
      animation: countBounce 1.5s ease-in-out;
    }
  `;
  document.head.appendChild(style);
} 