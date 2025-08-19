window.onload = function() {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({
        canvas: document.getElementById('three-canvas'),
        alpha: true
    });
    renderer.setSize(window.innerWidth, window.innerHeight);

    const ambientLight = new THREE.AmbientLight(0x00bcd4, 0.1);
    scene.add(ambientLight);

    const pointLight = new THREE.PointLight(0x00bcd4, 0.5);
    pointLight.position.set(10, 10, 10);
    scene.add(pointLight);

    const geometries = [
        new THREE.SphereGeometry(1, 16, 16),
        new THREE.BoxGeometry(1, 1, 1),
        new THREE.TorusGeometry(0.7, 0.3, 16, 50),
        new THREE.IcosahedronGeometry(1, 0)
    ];

    const material = new THREE.MeshStandardMaterial({
        color: 0x0d0d1a,
        emissive: 0x00bcd4,
        emissiveIntensity: 0.5,
        metalness: 0.9,
        roughness: 0.1
    });
    
    const shapes = [];
    for (let i = 0; i < 20; i++) {
        const geometry = geometries[Math.floor(Math.random() * geometries.length)];
        const shape = new THREE.Mesh(geometry, material);
        
        shape.position.set(
            (Math.random() - 0.5) * 50,
            (Math.random() - 0.5) * 50,
            (Math.random() - 0.5) * 50
        );
        
        shape.rotation.set(
            Math.random() * Math.PI,
            Math.random() * Math.PI,
            Math.random() * Math.PI
        );

        shapes.push(shape);
        scene.add(shape);
    }

    camera.position.z = 5;

    const animate = function() {
        requestAnimationFrame(animate);

        shapes.forEach(shape => {
            shape.rotation.x += 0.005;
            shape.rotation.y += 0.005;
        });

        camera.position.x = Math.sin(Date.now() * 0.0001) * 3;
        camera.position.y = Math.cos(Date.now() * 0.0001) * 3;
        camera.lookAt(scene.position);

        renderer.render(scene, camera);
    };

    window.addEventListener('resize', () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    });

    animate();
};
