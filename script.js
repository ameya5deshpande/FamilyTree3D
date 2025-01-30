window.onload = function () {
console.log("Three.js is loaded:", typeof THREE !== "undefined");

const container = document.getElementById('canvas-container');

// Scene, Camera, Renderer
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
container.appendChild(renderer.domElement);

// Add OrbitControls for interactivity
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true; // Smooth rotation
controls.dampingFactor = 0.05;

// Add a light
const light = new THREE.PointLight(0xffffff, 1, 100);
light.position.set(10, 10, 10);
scene.add(light);

// Add family members (nodes) and connections (edges)
const nodes = [];
const edges = [];

// Example: Add nodes (family members)
function addNode(x, y, z, color = 0x00ff00) {
    const geometry = new THREE.SphereGeometry(0.5, 16, 16);
    const material = new THREE.MeshStandardMaterial({ color });
    const sphere = new THREE.Mesh(geometry, material);
    sphere.position.set(x, y, z);
    scene.add(sphere);
    nodes.push(sphere);
}

// Example: Add edges (connections)
function addEdge(start, end) {
    const geometry = new THREE.BufferGeometry().setFromPoints([start.position, end.position]);
    const material = new THREE.LineBasicMaterial({ color: 0xffffff });
    const line = new THREE.Line(geometry, material);
    scene.add(line);
    edges.push(line);
}

// Create example tree structure
const root = { x: 0, y: 0, z: 0 };
addNode(root.x, root.y, root.z, 0xff0000); // Root node

const child1 = { x: -2, y: -2, z: 0 };
const child2 = { x: 2, y: -2, z: 0 };

addNode(child1.x, child1.y, child1.z);
addNode(child2.x, child2.y, child2.z);

// Connect nodes
addEdge(nodes[0], nodes[1]);
addEdge(nodes[0], nodes[2]);

// Set camera position
camera.position.set(0, 0, 10);
controls.update();

// Animation loop
function animate() {
    requestAnimationFrame(animate);
    controls.update();
    renderer.render(scene, camera);
}

animate();
};
