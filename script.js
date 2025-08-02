/* Enhanced Portfolio JavaScript with Smooth Scrolling Navigation */

// Loading Screen Controller
window.addEventListener('load', function() {
  const loadingScreen = document.getElementById('loading-screen');
  
  // Minimum loading time of 1.5 seconds for faster experience
  const minLoadTime = 1500;
  const startTime = Date.now();
  
  function hideLoadingScreen() {
    const elapsedTime = Date.now() - startTime;
    const remainingTime = Math.max(0, minLoadTime - elapsedTime);
    
    setTimeout(() => {
      loadingScreen.classList.add('fade-out');
      
      // Remove from DOM after fade animation
      setTimeout(() => {
        loadingScreen.style.display = 'none';
        console.log('🚀 Portfolio loaded successfully!');
      }, 300);
    }, remainingTime);
  }
  
  // Hide loading screen after everything is loaded
  hideLoadingScreen();
});

// Prevent scroll during loading
document.addEventListener('DOMContentLoaded', function() {
  const loadingScreen = document.getElementById('loading-screen');
  if (loadingScreen && !loadingScreen.classList.contains('fade-out')) {
    document.body.style.overflow = 'hidden';
  }
  
  // Re-enable scroll when loading is complete
  setTimeout(() => {
    document.body.style.overflow = '';
  }, 1800);
});

const themeToggle = document.getElementById('theme-toggle');
const body = document.body;

// Enhanced Smooth Scrolling Navigation Functions
function scrollToSection(sectionName) {
  console.log('scrollToSection called with:', sectionName);
  
  // Clear all active states immediately for instant feedback
  document.querySelectorAll('.nav-item').forEach(item => {
    item.classList.remove('active');
  });
  
  // Find and activate the target nav item immediately
  const targetNav = document.querySelector(`.${sectionName}-nav`);
  if (targetNav) {
    targetNav.classList.add('active');
    console.log('Nav activated:', sectionName);
  }
  
  // Find and scroll to the target section
  const targetSection = document.querySelector(`.${sectionName}-section`);
  const mainContent = document.querySelector('.main-content');
  
  if (targetSection && mainContent) {
    const sectionTop = targetSection.offsetTop;
    
    // Add smooth scrolling with a callback to ensure active state persists
    mainContent.scrollTo({
      top: sectionTop,
      behavior: 'smooth'
    });
    
    console.log('Scrolled to section:', sectionName);
    
    // Ensure the active state remains after scroll completes
    setTimeout(() => {
      if (targetNav && !targetNav.classList.contains('active')) {
        targetNav.classList.add('active');
      }
    }, 800); // Wait for scroll animation to complete
  }
}

// Make functions globally available
window.scrollToSection = scrollToSection;

// Enhanced scroll-based navigation highlighting with real-time detection
function handleScrollNavigation() {
  const mainContent = document.querySelector('.main-content');
  const sections = document.querySelectorAll('.content-section');
  const navItems = document.querySelectorAll('.nav-item');
  
  if (!mainContent || !sections.length) return;
  
  const scrollTop = mainContent.scrollTop;
  const containerHeight = mainContent.clientHeight;
  
  let currentSection = null;
  let maxVisibleHeight = 0;
  
  sections.forEach((section) => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.offsetHeight;
    const sectionBottom = sectionTop + sectionHeight;
    
    // Calculate visible height of this section
    const visibleTop = Math.max(scrollTop, sectionTop);
    const visibleBottom = Math.min(scrollTop + containerHeight, sectionBottom);
    const visibleHeight = Math.max(0, visibleBottom - visibleTop);
    
    // If this section has more visible content, make it current
    if (visibleHeight > maxVisibleHeight && visibleHeight > 50) { // Lowered minimum to 50px
      maxVisibleHeight = visibleHeight;
      currentSection = section;
    }
  });
  
  if (currentSection) {
    // Remove active class from all nav items
    navItems.forEach(nav => nav.classList.remove('active'));
    
    // Add active class to current section's nav item
    const sectionClasses = currentSection.className.split(' ');
    const sectionName = sectionClasses.find(cls => cls.includes('-section'))?.replace('-section', '');
    if (sectionName) {
      const activeNav = document.querySelector(`.${sectionName}-nav`);
      if (activeNav) {
        activeNav.classList.add('active');
        console.log(`📜 Scroll handler - Active section: ${sectionName} (${maxVisibleHeight}px visible)`);
      }
    }
  }
}

