import Image from "next/image";
import Link from "next/link";

export default function Navbar() {
  const navlinks = [
    { label: "Store" },
    { label: "Mac" },
    { label: "Iphone" },
    { label: "Watch" },
    { label: "Vision" },
    { label: "Airpods" },
  ];
  return (
    <header className="relative w-full">
      <nav className="fixed top-0 z-50 bg-black/70 backdrop-blur-md w-screen">
        <div className="mx-auto max-w-7xl flex items-center justify-between px-6 py-3">
          {/* Logo */}
          <Image src="/logo.svg" alt="logo" width={45} height={45} priority />

          {/* Links */}
          <ul className="hidden md:flex items-center gap-6 text-white">
            {navlinks.map((link) => (
              <li key={link.label}>
                <Link
                  href={link.label}
                  className="hover:text-purple-400 transition"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          {/* Icons */}
          <div className="flex items-center gap-5">
            <Image
              src="/search.svg"
              alt="search"
              width={26}
              height={26}
              className="cursor-pointer opacity-80 hover:opacity-100 transition"
            />
            <Image
              src="/cart.svg"
              alt="cart"
              width={26}
              height={26}
              className="cursor-pointer opacity-80 hover:opacity-100 transition"
            />
          </div>
        </div>
      </nav>
    </header>
  );
}
