/* Enhanced Portfolio JavaScript with Panel Navigation */

const themeToggle = document.getElementById('theme-toggle');
const body = document.body;

// Panel Navigation Functions
function showPanel(panelName) {
  console.log('showPanel called with:', panelName);
  
  // Clear all active states
  document.querySelectorAll('.panel').forEach(panel => {
    panel.classList.remove('active');
    panel.style.visibility = 'hidden';
  });
  document.querySelectorAll('.nav-item').forEach(item => {
    item.classList.remove('active');
  });
  
  // Find and show the target panel
  const targetPanel = document.querySelector(`.${panelName}-panel`);
  const targetNav = document.querySelector(`.${panelName}-nav`);
  
  console.log('Target panel:', targetPanel);
  console.log('Target nav:', targetNav);
  
  if (targetPanel) {
    targetPanel.style.visibility = 'visible';
    targetPanel.classList.add('active');
    console.log('Panel activated');
  }
  
  if (targetNav) {
    targetNav.classList.add('active');
    console.log('Nav activated');
  }
}

function closePanel() {
  console.log('closePanel called');
  
  // Remove active class from all panels and nav items
  document.querySelectorAll('.panel').forEach(panel => {
    panel.classList.remove('active');
    setTimeout(() => {
      panel.style.visibility = 'hidden';
    }, 600); // Wait for animation to complete
  });
  
  document.querySelectorAll('.nav-item').forEach(item => {
    item.classList.remove('active');
  });
}

// Make functions globally available
window.showPanel = showPanel;
window.closePanel = closePanel;

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
  
  // Nebula clicks - show experience
  if (nebula) {
    nebula.addEventListener('click', () => {
      showPanel('experience');
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
