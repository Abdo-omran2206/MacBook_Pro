import Image from "next/image";

export default function HighlightGrid() {
  return (
    <section className="flex flex-col justify-center items-center mx-auto lg:py-40 max-lg:px-5">
      <h2 className=" text-white font-semibold text-3xl lg:text-7xl text-center max-w-4xl mx-auto">
        There’s never been a better time to upgrade.
      </h2>

      <h3 className="text-[#F5F5F7] font-semibold text-xl lg:text-3xl text-center mt-10">
        Here’s what you get with the new MacBook Pro.
      </h3>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 mt-20 text-[#F5F5F7] max-w-5xl">
        {/* Top-left card */}
        <div className="flex flex-col justify-between gap-5 opacity-100 -translate-y-5">
          <div className="h-full bg-[url(/highlight-bg.png)] bg-no-repeat bg-cover p-5 rounded-3xl">
            <div className="inset-0 flex flex-col justify-center items-start p-6">
              <Image
                src="/laptop.png"
                alt="Laptop"
                width={150}
                height={150}
                className="object-cover"
              />
              <p className="text-white text-lg md:text-xl font-semibold">
                Fly through demanding tasks <br /> up to 9.8x faster.
              </p>
            </div>
          </div>

          {/* Bottom-left card */}
          <div className="bg-[#1D1D1F] p-10 rounded-3xl flex items-center gap-7">
            <Image src="/sun.png" alt="Display" width={40} height={40} />
            <p className="text-white text-lg md:text-xl">
              A stunning <br />
              Liquid Retina XDR display.
            </p>
          </div>
        </div>

        <div className="flex flex-col justify-between gap-5 opacity-100 -translate-y-5">
          {/* Top-right card */}
          <div className="p-10 rounded-3xl flex items-center gap-7 relative bg-[#1D1D1F] before:absolute before:top-0 before:left-0 before:w-full before:h-full before:rounded-3xl before:bg-gradient-to-r before:from-pink-500 before:to-blue-500 before:-z-10">
            <Image
              src="/ai.png"
              alt="AI"
              width={50}
              height={50}
              className="mb-4"
            />
            <p className="text-white text-lg md:text-xl">
              Built for <br />
              <span className="font-bold text-purple-300">
                Apple Intelligence
              </span>
            </p>
          </div>

          {/* Bottom-right card */}
          <div className="h-full bg-[#1D1D1F] p-10 rounded-3xl">
            <Image src="/battery.png" alt="Battery" width={100} height={100} />
            <p className="text-lg md:text-xl text-white">
              Up to{" "}
              <span className="text-green-400 font-bold">14 more hours</span>{" "}
              battery life.{" "}
              <span className="text-gray-400">(Up to 24 hours total.)</span>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
