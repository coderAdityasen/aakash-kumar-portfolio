// 1. Typed.js Initialization (Typing Effect in Hero Section)
document.addEventListener('DOMContentLoaded', function() {
    new Typed('.typed-text', {
        strings: [
            'Full-Stack Web Developer [cite: 2]', 
            'MERN Stack Specialist [cite: 5]', 
            'Problem Solver [cite: 7]'
        ],
        typeSpeed: 50,
        backSpeed: 30,
        backDelay: 2000,
        loop: true
    });
});

// 2. Particles.js Initialization (Interactive Background)
particlesJS("particles-js", {
    "particles": {
        "number": {
            "value": 80,
            "density": { "enable": true, "value_area": 800 }
        },
        "color": { "value": "#38bdf8" },
        "shape": { "type": "circle" },
        "opacity": {
            "value": 0.5,
            "random": false
        },
        "size": {
            "value": 3,
            "random": true
        },
        "line_linked": {
            "enable": true,
            "distance": 150,
            "color": "#38bdf8",
            "opacity": 0.2,
            "width": 1
        },
        "move": {
            "enable": true,
            "speed": 2,
            "direction": "none",
            "random": false,
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
        },
        "modes": {
            "grab": { "distance": 140, "line_linked": { "opacity": 1 } },
            "push": { "particles_nb": 4 }
        }
    },
    "retina_detect": true
});

// 3. GSAP & ScrollTrigger Animations (Scroll Reveal Effects)
gsap.registerPlugin(ScrollTrigger);

// Animate Sections fading up
gsap.utils.toArray('.section').forEach(section => {
    gsap.from(section, {
        scrollTrigger: {
            trigger: section,
            start: "top 80%", // triggers when the top of the section hits 80% of the viewport height
            toggleActions: "play none none reverse"
        },
        y: 50,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out"
    });
});

// Staggered Animation for Skills
gsap.from(".skill-category", {
    scrollTrigger: {
        trigger: "#skills",
        start: "top 75%"
    },
    y: 30,
    opacity: 0,
    duration: 0.6,
    stagger: 0.2,
    ease: "power2.out"
});

// Staggered Animation for Projects
gsap.from(".project-card", {
    scrollTrigger: {
        trigger: "#projects",
        start: "top 75%"
    },
    y: 50,
    opacity: 0,
    duration: 0.6,
    stagger: 0.2,
    ease: "back.out(1.7)"
});