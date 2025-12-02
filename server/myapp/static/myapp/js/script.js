// // Animation and Interactivity for BKVM School Website

// document.addEventListener('DOMContentLoaded', function() {
//   // Add page transition effect
//   document.body.classList.add('page-transition');

//   // Include navbar and footer first
//   includeHTML();

//   // Initialize scroll reveal animations
//   initScrollReveal();

//   // Initialize gallery image effects
//   initGalleryEffects();

//   // Initialize form enhancements
//   initFormEnhancements();

//   // Initialize contact form handling
//   // initContactForm();

//   // Initialize achievement count-up animation
//   initAchievementCountUp();
// });

// // ================= NAVBAR ================= //
// function initNavbar() {
//   const navbar = document.querySelector('.navbar');
//   const navbarToggle = document.getElementById('navbar-toggle');
//   const navbarMenu = document.getElementById('navbar-menu');
//   const logoText = document.getElementById('logo-text');

//   if (!navbar || !navbarToggle || !navbarMenu) return;

//   // Mobile menu toggle
//   navbarToggle.addEventListener('click', (e) => {
//     e.stopPropagation();
//     navbarMenu.classList.toggle('active');
//     navbarToggle.classList.toggle('active');
//     document.body.classList.toggle('menu-open');
//   });

//   // Close menu on link click
//   const menuLinks = document.querySelectorAll('.navbar-menu a');
//   menuLinks.forEach(link => {
//     link.addEventListener('click', () => {
//       navbarMenu.classList.remove('active');
//       navbarToggle.classList.remove('active');
//       document.body.classList.remove('menu-open');
//     });
//   });

//   // Close menu when clicking outside
//   document.addEventListener('click', (e) => {
//     if(navbarMenu.classList.contains('active') && !navbarMenu.contains(e.target) && !navbarToggle.contains(e.target)){
//       navbarMenu.classList.remove('active');
//       navbarToggle.classList.remove('active');
//       document.body.classList.remove('menu-open');
//     }
//   });

//   // Scroll effect
//   window.addEventListener('scroll', () => {
//     if(window.scrollY > 50){
//       navbar.classList.add('navbar-scrolled');
//       navbar.classList.remove('navbar-transparent');
//       if(logoText) logoText.style.display = 'block';
//     } else {
//       navbar.classList.remove('navbar-scrolled');
//       navbar.classList.add('navbar-transparent');
//       if(logoText) logoText.style.display = 'none';
//     }
//   });

//   // Highlight current page
//   const currentPage = window.location.pathname.split('/').pop();
//   menuLinks.forEach(item => {
//     if(item.getAttribute('href') === currentPage){
//       item.classList.add('active');
//     }
//   });
// }

// // ================= INCLUDE HTML ================= //
// function includeHTML() {
//   const navbarContainer = document.getElementById('navbar-container');
//   const footerContainer = document.getElementById('footer-container');

//   // Load navbar
//   if (navbarContainer) {
//     fetch('navbar.html')
//       .then(response => response.text())
//       .then(data => {
//         navbarContainer.innerHTML = data;
//         initNavbar(); // Initialize after loading
//       })
//       .catch(error => {
//         console.error('Error loading navbar:', error);
//         navbarContainer.innerHTML = '<p>Error loading navbar. Please refresh the page.</p>';
//       });
//   }

//   // Load footer
//   if (footerContainer) {
//     fetch('footer.html')
//       .then(response => response.text())
//       .then(data => {
//         footerContainer.innerHTML = data;
//         initScrollReveal(); // Re-check for new elements to animate
//       })
//       .catch(error => {
//         console.error('Error loading footer:', error);
//         footerContainer.innerHTML = '<p>Error loading footer. Please refresh the page.</p>';
//       });
//   }
// }

// // ================= SCROLL REVEAL ================= //
// function initScrollReveal() {
//   const revealElements = document.querySelectorAll('.reveal');

//   function checkReveal() {
//     const windowHeight = window.innerHeight;
//     const revealPoint = 150;

//     revealElements.forEach(element => {
//       const elementTop = element.getBoundingClientRect().top;

//       if (elementTop < windowHeight - revealPoint) {
//         element.classList.add('active');
//       } else {
//         element.classList.remove('active');
//       }
//     });
//   }

//   window.addEventListener('scroll', checkReveal);
//   checkReveal();
// }

// // ================= GALLERY ================= //
// function initGalleryEffects() {
//   const galleryItems = document.querySelectorAll('.gallery-item');

//   galleryItems.forEach(item => {
//     if (!item.querySelector('.gallery-overlay')) {
//       const title = item.getAttribute('data-title') || '';
//       const category = item.getAttribute('data-category') || '';

//       const overlay = document.createElement('div');
//       overlay.className = 'gallery-overlay';
//       overlay.innerHTML = `<h3>${title}</h3><p>${category}</p>`;
//       item.appendChild(overlay);  
//     }
//   });

//   // Gallery filter
//   const galleryTabs = document.querySelectorAll('.gallery-tab');
//   const galleryGrid = document.querySelector('.gallery-grid');

//   if(galleryTabs.length > 0 && galleryGrid){
//     galleryTabs.forEach(tab => {
//       tab.addEventListener('click', function() {
//         galleryTabs.forEach(t => t.classList.remove('active'));
//         this.classList.add('active');

//         const category = this.getAttribute('data-category');
//         galleryGrid.querySelectorAll('.gallery-item').forEach(item => {
//           if(category === 'all' || item.getAttribute('data-category') === category){
//             item.style.display = 'block';
//             item.classList.add('fade-in');
//             setTimeout(() => item.classList.remove('fade-in'), 500);
//           } else {
//             item.style.display = 'none';
//           }
//         });
//       });
//     });
//   }

