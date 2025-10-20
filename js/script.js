// ========================================
// 1. ANIMATIONS AU SCROLL
// ========================================

// Observer pour détecter quand les sections entrent dans le viewport
const observerOptions = {
  threshold: 0.2,
  rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, observerOptions);

// Applique l'animation à toutes les sections
document.addEventListener('DOMContentLoaded', () => {
  const sections = document.querySelectorAll('section');
  
  sections.forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(50px)';
    section.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
    observer.observe(section);
  });
});

// ========================================
// 2. NAVIGATION ACTIVE
// ========================================

// Met à jour le lien actif selon la section visible
const navLinks = document.querySelectorAll('nav a');
const sections = document.querySelectorAll('section');

const updateActiveNav = () => {
  let currentSection = '';
  
  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;
    
    if (window.scrollY >= sectionTop - 200) {
      currentSection = section.getAttribute('id');
    }
  });
  
  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === `#${currentSection}`) {
      link.classList.add('active');
    }
  });
};

window.addEventListener('scroll', updateActiveNav);

// ========================================
// 3. EFFET MACHINE À ÉCRIRE
// ========================================

const typeWriter = (element, text, speed = 100) => {
  let i = 0;
  element.textContent = '';
  
  const type = () => {
    if (i < text.length) {
      element.textContent += text.charAt(i);
      i++;
      setTimeout(type, speed);
    }
  };
  
  type();
};

// Lance l'effet au chargement de la page
window.addEventListener('load', () => {
  const homeTitle = document.querySelector('.home-name');
  if (homeTitle) {
    // Remplace le texte par le message personnalisé
    const customText = 'Paul Bouqueret';
    typeWriter(homeTitle, customText, 80);
  }
});

// ========================================
// 4. BOUTON RETOUR EN HAUT
// ========================================

// Crée le bouton
const createScrollTopButton = () => {
  const button = document.createElement('button');
  button.innerHTML = '↑';
  button.classList.add('scroll-top-btn');
  button.style.cssText = `
    position: fixed;
    bottom: 30px;
    right: 30px;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    background: linear-gradient(135deg, #a8d8ea 0%, #5dade2 50%, #85c1e2 100%);
    color: white;
    border: none;
    font-size: 24px;
    cursor: pointer;
    opacity: 0;
    visibility: hidden;
    transition: all 0.3s ease;
    z-index: 999;
    box-shadow: 0 5px 20px rgba(168, 216, 234, 0.4);
  `;
  
  button.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
  
  document.body.appendChild(button);
  return button;
};

const scrollTopBtn = createScrollTopButton();

// Affiche/cache le bouton selon le scroll
window.addEventListener('scroll', () => {
  if (window.scrollY > 500) {
    scrollTopBtn.style.opacity = '1';
    scrollTopBtn.style.visibility = 'visible';
  } else {
    scrollTopBtn.style.opacity = '0';
    scrollTopBtn.style.visibility = 'hidden';
  }
});

// Effet hover sur le bouton
scrollTopBtn.addEventListener('mouseenter', () => {
  scrollTopBtn.style.transform = 'scale(1.1) translateY(-5px)';
});

scrollTopBtn.addEventListener('mouseleave', () => {
  scrollTopBtn.style.transform = 'scale(1) translateY(0)';
});

// ========================================
// 5. COPIE EMAIL AU CLIC
// ========================================

// Fonction pour créer la notification toast
const showEmailToast = () => {
  const toast = document.createElement('div');
  toast.textContent = '✓ Email copié !';
  toast.style.cssText = `
    position: fixed;
    bottom: 100px;
    right: 30px;
    background: linear-gradient(135deg, #10b981 0%, #059669 100%);
    color: white;
    padding: 1rem 2rem;
    border-radius: 0.5rem;
    font-weight: 600;
    box-shadow: 0 10px 30px rgba(16, 185, 129, 0.3);
    z-index: 1000;
    animation: slideIn 0.3s ease;
  `;

  document.body.appendChild(toast);

  // Retire la notification après 3 secondes
  setTimeout(() => {
    toast.style.animation = 'slideOut 0.3s ease';
    setTimeout(() => toast.remove(), 300);
  }, 3000);
};

// Email dans la section Contact
const emailLink = document.querySelector('#contact a[href^="mailto"]');

if (emailLink) {
  emailLink.addEventListener('click', (e) => {
    e.preventDefault();
    const email = emailLink.textContent;
    navigator.clipboard.writeText(email).then(() => {
      showEmailToast();
    });
  });
}

// Email dans la barre latérale sociale
const sidebarEmailLink = document.querySelector('.social-sidebar a[href^="mailto"]');

if (sidebarEmailLink) {
  sidebarEmailLink.addEventListener('click', (e) => {
    e.preventDefault();
    const email = 'p.bouqueret@gmail.com';
    navigator.clipboard.writeText(email).then(() => {
      showEmailToast();
    });
  });
}

// ========================================
// 6. ANIMATION DES CARTES À PROPOS
// ========================================

const aboutObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const cards = entry.target.querySelectorAll('.about-card');

      cards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';

        setTimeout(() => {
          card.style.opacity = '1';
          card.style.transform = 'translateY(0)';
        }, index * 150);
      });

      aboutObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.2 });

const aboutSection = document.querySelector('.about-content');
if (aboutSection) {
  const cards = aboutSection.querySelectorAll('.about-card');
  cards.forEach(card => {
    card.style.transition = 'all 0.6s ease';
  });

  aboutObserver.observe(aboutSection);
}

