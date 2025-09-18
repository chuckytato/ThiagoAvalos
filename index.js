
let isMatrixRunning = false;
let isTypingRunning = false;
let typingEffectInterval = null;

function startMatrixEffect() {
  const matrix = document.querySelector('.matrix-bg');
  if (!matrix || isMatrixRunning) return;

  const chars = '01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン';
  let matrixInterval = setInterval(() => {
    const char = document.createElement('div');
    char.className = 'matrix-char';
    char.textContent = chars[Math.floor(Math.random() * chars.length)];
    char.style.left = Math.random() * 100 + 'vw';
    char.style.animationDuration = (Math.random() * 3 + 2) + 's';
    matrix.appendChild(char);

    setTimeout(() => {
      if (char.parentNode) {
        char.parentNode.removeChild(char);
      }
    }, 5000);
  }, 100);

  matrix.dataset.intervalId = matrixInterval;
  isMatrixRunning = true;
}

function stopMatrixEffect() {
  const matrix = document.querySelector('.matrix-bg');
  if (!matrix || !isMatrixRunning) return;

  const intervalId = parseInt(matrix.dataset.intervalId);
  if (intervalId) {
    clearInterval(intervalId);
    matrix.dataset.intervalId = '';
  }

  const existingChars = matrix.querySelectorAll('.matrix-char');
  existingChars.forEach(char => char.remove());
  isMatrixRunning = false;
}

function startTypingEffect() {
  if (isTypingRunning) return;

  const messages = [
    'console.log("Hola, Mundo! 👋");',
    'npm install Desarrollador-Fullstack',
    'git commit -m "Este es mi portfolio"',
    'const skill = "Autodidacta";',
    'while(true) { keepLearning(); }'
  ];

  const typingElement = document.getElementById('typingText');
  const centeredCursor = document.getElementById('centeredCursor');

  if (!typingElement || !centeredCursor) return;

  isTypingRunning = true;

  let messageIndex = 0;
  let textToDisplay = '';
  let isTyping = true;
  let charIndex = 0;
  let delayCounter = 0;

  centeredCursor.style.display = 'none';
  typingElement.style.display = 'inline-block';
  typingElement.classList.add('typing-cursor');
  typingElement.classList.remove('paused');

  typingEffectInterval = setInterval(() => {
    const currentMessage = messages[messageIndex];

    if (isTyping) {
      typingElement.classList.remove('paused');
      if (charIndex < currentMessage.length) {
        textToDisplay += currentMessage.charAt(charIndex);
        typingElement.textContent = textToDisplay;
        charIndex++;
      } else {
        delayCounter++;
        if (delayCounter >= 40) {
          isTyping = false;
          typingElement.classList.add('paused');
          delayCounter = 0;
        }
      }
    } else {
      if (charIndex > 0) {
        textToDisplay = textToDisplay.slice(0, -1);
        typingElement.textContent = textToDisplay;
        charIndex--;
      } else {
        isTyping = true;
        messageIndex = (messageIndex + 1) % messages.length;
        typingElement.classList.remove('paused');
      }
    }
  }, 80);
}

function stopTypingEffect() {
  if (!isTypingRunning) return;

  clearInterval(typingEffectInterval);

  const typingElement = document.getElementById('typingText');
  const centeredCursor = document.getElementById('centeredCursor');
  if (typingElement) {
    typingElement.textContent = '';
    typingElement.classList.remove('typing-cursor', 'paused');
    typingElement.style.display = 'none';
  }
  if (centeredCursor) {
    centeredCursor.style.display = 'inline-block';
  }
  isTypingRunning = false;
}


const heroSection = document.getElementById('home');
if (heroSection) {
  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.5
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.target.id === 'home') {
        if (entry.isIntersecting && entry.intersectionRatio >= 0.5) {
          startTypingEffect();
          startMatrixEffect();
        } else {
          stopTypingEffect();
          stopMatrixEffect();
        }
      }
    });
  }, observerOptions);

  observer.observe(heroSection);
}


