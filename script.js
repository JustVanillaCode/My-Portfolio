// Setup Three.js scene for background
const bgd = document.getElementById('bgd');
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 3;
const renderer = new THREE.WebGLRenderer({ canvas: bgd, antialias: true, alpha: true });

renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.setClearColor(0x000000, 1);

const geometry = new THREE.TorusKnotGeometry(1, 0.3, 150, 20);
const material = new THREE.MeshBasicMaterial({
  color: 0xffffff,
  wireframe: true,
  opacity: 0.04,
  transparent: true,
});
const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

function animate() {
  requestAnimationFrame(animate);
  mesh.rotation.x += 0.005;
  mesh.rotation.y += 0.007;
  renderer.render(scene, camera);
}
animate();

window.addEventListener('resize', () => {
  const width = window.innerWidth;
  const height = window.innerHeight;
  renderer.setSize(width, height);
  camera.aspect = width / height;
  camera.updateProjectionMatrix();
});

// GSAP Animations
gsap.registerPlugin(ScrollTrigger);

const fadeEls = document.querySelectorAll('.fade-up');
fadeEls.forEach(el => {
  gsap.fromTo(el, {opacity: 0, y: 60}, {
    opacity: 1,
    y: 0,
    duration: 1,
    ease: 'power3.out',
    scrollTrigger: {
      trigger: el,
      start: 'top 80%',
      toggleActions: 'play none none none',
    }
  });
});

// Button Interaction
document.querySelectorAll('.btn, .btn-primary, .btn-secondary, .btn-sm, .btn-lg').forEach(button => {
  button.addEventListener('mouseenter', e => {
    gsap.to(button, {
      scale: 1.05,
      y: -4,
      duration: 0.3,
      ease: 'power2.out'
    });
    const wave = button.querySelector('.btn-wave, .button-wave');
    if (wave) {
      gsap.fromTo(wave, {width: 0, height: 0, opacity: 1}, {width: 250, height: 250, opacity: 0, duration: 0.7, ease: 'power2.out'});
    }
  });
  button.addEventListener('mouseleave', () => {
    gsap.to(button, {
      scale: 1,
      y: 0,
      duration: 0.3,
      ease: 'power2.out'
    });
  });
  button.addEventListener('mousedown', () => {
    gsap.to(button, {
      scale: 0.9,
      y: 0,
      duration: 0.1,
      ease: 'power1.inOut'
    });
  });
  button.addEventListener('mouseup', () => {
    gsap.to(button, {
      scale: 1.05,
      y: -4,
      duration: 0.3,
      ease: 'power2.out'
    });
  });
});

// Form Submission
const form = document.querySelector('.contact-form');
form.addEventListener('submit', e => {
  e.preventDefault();
  const btn = form.querySelector('.btn');
  const textEl = btn.querySelector('span');
  const originalText = textEl.textContent;

  gsap.to(btn, {scale: 0.9, duration: 0.1, yoyo: true, repeat: 1, ease: 'power1.inOut', onComplete: () => {
    textEl.textContent = 'Sent!';
    btn.style.background = '#34c759';
    setTimeout(() => {
      textEl.textContent = originalText;
      btn.style.background = '';
      form.reset();
    }, 2000);
  }});
});

// Smooth Scroll Nav
document.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();
    const target = document.querySelector(link.getAttribute('href'));
    gsap.to(window, {
      scrollTo: {y: target, offsetY: 80},
      duration: 1.5,
      ease: 'power2.inOut',
    });
  });
});

// Navbar Scroll Effect
const navbar = document.querySelector('.topbar');
window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    gsap.to(navbar, {background: 'rgba(0,0,0,0.95)', duration: 0.3});
  } else {
    gsap.to(navbar, {background: 'rgba(0,0,0,0.65)', duration: 0.3});
  }
});
// Hero scroll animation
gsap.to('.hero-content', {
  scale: 0.8,
  opacity: 0.3,
  duration: 1,
  ease: 'power1.out',
  scrollTrigger: {
    trigger: '.hero',
    start: 'top top',
    end: 'bottom top',
    scrub: true
  }
});

// Hero title parallax
gsap.to('.hero-title', {
  y: -100,
  duration: 1,
  ease: 'power1.out',
  scrollTrigger: {
    trigger: '.hero',
    start: 'top top',
    end: 'bottom top',
    scrub: true
  }
});