// Enhanced Intersection Observer for responsive scroll-based navigation
function setupIntersectionObserver() {
  const sections = document.querySelectorAll('.content-section');
  const navItems = document.querySelectorAll('.nav-item');
  
  const observerOptions = {
    root: document.querySelector('.main-content'),
    rootMargin: '-50px 0px -50px 0px', // Better margins for scroll detection
    threshold: [0.1, 0.25, 0.5, 0.75] // Multiple thresholds for smooth transitions
  };
  
  const observer = new IntersectionObserver((entries) => {
    // Find all currently intersecting sections
    const intersectingSections = entries.filter(entry => entry.isIntersecting);
    
    if (intersectingSections.length > 0) {
      // Find the most visible section (highest intersection ratio)
      let mostVisible = intersectingSections[0].target;
      let maxRatio = intersectingSections[0].intersectionRatio;
      
      intersectingSections.forEach(entry => {
        if (entry.intersectionRatio > maxRatio) {
          maxRatio = entry.intersectionRatio;
          mostVisible = entry.target;
        }
      });
      
      // Update navigation with lower threshold for better responsiveness
      if (maxRatio > 0.1) {
        // Remove active class from all nav items
        navItems.forEach(nav => nav.classList.remove('active'));
        
        // Add active class to current section's nav item
        const sectionClasses = mostVisible.className.split(' ');
        const sectionName = sectionClasses.find(cls => cls.includes('-section'))?.replace('-section', '');
        if (sectionName) {
          const activeNav = document.querySelector(`.${sectionName}-nav`);
          if (activeNav) {
            activeNav.classList.add('active');
            console.log(`🎯 Scroll detected - Active section: ${sectionName} (${Math.round(maxRatio * 100)}% visible)`);
          }
        }
      }
    }
  }, observerOptions);
  
  sections.forEach(section => observer.observe(section));
  
  // Return observer for potential cleanup
  return observer;
}

// Enhanced scroll listener and initialization for responsive navigation
document.addEventListener('DOMContentLoaded', () => {
  const mainContent = document.querySelector('.main-content');
  if (mainContent) {
    // Use intersection observer for better performance
    const observer = setupIntersectionObserver();
    
    // More responsive scroll listener with reduced debounce
    let scrollTimeout;
    mainContent.addEventListener('scroll', () => {
      // Immediate call for responsiveness
      handleScrollNavigation();
      
      // Debounced call for performance
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        handleScrollNavigation();
      }, 25); // Reduced from 50ms to 25ms for better responsiveness
    });
    
    // Enhanced initial setup
    setTimeout(() => {
      // Clear any existing active states
      document.querySelectorAll('.nav-item').forEach(item => {
        item.classList.remove('active');
      });
      
      // Set the first section (about) as active
      const firstNav = document.querySelector('.about-nav');
      if (firstNav) {
        firstNav.classList.add('active');
        console.log('✅ Initial active section set: about');
      }
      
      // Ensure main content scrolls to top
      mainContent.scrollTop = 0;
      
      // Initial call to set proper state
      handleScrollNavigation();
    }, 100); // Reduced timeout for faster initialization
    
    // Add enhanced visual feedback for navigation interactions
    const navItems = document.querySelectorAll('.nav-item');
    navItems.forEach(navItem => {
      navItem.addEventListener('mouseenter', () => {
        if (!navItem.classList.contains('active')) {
          navItem.style.transform = 'translateX(3px) scale(1.02)';
        }
      });
      
      navItem.addEventListener('mouseleave', () => {
        if (!navItem.classList.contains('active')) {
          navItem.style.transform = '';
        }
      });
      
      navItem.addEventListener('click', () => {
        // Add click feedback with persistence
        navItem.style.transform = 'translateX(8px) scale(1.08)';
        
        // Ensure the active class persists
        setTimeout(() => {
          if (navItem.classList.contains('active')) {
            navItem.style.transform = 'translateX(8px) scale(1.08)';
          } else {
            navItem.style.transform = '';
          }
        }, 150);
        
        // Force active state to persist for clicked navigation
        setTimeout(() => {
          if (navItem.classList.contains('active')) {
            // Double-check active state is maintained
            const currentActiveNav = document.querySelector('.nav-item.active');
            if (!currentActiveNav || currentActiveNav !== navItem) {
              document.querySelectorAll('.nav-item').forEach(item => {
                item.classList.remove('active');
              });
              navItem.classList.add('active');
            }
          }
        }, 800); // Check after scroll animation completes
      });
    });
    
    // Add scroll position indicator (optional debug)
    let lastScrollPosition = 0;
    mainContent.addEventListener('scroll', () => {
      const currentScroll = mainContent.scrollTop;
      const scrollDirection = currentScroll > lastScrollPosition ? 'down' : 'up';
      lastScrollPosition = currentScroll;
      
      // Optional: Log scroll direction for debugging
      // console.log(`🔄 Scrolling ${scrollDirection} - Position: ${currentScroll}`);
    });
  }
});

