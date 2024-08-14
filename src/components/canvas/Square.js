import React from "react";

import { useFrame } from "@react-three/fiber";
import { useRef } from "react";

import * as THREE from "three";
import CustomCanva from "./CustomCanva";

const Square = () => {
  const ref = useRef();

  useFrame((state, delta) => {
    // ref.current.rotation.y+=delta;
    state.camera.position.x = Math.sin(state.clock.elapsedTime);
  });

  return (
    <>
      <mesh ref={ref} position={[-2, 0, 0]}>
        <planeGeometry args={[3, 3]} />
        <meshBasicMaterial color="orange" side={THREE.DoubleSide} />
      </mesh>
      <mesh position={[2, 0, 0]}>
        <boxGeometry />
        <meshBasicMaterial color="orange" />
      </mesh>
      <CustomCanva />
    </>
  );
};

export default Square;
