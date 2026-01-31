"use client";

import { Canvas } from "@react-three/fiber";
import StudioLight from "./StudioLight";
import { Suspense, useRef, useState, useEffect } from "react";
import * as THREE from "three";
import { Html } from "@react-three/drei";
import MacbookModel from "./models/Macbook";
import { useMediaQuery } from "react-responsive";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

const featureSequence = [
  { videoPath: "/videos/feature-1.mp4", box: ".box1" },
  { videoPath: "/videos/feature-2.mp4", box: ".box2" },
  { videoPath: "/videos/feature-3.mp4", box: ".box3" },
  { videoPath: "/videos/feature-4.mp4", box: ".box4" },
  { videoPath: "/videos/feature-5.mp4", box: ".box5" },
];

function ModelScroll() {
  const groupRef = useRef<THREE.Group>(null);
  const isMobile = useMediaQuery({ query: "(max-width: 1024px)" });
  const prefersReducedMotion = useMediaQuery({
    query: "(prefers-reduced-motion: reduce)",
  });

  const [texture, setTexture] = useState("/videos/feature-1.mp4");
  const videoRefs = useRef<{ [key: string]: HTMLVideoElement }>({});

  // Preload and cache videos
  useEffect(() => {
    const currentVideos = videoRefs.current;
    featureSequence.forEach((f) => {
      if (!currentVideos[f.videoPath]) {
        const v = document.createElement("video");
        v.src = f.videoPath;
        v.preload = "auto";
        v.muted = true;
        v.playsInline = true;
        v.loop = true;
        v.load();
        currentVideos[f.videoPath] = v;
      }
    });

    return () => {
      // Cleanup videos on unmount
      Object.values(currentVideos).forEach((video) => {
        video.pause();
        video.src = "";
      });
    };
  }, []);

  // Play video when texture changes
  useEffect(() => {
    const currentVideo = videoRefs.current[texture];
    if (currentVideo) {
      // Pause all other videos
      Object.entries(videoRefs.current).forEach(([path, video]) => {
        if (path !== texture) {
          video.pause();
          video.currentTime = 0;
        }
      });

      // Play current video
      currentVideo.play().catch((err) => {
        console.log("Video autoplay prevented:", err);
      });
    }
  }, [texture]);

  useGSAP(() => {
    if (prefersReducedMotion) {
      // For users who prefer reduced motion, show all features without animation
      featureSequence.forEach((feature) => {
        gsap.set(feature.box, { opacity: 1, y: 0 });
      });
      return;
    }

    const totalFeatures = featureSequence.length;

    // Master timeline for the entire scroll section
    const masterTimeline = gsap.timeline({
      scrollTrigger: {
        trigger: "#features",
        start: "top top",
        end: "bottom bottom",
        scrub: 1.5,
        anticipatePin: 1,
      },
    });

    // 3D MODEL: Subtle rotation to keep the screen visible
    if (groupRef.current) {
      masterTimeline.to(
        groupRef.current.rotation,
        {
          y: Math.PI * 0.15, // Slight tilt
          ease: "power1.inOut",
        },
        0,
      );

      masterTimeline.to(
        groupRef.current.rotation,
        {
          y: -Math.PI * 0.15, // Tilt other way
          ease: "power1.inOut",
        },
        0.5,
      );
    }

    // Each feature gets equal portion of the scroll
    featureSequence.forEach((feature, index) => {
      const segmentDuration = 1 / totalFeatures;
      const startProgress = index * segmentDuration;

      // Change texture slightly BEFORE the feature box appears
      masterTimeline.call(
        () => {
          setTexture(feature.videoPath);
        },
        [],
        Math.max(0, startProgress - 0.05),
      );

      // Animation for the feature box
      masterTimeline.fromTo(
        feature.box,
        {
          opacity: 0,
          y: 40,
          scale: 0.95,
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: segmentDuration * 0.4,
          ease: "power2.out",
        },
        startProgress,
      );

      // Fade OUT (last 20% of segment) - except for the last feature
      if (index < totalFeatures - 1) {
        masterTimeline.to(
          feature.box,
          {
            opacity: 0,
            y: -40,
            scale: 0.95,
            duration: segmentDuration * 0.4,
            ease: "power2.in",
          },
          startProgress + segmentDuration * 0.6,
        );
      }
    });
  }, [prefersReducedMotion]);

  return (
    <group ref={groupRef}>
      <Suspense
        fallback={
          <Html center>
            <div className="flex flex-col items-center justify-center gap-4">
              <div className="w-16 h-16 border-4 border-white/20 border-t-white rounded-full animate-spin" />
              <div className="text-white text-xl font-light">
                Loading Experience...
              </div>
            </div>
          </Html>
        }
      >
        <MacbookModel
          scale={isMobile ? 0.05 : 0.085}
          position={[0, isMobile ? -0.5 : -1, 0]}
          texture={texture}
        />
      </Suspense>
    </group>
  );
}

