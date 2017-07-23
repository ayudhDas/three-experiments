import * as THREE from 'three';
import Key from './keyboard';

let rafHandle: null | number = null;
// set the scene size
const WIDTH:number = 800, HEIGHT:number = 600;
const VIEW_ANGLE = 45;
const ASPECT = WIDTH / HEIGHT;
const NEAR = 0.1;
const FAR = 10000;

// create a WebGL renderer, camera
// and a scene
let renderer: THREE.WebGLRenderer = new THREE.WebGLRenderer();
let scene: THREE.Scene;
let camera: THREE.Camera;
let ball: THREE.Mesh;
let pointLight: THREE.PointLight, spotLight: THREE.SpotLight;

function setup():void {
    // start the renderer
    renderer.setSize(WIDTH, HEIGHT);

    // attach the render-supplied DOM element (the gameCanvas)
    let c:HTMLElement = document.getElementById('root');
    c.appendChild(renderer.domElement);

    camera = new THREE.PerspectiveCamera(
        VIEW_ANGLE,
        ASPECT,
        NEAR,
        FAR);

    scene = new THREE.Scene();

    // add the camera to the scene
    scene.add(camera);

    // set a default position for the camera
    // not doing this somehow messes up shadow rendering
    camera.position.z = 80;
    var sphereMaterial =
        new THREE.MeshLambertMaterial(
            {
                color: 0xD33001
            });

    var radius = 5,
        segments = 60,
        rings = 60;
    // Create a ball with sphere geometry
    ball = new THREE.Mesh(

        new THREE.SphereGeometry(
            radius,
            segments,
            rings),

        sphereMaterial);

    // // add the sphere to the scene
    scene.add(ball);

    ball.position.x = 10;
    ball.position.y = 10;
    // set ball above the table surface
    ball.position.z = radius;
    ball.receiveShadow = true;
    ball.castShadow = true;

    pointLight =
        new THREE.PointLight(0xF8D898);

    // set its position
    pointLight.position.x = -100;
    pointLight.position.y = 0;
    pointLight.position.z = 100;
    pointLight.intensity = 2.9;
    pointLight.distance = 100;
    // add to the scene
    scene.add(pointLight);

    // add a spot light
    // this is important for casting shadows
    spotLight = new THREE.SpotLight(0xF8D898);
    spotLight.position.set(0, 0, 100);
    spotLight.intensity = 1.5;
    spotLight.castShadow = true;
    scene.add(spotLight);

    // MAGIC SHADOW CREATOR DELUXE EDITION with Lights PackTM DLC
    renderer.shadowMap.enabled = true;

    draw();
}

let frame = 0;
function draw(delta:number = 0):void {
    // draw THREE.JS scene
    renderer.render(scene, camera);
    rafHandle = requestAnimationFrame(draw);

    setBallPos();

    // console.log('frame:',frame,',delta:',delta);
    // frame++;
    // if(delta >= 10000){
    //     stop();
    // }
}

function setBallPos():void {
    if(Key.isDown(Key.A)) {
        ball.position.x = 0
    }
    else if(Key.isDown(Key.D)) {
        ball.position.x = 20
    }
    else{
        ball.position.x = 10
    }


    if(Key.isDown(Key.W)) {
        ball.position.y = 20
    }
    else if(Key.isDown(Key.S)) {
        ball.position.y = 0
    }
    else{
        ball.position.y = 10
    }

    if(Key.isDown(Key.SPACE)) {
        console.log(scene.toJSON());
    }
}

function stop():void {
    cancelAnimationFrame(rafHandle);
}

setup();