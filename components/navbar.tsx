import Link from 'next/link';
import ExternalLink from '@/components/external-link';
import { GitHubIcon, LinkedInIcon } from '@/components/icons';
import Logo from '@/components/logo';
import ThemeSelect from '@/components/theme-select';
import Wordmark from '@/components/wordmark';

const Navbar = () => {
  return (
    <header className="flex flex-wrap items-center justify-between gap-x-3 gap-y-1 border-b-(length:--border-w) border-line bg-bar px-3 py-2 text-on-bar sm:px-5">
      <Link
        href="/"
        className="flex min-h-12 items-center gap-2.5 rounded-field px-1 py-1 sm:gap-3"
      >
        <Logo className="size-10 shrink-0 sm:size-11" />
        <Wordmark />
      </Link>
      <div className="ml-auto flex items-center gap-1 sm:gap-2">
        <ThemeSelect />
        {/* Doublés dans le pied de page : masqués sur petit écran pour laisser la place. */}
        <nav aria-label="Links" className="hidden items-center gap-1 sm:flex">
          <ExternalLink
            href="https://github.com/GoBwah40"
            label="GitHub"
            className="btn btn-square text-on-bar btn-ghost hover:bg-on-bar/10"
          >
            <GitHubIcon className="size-6" />
          </ExternalLink>
          <ExternalLink
            href="https://www.linkedin.com/in/matthias-della-libera-9b6721174/"
            label="LinkedIn"
            className="btn btn-square text-on-bar btn-ghost hover:bg-on-bar/10"
          >
            <LinkedInIcon className="size-6" />
          </ExternalLink>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
