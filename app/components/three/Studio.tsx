"use client";

import { useEffect, useRef, useState } from "react";
import { PresentationControls } from "@react-three/drei";
import gsap from "gsap";

import MackBookModel14 from "@/app/components/models/Macbook-14";
import MackBookModel16 from "@/app/components/models/Macbook-16";

type Props = {
  size: "14" | "16";
  color: "#e5e5e5" | "#7f7f7f";
};

export default function Studio({ size, color }: Props) {
  const groupRef = useRef<any>();
  const [currentSize, setCurrentSize] = useState(size);

  useEffect(() => {
    if (!groupRef.current || size === currentSize) return;

    const group = groupRef.current;

    // 🟡 OUT → left
    gsap.to(group.position, {
      x: -3.5,
      duration: 0.5,
      ease: "power2.in",
    });

    group.traverse((child: any) => {
      if (child.isMesh) {
        child.material.transparent = true;
        gsap.to(child.material, {
          opacity: 0,
          duration: 0.4,
          ease: "power2.in",
        });
      }
    });

    // 🔁 Switch model after out
    setTimeout(() => {
      setCurrentSize(size);

      // reset position to RIGHT
      group.position.x = 3.5;

      // 🟢 IN → center
      gsap.to(group.position, {
        x: 0,
        duration: 0.6,
        ease: "power2.out",
      });

      group.traverse((child: any) => {
        if (child.isMesh) {
          child.material.transparent = true;
          child.material.opacity = 0;

          gsap.to(child.material, {
            opacity: 1,
            duration: 0.5,
            ease: "power2.out",
          });
        }
      });
    }, 500);
  }, [size]);

  return (
    <PresentationControls snap polar={[-Math.PI, Math.PI]}>
      <group ref={groupRef} position={[0, 0, 0]}>
        {currentSize === "14" && (
          <MackBookModel14
            scale={0.09}
            rotation={[7, 0, 0]}
            position={[0, -1, 0.5]}
            color={color}
          />
        )}

        {currentSize === "16" && (
          <MackBookModel16
            scale={0.12}
            rotation={[7, 0, 0]}
            position={[0, -1, 0.5]}
            color={color}
          />
        )}
      </group>
    </PresentationControls>
  );
}
