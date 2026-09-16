/**
 * Malindu Sankalpa - Modern Developer Portfolio JS
 * Handles mouse spotlight tracking, scroll progress bar, 1-click email copy,
 * interactive CLI console & quick tabs, dynamic project filtering,
 * theme toggling, and EmailJS automated inquiries.
 */

// Initialize EmailJS
emailjs.init('uf2InGcg4BykyjZFp');

document.addEventListener('DOMContentLoaded', () => {

  /* ==========================================================================
     1. Scroll Progress Bar
     ========================================================================== */
  const scrollProgress = document.getElementById('scroll-progress');
  const updateScrollProgress = () => {
    const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
    if (totalHeight > 0 && scrollProgress) {
      const progress = (window.scrollY / totalHeight) * 100;
      scrollProgress.style.width = `${progress}%`;
    }
  };
  window.addEventListener('scroll', updateScrollProgress);
  updateScrollProgress();


  /* ==========================================================================
     2. Interactive Mouse Pointer Background Spotlight Glow
     ========================================================================== */
  const cursorGlow = document.getElementById('cursor-glow');
  if (cursorGlow) {
    let mouseMoveTicking = false;
    window.addEventListener('mousemove', (e) => {
      if (!mouseMoveTicking) {
        window.requestAnimationFrame(() => {
          document.documentElement.style.setProperty('--cursor-x', `${e.clientX}px`);
          document.documentElement.style.setProperty('--cursor-y', `${e.clientY}px`);
          if (!cursorGlow.classList.contains('active')) {
            cursorGlow.classList.add('active');
          }
          mouseMoveTicking = false;
        });
        mouseMoveTicking = true;
      }
    });

    document.addEventListener('mouseleave', () => {
      cursorGlow.classList.remove('active');
    });
  }


  /* ==========================================================================
     3. Theme Switcher Logic (Carbon Dark vs. Modern Light)
     ========================================================================== */
  const themeToggle = document.getElementById('theme-toggle');
  const currentTheme = localStorage.getItem('theme') || 'dark';
  document.documentElement.setAttribute('data-theme', currentTheme);

  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const activeTheme = document.documentElement.getAttribute('data-theme');
      const targetTheme = activeTheme === 'dark' ? 'light' : 'dark';
      document.documentElement.setAttribute('data-theme', targetTheme);
      localStorage.setItem('theme', targetTheme);
    });
  }


  /* ==========================================================================
     4. Navigation Active Links Tracking & Mobile Menu
     ========================================================================== */
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section');
  const mobileToggle = document.getElementById('mobile-toggle');
  const navMenu = document.getElementById('nav-links');

  const handleNavScroll = () => {
    let currentId = '';
    sections.forEach(sec => {
      const secTop = sec.offsetTop - 140;
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

  window.addEventListener('scroll', handleNavScroll);
  handleNavScroll();

  if (mobileToggle && navMenu) {
    mobileToggle.addEventListener('click', () => {
      navMenu.classList.toggle('active');
    });

    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('active');
      });
    });
  }


  /* ==========================================================================
     5. 1-Click "Copy Email" Button with Toast
     ========================================================================== */
  const btnCopyEmail = document.getElementById('btn-copy-email');
  const copyToast = document.getElementById('copy-toast');

  if (btnCopyEmail && copyToast) {
    btnCopyEmail.addEventListener('click', () => {
      navigator.clipboard.writeText('malindusankalpa03@gmail.com').then(() => {
        copyToast.classList.add('show');
        setTimeout(() => {
          copyToast.classList.remove('show');
        }, 2200);
      }).catch(() => {
        // Fallback
        window.location.href = 'mailto:malindusankalpa03@gmail.com';
      });
    });
  }


  /* ==========================================================================
     6. Hero Typewriter Animation
     ========================================================================== */
  const typewriter = document.getElementById('typewriter');
  const words = [
    'Full-Stack Applications.',
    'Interactive Web Interfaces.',
    'Scalable REST Architectures.',
    'Native Android Solutions.'
  ];
  let wordIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let typingSpeed = 100;

  const typeLoop = () => {
    const currentWord = words[wordIndex];
    if (isDeleting) {
      typewriter.textContent = currentWord.substring(0, charIndex - 1);
      charIndex--;
      typingSpeed = 45;
    } else {
      typewriter.textContent = currentWord.substring(0, charIndex + 1);
      charIndex++;
      typingSpeed = 110;
    }

    if (!isDeleting && charIndex === currentWord.length) {
      isDeleting = true;
      typingSpeed = 1900;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      wordIndex = (wordIndex + 1) % words.length;
      typingSpeed = 400;
    }

    setTimeout(typeLoop, typingSpeed);
  };

  if (typewriter) {
    typeLoop();
  }


  /* ==========================================================================
     7. Interactive Developer CLI Terminal Emulator
     ========================================================================== */
  const terminalInput = document.getElementById('terminal-input');
  const terminalHistory = document.getElementById('terminal-history');
  const terminalBody = document.getElementById('terminal-body');
  const quickCmdBtns = document.querySelectorAll('.quick-cmd-btn');

  const commands = {
    help: `
      <div class="terminal-output">
        Available commands:<br>
        - <span style="color:var(--accent-cyan); font-weight:600;">about</span>       : Show brief professional bio<br>
        - <span style="color:var(--accent-cyan); font-weight:600;">experience</span>  : Work experience &amp; academic background<br>
        - <span style="color:var(--accent-cyan); font-weight:600;">projects</span>    : Detailed summary of full-stack &amp; mobile systems<br>
        - <span style="color:var(--accent-cyan); font-weight:600;">skills</span>      : List categorized technical proficiencies<br>
        - <span style="color:var(--accent-cyan); font-weight:600;">contact</span>     : Contact details &amp; direct links<br>
        - <span style="color:var(--accent-cyan); font-weight:600;">clear</span>       : Flush terminal display
      </div>
    `,
    about: `
      <div class="terminal-output">
        <strong style="color:var(--accent-cyan);">Malindu Sankalpa</strong> is an Information Technology undergraduate at SLIIT and a Frontend Development Intern at Kangaroo Cabs (Pvt) Ltd.<br><br>
        • <strong style="color:var(--text-primary);">Specialization:</strong> Full-Stack Web Development, Responsive UIs, RESTful Architectures, and Native Android Apps.<br>
        • <strong style="color:var(--text-primary);">Philosophy:</strong> Clean, maintainable code, robust database modeling, and exceptional user experience.
      </div>
    `,
    experience: `
      <div class="terminal-output">
        <span style="color:var(--accent-emerald); font-weight:700;">[Industry Experience]</span><br>
        <strong style="color:var(--text-primary);">Kangaroo Cabs (Pvt) Ltd</strong><br>
        &nbsp;&nbsp;<span style="color:var(--accent-cyan);">Frontend Development Intern</span> &bull; Present &bull; Colombo, Sri Lanka<br>
        &nbsp;&nbsp;• Developing and optimizing high-performance web user interfaces for ride-hailing services.<br>
        &nbsp;&nbsp;• Collaborating with engineering teams to connect frontend modules with backend REST APIs.<br><br>

        <span style="color:var(--accent-indigo); font-weight:700;">[Academic Education]</span><br>
        <strong style="color:var(--text-primary);">Sri Lanka Institute of Information Technology (SLIIT)</strong><br>
        &nbsp;&nbsp;<span style="color:var(--accent-cyan);">BSc (Hons) in Information Technology Specializing in IT</span> &bull; June 2023 -- Present<br>
        &nbsp;&nbsp;• Robust foundation in Data Structures, Algorithms, OOP Design, and Database Systems.<br>
        &nbsp;&nbsp;• Advanced coursework: Web Application Engineering, Software Architecture, Data Science.
      </div>
    `,
    projects: `
      <div class="terminal-output">
        <strong style="color:var(--accent-cyan);">1. UniConnect - University Event Management Platform</strong><br>
        &nbsp;&nbsp;Stack: Node.js, Express, ReactJS, MongoDB, Tailwind, Google Gemini AI<br>
        &nbsp;&nbsp;Event logistics platform featuring Gemini AI OCR for bank slip verification &amp; ticketing.<br><br>
        
        <strong style="color:var(--accent-cyan);">2. EduReserve - Smart Campus Resource Management</strong><br>
        &nbsp;&nbsp;Stack: Java, Spring Boot, ReactJS, MySQL, Google OAuth2, QR Verification<br>
        &nbsp;&nbsp;Resource reservation platform for lab &amp; hall logistics with role permissions.<br><br>
        
        <strong style="color:var(--accent-cyan);">3. Yala Safari Sri Lanka - Safari Tour &amp; Booking Platform</strong><br>
        &nbsp;&nbsp;Stack: HTML5/CSS3, JavaScript, Supabase, PostgreSQL, Vercel<br>
        &nbsp;&nbsp;Official wildlife jeep safari booking website with real-time tour reservation portal.<br><br>
        
        <strong style="color:var(--accent-cyan);">4. FinTrack - Android Personal Finance Tracking App</strong><br>
        &nbsp;&nbsp;Stack: Kotlin, Android SDK, Jetpack Navigation, ViewBinding, Material 3<br>
        &nbsp;&nbsp;Native Android application for tracking daily income/expenses &amp; category budgets.<br><br>
        
        <strong style="color:var(--accent-cyan);">5. E-Commerce System - Microservices Retail Platform</strong><br>
        &nbsp;&nbsp;Stack: Node.js, Express, ReactJS, MongoDB, Docker, GitHub Actions<br>
        &nbsp;&nbsp;Scalable storefront platform with containerized services and CI/CD pipelines.<br><br>
        
        <strong style="color:var(--accent-cyan);">6. Personal Developer Portfolio - Bento Grid Website</strong><br>
        &nbsp;&nbsp;Stack: HTML5, CSS3, JavaScript, EmailJS, GitHub Pages<br>
        &nbsp;&nbsp;Modern developer portfolio with interactive CLI terminal and automated inquiries.
      </div>
    `,
    skills: `
      <div class="terminal-output">
        <span style="color:var(--accent-purple); font-weight:700;">[Languages]</span> Java, Kotlin, JavaScript (ES6+), Python, PHP, C/C++<br><br>
        <span style="color:var(--accent-purple); font-weight:700;">[Frontend &amp; Mobile]</span> ReactJS, Android SDK, HTML5/CSS3, Tailwind CSS, Material-UI<br><br>
        <span style="color:var(--accent-purple); font-weight:700;">[Backend &amp; Cloud]</span> Spring Boot, Node.js, Express.js, Supabase, RESTful APIs<br><br>
        <span style="color:var(--accent-purple); font-weight:700;">[Databases]</span> PostgreSQL, MongoDB, MySQL, Database Modeling<br><br>
        <span style="color:var(--accent-purple); font-weight:700;">[DevOps &amp; Tools]</span> Git, GitHub, Docker, CI/CD, GitHub Actions, Postman<br><br>
        <span style="color:var(--accent-purple); font-weight:700;">[Integrations]</span> Google Gemini AI, Cloudinary, JWT, OAuth2, EmailJS
      </div>
    `,
    contact: `
      <div class="terminal-output">
        • <strong style="color:var(--text-primary);">Email:</strong> <a href="mailto:malindusankalpa03@gmail.com" style="color:var(--accent-cyan);">malindusankalpa03@gmail.com</a><br>
        • <strong style="color:var(--text-primary);">Mobile:</strong> +94 76 472 9153<br>
        • <strong style="color:var(--text-primary);">LinkedIn:</strong> <a href="https://www.linkedin.com/in/malindu-maddumage-5716a1352/" target="_blank" style="color:var(--accent-cyan);">malindu-maddumage</a><br>
        • <strong style="color:var(--text-primary);">GitHub:</strong> <a href="https://github.com/malindus2003" target="_blank" style="color:var(--accent-cyan);">malindus2003</a><br>
        • <strong style="color:var(--text-primary);">Location:</strong> Tissamaharama / Colombo, Sri Lanka
      </div>
    `
  };

  commands.education = commands.experience;

  const escapeHTML = (str) => {
    return str.replace(/[&<>'"]/g, tag => ({
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      "'": '&#39;',
      '"': '&quot;'
    }[tag] || tag));
  };

  const executeCommand = (cmdText) => {
    const rawCmd = cmdText.trim();
    const command = rawCmd.toLowerCase();

    // Echo Line
    const echoLine = document.createElement('div');
    echoLine.className = 'terminal-line';
    echoLine.innerHTML = `
      <div class="terminal-prompt-line">
        <span class="terminal-prompt-sym">➜</span>
        <span class="terminal-user">guest@malindu.dev</span>
        <span class="terminal-command">:~</span>
        <span style="color:var(--accent-cyan); font-weight:600; margin-left:0.5rem;">${escapeHTML(rawCmd)}</span>
      </div>
    `;
    terminalHistory.appendChild(echoLine);

    if (command !== '') {
      if (command === 'clear') {
        terminalHistory.innerHTML = '';
      } else if (commands.hasOwnProperty(command)) {
        const out = document.createElement('div');
        out.className = 'terminal-line';
        out.innerHTML = commands[command];
        terminalHistory.appendChild(out);
      } else {
        const err = document.createElement('div');
        err.className = 'terminal-line';
        err.innerHTML = `
          <div class="terminal-output" style="color:#ef4444;">
            Command not found: <strong>${escapeHTML(rawCmd)}</strong>. Type <span style="color:var(--text-primary); font-weight:600;">help</span> for available commands.
          </div>
        `;
        terminalHistory.appendChild(err);
      }
    }

    if (terminalInput) terminalInput.value = '';
    setTimeout(() => {
      terminalBody.scrollTop = terminalBody.scrollHeight;
    }, 30);
  };

  if (terminalInput) {
    terminalInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        executeCommand(terminalInput.value);
      }
    });
  }

  quickCmdBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const cmd = btn.getAttribute('data-cmd');
      if (cmd) executeCommand(cmd);
    });
  });


  /* ==========================================================================
     8. Featured Projects Filtering
     ========================================================================== */
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterValue = btn.getAttribute('data-filter');

      projectCards.forEach(card => {
        const category = card.getAttribute('data-category') || '';
        const categories = category.split(' ');

        card.style.opacity = '0';
        card.style.transform = 'scale(0.96)';

        setTimeout(() => {
          if (filterValue === 'all' || category === filterValue || categories.includes(filterValue)) {
            card.style.display = 'flex';
            setTimeout(() => {
              card.style.opacity = '1';
              card.style.transform = 'scale(1)';
            }, 50);
          } else {
            card.style.display = 'none';
          }
        }, 180);
      });
    });
  });


  /* ==========================================================================
     9. Interactive Contact Form with EmailJS Integration
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
      const valid = formName.value.trim() !== '';
      toggleField(formName, document.getElementById('feedback-name'), valid);
      return valid;
    },
    email: () => {
      const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      const valid = regex.test(formEmail.value.trim());
      toggleField(formEmail, document.getElementById('feedback-email'), valid);
      return valid;
    },
    subject: () => {
      const valid = formSubject.value.trim() !== '';
      toggleField(formSubject, document.getElementById('feedback-subject'), valid);
      return valid;
    },
    message: () => {
      const valid = formMessage.value.trim() !== '';
      toggleField(formMessage, document.getElementById('feedback-message'), valid);
      return valid;
    }
  };

  const toggleField = (input, feedbackEl, isValid) => {
    if (isValid) {
      input.style.borderColor = '';
      if (feedbackEl) feedbackEl.classList.remove('error');
    } else {
      input.style.borderColor = '#ef4444';
      if (feedbackEl) feedbackEl.classList.add('error');
    }
  };

  if (formName) formName.addEventListener('input', validators.name);
  if (formEmail) formEmail.addEventListener('input', validators.email);
  if (formSubject) formSubject.addEventListener('input', validators.subject);
  if (formMessage) formMessage.addEventListener('input', validators.message);

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const isNameValid = validators.name();
      const isEmailValid = validators.email();
      const isSubjectValid = validators.subject();
      const isMessageValid = validators.message();

      if (isNameValid && isEmailValid && isSubjectValid && isMessageValid) {
        btnSubmit.disabled = true;
        const originalText = btnSubmit.innerHTML;
        btnSubmit.innerHTML = `
          Sending...
          <svg style="animation: spin 1s infinite linear; margin-left:0.5rem;" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
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

        if (!document.getElementById('spin-keyframe-style')) {
          const style = document.createElement('style');
          style.id = 'spin-keyframe-style';
          style.innerHTML = '@keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }';
          document.head.appendChild(style);
        }

        const now = new Date();
        const templateParams = {
          name: formName.value.trim(),
          email: formEmail.value.trim(),
          subject: formSubject.value.trim(),
          message: formMessage.value.trim(),
          time: now.toLocaleString('en-US', { dateStyle: 'medium', timeStyle: 'short' })
        };

        emailjs.send('service_dxl1907', 'template_e5bnmh5', templateParams)
          .then(() => {
            formStatus.style.display = '';
            formStatus.className = 'form-status success';
            formStatus.innerHTML = `<strong>Success!</strong> Thank you, ${escapeHTML(formName.value.trim())}. Your message has been sent successfully. I will get back to you shortly!`;

            contactForm.reset();
            btnSubmit.disabled = false;
            btnSubmit.innerHTML = originalText;

            setTimeout(() => {
              formStatus.style.display = 'none';
            }, 8000);
          })
          .catch((error) => {
            formStatus.style.display = '';
            formStatus.className = 'form-status error';
            formStatus.innerHTML = `<strong>Error:</strong> Failed to send message. Please email me directly at <a href="mailto:malindusankalpa03@gmail.com" style="color:inherit;text-decoration:underline;">malindusankalpa03@gmail.com</a>.`;
            console.error('EmailJS error:', error);

            btnSubmit.disabled = false;
            btnSubmit.innerHTML = originalText;
          });
      } else {
        const firstError = document.querySelector('.form-feedback.error');
        if (firstError && firstError.previousElementSibling) {
          firstError.previousElementSibling.focus();
        }
      }
    });
  }

});
