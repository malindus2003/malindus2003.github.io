/**
 * Malindu Sankalpa - Premium Portfolio JS
 * Handles high-fidelity animations, interactive CLI console, dynamic project sorting,
 * form validations, dark/light theme switching, and scroll effects.
 */

// Initialize EmailJS
emailjs.init('uf2InGcg4BykyjZFp');

document.addEventListener('DOMContentLoaded', () => {

  /* ==========================================================================
     Theme Switcher Logic (Dark Space vs. Premium Light)
     ========================================================================== */
  const themeToggle = document.getElementById('theme-toggle');
  
  // Set default theme from localStorage or system preference
  const currentTheme = localStorage.getItem('theme') || 'dark';
  document.documentElement.setAttribute('data-theme', currentTheme);

  themeToggle.addEventListener('click', () => {
    let targetTheme = 'dark';
    if (document.documentElement.getAttribute('data-theme') === 'dark') {
      targetTheme = 'light';
    }
    document.documentElement.setAttribute('data-theme', targetTheme);
    localStorage.setItem('theme', targetTheme);
  });


  /* ==========================================================================
     Sticky Header & Active Link Tracking
     ========================================================================== */
  const header = document.getElementById('header');
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section');

  const handleScroll = () => {
    // 1. Sticky Nav state
    if (window.scrollY > 50) {
      header.classList.add('header-scrolled');
    } else {
      header.classList.remove('header-scrolled');
    }

    // 2. Active nav link highlight on scroll
    let currentId = '';
    sections.forEach(sec => {
      const secTop = sec.offsetTop - 120;
      const secHeight = sec.offsetHeight;
      if (window.scrollY >= secTop && window.scrollY < secTop + secHeight) {
        currentId = sec.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${currentId}`) {
        link.classList.add('active');
      }
    });
  };

  window.addEventListener('scroll', handleScroll);
  handleScroll(); // Trigger immediately to resolve initial position


  /* ==========================================================================
     Mobile Burger Menu Toggle
     ========================================================================== */
  const mobileToggle = document.getElementById('mobile-toggle');
  const navMenu = document.getElementById('nav-menu');

  mobileToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
  });

  // Close mobile menu when a nav link is clicked
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      navMenu.classList.remove('active');
    });
  });


  /* ==========================================================================
     Typewriter Animation
     ========================================================================== */
  const typewriter = document.getElementById('typewriter');
  const words = [
    'Full-Stack Applications.',
    'Scalable REST APIs.',
    'Interactive User Experiences.',
    'Secure Enterprise Architectures.'
  ];
  let wordIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let typingSpeed = 100;

  const type = () => {
    const currentWord = words[wordIndex];
    
    if (isDeleting) {
      // Deleting characters
      typewriter.textContent = currentWord.substring(0, charIndex - 1);
      charIndex--;
      typingSpeed = 50; // Deletion is faster
    } else {
      // Adding characters
      typewriter.textContent = currentWord.substring(0, charIndex + 1);
      charIndex++;
      typingSpeed = 120; // Natural typing pace
    }

    if (!isDeleting && charIndex === currentWord.length) {
      // Finished writing the word, wait before deleting
      isDeleting = true;
      typingSpeed = 1800; // Hold word on screen
    } else if (isDeleting && charIndex === 0) {
      // Finished deleting, move to next word
      isDeleting = false;
      wordIndex = (wordIndex + 1) % words.length;
      typingSpeed = 500; // Brief pause before typing next
    }

    setTimeout(type, typingSpeed);
  };

  if (typewriter) {
    type();
  }


  /* ==========================================================================
     Interactive Terminal Console Emulator
     ========================================================================== */
  const terminalInput = document.getElementById('terminal-input');
  const terminalHistory = document.getElementById('terminal-history');
  const terminalBody = document.getElementById('terminal-body');

  const commands = {
    help: `
      <div class="terminal-output">
        Available commands:<br>
        - <span class="highlight-cyan">about</span>       : Show brief professional bio<br>
        - <span class="highlight-cyan">skills</span>      : List categorized technical proficiencies<br>
        - <span class="highlight-cyan">projects</span>    : Detailed summary of full-stack systems<br>
        - <span class="highlight-cyan">education</span>   : Academic background & details<br>
        - <span class="highlight-cyan">contact</span>     : Contact details & socials links<br>
        - <span class="highlight-cyan">clear</span>       : Flush terminal display
      </div>
    `,
    about: `
      <div class="terminal-output">
        <span class="highlight-blue bold">Malindu Sankalpa</span> is an Information Technology undergraduate with hands-on experience in full-stack software development. Skilled in developing scalable web applications, REST APIs, role-based authentications, and responsive UI structures.<br><br>
        <span class="bold">Passions:</span> Scalable architectures, AI-integrations, clean OOP design patterns, and continuous learning of cutting-edge technology stacks.
      </div>
    `,
    skills: `
      <div class="terminal-output">
        <span class="highlight-purple bold">[Programming Languages]</span><br>
        &nbsp;&nbsp;Java, JavaScript, Python, PHP, C/C++<br><br>
        <span class="highlight-purple bold">[Frontend Stack]</span><br>
        &nbsp;&nbsp;ReactJS, HTML5, CSS3, Tailwind CSS, Material-UI<br><br>
        <span class="highlight-purple bold">[Backend &amp; Databases]</span><br>
        &nbsp;&nbsp;Node.js, Express.js, Spring Boot, REST APIs, MongoDB, MySQL<br><br>
        <span class="highlight-purple bold">[Security &amp; DevOps]</span><br>
        &nbsp;&nbsp;JWT, OAuth2, Git/GitHub, Docker, GitHub Actions CI/CD<br><br>
        <span class="highlight-purple bold">[Cloud &amp; Integrations]</span><br>
        &nbsp;&nbsp;Google Gemini AI, Cloudinary, Automated Email Services
      </div>
    `,
    projects: `
      <div class="terminal-output">
        <span class="highlight-blue bold">1. UniConnect - University Event Management Platform</span><br>
        &nbsp;&nbsp;<span class="text-muted">Stack: Node.js, Express, ReactJS, MongoDB, Tailwind, Google Gemini AI</span><br>
        &nbsp;&nbsp;University event logistics platform featuring JWT security, Google Gemini AI OCR for bank slip validations, and Cloudinary media pipelines.<br><br>
        
        <span class="highlight-blue bold">2. EduReserve - Smart Campus Resource Management</span><br>
        &nbsp;&nbsp;<span class="text-muted">Stack: Java, Spring Boot, ReactJS, MySQL, Google OAuth2, SSE</span><br>
        &nbsp;&nbsp;Resource reservation platform for lab bookings and venue logistics featuring QR confirmations, SSE notifications, and administrative dashboards.<br><br>
        
        <span class="highlight-blue bold">3. E-Commerce System - Full-Stack Application</span><br>
        &nbsp;&nbsp;<span class="text-muted">Stack: Node.js, Express, ReactJS, MongoDB, Docker, GitHub Actions</span><br>
        &nbsp;&nbsp;High-capacity storefront application featuring containerized setups, CI/CD automated deployment pipelines, and advanced DB query indexing.
      </div>
    `,
    education: `
      <div class="terminal-output">
        <span class="bold">Sri Lanka Institute of Information Technology (SLIIT)</span><br>
        &nbsp;&nbsp;<span class="highlight-cyan">BSc (Hons) in Information Technology Specializing in IT</span><br>
        &nbsp;&nbsp;<span class="text-muted">June 2023 -- Present | Malabe, Sri Lanka</span><br><br>
        &nbsp;&nbsp;• Excellent grasp of Data Structures, Algorithms, Object-Oriented Programming (OOP) and Database Design.<br>
        &nbsp;&nbsp;• Key coursework includes: Web Application Development, Software Engineering Architecture, Data Science.
      </div>
    `,
    contact: `
      <div class="terminal-output">
        • <span class="bold">Location:</span> Tissamaharama, Sri Lanka<br>
        • <span class="bold">Email:</span> <a href="mailto:malindusankalpa03@gmail.com" class="highlight-cyan">malindusankalpa03@gmail.com</a><br>
        • <span class="bold">Mobile:</span> +94 76 472 9153<br>
        • <span class="bold">LinkedIn:</span> <a href="https://www.linkedin.com/in/malindu-maddumage-5716a1352/" target="_blank" class="highlight-cyan">malindu-maddumage</a><br>
        • <span class="bold">GitHub:</span> <a href="https://github.com/malindus2003" target="_blank" class="highlight-cyan">malindus2003</a>
      </div>
    `
  };

  const handleCommandInput = (e) => {
    if (e.key === 'Enter') {
      const inputVal = terminalInput.value.trim();
      const command = inputVal.toLowerCase();
      
      // 1. Create echo line
      const echoLine = document.createElement('div');
      echoLine.className = 'terminal-line';
      echoLine.innerHTML = `
        <div class="terminal-prompt-line">
          <span class="terminal-prompt-sym">➜</span>
          <span class="terminal-user">guest@malindu.dev</span>
          <span class="terminal-command">:~</span>
          <span class="highlight-cyan bold" style="margin-left: 0.5rem;">${escapeHTML(inputVal)}</span>
        </div>
      `;
      
      terminalHistory.appendChild(echoLine);
      
      // 2. Parse and evaluate command
      if (command !== '') {
        if (command === 'clear') {
          terminalHistory.innerHTML = '';
        } else if (commands.hasOwnProperty(command)) {
          const outputLine = document.createElement('div');
          outputLine.className = 'terminal-line';
          outputLine.innerHTML = commands[command];
          terminalHistory.appendChild(outputLine);
        } else {
          const errLine = document.createElement('div');
          errLine.className = 'terminal-line';
          errLine.innerHTML = `
            <div class="terminal-output" style="color: #ef4444;">
              Command not found: <span class="bold">${escapeHTML(inputVal)}</span>. Type <span class="bold" style="color: var(--text-primary);">help</span> for available commands.
            </div>
          `;
          terminalHistory.appendChild(errLine);
        }
      }
      
      // 3. Clear and auto-scroll
      terminalInput.value = '';
      setTimeout(() => {
        terminalBody.scrollTop = terminalBody.scrollHeight;
      }, 30);
    }
  };

  const escapeHTML = (str) => {
    return str.replace(/[&<>'"]/g, 
      tag => ({
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        "'": '&#39;',
        '"': '&quot;'
      }[tag] || tag)
    );
  };

  if (terminalInput) {
    terminalInput.addEventListener('keydown', handleCommandInput);
  }


  /* ==========================================================================
     Project Categories Filtering
     ========================================================================== */
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      // Remove active class from other buttons
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterValue = btn.getAttribute('data-filter');

      projectCards.forEach(card => {
        const category = card.getAttribute('data-category');
        
        // Handle subtle fade-in scaling transitions
        card.style.opacity = '0';
        card.style.transform = 'scale(0.95)';
        
        setTimeout(() => {
          if (filterValue === 'all' || category === filterValue) {
            card.style.display = 'flex';
            setTimeout(() => {
              card.style.opacity = '1';
              card.style.transform = 'scale(1)';
            }, 50);
          } else {
            card.style.display = 'none';
          }
        }, 200);
      });
    });
  });


  /* ==========================================================================
     Interactive Contact Form Validation & Submission
     ========================================================================== */
  const contactForm = document.getElementById('contact-form');
  const formName = document.getElementById('form-name');
  const formEmail = document.getElementById('form-email');
  const formSubject = document.getElementById('form-subject');
  const formMessage = document.getElementById('form-message');
  const formStatus = document.getElementById('form-status');
  const btnSubmit = document.getElementById('btn-submit');

  const validators = {
    name: () => {
      const isValid = formName.value.trim() !== '';
      toggleFeedback(formName, document.getElementById('feedback-name'), isValid);
      return isValid;
    },
    email: () => {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      const isValid = emailRegex.test(formEmail.value.trim());
      toggleFeedback(formEmail, document.getElementById('feedback-email'), isValid);
      return isValid;
    },
    subject: () => {
      const isValid = formSubject.value.trim() !== '';
      toggleFeedback(formSubject, document.getElementById('feedback-subject'), isValid);
      return isValid;
    },
    message: () => {
      const isValid = formMessage.value.trim() !== '';
      toggleFeedback(formMessage, document.getElementById('feedback-message'), isValid);
      return isValid;
    }
  };

  const toggleFeedback = (input, feedbackEl, isValid) => {
    if (isValid) {
      input.style.borderColor = '';
      feedbackEl.classList.remove('error');
    } else {
      input.style.borderColor = '#ef4444';
      feedbackEl.classList.add('error');
    }
  };

  // Run validators on input changes to give responsive warnings
  formName.addEventListener('input', validators.name);
  formEmail.addEventListener('input', validators.email);
  formSubject.addEventListener('input', validators.subject);
  formMessage.addEventListener('input', validators.message);

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      // Trigger all validators
      const isNameValid = validators.name();
      const isEmailValid = validators.email();
      const isSubjectValid = validators.subject();
      const isMessageValid = validators.message();

      if (isNameValid && isEmailValid && isSubjectValid && isMessageValid) {
        // Change submit button to loading state
        btnSubmit.disabled = true;
        const originalText = btnSubmit.innerHTML;
        btnSubmit.innerHTML = `
          Sending...
          <svg style="animation: spin 1s infinite linear;" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <line x1="12" y1="2" x2="12" y2="6"></line>
            <line x1="12" y1="18" x2="12" y2="22"></line>
            <line x1="4.93" y1="4.93" x2="7.76" y2="7.76"></line>
            <line x1="16.24" y1="16.24" x2="19.07" y2="19.07"></line>
            <line x1="2" y1="12" x2="6" y2="12"></line>
            <line x1="18" y1="12" x2="22" y2="12"></line>
            <line x1="4.93" y1="19.07" x2="7.76" y2="16.24"></line>
            <line x1="16.24" y1="7.76" x2="19.07" y2="4.93"></line>
          </svg>
        `;

        // Style helper for loader spinning
        if (!document.getElementById('spin-keyframe-style')) {
          const style = document.createElement('style');
          style.id = 'spin-keyframe-style';
          style.innerHTML = '@keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }';
          document.head.appendChild(style);
        }

        // Build template parameters matching EmailJS template variables
        const now = new Date();
        const timeString = now.toLocaleString('en-US', { dateStyle: 'medium', timeStyle: 'short' });

        const templateParams = {
          name: formName.value.trim(),
          email: formEmail.value.trim(),
          subject: formSubject.value.trim(),
          message: formMessage.value.trim(),
          time: timeString
        };

        // Send email via EmailJS
        emailjs.send('service_dxl1907', 'template_e5bnmh5', templateParams)
          .then(() => {
            // Success Feedback
            formStatus.style.display = '';
            formStatus.className = 'form-status success';
            formStatus.innerHTML = `<span class="bold">Success!</span> Thank you, ${escapeHTML(formName.value.trim())}. Your message has been sent successfully. I will get back to you shortly!`;

            // Reset form fields
            contactForm.reset();
            btnSubmit.disabled = false;
            btnSubmit.innerHTML = originalText;

            // Clear status after 8 seconds
            setTimeout(() => {
              formStatus.style.display = 'none';
            }, 8000);
          })
          .catch((error) => {
            // Error Feedback
            formStatus.style.display = '';
            formStatus.className = 'form-status error';
            formStatus.innerHTML = `<span class="bold">Oops!</span> Something went wrong. Please try again or email me directly at <a href="mailto:malindusankalpa03@gmail.com" style="color:inherit;text-decoration:underline;">malindusankalpa03@gmail.com</a>.`;
            console.error('EmailJS error:', error);

            btnSubmit.disabled = false;
            btnSubmit.innerHTML = originalText;
          });
      } else {
        // Scroll to the first error input
        const firstError = document.querySelector('.form-feedback.error');
        if (firstError) {
          firstError.previousElementSibling.focus();
        }
      }
    });
  }

});
