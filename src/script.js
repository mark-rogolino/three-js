import './style.css'
import * as THREE from 'three'
import gsap from 'gsap'
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls'
import * as dat from 'dat.gui'
import { TextBufferGeometry } from 'three'

const gui = new dat.GUI();


const fontLoader = new THREE.FontLoader();

const font = fontLoader.load(
    'fonts/helvetiker_regular.typeface.json',
    function(font) {
        // console.log(font)
        const textGeometry = new THREE.TextBufferGeometry(
            'Hello Three.js',
            {
                font: font,
                size: 0.5,
                height: 0.2,
                curveSegments: 12,
                bevelEnabled : true,
                bevelThickness: 0.03,
                bevelSize: 0.02,
                bevelOffset: 0,
                bevelSegments: 4
            }
        )
        // material.wireframe = true;
        const textMesh = new THREE.Mesh(textGeometry, material);

        textGeometry.center();
        scene.add(textMesh)
    }
)

const loader = new THREE.TextureLoader()
const matcapTexture = loader.load('textures/matcaps/1.png')

const canvas = document.querySelector('.webgl')

const scene = new THREE.Scene(); 

// const axesHelper = new THREE.AxesHelper()
// scene.add(axesHelper)

const ambientLight = new THREE.AmbientLight(0xffffff, 0.5)
scene.add(ambientLight)

const pointLight = new THREE.PointLight(0xffffff, 0.5)
pointLight.position.set(2, 3, 4)
scene.add(pointLight)

const material = new THREE.MeshMatcapMaterial();
material.matcap = matcapTexture

const torus = new THREE.TorusGeometry(0.3, 0.2, 8, 32);
const torusMaterial = new THREE.MeshMatcapMaterial({matcap: matcapTexture})

for(let i = 0; i < 100; i++) {
    let torusMesh = new THREE.Mesh(torus, torusMaterial)
    torusMesh.position.x = (Math.random() - 0.5) * 10
    torusMesh.position.y = (Math.random() - 0.5) * 10
    torusMesh.position.z = (Math.random() - 0.5) * 10

    torusMesh.rotation.x = Math.random() * Math.PI;
    torusMesh.rotation.y = Math.random() * Math.PI;

    let scale = Math.random()
    torusMesh.scale.set(scale, scale, scale)

    scene.add(torusMesh)
    
}


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