import Image from 'next/image';
import Link from 'next/link';
import ExternalLink from '@/components/external-link';

const socialLinks = [
  {
    label: 'Studio Ghibli API',
    href: 'https://ghibliapi.vercel.app/',
    icon: '/logos/ghibliLogo.png',
  },
  { label: 'GitHub', href: 'https://github.com/GoBwah40', icon: '/logos/githubLogo.png' },
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/matthias-della-libera-9b6721174/',
    icon: '/logos/linkedInLogo.png',
  },
];

const Navbar = () => {
  return (
    <header className="navbar gap-2 bg-ghibli px-2 text-black sm:px-4">
      <div className="navbar-start w-auto flex-1">
        <Link
          href="/"
          className="btn h-auto gap-2 px-1 py-1 text-lg font-bold whitespace-nowrap text-black btn-ghost hover:bg-black/10 sm:text-2xl"
        >
          <Image
            src="/logos/favicon.png"
            alt=""
            width={48}
            height={48}
            className="size-10 sm:size-12"
            priority
          />
          The GhibliList
        </Link>
      </div>
      <nav className="navbar-end w-auto gap-1" aria-label="Links">
        {socialLinks.map((link) => (
          <ExternalLink
            key={link.href}
            href={link.href}
            label={link.label}
            className="btn btn-square text-black btn-ghost hover:bg-black/10"
          >
            <Image src={link.icon} alt="" width={32} height={32} className="size-6 sm:size-8" />
          </ExternalLink>
        ))}
      </nav>
    </header>
  );
};

export default Navbar;
