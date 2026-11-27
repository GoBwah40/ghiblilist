import Image from 'next/image';
import ExternalLink from '@/components/external-link';

const stackLinks = [
  { label: 'Next.js', href: 'https://nextjs.org/' },
  { label: 'Tailwind CSS', href: 'https://tailwindcss.com/' },
  { label: 'daisyUI', href: 'https://daisyui.com/' },
  { label: 'Studio Ghibli API', href: 'https://ghibliapi.vercel.app/' },
];

const socialLinks = [
  { label: 'GitHub', href: 'https://github.com/GoBwah40', icon: '/logos/githubLogo.png' },
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/matthias-della-libera-9b6721174/',
    icon: '/logos/linkedInLogo.png',
  },
];

const Footer = () => {
  return (
    <footer className="bg-ghibli text-black">
      <div className="footer justify-around p-5 sm:footer-horizontal">
        <nav aria-labelledby="footer-stack">
          <h2 id="footer-stack" className="footer-title opacity-80">
            Languages, frameworks & API
          </h2>
          {stackLinks.map((link) => (
            <ExternalLink key={link.href} href={link.href} className="link py-1 link-hover">
              {link.label}
            </ExternalLink>
          ))}
        </nav>
        <nav aria-labelledby="footer-social">
          <h2 id="footer-social" className="footer-title opacity-80">
            Social networks
          </h2>
          <div className="flex gap-2">
            {socialLinks.map((link) => (
              <ExternalLink
                key={link.href}
                href={link.href}
                label={link.label}
                className="btn btn-square text-black btn-ghost hover:bg-black/10"
              >
                <Image src={link.icon} alt="" width={20} height={20} />
              </ExternalLink>
            ))}
          </div>
        </nav>
      </div>
      <div className="flex flex-col items-center gap-1 px-5 pb-6 text-center">
        <div className="mb-3 h-0.5 w-2/3 bg-black" aria-hidden="true" />
        <Image src="/logos/gobwah.png" alt="" width={28} height={28} />
        <p>Made and built by Matthias Della Libera</p>
        <p>Copyright © 2023 - All rights reserved</p>
      </div>
    </footer>
  );
};

export default Footer;
