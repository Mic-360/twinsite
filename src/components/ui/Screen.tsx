import {
  component$,
  noSerialize,
  useVisibleTask$,
  useSignal,
  useStore,
} from "@builder.io/qwik";
import type { NoSerialize } from "@builder.io/qwik";
import * as THREE from "three";
import { OrbitControls } from "three-orbitcontrols";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

interface State {
  scene: NoSerialize<THREE.Scene>;
  camera: NoSerialize<THREE.PerspectiveCamera>;
  renderer: NoSerialize<THREE.WebGLRenderer>;
}

export const Screen = component$(() => {
  const bg = useSignal<HTMLCanvasElement>();
  const state = useStore<State>({
    scene: noSerialize(undefined),
    camera: noSerialize(undefined),
    renderer: noSerialize(undefined),
  });

  useVisibleTask$(() => {
    if (typeof window !== "undefined") {
      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(
        75,
        window.innerWidth / window.innerHeight,
        0.1,
        1000,
      );
      const renderer = new THREE.WebGLRenderer({
        canvas: bg.value,
      });

      state.scene = noSerialize(scene);
      state.camera = noSerialize(camera);
      state.renderer = noSerialize(renderer);

      renderer.setPixelRatio(window.devicePixelRatio);
      renderer.setSize(window.innerWidth, window.innerHeight);
      camera.position.setZ(30);
      camera.position.setX(-3);

      renderer.render(scene, camera);

      //! Torus
      const geometry = new THREE.TorusGeometry(10, 3, 166, 1000);
      const material = new THREE.MeshStandardMaterial({
        color: 0x2c2747,
        roughness: 0.8,
        metalness: 0.9,
        opacity: 0.5,
      });
      const torus = new THREE.Mesh(geometry, material);
      scene.add(torus);

      // Lights
      const pointLight = new THREE.PointLight(0xffffff);

      const directionalLight = new THREE.DirectionalLight(0xffffff);
      directionalLight.position.set(5, 5, 5);

      const ambientLight = new THREE.AmbientLight(0xffffff);
      ambientLight.intensity = 0.8;

      scene.add(ambientLight, directionalLight);

      const controls = new OrbitControls(camera, renderer.domElement);

      const Lights = () => {
        const directionalLight = new THREE.DirectionalLight(0xffffff);
        directionalLight.intensity = 1;

        const [x, y, z] = Array(3)
          .fill(null)
          .map(() => THREE.MathUtils.randFloatSpread(100));

        pointLight.position.set(x, y, z);
        directionalLight.position.set(x, y, z);

        scene.add(pointLight, directionalLight);
      };

      Array(200).fill(null).forEach(Lights);

      // Background
      const spaceTexture = new THREE.TextureLoader().load("space.jpg");
      scene.background = spaceTexture;

      const loader = new GLTFLoader();
      let model: any | null = null;
      loader.load("logo.glb", (gltf: any) => {
        model = gltf.scene.children[0];
        model.material.color = new THREE.Color(0xeeff15);
        scene.add(model);
      });

      //! Moon
      // const moonTexture = new THREE.TextureLoader().load("moon.jpg");
      // const normalTexture = new THREE.TextureLoader().load("normal.jpg");

      // const moon = new THREE.Mesh(
      //   new THREE.SphereGeometry(3, 32, 32),
      //   new THREE.MeshStandardMaterial({
      //     map: moonTexture,
      //     normalMap: normalTexture,
      //   }),
      // );

      // scene.add(moon);

      // moon.position.z = 30;
      // moon.position.setX(-10);

      // Animation Loop
      const animate = () => {
        requestAnimationFrame(animate);

        torus.rotation.x += 0.02;
        torus.rotation.y += 0.005;
        torus.rotation.z += 0.1;

        // moon.rotation.x += 0.005;
        if (model) {
          model.rotation.y += 0.005;
        }

        controls.update();

        renderer.render(scene, camera);
      };

      animate();
    }
  });
  return <canvas ref={bg} id="bg"></canvas>;
});
