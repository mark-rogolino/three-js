import './style.css'
import * as THREE from 'three'
import gsap from 'gsap'
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls'
import * as dat from 'dat.gui'

const gui = new dat.GUI();

const textureLoader = new THREE.TextureLoader()
const doorColorTexture = textureLoader.load("textures/door/color.jpg")
const doorAlphaTexture = textureLoader.load("textures/door/alpha.jpg")
const doorAmbientOcclusionTexture = textureLoader.load("textures/door/ambientOcclusion.jpg")
const doorHeightTexture = textureLoader.load("textures/door/height.jpg")
const doorNormalTexture = textureLoader.load("textures/door/normal.jpg")
const doorMetalnessTexture = textureLoader.load("textures/door/metalness.jpg")
const doorRoughnessTexture = textureLoader.load("textures/door/roughness.jpg")
const matcapTexture = textureLoader.load("textures/matcaps/3.png")
const gradientTexture = textureLoader.load("textures/gradients/3.jpg")
gradientTexture.magFilter = THREE.NearestFilter


const cubeTextureLoader = new THREE.CubeTextureLoader()
const environmentMapTexture = cubeTextureLoader.load([
    'textures/environmentMaps/0/px.jpg',
    'textures/environmentMaps/0/nx.jpg',
    'textures/environmentMaps/0/py.jpg',
    'textures/environmentMaps/0/ny.jpg',
    'textures/environmentMaps/0/pz.jpg',
    'textures/environmentMaps/0/nz.jpg',
])


const canvas = document.querySelector('.webgl')

const scene = new THREE.Scene(); 

const geometry = new THREE.BoxGeometry(1, 1, 1, 2, 2, 2)
const material = new THREE.MeshStandardMaterial({
    // color: 0xff0000
    metalness: 0.7,
    roughness: 0.2,
    envMap: environmentMapTexture,
    // map: doorColorTexture,
    // aoMap: doorAmbientOcclusionTexture,
    // transparent: true,
    // displacementMap: doorHeightTexture,
    // displacementScale: 0.05,
    // roughnessMap: doorRoughnessTexture,
    // normalMap: doorNormalTexture,
    // alphaMap: doorAlphaTexture,

    // side: THREE.BackSide
    
    // matcap: matcapTexture

    // wireframe: true
    // shininess: 100,
    // specular: 'red'
    // gradientMap: gradientTexture
})

const ambientLight = new THREE.AmbientLight(0xffffff, 0.5)
scene.add(ambientLight)

const pointLight = new THREE.PointLight(0xffffff, 0.5)
pointLight.position.set(2, 3, 4)
scene.add(pointLight)


const sphere = new THREE.Mesh(new THREE.SphereBufferGeometry(0.5, 16, 16,), material);
sphere.position.x = -1.5
const plane = new THREE.Mesh(new THREE.PlaneBufferGeometry(1, 1, 50, 50), material)
plane.geometry.setAttribute('uv2', new THREE.BufferAttribute(plane.geometry.attributes.uv.array, 2))
const torus = new THREE.Mesh(new THREE.TorusBufferGeometry(0.5, 0.2, 16, 32), material)
torus.position.x = 1.5

scene.add(sphere)
scene.add(plane)
scene.add(torus)

const parameters = {
    color: 0xff0000,
    spin: () => {
        gsap.to(mesh.rotation, {duration:1, y: mesh.rotation.y + 10})
    }
}

gui.addColor(parameters, 'color').onChange((c) => material.color.set(c))
gui.add(parameters, 'spin')

// gui.add(mesh.position, 'y', -3, 3, 0.01);
// gui.add(mesh, 'visible');
// gui.add(material, 'wireframe');


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