// Function to show "Link coming soon" popup for projects
function showLinkComingSoon() {
  alert('Link will be added soon! 🚀');
}

// Make showLinkComingSoon globally available
window.showLinkComingSoon = showLinkComingSoon;

// Theme toggle functionality

// Theme toggle functionality (if theme toggle exists)
if (themeToggle) {
  themeToggle.addEventListener('click', () => {
    body.classList.toggle('dark');
    localStorage.setItem('theme', body.classList.contains('dark') ? 'dark' : 'light');
  });
}

document.addEventListener('DOMContentLoaded', () => {
  // Theme setup
  const savedTheme = localStorage.getItem('theme') || 'light';
  if (savedTheme === 'dark') {
    body.classList.add('dark');
  }
  
  // Portfolio navigation setup
  console.log('=== Portfolio loaded ===');
  console.log('showPanel function available:', typeof window.showPanel);
  console.log('closePanel function available:', typeof window.closePanel);
  
  // Test panel detection
  const panels = document.querySelectorAll('.panel');
  const navItems = document.querySelectorAll('.nav-item');
  console.log('Found panels:', panels.length);
  console.log('Found nav items:', navItems.length);
  
  // Clear URL hash and force scroll to top
  if (window.location.hash) {
    history.replaceState(null, null, window.location.pathname);
  }
  window.scrollTo({ top: 0, behavior: 'instant' });
  
  initializeSpaceObjects();
  initializeCertificates();
});

window.addEventListener('load', () => {
  // Additional scroll to top after full page load to counter browser restore
  setTimeout(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
    window.scroll(0, 0);
    // Ensure hash is cleared again
    if (window.location.hash) {
      history.replaceState(null, null, window.location.pathname);
    }
  }, 0);
});

// Initialize space object interactions
function initializeSpaceObjects() {
  const asteroid = document.querySelector('.asteroid-1');
  const satellite = document.querySelector('.satellite-1');
  const nebula = document.querySelector('.nebula-1');
  
  // Asteroid clicks - show skills
  if (asteroid) {
    asteroid.addEventListener('click', () => {
      showPanel('skills');
      asteroid.style.animation = 'asteroidFloat 2s ease-in-out';
    });
  }
  
  // Satellite clicks - show projects
  if (satellite) {
    satellite.addEventListener('click', () => {
      showPanel('projects');
      satellite.style.transform = 'scale(1.3) rotate(360deg)';
      setTimeout(() => {
        satellite.style.transform = '';
      }, 600);
    });
  }
  
  // Nebula clicks - show education
  if (nebula) {
    nebula.addEventListener('click', () => {
      showPanel('education');
      nebula.style.filter = 'blur(0px) brightness(2)';
      setTimeout(() => {
        nebula.style.filter = '';
      }, 800);
    });
  }
}

