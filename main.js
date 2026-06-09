import * as THREE from "https://unpkg.com/three@0.160.0/build/three.module.js";
import { GLTFLoader } from "https://unpkg.com/three@0.160.0/examples/jsm/loaders/GLTFLoader.js";

const scene = new THREE.Scene();
scene.background = new THREE.Color(0x87ceeb);

const camera = new THREE.PerspectiveCamera(
60,
window.innerWidth/window.innerHeight,
0.1,
1000
);

const renderer = new THREE.WebGLRenderer({
antialias:true
});

renderer.setSize(window.innerWidth,window.innerHeight);
document.body.appendChild(renderer.domElement);

const light=new THREE.DirectionalLight(0xffffff,3);
light.position.set(5,10,5);
scene.add(light);

scene.add(new THREE.AmbientLight(0xffffff,2));

const ground=new THREE.Mesh(
new THREE.PlaneGeometry(60,60),
new THREE.MeshStandardMaterial({
color:0x55aa55
})
);

ground.rotation.x=-Math.PI/2;
scene.add(ground);

let panda;

const loader=new GLTFLoader();

loader.load(
"./quaternius_cc0-panda-1211.glb",
(gltf)=>{

panda=gltf.scene;

panda.scale.set(2,2,2);

scene.add(panda);

}
);

camera.position.set(0,6,8);

let moveX=0;
let moveZ=0;

window.addEventListener("touchmove",(e)=>{

if(e.touches.length>0){

const t=e.touches[0];

moveX=(t.clientX/window.innerWidth-0.5)*2;

moveZ=(t.clientY/window.innerHeight-0.5)*2;

}

});

function animate(){

requestAnimationFrame(animate);

if(panda){

panda.position.x+=moveX*0.05;
panda.position.z+=moveZ*0.05;

camera.position.x=panda.position.x;

camera.position.z=panda.position.z+8;

camera.lookAt(panda.position);

}

renderer.render(scene,camera);

}

animate();

window.addEventListener("resize",()=>{

camera.aspect=window.innerWidth/window.innerHeight;

camera.updateProjectionMatrix();

renderer.setSize(
window.innerWidth,
window.innerHeight
);

});
