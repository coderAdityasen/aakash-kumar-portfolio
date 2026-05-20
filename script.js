// Wait for DOM to load
document.addEventListener('DOMContentLoaded', () => {

    // 1. Custom Interactive Cursor & Background Glow
    const cursor = document.querySelector('.cursor');
    const follower = document.querySelector('.cursor-follower');
    const glow = document.querySelector('.mouse-glow');
    
    // Set initial positions off-screen to avoid jumping
    gsap.set(cursor, { x: -100, y: -100 });
    gsap.set(follower, { x: -100, y: -100 });

    document.addEventListener('mousemove', (e) => {
        // Move the tiny dot instantly
        gsap.to(cursor, { 
            x: e.clientX - 4, 
            y: e.clientY - 4, 
            duration: 0.1, 
            ease: "power2.out" 
        });
        
        // Move the follower ring with a slight delay
        gsap.to(follower, { 
            x: e.clientX - 20, 
            y: e.clientY - 20, 
            duration: 0.5, 
            ease: "power3.out" 
        });

        // Move the massive background ambient glow behind the site
        gsap.to(glow, {
            x: e.clientX,
            y: e.clientY,
            duration: 1.5,
            ease: "power2.out"
        });
    });

    // Cursor hover effects on links and buttons
    const hoverElements = document.querySelectorAll('a, .btn, .skill-tags span, .project-card');
    hoverElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            gsap.to(follower, { 
                scale: 1.8, 
                backgroundColor: 'rgba(0, 240, 255, 0.1)', 
                borderColor: 'rgba(0, 240, 255, 0.8)',
                duration: 0.3 
            });
            gsap.to(cursor, { scale: 0, duration: 0.3 });
        });
        
        el.addEventListener('mouseleave', () => {
            gsap.to(follower, { 
                scale: 1, 
                backgroundColor: 'transparent', 
                borderColor: 'rgba(0, 240, 255, 0.5)',
                duration: 0.3 
            });
            gsap.to(cursor, { scale: 1, duration: 0.3 });
        });
    });

    // 2. Magnetic Button Effect
    const magneticElements = document.querySelectorAll('.magnetic');
    magneticElements.forEach(elem => {
        elem.addEventListener('mousemove', (e) => {
            const rect = elem.getBoundingClientRect();
            const strength = elem.dataset.strength || 20;
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            
            gsap.to(elem, {
                x: x / rect.width * strength,
                y: y / rect.height * strength,
                duration: 1,
                ease: "power3.out"
            });
        });

        elem.addEventListener('mouseleave', () => {
            gsap.to(elem, {
                x: 0,
                y: 0,
                duration: 1,
                ease: "elastic.out(1, 0.3)"
            });
        });
    });


    // 3. Typed.js Initialization
    new Typed('.typed-text', {
        strings: [
            'Full-Stack Web Developer', 
            'MERN Stack Specialist', 
            'Problem Solver'
        ],
        typeSpeed: 50,
        backSpeed: 30,
        backDelay: 2000,
        loop: true,
        showCursor: false // using custom css cursor instead
    });


    // 4. Advanced Particles.js (Reactive to Cursor Movement)
    particlesJS("particles-js", {
        "particles": {
            "number": { "value": 70, "density": { "enable": true, "value_area": 900 } },
            "color": { "value": ["#00f0ff", "#7000ff"] },
            "shape": { "type": "circle" },
            "opacity": { 
                "value": 0.6, 
                "random": true,
                "anim": { "enable": true, "speed": 1, "opacity_min": 0.1, "sync": false }
            },
            "size": { 
                "value": 4, 
                "random": true,
                "anim": { "enable": true, "speed": 2, "size_min": 0.1, "sync": false }
            },
            "line_linked": {
                "enable": true,
                "distance": 150,
                "color": "#00f0ff",
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
                "bounce": false,
                "attract": { "enable": true, "rotateX": 600, "rotateY": 1200 }
            }
        },
        "interactivity": {
            "detect_on": "window",
            "events": {
                "onhover": { "enable": true, "mode": "grab" },
                "onclick": { "enable": true, "mode": "push" },
                "resize": true
            },
            "modes": {
                "grab": { "distance": 200, "line_linked": { "opacity": 0.6 } },
                "push": { "particles_nb": 3 }
            }
        },
        "retina_detect": true
    });


    // 5. GSAP Advanced Scroll Animations
    gsap.registerPlugin(ScrollTrigger);

    // Hero Section Load Animation
    const heroTl = gsap.timeline();
    heroTl.from(".logo", { y: -50, opacity: 0, duration: 0.8, ease: "back.out(1.7)" })
          .from(".nav-links li", { y: -50, opacity: 0, duration: 0.6, stagger: 0.1, ease: "back.out(1.7)" }, "-=0.6")
          .from(".hero-content h1", { y: 30, opacity: 0, duration: 0.8, ease: "power3.out" }, "-=0.2")
          .from(".hero-content h2", { y: 20, opacity: 0, duration: 0.8, ease: "power3.out" }, "-=0.6")
          .from(".hero-desc", { y: 20, opacity: 0, duration: 0.8, ease: "power3.out" }, "-=0.6")
          .from(".social-links a", { scale: 0, opacity: 0, duration: 0.5, stagger: 0.1, ease: "back.out(2)" }, "-=0.4")
          .from(".btn", { y: 20, opacity: 0, duration: 0.5 }, "-=0.2")
          .from(".scroll-indicator", { opacity: 0, duration: 1 }, "-=0.2");

    // Dynamic Section Titles
    gsap.utils.toArray('.section-title').forEach(title => {
        gsap.from(title, {
            scrollTrigger: {
                trigger: title,
                start: "top 85%",
                toggleActions: "play none none reverse"
            },
            y: 40,
            opacity: 0,
            duration: 0.8,
            ease: "power3.out"
        });
    });

    // About Section Glass Reveal
    gsap.from(".about-text", {
        scrollTrigger: {
            trigger: "#about",
            start: "top 75%",
        },
        y: 60,
        opacity: 0,
        scale: 0.95,
        duration: 1,
        ease: "power4.out"
    });

    // Skills Staggered 3D Reveal
    gsap.from(".skill-category", {
        scrollTrigger: {
            trigger: "#skills",
            start: "top 75%"
        },
        y: 80,
        opacity: 0,
        rotationX: -15, // Adds a cool folding effect
        duration: 1,
        stagger: 0.2,
        ease: "back.out(1.5)"
    });

    // Projects Staggered 3D Reveal
    gsap.from(".project-card", {
        scrollTrigger: {
            trigger: "#projects",
            start: "top 75%"
        },
        y: 100,
        opacity: 0,
        duration: 1,
        stagger: 0.2,
        ease: "power4.out"
    });

});