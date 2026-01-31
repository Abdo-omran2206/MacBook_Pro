import Image from "next/image";

export default function Footer() {
  const footerLinks = [
    { label: "Privacy Policy", link: "#" },
    { label: "Terms of Use", link: "#" },
    { label: "Sales Policy", link: "#" },
    { label: "Legal", link: "#" },
    { label: "Site Map", link: "#" },
  ];

  return (
    <footer className="container mx-auto py-7 max-lg:px-5">
      <div className="flex justify-between items-center px-5">
        <p className="text-neutral-400">
          More ways to shop:{" "}
          <span className="text-blue-500">Find an Apple Store</span> or{" "}
          <span className="text-blue-500">other retailer</span> near you. Or
          call 000800 040 1966.
        </p>
        <Image src="/logo.svg" alt="Apple logo" width={50} height={50} />
      </div>

      <hr className="text-neutral-700 my-5" />

      <div className="flex flex-col lg:flex-row lg:items-center justify-between px-5 max-lg:mt-5 gap-5 text-sm text-neutral-400">
        <p>Copyright © 2024 Apple Inc. All rights reserved.</p>

        <ul className="flex lg:px-5 cursor-pointer">
          {footerLinks.map(({ label, link }, index) => (
            <li
              key={label}
              className={` ${index !== footerLinks.length - 1 ? "border-r border-gray-600 px-5" : "pl-5"}`}
            >
              <a
                href={link}
                className="hover:text-primary transition-colors duration-300 ease-in-out"
              >
                {label}
              </a>
            </li>
          ))}
        </ul>
      </div>
      <hr className="text-neutral-700 mt-5" />
    </footer>
  );
}
