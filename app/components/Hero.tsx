"use client";
import Image from "next/image";
import { useEffect, useRef } from "react";
export default function Hero() {
  const videoRef = useRef<HTMLVideoElement>(null);
  useEffect(() => {
    if (videoRef.current) videoRef.current.playbackRate = 2;
  }, []);
  return (
    <section className="flex flex-col md:gap-1 gap-5 justify-center items-center h-screen md:mt-15 mt-5">
      <div className="flex flex-col justify-center items-center gap-1">
        <h1 className="text-4xl">MackBook Pro</h1>
        <Image src="/title.png" alt="mackbook title" width={650} height={100} />
      </div>
      <video
        ref={videoRef}
        src="/videos/hero.mp4"
        autoPlay
        muted
        playsInline
        className="md:h-90 w-screen h-50"
      ></video>

      <div className="flex flex-col justify-center items-center gap-5">
        <button className="bg-blue-700 py-2 px-5 rounded-full">Buy</button>
        <p className="text-gray-400">From $1599 or $133/mo for 12 months</p>
      </div>
    </section>
  );
}