// Certificate links management
function initializeCertificates() {
  // ===== UPDATE YOUR CERTIFICATE LINKS HERE =====
  // Replace the placeholder URLs with your actual certificate links
  const certificateLinks = {
    aws: 'https://your-aws-certificate-link.com',                    // AWS Academy Graduate - AWS Cloud Foundations
    'ccna-enterprise': 'https://your-ccna-enterprise-link.com',      // CCNA: Enterprise Networking, Security, and Automation
    'ccna-intro': 'https://your-ccna-intro-link.com',                // CCNA: Introduction to Networks
    'ccna-switching': 'https://your-ccna-switching-link.com',        // CCNA: Switching, Routing, and Wireless Essentials
    cybersecurity: 'https://your-cybersecurity-link.com',            // Introduction to Cybersecurity
    python1: 'https://your-python1-link.com',                        // Python Essentials 1
    python2: 'https://your-python2-link.com'                         // Python Essentials 2
  };
  // ===============================================
  
  // Add click handlers to certificate links
  document.querySelectorAll('.cert-link').forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const certType = link.getAttribute('data-cert');
      const certUrl = certificateLinks[certType];
      
      // Certificate display names for user-friendly messages
      const certDisplayNames = {
        'aws': 'AWS ACADEMY GRADUATE',
        'ccna-enterprise': 'CCNA-ENTERPRISE',
        'ccna-intro': 'CCNA-INTRODUCTION',
        'ccna-switching': 'CCNA-SWITCHING',
        'cybersecurity': 'CYBERSECURITY',
        'python1': 'PYTHON-ESSENTIALS-1',
        'python2': 'PYTHON-ESSENTIALS-2'
      };
      
      if (certUrl && !certUrl.includes('your-')) {
        // Open actual certificate link
        window.open(certUrl, '_blank');
      } else {
        // Show placeholder message with proper certificate name
        const displayName = certDisplayNames[certType] || certType.toUpperCase();
        alert(`Certificate link for ${displayName} will be added soon!`);
      }
    });
  });
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
  console.log('=== Portfolio loaded ===');
  console.log('showPanel function available:', typeof window.showPanel);
  console.log('closePanel function available:', typeof window.closePanel);
  
  // Test panel detection
  const panels = document.querySelectorAll('.panel');
  const navItems = document.querySelectorAll('.nav-item');
  console.log('Found panels:', panels.length);
  console.log('Found nav items:', navItems.length);
  
  initializeSpaceObjects();
});

const contactForm = document.getElementById('contactForm');
const formMessage = document.getElementById('formMessage');

if (contactForm) {
  // Initialize EmailJS with your actual User ID
  emailjs.init('RD85aIMspEE5s7Gzb'); // Replace with your actual EmailJS User ID

  contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    // Show loading state
    const submitButton = contactForm.querySelector('button[type="submit"]');
    const originalText = submitButton.textContent;
    submitButton.textContent = 'Sending...';
    submitButton.disabled = true;

    const formData = new FormData(contactForm);
    const templateParams = {
      from_name: formData.get('name'),
      from_email: formData.get('email'),
      message: formData.get('message'),
      to_email: 'whatsupayush@gmail.com', // Your email address
    };

    try {
      const response = await emailjs.send(
        'service_y0tr9c6', // Replace with your actual Service ID
        'template_8amzd8k', // Replace with your actual Template ID
        templateParams
      );

      console.log('SUCCESS!', response.status, response.text);
      
      formMessage.textContent = 'Message sent successfully!';
      formMessage.className = 'form-message success show';
      contactForm.reset();
      
    } catch (error) {
      console.error('FAILED...', error);
      
      formMessage.textContent = 'Failed to send message. Please try again.';
      formMessage.className = 'form-message error show';
    } finally {
      // Reset button state
      submitButton.textContent = originalText;
      submitButton.disabled = false;
    }

    // Hide message after 5 seconds
    setTimeout(() => {
      formMessage.classList.remove('show');
    }, 5000);
  });
}

