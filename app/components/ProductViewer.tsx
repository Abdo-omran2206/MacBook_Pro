"use client";

import { Canvas } from "@react-three/fiber";
import StudioLight from "./StudioLight";
import Studio from "./three/Studio";
import { useState } from "react";

export default function ProductViewer() {
  const [size, setSize] = useState<"14" | "16">("16");
  const [color, setColor] = useState<"#e5e5e5" | "#7f7f7f">("#e5e5e5");

  const sizeBtn = (value: string) =>
    `px-2 py-1 rounded-full transition
   ${
     size === value
       ? "border-black text-black bg-neutral-200 ring-1 ring-black/30"
       : "text-neutral-100 hover:text-black active:scale-95 transition-transform"
   }`;
  const colorBtn = (value: string) =>
    `w-8 h-8 rounded-full transition
   ${
     color === value
       ? "ring-2 ring-neutral-500"
       : ""
   }`;

  return (
    <section className="max-w-7xl mx-auto px-6 py-5 text-center">
      <h2 className="text-3xl md:text-4xl font-semibold mb-4 text-left">
        Take a closer look.
      </h2>

      <div className="h-150">
        <Canvas>
          <StudioLight />
          <Studio size={size} color={color} />
        </Canvas>
      </div>

      <p className="text-neutral-500 mb-5">
        MacBook Pro {size} in Space {color == "#e5e5e5" ? "White" : "Black"}
      </p>

      <div className="flex flex-row items-center justify-center gap-6">
        {/* Color selector */}
        <div className="flex items-center gap-4 bg-neutral-600 rounded-full px-5 py-3">
          <button
            onClick={() => setColor("#e5e5e5")}
            className={`bg-neutral-300 ${colorBtn("#e5e5e5")}`}
          />

          <button
            onClick={() => setColor("#7f7f7f")}
            className={`bg-neutral-900  ${colorBtn("#7f7f7f")}`}
          />
        </div>

        {/* Size selector */}
        <div className="flex gap-4 bg-neutral-600 px-5 py-2 rounded-full">
          <button onClick={() => setSize("14")} className={sizeBtn("14")}>
            14″
          </button>

          <button onClick={() => setSize("16")} className={sizeBtn("16")}>
            16″
          </button>
        </div>
      </div>
    </section>
  );
}
