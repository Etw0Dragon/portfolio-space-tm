import { Menu, X } from "lucide-react";
import { useState } from "react";
import { SOCIALS } from "../constants";

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="w-full h-[65px] fixed top-0 shadow-lg shadow-[#2A0E61]/50 bg-[#03001427] backdrop-blur-md z-50 px-4 sm:px-6 md:px-10">
      {/* Container Navbar */}
      <div className="w-full h-full flex items-center justify-between m-auto px-0 md:px-[10px]">
        {/* Côté gauche (vide) */}
        <div className="flex-1 hidden md:flex">
        </div>

        {/* Navbar Web (Mid) */}
        <div className="flex-[2] hidden md:flex flex-row items-center justify-center h-full">
          <div className="flex items-center justify-center gap-10 border border-[#7042f861] bg-[#0300145e] px-[20px] py-[10px] rounded-full text-gray-200 font-orbitron text-sm">
            <a
              href="/"
              className="cursor-pointer hover:text-[rgb(112,66,248)] transition uppercase tracking-widest"
            >
              Accueil
            </a>

            <a
              href="/terminal"
              className="cursor-pointer hover:text-[rgb(112,66,248)] transition text-cosmic-500 uppercase tracking-widest"
            >
              Terminal CLI
            </a>
          </div>
        </div>

        {/* Socials (Web - Right) */}
        <div className="flex-1 hidden md:flex flex-row justify-end gap-5">
          {SOCIALS.map(({ link, name, icon: Icon }) => (
            <a
              href={link}
              target="_blank"
              rel="noreferrer noopener"
              key={name}
              className="text-white hover:text-cosmic-500 transition-colors"
            >
              <Icon className="h-6 w-6" />
            </a>
          ))}
        </div>

        {/* Logo mobile side gauche si besoin */}
        <div className="md:hidden flex items-center">
            <span className="text-white font-bold font-orbitron">TM</span>
        </div>

        {/* Menu burger (Mobile) */}
        <button
          className="md:hidden flex h-11 w-11 items-center justify-center rounded-lg border border-cosmic-700/60 bg-cosmic-900/60 text-white focus:outline-none focus:ring-2 focus:ring-cosmic-500"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label={isMobileMenuOpen ? "Fermer le menu" : "Ouvrir le menu"}
        >
          {isMobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Menu Mobile */}
      {isMobileMenuOpen && (
        <div className="absolute top-[65px] left-0 w-full bg-[#030014] p-5 flex flex-col items-center text-gray-300 md:hidden border-b border-[#7042f861] shadow-lg shadow-[#2A0E61]/30">
          {/* Liens */}
          <div className="flex flex-col items-center gap-4 font-orbitron">
            <a
              href="/"
              className="cursor-pointer hover:text-[rgb(112,66,248)] transition text-center uppercase"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Accueil
            </a>
            <a
              href="/terminal"
              className="cursor-pointer hover:text-[rgb(112,66,248)] transition text-center text-cosmic-500 uppercase"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Terminal CLI
            </a>
          </div>

          {/* Socials */}
          <div className="flex flex-row gap-8 mt-6">
            {SOCIALS.map(({ link, name, icon: Icon }) => (
              <a
                href={link}
                target="_blank"
                rel="noreferrer noopener"
                key={name}
                className="text-white hover:text-cosmic-500 transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <Icon className="h-8 w-8" />
              </a>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
