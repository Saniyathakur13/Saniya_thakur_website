// Wait for DOM to load
document.addEventListener('DOMContentLoaded', function() {
  
  // Typing Animation
  new Typed('#typed-text', {
    strings: ['Full Stack Developer', 'Java & Spring Boot Expert', 'React Developer', 'Data Analytics Enthusiast'],
    typeSpeed: 50,
    backSpeed: 30,
    loop: true,
    showCursor: true,
    cursorChar: '|'
  });

  // Dark Mode Toggle
  const darkToggle = document.getElementById('darkModeToggle');
  if (darkToggle) {
    darkToggle.addEventListener('click', () => {
      document.body.classList.toggle('dark');
      if(document.body.classList.contains('dark')) {
        darkToggle.innerHTML = '<i class="fas fa-sun"></i> Light';
        localStorage.setItem('darkMode', 'enabled');
      } else {
        darkToggle.innerHTML = '<i class="fas fa-moon"></i> Dark';
        localStorage.setItem('darkMode', 'disabled');
      }
    });
  }

  // Check for saved dark mode preference
  if(localStorage.getItem('darkMode') === 'enabled') {
    document.body.classList.add('dark');
    if (darkToggle) darkToggle.innerHTML = '<i class="fas fa-sun"></i> Light';
  }

 // Download Resume - Download actual PDF file from folder
const downloadBtn = document.getElementById('downloadResumeBtn');
if (downloadBtn) {
  downloadBtn.addEventListener('click', () => {
    // This downloads the actual PDF file from your project folder
    // Make sure your PDF file is named exactly "saniya_resume.pdf" and is in the same folder as index.html
    
    const pdfPath = 'saniya_resume.pdf';  // Your PDF filename
    
    // Create a temporary link element
    const link = document.createElement('a');
    link.href = pdfPath;
    link.download = 'saniya_resume.pdf';  // What the downloaded file will be named
    
    // Append to body, click, and remove
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    // Show success message
    alert('✅ Resume download started!');
  });
}

  // Animate Skill Bars on Scroll
  function animateSkillBars() {
    const fills = document.querySelectorAll('.progress-fill');
    fills.forEach(fill => {
      const percent = fill.getAttribute('data-skill');
      const rect = fill.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      
      if (rect.top < windowHeight - 100 && fill.style.width !== percent + '%') {
        fill.style.width = percent + '%';
        const parentItem = fill.closest('.skill-item');
        if (parentItem) {
          const percentSpan = parentItem.querySelector('.skill-percent');
          if (percentSpan) {
            percentSpan.textContent = percent + '%';
          }
        }
      }
    });
  }

  setTimeout(animateSkillBars, 500);
  window.addEventListener('scroll', animateSkillBars);

  // Back to Top Button
  const backBtn = document.getElementById('backToTop');
  if (backBtn) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 300) {
        backBtn.classList.add('show');
      } else {
        backBtn.classList.remove('show');
      }
    });
    
    backBtn.addEventListener('click', (e) => {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // ========== EMAILJS CONTACT FORM - COMPLETELY FIXED ==========
  
  // Initialize EmailJS
  emailjs.init("FAGayUUNBR2orLRKq");
  
  // Get form elements
  const form = document.getElementById('contactForm');
  const statusDiv = document.getElementById('formStatus');
  const submitBtn = document.getElementById('submitBtn');
  
  if (form) {
    // Remove any existing event listeners by using a new one
    form.addEventListener('submit', async function(event) {
      // Stop the form from doing ANY default behavior
      event.preventDefault();
      event.stopPropagation();
      
      // Get form values
      const userName = document.getElementById('userName').value.trim();
      const userEmail = document.getElementById('userEmail').value.trim();
      const userMessage = document.getElementById('userMessage').value.trim();
      
      // Validate
      if (!userName || !userEmail || !userMessage) {
        statusDiv.innerHTML = '<span style="color: #f59e0b;">⚠️ Please fill in all fields!</span>';
        statusDiv.style.background = '#fef3c7';
        setTimeout(() => {
          statusDiv.innerHTML = '';
          statusDiv.style.background = 'transparent';
        }, 3000);
        return;
      }
      
      // Email validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(userEmail)) {
        statusDiv.innerHTML = '<span style="color: #f59e0b;">⚠️ Please enter a valid email address!</span>';
        statusDiv.style.background = '#fef3c7';
        setTimeout(() => {
          statusDiv.innerHTML = '';
          statusDiv.style.background = 'transparent';
        }, 3000);
        return;
      }
      
      // Disable button and show loading
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
      }
      
      statusDiv.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending message...';
      statusDiv.style.background = '#e0f2fe';
      statusDiv.style.color = '#0369a1';
      
      const templateParams = {
        from_name: userName,
        from_email: userEmail,
        message: userMessage,
        to_email: 'thakursaniya102@gmail.com'
      };
      
      console.log("Sending email with params:", templateParams);
      
      try {
        const response = await emailjs.send('service_0j9xcte', 'template_4tgr2kb', templateParams);
        console.log("SUCCESS!", response);
        
        statusDiv.innerHTML = '<span style="color: #16a34a;">✅ Message sent successfully! I\'ll reply soon.</span>';
        statusDiv.style.background = '#dcfce7';
        statusDiv.style.color = '#166534';
        form.reset();
        
        setTimeout(() => {
          statusDiv.innerHTML = '';
          statusDiv.style.background = 'transparent';
        }, 5000);
        
      } catch (error) {
        console.error("FAILED:", error);
        
        let errorMessage = '❌ Failed to send. ';
        if (error.text) {
          errorMessage += error.text;
        } else {
          errorMessage += 'Please email me directly at thakursaniya102@gmail.com';
        }
        
        statusDiv.innerHTML = `<span style="color: #dc2626;">${errorMessage}</span>`;
        statusDiv.style.background = '#fee2e2';
        statusDiv.style.color = '#991b1b';
        
        setTimeout(() => {
          statusDiv.innerHTML = '';
          statusDiv.style.background = 'transparent';
        }, 8000);
        
      } finally {
        // Re-enable button
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.innerHTML = '<i class="fas fa-paper-plane"></i> Send Message';
        }
      }
      
      // Return false to prevent ANY default behavior
      return false;
    });
  }

  // Share Buttons
  const currentUrl = encodeURIComponent(window.location.href);
  const shareText = encodeURIComponent("Check out Saniya Thakur's Full Stack Developer Portfolio!");
  
  const shareLinkedIn = document.getElementById('shareLinkedIn');
  const shareTwitter = document.getElementById('shareTwitter');
  const shareWhatsApp = document.getElementById('shareWhatsApp');
  
  if (shareLinkedIn) {
    shareLinkedIn.addEventListener('click', () => {
      window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${currentUrl}`, '_blank');
    });
  }
  
  if (shareTwitter) {
    shareTwitter.addEventListener('click', () => {
      window.open(`https://twitter.com/intent/tweet?text=${shareText}&url=${currentUrl}`, '_blank');
    });
  }
  
  if (shareWhatsApp) {
    shareWhatsApp.addEventListener('click', () => {
      window.open(`https://wa.me/?text=${shareText}%20${currentUrl}`, '_blank');
    });
  }

  // Mouse Glow Effect
  const canvas = document.getElementById('glow-canvas');
  if (canvas) {
    const ctx = canvas.getContext('2d');
    let mouseX = window.innerWidth / 2, mouseY = window.innerHeight / 2;
    
    function resizeCanvas() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }
    
    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();
    
    document.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    });
    
    function drawGlow() {
      if (!ctx) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const gradient = ctx.createRadialGradient(mouseX, mouseY, 0, mouseX, mouseY, 120);
      gradient.addColorStop(0, 'rgba(59,130,246,0.3)');
      gradient.addColorStop(0.5, 'rgba(139,92,246,0.1)');
      gradient.addColorStop(1, 'rgba(59,130,246,0)');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      requestAnimationFrame(drawGlow);
    }
    
    drawGlow();
  }

  // Card animations
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, observerOptions);
  
  document.querySelectorAll('.case-card').forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(card);
  });

  console.log('✨ Portfolio loaded successfully!');
});