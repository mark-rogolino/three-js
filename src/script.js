import './style.css'
import * as THREE from 'three'
// import gsap from 'gsap'
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls'


const canvas = document.querySelector('.webgl')

const scene = new THREE.Scene();

const geometry = new THREE.BoxGeometry(1, 1, 1)
const material = new THREE.MeshBasicMaterial({color: 0xff0000})

const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh)

const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}


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