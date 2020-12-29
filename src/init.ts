import * as THREE from 'three';
import OrbitControls from 'three-orbitcontrols';
import crate from './images/crate.gif';

const scene = new THREE.Scene();

const asex = new THREE.AxesHelper(200);
scene.add(asex);

const geometry = new THREE.BoxGeometry(100, 100 , 100, 2, 2, 2);
// const material = new THREE.MeshLambertMaterial({
//   color: 0x0000ff
// });

//首先，获取到纹理
const map = new THREE.TextureLoader().load((crate));
//然后创建一个phong材质来处理着色，并传递给纹理映射
var material = new THREE.MeshPhongMaterial({map: map});
const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

const light = new THREE.PointLight(0xffffff);
light.position.set(400, 200, 300);
scene.add(light);

const ambient = new THREE.AmbientLight(0x444444);
scene.add(ambient);

const width = window.innerWidth;
const height = window.innerHeight;
const camera = new THREE.PerspectiveCamera(60, width / height, 1, 10000);
camera.position.set(300, 300, 200);
camera.lookAt(scene.position);
scene.add();

const renderer = new THREE.WebGLRenderer({
  antialias: true,
})
renderer.setSize(width, height);
renderer.autoClearColor;
document.body.appendChild(renderer.domElement);
// renderer.render(scene, camera);

window.addEventListener('resize', () => {
  const width = window.innerWidth;
  const height = window.innerHeight;
  camera.aspect = width / height;
  camera.updateProjectionMatrix();
  renderer.setSize(width, height);
  // renderer.render(scene, camera);
})



const controls = new OrbitControls(camera, renderer.domElement)
controls.enablePan = false;
controls.enableDamping = true;

function render() {
  controls.update();
  // geometry.rotateY(0.01);
  renderer.render(scene, camera);
  requestAnimationFrame(render);
}
render()
