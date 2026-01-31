"use client";

import Image from "next/image";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useMediaQuery } from "react-responsive";

gsap.registerPlugin(ScrollTrigger);

export default function Performance() {
  const sectionRef = useRef(null);
  const isMobile = useMediaQuery({ query: "(max-width: 1024px)" });

  // 🔥 استخدم vw / vh = smoother بكتير
  const performanceImages = [
    { id: "p1", src: "/performance1.png", x: -28, y: -32 },
    { id: "p2", src: "/performance2.png", x: 30, y: -20 },
    { id: "p3", src: "/performance3.png", x: 42, y: -35 },
    { id: "p4", src: "/performance4.png", x: 38, y: 26 },
    { id: "p5", src: "/performance5.jpg", x: 0, y: 0 }, // main
    { id: "p6", src: "/performance6.png", x: -34, y: 12 },
    { id: "p7", src: "/performance7.png", x: -44, y: 34 },
  ];

  useGSAP(
    () => {
      const ctx = gsap.context(() => {
        // ✅ Text reveal
        gsap.from(".content p", {
          opacity: 0,
          y: 60,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".content",
            start: "top 80%",
          },
        });

        if (isMobile) return;
        gsap.set(".perf-img", {
          xPercent: -50,
          yPercent: -50,
          x: 0,
          y: 0,
        });
        // 🔥 cinematic start state
        gsap.set(".perf-img", {
          x: 0,
          y: 0,
          scale: 0.35,
          opacity: 0,
          filter: "blur(40px)",
          transformPerspective: 1000,
          force3D: true,
        });

        gsap.set(".main-img", {
          scale: 1,
          opacity: 1,
          filter: "blur(0px)",
        });

        // 🔥 Timeline
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 65%",
            end: "bottom top",
            scrub: 1.2,
          },
        });

        performanceImages.forEach((img) => {
          if (img.id === "p5") return;

          tl.to(
            `.${img.id}`,
            {
              x: `${img.x}vw`,
              y: `${img.y}vh`,
              opacity: 1,
              filter: "blur(0px)",
              scale: gsap.utils.random(0.85, 1.05),
              rotate: gsap.utils.random(-6, 6),
              duration: 2.5,
              ease: "power3.out",
            },
            0,
          );
        });
      }, sectionRef);

      return () => ctx.revert();
    },
    { dependencies: [isMobile] },
  );

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden py-44 text-white"
    >
      {/* TITLE */}
      <h2 className="text-4xl md:text-6xl font-bold text-center mb-24">
        Next-Level Graphics <br />Performance. Game on.
      </h2>

      {/* 🔥 IMAGE STAGE */}
      <div className="relative h-[750px] w-full flex items-center justify-center">
        {performanceImages.map((img) => (
          <Image
            key={img.id}
            src={img.src}
            alt={img.id}
            width={520}
            height={320}
            priority
            className={`
              ${img.id}
              perf-img
              ${img.id === "p5" ? "main-img z-10" : "z-20"}
              absolute
              left-1/2
              top-1/2
              
              pointer-events-none
              select-none
              will-change-transform
              [transform:translateZ(0)]
            `}
          />
        ))}
      </div>

      {/* TEXT */}
      <div className="content max-w-lg mx-auto text-neutral-300 text-lg leading-relaxed px-6 text-center">
        <p>
          Run graphics-intensive workflows with a responsiveness that keeps up
          with your imagination. The M4 family of chips features a GPU with a
          second-generation hardware-accelerated ray tracing engine that renders
          images faster, so{" "}
          <span className="text-white font-semibold">
            gaming feels more immersive and realistic than ever.
          </span>{" "}
          And Dynamic Caching optimizes fast on-chip memory to dramatically
          increase average GPU utilization — driving a huge performance boost
          for the most demanding pro apps and games.
        </p>
      </div>
    </section>
  );
}