//   // Gallery modal
//   const modal = document.getElementById('gallery-modal');
//   const modalImg = document.getElementById('modal-image');
//   const modalCaption = document.getElementById('modal-caption');
//   const modalClose = document.querySelector('.modal-close');
//   const modalPrev = document.querySelector('.modal-prev');
//   const modalNext = document.querySelector('.modal-next');

//   if(galleryItems.length > 0 && modal){
//     let currentIndex = 0;

//     galleryItems.forEach((item, index) => {
//       item.addEventListener('click', () => {
//         const img = item.querySelector('img');
//         const caption = item.querySelector('.gallery-caption h3');

//         modal.style.display = 'block';
//         modalImg.src = img.src;
//         modalCaption.textContent = caption ? caption.textContent : '';
//         currentIndex = index;
//         document.body.style.overflow = 'hidden';
//       });
//     });

//     modalClose.addEventListener('click', () => {
//       modal.style.display = 'none';
//       document.body.style.overflow = 'auto';
//     });

//     modalPrev.addEventListener('click', () => {
//       currentIndex = (currentIndex - 1 + galleryItems.length) % galleryItems.length;
//       const img = galleryItems[currentIndex].querySelector('img');
//       const caption = galleryItems[currentIndex].querySelector('.gallery-caption h3');
//       modalImg.src = img.src;
//       modalCaption.textContent = caption ? caption.textContent : '';
//     });

//     modalNext.addEventListener('click', () => {
//       currentIndex = (currentIndex + 1) % galleryItems.length;
//       const img = galleryItems[currentIndex].querySelector('img');
//       const caption = galleryItems[currentIndex].querySelector('.gallery-caption h3');
//       modalImg.src = img.src;
//       modalCaption.textContent = caption ? caption.textContent : '';
//     });

//     document.addEventListener('keydown', (e) => {
//       if(e.key === 'Escape'){ modal.style.display = 'none'; document.body.style.overflow = 'auto'; }
//       if(e.key === 'ArrowLeft'){ modalPrev.click(); }
//       if(e.key === 'ArrowRight'){ modalNext.click(); }
//     });
//   }
// }

// // ================= FORM ENHANCEMENTS ================= //
// function initFormEnhancements() {
//   const formInputs = document.querySelectorAll('input, textarea, select');

//   formInputs.forEach(input => {
//     const inputContainer = input.closest('.form-group');

//     if(inputContainer){
//       if(input.value) inputContainer.classList.add('input-active');

//       input.addEventListener('focus', () => inputContainer.classList.add('input-focused'));
//       input.addEventListener('blur', function() {
//         inputContainer.classList.remove('input-focused');
//         if(this.value) inputContainer.classList.add('input-active');
//         else inputContainer.classList.remove('input-active');
//       });
//     }
//   });

//   const formControls = document.querySelectorAll('.form-control');
//   formControls.forEach(control => {
//     control.style.transition = 'all 0.3s ease';
//     control.style.borderLeft = '4px solid transparent';
//     control.addEventListener('focus', function(){
//       this.style.borderLeft = '4px solid var(--primary)';
//       this.style.boxShadow = '0 0 10px rgba(220, 38, 38, 0.2)';
//     });
//     control.addEventListener('blur', function(){
//       if(!this.value) this.style.borderLeft = '4px solid transparent';
//       this.style.boxShadow = 'none';
//     });
//   });
// }

// // ================= CONTACT FORM ================= //
// // function initContactForm() {
// //   const contactForm = document.getElementById('contact-form');
// //   const formSuccess = document.getElementById('form-success');

// //   if(contactForm){
// //     contactForm.addEventListener('submit', function(e){
// //       e.preventDefault();
// //       if(formSuccess){
// //         formSuccess.style.display = 'block';
// //         contactForm.reset();
// //         formSuccess.scrollIntoView({behavior:'smooth'});
// //         setTimeout(()=>{ formSuccess.style.display = 'none'; }, 5000);
// //       }
// //     });
// //   }
// // }

// // ================= SECTION TITLES ================= //
// document.addEventListener('DOMContentLoaded', function(){
//   const sectionTitles = document.querySelectorAll('.section-title');
//   sectionTitles.forEach(title=>{
//     title.addEventListener('mouseover', ()=> title.classList.add('gradient-text'));
//     title.addEventListener('mouseout', ()=> title.classList.remove('gradient-text'));
//   });
// });

// // ================= ACHIEVEMENT COUNT ================= //
// function initAchievementCountUp(){
//   const countUpElements = document.querySelectorAll('.count-up');

//   function startCountUp(){
//     countUpElements.forEach(element=>{
//       const elementTop = element.getBoundingClientRect().top;
//       const windowHeight = window.innerHeight;

//       if(elementTop < windowHeight - 100){
//         element.classList.add('animated');
//         element.style.textShadow = '0 0 15px rgba(255,255,255,0.5)';
//         setTimeout(()=> element.classList.remove('animated'),1500);
//       }
//     });
//   }

//   window.addEventListener('scroll', startCountUp);
//   startCountUp();

//   const style = document.createElement('style');
//   style.textContent = `
//     @keyframes countBounce {
//       0%,100%{transform:translateY(0);}
//       50%{transform:translateY(-10px);}
//     }
//     .count-up.animated{animation: countBounce 1.5s ease-in-out;}
//   `;
//   document.head.appendChild(style);
// }
