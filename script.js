// 1. Initialize Lenis Smooth Scroll
const lenis = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    direction: 'vertical',
    gestureDirection: 'vertical',
    smooth: true,
    mouseMultiplier: 1,
    smoothTouch: false,
    touchMultiplier: 2,
    infinite: false,
});

function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
}

requestAnimationFrame(raf);

// 2. Custom Cursor Logic
const cursorDot = document.querySelector('.cursor-dot');
const cursorFollower = document.querySelector('.cursor-follower');

window.addEventListener('mousemove', (e) => {
    const { clientX: x, clientY: y } = e;
    
    // Update dot immediately
    gsap.to(cursorDot, {
        x: x,
        y: y,
        duration: 0.1
    });

    // Update follower with delay
    gsap.to(cursorFollower, {
        x: x,
        y: y,
        duration: 0.3
    });

    // 3. Spotlight Background Effect
    document.body.style.setProperty('--x', x + 'px');
    document.body.style.setProperty('--y', y + 'px');
});

// Cursor hover effects
const interactiveElements = document.querySelectorAll('a, .btn, .project-card, .skill-tags span');
interactiveElements.forEach(el => {
    el.addEventListener('mouseenter', () => {
        cursorFollower.style.transform = 'translate(-50%, -50%) scale(1.5)';
        cursorFollower.style.background = 'rgba(0, 242, 255, 0.1)';
        cursorDot.style.transform = 'translate(-50%, -50%) scale(0.5)';
    });
    el.addEventListener('mouseleave', () => {
        cursorFollower.style.transform = 'translate(-50%, -50%) scale(1)';
        cursorFollower.style.background = 'transparent';
        cursorDot.style.transform = 'translate(-50%, -50%) scale(1)';
    });
});

// 4. Typed.js Initialization
document.addEventListener('DOMContentLoaded', function() {
    new Typed('.typed-text', {
        strings: [
            'Full-Stack Developer', 
            'MERN Stack Expert', 
            'UI/UX Enthusiast',
            'Creative Coder'
        ],
        typeSpeed: 60,
        backSpeed: 40,
        backDelay: 2000,
        loop: true
    });
});

// 5. Particles.js Configuration (Cyberpunk Palette)
particlesJS("particles-js", {
    "particles": {
        "number": { "value": 100, "density": { "enable": true, "value_area": 800 } },
        "color": { "value": ["#00f2ff", "#ff00e5", "#7000ff"] },
        "shape": { "type": "circle" },
        "opacity": { "value": 0.5, "random": true },
        "size": { "value": 2, "random": true },
        "line_linked": {
            "enable": true,
            "distance": 150,
            "color": "#00f2ff",
            "opacity": 0.2,
            "width": 1
        },
        "move": {
            "enable": true,
            "speed": 1.5,
            "direction": "none",
            "random": true,
            "straight": false,
            "out_mode": "out",
            "bounce": false
        }
    },
    "interactivity": {
        "detect_on": "canvas",
        "events": {
            "onhover": { "enable": true, "mode": "grab" },
            "onclick": { "enable": true, "mode": "push" },
            "resize": true
        }
    },
    "retina_detect": true
});

// 6. GSAP ScrollTrigger Animations
gsap.registerPlugin(ScrollTrigger);

// Reveal sections on scroll
const sections = document.querySelectorAll('.section');
sections.forEach(section => {
    const title = section.querySelector('.section-title');
    
    gsap.from(section, {
        scrollTrigger: {
            trigger: section,
            start: "top 80%",
            toggleActions: "play none none reverse"
        },
        opacity: 0,
        y: 100,
        filter: "blur(10px)",
        duration: 1,
        ease: "power4.out"
    });

    if (title) {
        gsap.from(title, {
            scrollTrigger: {
                trigger: title,
                start: "top 90%"
            },
            scale: 0.8,
            opacity: 0,
            duration: 0.8,
            ease: "back.out(1.7)"
        });
    }
});

// Staggered Skills
gsap.from(".skill-category", {
    scrollTrigger: {
        trigger: "#skills",
        start: "top 70%"
    },
    x: -50,
    opacity: 0,
    stagger: 0.2,
    duration: 0.8,
    ease: "power2.out"
});

// Staggered Projects with 3D Tilt Hover
const projectCards = document.querySelectorAll('.project-card');
gsap.from(projectCards, {
    scrollTrigger: {
        trigger: "#projects",
        start: "top 70%"
    },
    y: 60,
    opacity: 0,
    stagger: 0.2,
    duration: 0.8,
    ease: "power3.out"
});

// 7. 3D Tilt Effect for Project Cards
projectCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = (y - centerY) / 10;
        const rotateY = (centerX - x) / 10;
        
        gsap.to(card, {
            rotateX: rotateX,
            rotateY: rotateY,
            duration: 0.5,
            ease: "power2.out"
        });
    });
    
    card.addEventListener('mouseleave', () => {
        gsap.to(card, {
            rotateX: 0,
            rotateY: 0,
            duration: 0.5,
            ease: "power2.out"
        });
    });
});

// 8. Magnetic Buttons
const magneticBtns = document.querySelectorAll('.btn');
magneticBtns.forEach(btn => {
    btn.addEventListener('mousemove', (e) => {
        const rect = btn.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        
        gsap.to(btn, {
            x: x * 0.3,
            y: y * 0.3,
            duration: 0.3,
            ease: "power2.out"
        });
    });
    
    btn.addEventListener('mouseleave', () => {
        gsap.to(btn, {
            x: 0,
            y: 0,
            duration: 0.5,
            ease: "elastic.out(1, 0.3)"
        });
    });
});
