import ExternalLink from '@/components/external-link';
import { GitHubIcon, LinkedInIcon } from '@/components/icons';

const stackLinks = [
  { label: 'Next.js', href: 'https://nextjs.org/' },
  { label: 'Tailwind CSS', href: 'https://tailwindcss.com/' },
  { label: 'daisyUI', href: 'https://daisyui.com/' },
  { label: 'Studio Ghibli API', href: 'https://ghibliapi.vercel.app/' },
];

const Footer = () => {
  return (
    <footer className="border-t-(length:--border-w) border-line bg-bar text-on-bar">
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
            <ExternalLink
              href="https://github.com/GoBwah40"
              label="GitHub"
              className="btn btn-square text-on-bar btn-ghost hover:bg-on-bar/10"
            >
              <GitHubIcon className="size-5" />
            </ExternalLink>
            <ExternalLink
              href="https://www.linkedin.com/in/matthias-della-libera-9b6721174/"
              label="LinkedIn"
              className="btn btn-square text-on-bar btn-ghost hover:bg-on-bar/10"
            >
              <LinkedInIcon className="size-5" />
            </ExternalLink>
          </div>
        </nav>
      </div>
      <div className="flex flex-col items-center gap-1 px-5 pb-6 text-center">
        <div className="mb-3 h-0.5 w-2/3 bg-on-bar/60" aria-hidden="true" />
        {/* Logo personnel en masque CSS : il prend la couleur du texte du thème. */}
        <span
          aria-hidden="true"
          className="size-7 bg-current [mask:url(/logos/gobwah.svg)_center/contain_no-repeat]"
        />
        <p>Made and built by Matthias Della Libera</p>
        <p>Copyright © 2023 - All rights reserved</p>
      </div>
    </footer>
  );
};

export default Footer;
