import Link from 'next/link';

export const Header: React.FC = () => {
  return (
    <div
      className="navbar"
      style={{
        backgroundColor: 'rgb(7, 157, 236)',
      }}
    >
      <div className="navbar-start">
        <Link href={'/'} className="btn btn-ghost">
          <img src="/logos/favicon.png" className="h-12"></img>
        </Link>
        <p className="px-3 text-2xl font-bold text-black">The GhibliList</p>
      </div>
      <div className="navbar-end">
        <Link href={'https://ghibliapi.vercel.app/#'} target="blank" className="px-3 btn btn-ghost">
          <img src="/logos/ghibliLogo.png" className="h-10"></img>
        </Link>
        <Link href={'https://github.com/GoBwah40'} target="blank" className="px-3 btn btn-ghost">
          <img src="/logos/githubLogo.png" className="h-10"></img>
        </Link>
        <Link
          href={'https://www.linkedin.com/in/matthias-della-libera-9b6721174/'}
          target="blank"
          className="px-3 btn btn-ghost"
        >
          <img src="/logos/linkedInLogo.png" className="h-10"></img>
        </Link>
      </div>
    </div>
  );
};
