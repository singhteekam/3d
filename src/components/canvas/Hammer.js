import React, { Suspense, useEffect, useState, useRef } from "react";
import { OrbitControls, Preload, useGLTF, useAnimations } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";


import CanvasLoader from "../Loader";

const Hammer = () => {
    const model = useGLTF("/hammer/model.gltf");
  
    const animations = useAnimations(model.animations, model.scene);
    console.log(animations);
  
    const ref = useRef();
  
    useFrame((state, _) => {
      ref.current.rotation.y = -1;
    });
  
    return (
      <>
        <OrbitControls />
        <hemisphereLight intensity={1} groundColor="black" />
        <spotLight
          position={[-20, 50, 10]}
          angle={0.12}
          penumbra={1}
          intensity={20}
          castShadow
          shadow-mapSize={1024}
          decay={false}
        />
        <ambientLight intensity={2} />
  
        <mesh position-y={-2}>
        <primitive ref={ref} scale={4} object={model.scene} />
        </mesh>
      </>
    );
  };
  
  useGLTF.preload("/hammer/model.gltf");

const HammerCanvas = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Add a listener for changes to the screen size
    const mediaQuery = window.matchMedia("(max-width: 500px)");

    // Set the initial value of the `isMobile` state variable
    setIsMobile(mediaQuery.matches);

    // Define a callback function to handle changes to the media query
    const handleMediaQueryChange = (event) => {
      setIsMobile(event.matches);
    };

    // Add the callback function as a listener for changes to the media query
    mediaQuery.addEventListener("change", handleMediaQueryChange);

    // Remove the listener when the component is unmounted
    return () => {
      mediaQuery.removeEventListener("change", handleMediaQueryChange);
    };
  }, []);

  return (
    <Canvas
      frameloop='demand'
      shadows
      dpr={[1, 2]}
      camera={{ position: [20, 3, 5], fov: 25 }}
      gl={{ preserveDrawingBuffer: true }}
    >
      <Suspense fallback={<CanvasLoader />}>
        <OrbitControls
          enableZoom={false}
          maxPolarAngle={Math.PI / 2}
          minPolarAngle={Math.PI / 2}
        />
        <Hammer isMobile={isMobile} />
      </Suspense>

      <Preload all />
    </Canvas>
  );
};

export default HammerCanvas;
