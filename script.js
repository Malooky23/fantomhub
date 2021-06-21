import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import * as dat from 'dat.gui'
// import * as THREE from 'https://unpkg.com/three/build/three.module.js';


// Loader
const textureLoader = new THREE.TextureLoader()
const normalMap = textureLoader.load('/textures/peanutbutterNormal.jpg')

// Debug
const gui = new dat.GUI()

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

// Objects
const geometry = new THREE.TorusKnotBufferGeometry(5, 1.4, 500, 100);

// Materials

const material = new THREE.MeshStandardMaterial()
material.normalMap = normalMap;
material.color = new THREE.Color(0x808080)

// Mesh
const sphere = new THREE.Mesh(geometry,material)
sphere.position.z = -20
scene.add(sphere)

// Lights

const pointLight = new THREE.PointLight(0xffffff, 1)
pointLight.position.x = 2
pointLight.position.y = 3
pointLight.position.z = 4
scene.add(pointLight)

const pointLight2 = new THREE.PointLight(0xFF0000, 5)
pointLight2.position.set(-6,-6.5,-8.3)
pointLight2.intensity = 1
scene.add(pointLight2)

gui.add(pointLight2.position, 'x').min(-10).max(10).step(0.01)
gui.add(pointLight2.position, 'y').min(-10).max(10).step(0.01)
gui.add(pointLight2.position, 'z').min(-10).max(10).step(0.01)
gui.add(pointLight2, 'intensity').min(0).max(10).step(0.01)

const pointLight3 = new THREE.PointLight(0x00ff00, 5)
pointLight3.position.set(1,1,1)
pointLight3.intensity = 1
scene.add(pointLight3)

// gui.add(pointLight3.position, 'x').min(-10).max(10).step(0.01)
// gui.add(pointLight3.position, 'y').min(-10).max(10).step(0.01)
// gui.add(pointLight3.position, 'z').min(-10).max(10).step(0.01)
// gui.add(pointLight3, 'intensity').min(0).max(10).step(0.01)

const light2color = {
    color: 0xff0000
}
// gui.addColor(light2color,'color').onChange(()=>{
//     pointLight2.color.set(light2color.color)
// })
// gui.addColor(light2color,'color').onChange(()=>{
//     pointLight3.color.set(light2color.color)
// })

const pointLightHelper = new THREE.PointLightHelper(pointLight2, .1)
const pointLightHelper3 = new THREE.PointLightHelper(pointLight3, .1)
scene.add(pointLightHelper)
scene.add(pointLightHelper3)

/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () =>
{
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.x = 0
camera.position.y = 0
camera.position.z = 2
scene.add(camera)

// Controls
// const controls = new OrbitControls(camera, canvas)
// controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    alpha: true
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

/**
 * Animate
 */

document.addEventListener('mousemove',onDocumentMouseMove)
let mouseX=0
let mouseY=0

let targetX=0
let targetY=0

const windowHalfX = window.innerWidth / 2;
const windowHalfY = window.innerHeight / 2;

function onDocumentMouseMove (event){
    mouseX = (event.clientX - windowHalfX)
    mouseY = (event.clientY - windowHalfY)
}

const updateSphere = (event) => {
    sphere.position.y = window.scrollY * 0.001
    sphere.position.z = window.scrollY * 0.001

}

window.addEventListener('scroll', updateSphere)

const zoomElement = document.querySelector(".container");
let zoom = 1;
const ZOOM_SPEED = 0.07;

document.addEventListener("wheel", function (e) {
  if (e.deltaY > 0) {
      if(zoom<0){
          zoom=1
      }
      if(zoom==2){
        zoom=1
    }
    zoomElement.style.transform = `scale(${(zoom += ZOOM_SPEED)})`;
    if(zoom==2){
        zoom=1
    }
  } else {
    if(zoom>5){
        zoom=1
    }
    zoomElement.style.transform = `scale(${(zoom -= ZOOM_SPEED)})`;
  }
});


const clock = new THREE.Clock()

const tick = () =>
{

    targetX = mouseX * 0.001
    targetY = mouseY * 0.001

    const elapsedTime = clock.getElapsedTime()

    // Update objects
    // sphere.rotation.y = .5 * elapsedTime

    sphere.rotation.y += 0.05 * (targetX - sphere.rotation.y)
    sphere.rotation.x += 0.05 * (targetY - sphere.rotation.x)
    sphere.position.z += 0.01 * (targetY - sphere.rotation.z)

    // Update Orbital Controls
    // controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()