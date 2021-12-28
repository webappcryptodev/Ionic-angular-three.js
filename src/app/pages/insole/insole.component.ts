import { Component, OnInit } from '@angular/core';
import * as THREE from 'three';
import { Light, Material, PerspectiveCamera, Scene } from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import {GLTFLoader} from 'three/examples/jsm/loaders/GLTFLoader';
// CAMERA
/*/ type of camera with field of view, aspect ratio, nearand far view*/
const camera: THREE.PerspectiveCamera = new THREE.PerspectiveCamera(30,window.innerWidth/window.innerHeight, 1,5000);
camera.rotation.y = 45/180*Math.PI;
camera.position.set(0,0,10); // camera placement (x,y,z)
camera.lookAt(0,0,0); // camera is looking at (0,0,0)
// RENDERER
const renderer: THREE.WebGLRenderer = new THREE.WebGLRenderer({antialias:true}); /*/ antialias->true smooths the jagged edges*/
renderer.setPixelRatio(window.devicePixelRatio)
renderer.setSize(window.innerWidth/2, window.innerHeight)
//Scene
const scene: THREE.Scene = new Scene();
// add grid helper if you want to show grid in the scene
/*/scene.add(new THREE.GridHelper(8,12,0x888888, 0x444444));*/
scene.background = new THREE.Color(0xdddddd);// set background color
//light - makes the model look real
let light = new THREE.AmbientLight(0x404040,10);
scene.add(light);
// let dirLight = new THREE.PointLight(0xffffff,100);
// dirLight.position.set(0,1,0);
// dirLight.castShadow = true;
// scene.add(dirLight);
/*/ orbital controls -optional this lets you play with model (rotate, flip, zoom) on webpage*/
const control = new OrbitControls(camera,renderer.domElement)
// ANIMATION LOOP
export function animate(){
requestAnimationFrame(animate);
renderer.render(scene,camera);
}
/* Change aspect ratio of renderer and camera on window resize*/
export function onWindowResize(){
camera.aspect = window.innerWidth/window.innerHeight;
camera.updateProjectionMatrix();
renderer.setSize(window.innerWidth/2, window.innerHeight/2);
}
window.addEventListener('resize', onWindowResize);
@Component({
selector: 'app-insole',
templateUrl: './insole.component.html',
// styleUrls: ['./.component.css']
})
export class InsoleComponent implements OnInit {
constructor() { }
ngOnInit(): void {
    const container = document.createElement('div');
    document.getElementById('tdContainer')!.appendChild(container);
    container.appendChild(renderer.domElement);
    let loader = new GLTFLoader();
    loader.load('../../../assets/object/shoean.glb', function(gltf){
    let bike= gltf.scene.children[0];
    scene.add(gltf.scene);
    animate();
});
}
}