"use client";
import { useMediaQuery } from "react-responsive";
import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

const Showcase = () => {
  const isTablet = useMediaQuery({ query: "(max-width: 1024px)" });

  useEffect(() => {
    if (!isTablet) {
      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: "#showcase",
          start: "top top",
          end: "bottom top",
          scrub: true,
          pin: true,
        },
      });

      timeline
        .to(".mask img", {
          scale: 1,
          opacity: 1,
          duration: 1,
          ease: "power1.out",
        })
        .fromTo(
          ".content",
          { opacity: 0, y: 50 },
          { opacity: 1, y: 0, ease: "power1.out", duration: 1 },
          "<0.3",
        );
    }
  }, [isTablet]);

  return (
    <>
      <section
        id="showcase"
        className="relative w-full h-screen overflow-hidden bg-black pt-10"
      >
        {/* الفيديو في الخلفية */}
        <div className="relative w-full h-full">
          <video
            src="/videos/game.mp4"
            loop
            muted
            autoPlay
            playsInline
            className="w-full h-full object-cover"
          />

          {/* صورة الـ mask overlay */}
          <div className="mask absolute inset-0 flex justify-center items-center pointer-events-none z-10">
            <Image
              src="/mask-logo.svg"
              alt="mask"
              fill
              className="object-cover opacity-0 scale-1000 w-screen"
            />
          </div>
        </div>

        {/* المحتوى فوق كل شيء */}
      </section>
      <div className="content inset-x-0 z-20 flex justify-center pb-10">
        <div className="wrapper flex flex-col md:flex-row justify-between items-start gap-[7rem] py-5 mx-auto max-w-6xl text-white px-4">
          {/* العمود الأول */}
          <div className="text-left max-w-sm text-neutral-400">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">
              Rocket Chip
            </h2>

            <p className="mb-4 text-base md:text-lg">
              Introducing{" "}
              <span className="text-white font-semibold">
                M4, the next generation of Apple silicon
              </span>
              . M4 powers
            </p>
            <p className="mb-4 text-base md:text-lg">
              It drives Apple Intelligence on iPad Pro, so you can write,
              create, and accomplish more with ease. All in a design that&apos;s
              unbelievably thin, light, and powerful.
            </p>
            <p className="mb-6 text-base md:text-lg">
              A brand-new display engine delivers breathtaking precision, color
              accuracy, and brightness. And a next-gen GPU with
              hardware-accelerated ray tracing brings console-level graphics to
              your fingertips.
            </p>
            <p className="text-blue-500 font-semibold cursor-pointer hover:underline transition">
              Learn more about Apple Intelligence
            </p>
          </div>

          {/* العمود الثاني */}
          <div className="text-left max-w-md flex flex-col justify-items-start gap-10 h-full text-neutral-400">
            <div className="flex flex-col gap-2">
              <p>Up to</p>
              <h2 className="text-4xl md:text-5xl font-bold mb-3 text-white">
                4x Faster
              </h2>
              <p>pro rendering performance than M2</p>
            </div>
            <div className="flex flex-col gap-2">
              <p>Up to</p>
              <h2 className="text-4xl md:text-5xl font-bold mb-3 text-white">
                1.5x Faster
              </h2>
              <p>CPU performance than M2</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Showcase;
