import './style.css'
import * as THREE from 'three'
import gsap from 'gsap'
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls'
import * as dat from 'dat.gui'
import { TextBufferGeometry } from 'three'

const gui = new dat.GUI();


const loader = new THREE.TextureLoader()
const matcapTexture = loader.load('textures/matcaps/1.png')

const canvas = document.querySelector('.webgl')

const scene = new THREE.Scene(); 

const ambientLight = new THREE.AmbientLight(0xffffff, 0.5)
scene.add(ambientLight)

// const directionalLight = new THREE.DirectionalLight(0xff00ff, 0.5);
// directionalLight.position.set(1, 0.25, 0)
// scene.add(directionalLight)
// const directionalLightHelper = new THREE.DirectionalLightHelper(directionalLight)
// scene.add(directionalLightHelper)


// const hemisphereLight = new THREE.HemisphereLight( 0xff0000, 0x080820, 0.5 );
// scene.add( hemisphereLight );

// const light = new THREE.PointLight( 0xff0000, 1, 100 );
// light.position.set( 5, 5, 5 );
// scene.add( light );

const rectLight = new THREE.RectAreaLight( 0xffffff, 0.5,  1, 1 );
scene.add( rectLight )

const material = new THREE.MeshStandardMaterial();
material.roughness = 0.4;
material.side = THREE.DoubleSide

const plane = new THREE.Mesh(new THREE.PlaneGeometry(10, 10), material)
scene.add(plane)
plane.position.y = -1
plane.rotation.x = Math.PI / 2;


const sphere = new THREE.Mesh(new THREE.SphereGeometry(0.6, 16, 16), material)
scene.add(sphere)
sphere.position.x = -1.5

const cube = new THREE.Mesh(new THREE.BoxGeometry(1, 1), material)
scene.add(cube)

const torus = new THREE.Mesh(new THREE.TorusGeometry(0.5, 0.3, 8, 32), material)
scene.add(torus)
torus.position.x = 1.5






const parameters = {
    color: 0xff0000,
    spin: () => {
        gsap.to(mesh.rotation, {duration:1, y: mesh.rotation.y + 10})
    }
}

gui.addColor(parameters, 'color').onChange((c) => material.color.set(c))
gui.add(parameters, 'spin')

const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

// Resize Event
window.addEventListener('resize', () => {
    console.log('resized')
    sizes.width = window.innerWidth;
    sizes.height = window.innerHeight;

    
    camera.aspect = sizes.width / sizes.height;
    camera.updateProjectionMatrix();

    renderer.setSize(sizes.width, sizes.height);
})

window.addEventListener('dblclick', () => {
    if(!document.fullscreenElement) {
        // console.log('go fullscreen')
        canvas.requestFullscreen();
    } else {
        // console.log('go normal screen')
        document.exitFullscreen();
    }
})

const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height)
camera.position.z = 3;

const controls = new OrbitControls(camera, canvas);

scene.add(camera)

const renderer = new THREE.WebGLRenderer({
    canvas
})


renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(window.devicePixelRatio)

renderer.render(scene, camera)

// gsap.to(mesh.position, {duration: 1, delay: 1,  x: 2})
// console.log(gsap)


// Date.time
// const clock = new THREE.Clock();

// const cursor = {
//     x: 0,
//     y: 0
// }
// window.addEventListener('mousemove', (event) => {
//     cursor.x = event.clientX / sizes.width - 0.5
//     cursor.y = -(event.clientY / sizes.height - 0.5)
// });

const tick = () => {
    
    // console.log();
    // var time = clock.getElapsedTime();

    // Update objects
    // mesh.rotation.y = time;
    

    // Update camera
    // camera.position.x = cursor.x;
    // camera.position.y = cursor.y;


    renderer.render(scene, camera)
    window.requestAnimationFrame(tick);
}

tick();