export default function Features() {
  const features = [
    {
      id: 1,
      icon: "/feature-icon1.svg",
      highlight: "Email AI.",
      text: " Summarize and draft replies to emails instantly, so you stay on top of your inbox.",
      class: "box1",
      position: "left-5 md:left-20 top-[15%] lg:top-[20%]",
    },
    {
      id: 2,
      icon: "/feature-icon2.svg",
      highlight: "Image AI.",
      text: " Generate or edit images with ease. Just type what you imagine, and let AI bring it to life.",
      class: "box2",
      position: "right-5 md:right-20 top-[25%] lg:top-[30%]",
    },
    {
      id: 3,
      icon: "/feature-icon3.svg",
      highlight: "Summarize AI.",
      text: " Turn long articles, reports, or notes into clear, bite-sized summaries in seconds.",
      class: "box3",
      position: "left-5 md:left-20 top-[45%] lg:top-[50%]",
    },
    {
      id: 4,
      icon: "/feature-icon4.svg",
      highlight: "AirDrop.",
      text: " Wirelessly share photos, large files, and more between your iPhone, your Mac, & other devices.",
      class: "box4",
      position: "right-5 md:right-20 top-[65%] lg:top-[70%]",
    },
    {
      id: 5,
      icon: "/feature-icon5.svg",
      highlight: "Writing Tool.",
      text: " Write smarter and faster, whether it's blogs, essays, or captions, AI helps polish your words.",
      class: "box5",
      position: "left-5 md:left-20 top-[80%] lg:top-[85%]",
    },
  ];

  return (
    <section
      id="features"
      className="relative h-[600vh] bg-black text-white"
      aria-label="Product Features"
    >
      {/* Sticky Container */}
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        <Canvas
          id="f-canvas"
          camera={{ position: [0, 0, 8], fov: 25 }}
          dpr={[1, 2]}
          performance={{ min: 0.5 }}
        >
          <StudioLight />
          <ambientLight intensity={0.6} />
          <ModelScroll />
        </Canvas>

        {/* Floating feature boxes - now inside the sticky container */}
        <div className="absolute inset-0 pointer-events-none z-10">
          {features.map((f) => (
            <div
              key={f.id}
              className={`${f.class} ${f.position} absolute opacity-0 will-change-transform`}
              role="article"
              aria-labelledby={`feature-${f.id}-title`}
            >
              <div className="flex flex-col gap-3 p-5 md:p-6 rounded-2xl bg-gradient-to-br from-neutral-900/95 to-neutral-950/95 backdrop-blur-md border border-neutral-800/50 shadow-2xl max-w-[280px] md:max-w-xs">
                {/* Icon container */}
                <div className="relative w-12 h-12 flex-shrink-0">
                  <Image
                    src={f.icon}
                    alt=""
                    fill
                    className="object-contain"
                    aria-hidden="true"
                  />
                </div>

                {/* Text content */}
                <div>
                  <p
                    id={`feature-${f.id}-title`}
                    className="text-base md:text-lg leading-relaxed text-neutral-300"
                  >
                    <span className="text-white font-semibold">
                      {f.highlight}
                    </span>
                    {f.text}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