function animateCounters() {
  const counters = document.querySelectorAll('.counter');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const target = parseInt(entry.target.getAttribute('data-target'));
        let count = 0;
        const increment = target / 50;

        const timer = setInterval(() => {
          count += increment;
          if (count >= target) {
            count = target;
            clearInterval(timer);
          }
          entry.target.textContent = Math.floor(count);
        }, 40);

        observer.unobserve(entry.target);
      }
    });
  });
  counters.forEach(counter => observer.observe(counter));
}

function setupNavigationDots() {
  const dots = document.querySelectorAll('.nav-dot');
  const sections = ['home', 'sobre-mi', 'habilidades', 'proyectos', 'experiencia', 'contacto'];

  dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
      const target = document.getElementById(sections[index]);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
      const element = document.getElementById(section);
      if (element) {
        const rect = element.getBoundingClientRect();
        if (rect.top <= 100 && rect.bottom >= 100) {
          current = section;
        }
      }
    });

    dots.forEach((dot, index) => {
      dot.classList.toggle('active', sections[index] === current);
    });
  });
}

function setupEasterEggs() {
  const easterEggs = document.querySelectorAll('.easter-egg');
  const messages = [
    '🎉 ¡Encontraste un Easter Egg!',
    '🚀 ¡Buena observacion!'
  ];

  easterEggs.forEach(egg => {
    egg.addEventListener('click', () => {
      const message = messages[Math.floor(Math.random() * messages.length)];
      const notification = document.createElement('div');
      notification.className = 'fixed top-4 right-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-3 rounded-lg shadow-lg z-50 transform translate-x-full transition-transform duration-300';
      notification.textContent = message;
      document.body.appendChild(notification);

      setTimeout(() => notification.classList.remove('translate-x-full'), 100);
      setTimeout(() => {
        notification.classList.add('translate-x-full');
        setTimeout(() => document.body.removeChild(notification), 300);
      }, 3000);
    });
  });
}

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
});

let ticking = false;
window.addEventListener('scroll', () => {
  if (!ticking) {
    requestAnimationFrame(() => {
      const scrolled = window.pageYOffset;
      const header = document.querySelector('header');
      const viewportHeight = window.innerHeight;

      if (header && scrolled < viewportHeight) {
        const parallaxAmount = scrolled * 0.1;
        header.style.transform = `translateY(${parallaxAmount}px)`;
      }
      ticking = false;
    });
    ticking = true;
  }
});

document.querySelectorAll('.skill-card').forEach(card => {
  let tooltip = null;
  let progressAnimated = false;

  card.addEventListener('mouseenter', function() {
    if (!progressAnimated) {
      const progressBar = this.querySelector('[style*="--final-width"]');
      if (progressBar) {
        const finalWidth = progressBar.style.getPropertyValue('--final-width');
        if (finalWidth) {
          setTimeout(() => {
            progressBar.style.width = finalWidth;
          }, 300);
          progressAnimated = true;
        }
      }
    }

    const skill = this.getAttribute('data-skill');
    const level = this.getAttribute('data-level');

    if (skill && level && !tooltip) {
      this.style.position = 'relative';
      this.appendChild(tooltip);

      requestAnimationFrame(() => {
        tooltip.style.opacity = '1';
      });
    }
  });

  card.addEventListener('mouseleave', function() {
    setTimeout(() => {
      progressAnimated = false;
    }, 1000);

    if (tooltip) {
      tooltip.style.opacity = '0';
      setTimeout(() => {
        if (tooltip && tooltip.parentNode) {
          tooltip.parentNode.removeChild(tooltip);
          tooltip = null;
        }
      }, 200);
    }
  });
});

document.addEventListener('DOMContentLoaded', () => {
  animateCounters();
  setupNavigationDots();
  setupEasterEggs();
});