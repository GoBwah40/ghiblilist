import Image from 'next/image';

const links = [
  { label: 'Next.js', href: 'https://nextjs.org/' },
  { label: 'Tailwind CSS', href: 'https://tailwindcss.com/' },
  { label: 'daisyUI', href: 'https://daisyui.com/' },
  { label: 'Studio Ghibli API', href: 'https://ghibliapi.vercel.app/' },
];

const Footer = () => {
  return (
    <footer className="bg-ghibli text-black">
      <div className="footer sm:footer-horizontal justify-around p-5">
        <nav>
          <h2 className="footer-title text-black opacity-80">Languages, frameworks & API</h2>
          {links.map((link) => (
            <a
              key={link.href}
              className="link link-hover"
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
            >
              {link.label}
            </a>
          ))}
        </nav>
        <nav>
          <h2 className="footer-title text-black opacity-80">Social networks</h2>
          <div className="flex gap-2">
            <a
              className="btn btn-ghost btn-square"
              href="https://github.com/GoBwah40"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
            >
              <Image src="/logos/githubLogo.png" alt="" width={20} height={20} />
            </a>
            <a
              className="btn btn-ghost btn-square"
              href="https://www.linkedin.com/in/matthias-della-libera-9b6721174/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
            >
              <Image src="/logos/linkedInLogo.png" alt="" width={20} height={20} />
            </a>
          </div>
        </nav>
      </div>
      <div className="flex flex-col items-center gap-1 px-5 pb-6 text-center">
        <div className="mb-3 h-0.5 w-2/3 bg-black" />
        <Image src="/logos/favicon.png" alt="" width={28} height={28} />
        <p>Made and built by Matthias Della Libera</p>
        <p>Copyright © 2023 - All rights reserved</p>
      </div>
    </footer>
  );
};

export default Footer;
