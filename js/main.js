import * as THREE from "https://cdn.skypack.dev/three@0.129.0/build/three.module.js";
import { OrbitControls } from "https://cdn.skypack.dev/three@0.129.0/examples/jsm/controls/OrbitControls.js";
import { GLTFLoader } from "https://cdn.skypack.dev/three@0.129.0/examples/jsm/loaders/GLTFLoader.js";

// Scene setup
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(0, 2, 10); // Move camera closer and a bit higher

// Get container
const container3D1 = document.getElementById("container3D1");

// Ensure container exists
if (!container3D1) {
    console.error("Container #container3D1 not found.");
}

// Create renderer
const renderer = new THREE.WebGLRenderer({ alpha: true });
container3D1.appendChild(renderer.domElement);

// Function to update renderer size
function updateRendererSize() {
    const width = container3D1.clientWidth;
    const height = container3D1.clientHeight;

    if (width > 0 && height > 0) {
        renderer.setSize(width, height);
        camera.aspect = width / height;
        camera.updateProjectionMatrix();
    }
}

// Ensure container is visible before setting size
const checkContainerVisibility = () => {
    if (container3D1.clientWidth === 0 || container3D1.clientHeight === 0) {
        setTimeout(checkContainerVisibility, 100);
        return;
    }
    updateRendererSize();
    renderer.render(scene, camera);
};
checkContainerVisibility();

// Lights
const topLight = new THREE.DirectionalLight(0xffffff, 1);
topLight.position.set(500, 500, 500);
scene.add(topLight);

const ambientLight = new THREE.AmbientLight(0x333333, 5);
scene.add(ambientLight);

// Load 3D Model
const loader = new GLTFLoader();
let object;
loader.load(
    'models/3js/scene.gltf',
    function (gltf) {
        object = gltf.scene;

        // Scale the drone up
        object.scale.set(0.3, 0.3, 0.3);  // Increase size (adjustable)

        // Adjust position if needed
        object.position.set(0, 2, 0); // Move it up

        scene.add(object);
    },
    undefined,
    function (error) {
        console.error("Error loading model:", error);
    }
);

// Orbit Controls
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableZoom = false;

// Raycasting for mouse interaction
const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();

// Mouse move event listener
window.addEventListener('mousemove', (event) => {
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = - (event.clientY / window.innerHeight) * 2 + 1;

    if (object) {
        raycaster.setFromCamera(mouse, camera);
        const intersects = raycaster.intersectObject(object, true);

        if (intersects.length > 0) {
            object.rotation.y += 0.05;
        }
    }
});

// Handle window resize
window.addEventListener("resize", updateRendererSize);

// Animation loop
function animate() {
    requestAnimationFrame(animate);
    controls.update();
    renderer.render(scene, camera);
}
animate();
