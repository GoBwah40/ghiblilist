import Image from 'next/image';
import Link from 'next/link';

const Navbar = () => {
  return (
    <header className="navbar gap-2 bg-ghibli px-2 sm:px-4">
      <div className="navbar-start w-auto flex-1 gap-1 sm:gap-2">
        <Link href="/" className="btn btn-ghost h-auto px-1 py-1" aria-label="Home">
          <Image
            src="/logos/favicon.png"
            alt=""
            width={48}
            height={48}
            className="size-10 sm:size-12"
            priority
          />
        </Link>
        <Link href="/" className="whitespace-nowrap text-lg font-bold text-black sm:text-2xl">
          The GhibliList
        </Link>
      </div>
      <nav className="navbar-end w-auto gap-0 sm:gap-1" aria-label="External links">
        <a
          href="https://ghibliapi.vercel.app/"
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-ghost btn-square btn-sm sm:btn-md"
          aria-label="Studio Ghibli API"
        >
          <Image
            src="/logos/ghibliLogo.png"
            alt=""
            width={32}
            height={32}
            className="size-6 sm:size-8"
          />
        </a>
        <a
          href="https://github.com/GoBwah40"
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-ghost btn-square btn-sm sm:btn-md"
          aria-label="GitHub"
        >
          <Image
            src="/logos/githubLogo.png"
            alt=""
            width={32}
            height={32}
            className="size-6 sm:size-8"
          />
        </a>
        <a
          href="https://www.linkedin.com/in/matthias-della-libera-9b6721174/"
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-ghost btn-square btn-sm sm:btn-md"
          aria-label="LinkedIn"
        >
          <Image
            src="/logos/linkedInLogo.png"
            alt=""
            width={32}
            height={32}
            className="size-6 sm:size-8"
          />
        </a>
      </nav>
    </header>
  );
};

export default Navbar;
