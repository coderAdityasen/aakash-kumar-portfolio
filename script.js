document.addEventListener('DOMContentLoaded', () => {

    /* ========================================================
       1. THREE.JS 3D BACKGROUND LOGIC (Scroll-Reactive)
       ======================================================== */
    const canvas = document.querySelector('#bg-3d');
    
    // Scene setup
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x030712, 0.02); // Deep dark blue fog to hide the background edges

    // Camera setup
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 100);
    camera.position.z = 10;
    camera.position.y = 0;

    // Renderer setup
    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // Create 3D Blocks Array
    const blocks = [];
    const geometry = new THREE.BoxGeometry(1, 1, 1);
    
    // Material 1: Dark metallic
    const materialSolid = new THREE.MeshStandardMaterial({
        color: 0x0f172a,
        roughness: 0.2,
        metalness: 0.8,
    });
    
    // Material 2: Glowing cyan wireframe
    const materialWire = new THREE.MeshBasicMaterial({
        color: 0x00f0ff,
        wireframe: true,
        transparent: true,
        opacity: 0.3
    });

    // Generate Blocks spread out in a massive 3D tunnel volume
    for(let i = 0; i < 250; i++) {
        // Mix of solid and wireframe blocks
        const useWireframe = Math.random() > 0.8;
        const mesh = new THREE.Mesh(geometry, useWireframe ? materialWire : materialSolid);
        
        // Spread them wide and deep (X, Y, Z)
        mesh.position.set(
            (Math.random() - 0.5) * 40,      // X spread
            (Math.random() - 0.5) * 60 - 10, // Y spread (tilted downwards)
            (Math.random() - 0.5) * 60 - 10  // Z spread (depth)
        );
        
        // Random rotations and scales
        mesh.rotation.set(Math.random() * Math.PI, Math.random() * Math.PI, Math.random() * Math.PI);
        const scale = Math.random() * 2 + 0.5;
        mesh.scale.set(scale, scale, scale);
        
        scene.add(mesh);
        blocks.push({
            mesh: mesh,
            rotSpeedX: (Math.random() - 0.5) * 0.01,
            rotSpeedY: (Math.random() - 0.5) * 0.01,
        });
    }

    // Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.3);
    scene.add(ambientLight);

    const pointLight1 = new THREE.PointLight(0x00f0ff, 3, 50); // Cyan
    pointLight1.position.set(5, 5, 5);
    scene.add(pointLight1);

    const pointLight2 = new THREE.PointLight(0x7000ff, 3, 50); // Purple
    pointLight2.position.set(-5, -5, -5);
    scene.add(pointLight2);

    // Mouse Tracking for Parallax
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;
    const windowHalfX = window.innerWidth / 2;
    const windowHalfY = window.innerHeight / 2;

    document.addEventListener('mousemove', (event) => {
        mouseX = (event.clientX - windowHalfX);
        mouseY = (event.clientY - windowHalfY);
    });

    // Scroll Tracking
    let scrollY = window.scrollY;
    window.addEventListener('scroll', () => {
        scrollY = window.scrollY;
    });

    // Resize Handler
    window.addEventListener('resize', () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    });

    // Animation Loop for 3D Scene
    const clock = new THREE.Clock();

    function animate3D() {
        const elapsedTime = clock.getElapsedTime();

        // Rotate individual blocks slowly
        blocks.forEach((block) => {
            block.mesh.rotation.x += block.rotSpeedX;
            block.mesh.rotation.y += block.rotSpeedY;
        });

        // 1. Move camera based on SCROLL (Fly through space)
        // Adjust the multiplier (0.01) to make the fly-through faster or slower
        camera.position.z = 10 - (scrollY * 0.015);
        camera.position.y = -(scrollY * 0.005);

        // 2. Add subtle Mouse Parallax to the camera
        targetX = mouseX * 0.002;
        targetY = mouseY * 0.002;
        camera.rotation.y += 0.05 * (targetX - camera.rotation.y);
        camera.rotation.x += 0.05 * (targetY - camera.rotation.x);

        // Move lights around dynamically
        pointLight1.position.x = Math.sin(elapsedTime * 0.5) * 10;
        pointLight1.position.z = Math.cos(elapsedTime * 0.5) * 10;
        
        pointLight2.position.x = Math.cos(elapsedTime * 0.3) * 15;
        pointLight2.position.y = Math.sin(elapsedTime * 0.3) * 10;

        renderer.render(scene, camera);
        window.requestAnimationFrame(animate3D);
    }
    animate3D();


    /* ========================================================
       2. CUSTOM CURSOR & UI LOGIC
       ======================================================== */
    const cursor = document.querySelector('.cursor');
    const follower = document.querySelector('.cursor-follower');
    const glow = document.querySelector('.mouse-glow');
    
    gsap.set(cursor, { x: -100, y: -100 });
    gsap.set(follower, { x: -100, y: -100 });

    document.addEventListener('mousemove', (e) => {
        gsap.to(cursor, { x: e.clientX - 4, y: e.clientY - 4, duration: 0.1, ease: "power2.out" });
        gsap.to(follower, { x: e.clientX - 20, y: e.clientY - 20, duration: 0.5, ease: "power3.out" });
        gsap.to(glow, { x: e.clientX, y: e.clientY, duration: 1.5, ease: "power2.out" });
    });

    const hoverElements = document.querySelectorAll('a, .btn, .skill-tags span, .project-card');
    hoverElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            gsap.to(follower, { scale: 1.8, backgroundColor: 'rgba(0, 240, 255, 0.1)', borderColor: 'rgba(0, 240, 255, 0.8)', duration: 0.3 });
            gsap.to(cursor, { scale: 0, duration: 0.3 });
        });
        el.addEventListener('mouseleave', () => {
            gsap.to(follower, { scale: 1, backgroundColor: 'transparent', borderColor: 'rgba(0, 240, 255, 0.5)', duration: 0.3 });
            gsap.to(cursor, { scale: 1, duration: 0.3 });
        });
    });

    /* ========================================================
       3. MAGNETIC BUTTONS EFFECT
       ======================================================== */
    const magneticElements = document.querySelectorAll('.magnetic');
    magneticElements.forEach(elem => {
        elem.addEventListener('mousemove', (e) => {
            const rect = elem.getBoundingClientRect();
            const strength = elem.dataset.strength || 20;
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            
            gsap.to(elem, { x: x / rect.width * strength, y: y / rect.height * strength, duration: 1, ease: "power3.out" });
        });

        elem.addEventListener('mouseleave', () => {
            gsap.to(elem, { x: 0, y: 0, duration: 1, ease: "elastic.out(1, 0.3)" });
        });
    });


    /* ========================================================
       4. TYPED.JS
       ======================================================== */
    new Typed('.typed-text', {
        strings: ['Full-Stack Web Developer', 'MERN Stack Specialist', 'Problem Solver'],
        typeSpeed: 50,
        backSpeed: 30,
        backDelay: 2000,
        loop: true,
        showCursor: false 
    });


    /* ========================================================
       5. GSAP SCROLL REVEAL ANIMATIONS
       ======================================================== */
    gsap.registerPlugin(ScrollTrigger);

    // Hero Timeline
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
            scrollTrigger: { trigger: title, start: "top 85%", toggleActions: "play none none reverse" },
            y: 40, opacity: 0, duration: 0.8, ease: "power3.out"
        });
    });

    // Glass Card Reveals
    gsap.from(".about-text", {
        scrollTrigger: { trigger: "#about", start: "top 75%" },
        y: 60, opacity: 0, scale: 0.95, duration: 1, ease: "power4.out"
    });

    gsap.from(".skill-category", {
        scrollTrigger: { trigger: "#skills", start: "top 75%" },
        y: 80, opacity: 0, rotationX: -15, duration: 1, stagger: 0.2, ease: "back.out(1.5)"
    });

    gsap.from(".project-card", {
        scrollTrigger: { trigger: "#projects", start: "top 75%" },
        y: 100, opacity: 0, duration: 1, stagger: 0.2, ease: "power4.out"
    });

});