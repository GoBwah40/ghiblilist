import Image from 'next/image';
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
          <Image src={'/logos/favicon.png'} alt={'Logo'} className="h-12" />
        </Link>
        <p className="px-3 text-2xl font-bold text-black">The GhibliList</p>
      </div>
      <div className="navbar-end">
        <Link href={'https://ghibliapi.vercel.app/#'} target="blank" className="px-3 btn btn-ghost">
          <Image src={'/logos/ghibliLogo.png'} alt={'ghibli logo'} className="h-10" />
        </Link>
        <Link href={'https://github.com/GoBwah40'} target="blank" className="px-3 btn btn-ghost">
          <Image src={'/logos/githubLogo.png'} alt={'github logo'} className="h-10" />
        </Link>
        <Link
          href={'https://www.linkedin.com/in/matthias-della-libera-9b6721174/'}
          target="blank"
          className="px-3 btn btn-ghost"
        >
          <Image src={'/logos/linkedInLogo.png'} alt={'linkedin logo'} className="h-10" />
        </Link>
      </div>
    </div>
  );
};