const roleText = document.getElementById('role-text');
const roles = ['UI/UX Designer', 'Web Developer', 'Creative Coder', 'Graphic Designer'];
let roleIndex = 0;
let charIndex = 0;
let isDeleting = false;

function typeRole() {
  const currentRole = roles[roleIndex];
  if (!isDeleting) {
    roleText.textContent = currentRole.substring(0, charIndex);
    charIndex++;
    if (charIndex > currentRole.length) {
      isDeleting = true;
      setTimeout(typeRole, 1500);
    } else {
      setTimeout(typeRole, 100);
    }
  } else {
    roleText.textContent = currentRole.substring(0, charIndex);
    charIndex--;
    if (charIndex < 0) {
      isDeleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
      setTimeout(typeRole, 500);
    } else {
      setTimeout(typeRole, 50);
    }
  }
}

typeRole();

// Scroll-triggered animations for Skills section
function animateSkillBars() {
  const skillItems = document.querySelectorAll('.skill-item');
  
  skillItems.forEach((item, index) => {
    const progressBar = item.querySelector('.skill-progress');
    const percentage = progressBar.getAttribute('data-width');
    
    // Delay each skill bar animation slightly for a cascade effect
    setTimeout(() => {
      progressBar.style.width = percentage + '%';
    }, index * 150); // 150ms delay between each bar
  });
}

function animateSkillTags() {
  const skillTags = document.querySelectorAll('.skill-tag');
  
  skillTags.forEach((tag, index) => {
    // Reset animation
    tag.style.opacity = '0';
    tag.style.transform = 'translateY(20px)';
    
    // Animate in with delay
    setTimeout(() => {
      tag.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
      tag.style.opacity = '1';
      tag.style.transform = 'translateY(0)';
    }, index * 100 + 800); // Start after skill bars with staggered delay
  });
}

function animateStatsGrid() {
  const statItems = document.querySelectorAll('.stat-item');
  
  statItems.forEach((item, index) => {
    // Reset animation
    item.style.opacity = '0';
    item.style.transform = 'scale(0.8)';
    
    // Animate in with delay
    setTimeout(() => {
      item.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
      item.style.opacity = '1';
      item.style.transform = 'scale(1)';
    }, index * 200);
  });
}

// Enhanced intersection observer that triggers animations
function setupAnimationObserver() {
  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.3
  };
  
  const animationObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const sectionClass = entry.target.className;
        
        if (sectionClass.includes('skills-section')) {
          console.log('🎯 Skills section entered - triggering animations');
          // Trigger skill animations
          setTimeout(() => animateSkillBars(), 200);
          setTimeout(() => animateSkillTags(), 500);
        }
        
        if (sectionClass.includes('about-section')) {
          console.log('📊 About section entered - triggering stats animation');
          // Trigger stats animation
          setTimeout(() => animateStatsGrid(), 300);
        }
      }
    });
  }, observerOptions);
  
  // Observe sections that have animations
  const skillsSection = document.querySelector('.skills-section');
  const aboutSection = document.querySelector('.about-section');
  
  if (skillsSection) animationObserver.observe(skillsSection);
  if (aboutSection) animationObserver.observe(aboutSection);
}

// Initialize animation observer when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  setupAnimationObserver();
});

// Also trigger animations when clicking navigation (for immediate response)
const originalScrollToSection = window.scrollToSection;
window.scrollToSection = function(sectionName) {
  // Call original function
  originalScrollToSection(sectionName);
  
  // Trigger animations based on section
  setTimeout(() => {
    if (sectionName === 'skills') {
      console.log('🎯 Skills navigation clicked - triggering animations');
      animateSkillBars();
      setTimeout(() => animateSkillTags(), 300);
    }
    
    if (sectionName === 'about') {
      console.log('📊 About navigation clicked - triggering stats animation');
      animateStatsGrid();
    }
  }, 800); // Wait for scroll animation to complete
};