// ========================================
// 7. ANIMATION DES BADGES DE COMPÉTENCES
// ========================================

const skillsObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const badges = entry.target.querySelectorAll('.skill-badge');

      badges.forEach((badge, index) => {
        badge.style.opacity = '0';
        badge.style.transform = 'translateY(30px) scale(0.9)';

        setTimeout(() => {
          badge.style.opacity = '1';
          badge.style.transform = 'translateY(0) scale(1)';
        }, index * 100);
      });

      skillsObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.3 });

const skillsSection = document.querySelector('.skills-grid');
if (skillsSection) {
  const badges = skillsSection.querySelectorAll('.skill-badge');
  badges.forEach(badge => {
    badge.style.transition = 'all 0.5s ease';
  });

  skillsObserver.observe(skillsSection);
}

// ========================================
// 8. EFFET CURSEUR PERSONNALISÉ (OPTIONNEL)
// ========================================

// Désactive complètement sur mobile et tablette (écrans < 1024px)
if (window.innerWidth >= 1024) {
  const cursor = document.createElement('div');
  cursor.classList.add('custom-cursor');
  cursor.style.cssText = `
    width: 20px;
    height: 20px;
    border: 2px solid #5dade2;
    border-radius: 50%;
    position: fixed;
    pointer-events: none;
    z-index: 9999;
    transition: transform 0.15s ease, opacity 0.15s ease;
    opacity: 0;
  `;
  document.body.appendChild(cursor);

  document.addEventListener('mousemove', (e) => {
    cursor.style.left = e.clientX - 10 + 'px';
    cursor.style.top = e.clientY - 10 + 'px';
    cursor.style.opacity = '1';
  });

  // Grossit le curseur sur les liens
  const interactiveElements = document.querySelectorAll('a, button');
  interactiveElements.forEach(el => {
    el.addEventListener('mouseenter', () => {
      cursor.style.transform = 'scale(2)';
      cursor.style.borderColor = '#a8d8ea';
    });

    el.addEventListener('mouseleave', () => {
      cursor.style.transform = 'scale(1)';
      cursor.style.borderColor = '#5dade2';
    });
  });
}

// ========================================
// 9. ANIMATIONS CSS KEYFRAMES
// ========================================

const style = document.createElement('style');
style.textContent = `
  @keyframes slideIn {
    from {
      transform: translateX(100%);
      opacity: 0;
    }
    to {
      transform: translateX(0);
      opacity: 1;
    }
  }
  
  @keyframes slideOut {
    from {
      transform: translateX(0);
      opacity: 1;
    }
    to {
      transform: translateX(100%);
      opacity: 0;
    }
  }
  
  nav a.active {
    color: white;
  }
  
  nav a.active::after {
    width: 100%;
  }
`;
document.head.appendChild(style);

// ========================================
// 10. PERFORMANCE - SMOOTH SCROLL NATIF
// ========================================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
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

// ========================================
// 11. MODAL CV
// ========================================

const cvModal = document.getElementById('cv-modal');
const cvLink = document.querySelector('.social-sidebar a[href*="CV PAUL.png"]:not([href^="mailto"])');
const modalClose = document.querySelector('.modal-close');
const modalOverlay = document.querySelector('.modal-overlay');

// Ouvrir la modal au clic sur l'icône CV
if (cvLink) {
  cvLink.addEventListener('click', (e) => {
    e.preventDefault();
    cvModal.classList.add('active');
    document.body.style.overflow = 'hidden'; // Empêche le scroll
  });
}

// Fermer la modal au clic sur le bouton X
if (modalClose) {
  modalClose.addEventListener('click', () => {
    cvModal.classList.remove('active');
    document.body.style.overflow = ''; // Réactive le scroll
  });
}

// Fermer la modal au clic sur l'overlay (fond)
if (modalOverlay) {
  modalOverlay.addEventListener('click', () => {
    cvModal.classList.remove('active');
    document.body.style.overflow = '';
  });
}

// Fermer la modal avec la touche Échap
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && cvModal.classList.contains('active')) {
    cvModal.classList.remove('active');
    document.body.style.overflow = '';
  }
});

// ========================================
// 12. MODAL VIDÉO DÉMO
// ========================================

const demoModal = document.getElementById('demo-modal');
const demoBtn = document.querySelector('.demo-btn');
const demoVideo = document.getElementById('demo-video');

// Ouvrir la modal vidéo au clic sur le bouton démo
if (demoBtn) {
  demoBtn.addEventListener('click', () => {
    demoModal.classList.add('active');
    document.body.style.overflow = 'hidden';
  });
}

// Fonction pour fermer la modal vidéo et arrêter la vidéo
function closeDemoModal() {
  demoModal.classList.remove('active');
  document.body.style.overflow = '';
  if (demoVideo) {
    demoVideo.pause();
    demoVideo.currentTime = 0;
  }
}

// Fermer la modal vidéo - boutons de fermeture
const demoModalCloses = demoModal.querySelectorAll('.modal-close, .modal-overlay');
demoModalCloses.forEach(element => {
  element.addEventListener('click', closeDemoModal);
});

// Fermer la modal vidéo avec Échap
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && demoModal.classList.contains('active')) {
    closeDemoModal();
  }
});

console.log('🚀 Portfolio chargé avec succès !');