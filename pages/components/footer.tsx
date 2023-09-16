import Image from 'next/image';

const Footer: React.FC = () => {
  return (
    <div>
      <footer
        className="footer p-5 bg-base-200 text-base-content justify-around"
        style={{
          backgroundColor: 'rgb(7, 157, 236)',
        }}
      >
        <div>
          <span className="footer-title text-black">Languages, Frameworks & API</span>
          <a className="link link-hover text-black" href="https://nextjs.org/">
            Next.js
          </a>
          <a className="link link-hover text-black" href="https://tailwindcss.com/" target="blank">
            Tailwindcss
          </a>
          <a className="link link-hover text-black" href="https://daisyui.com/">
            DaisyUI
          </a>
          <a className="link link-hover text-black" href="https://ghibliapi.vercel.app/#">
            Ghibli API
          </a>
        </div>
        <div>
          <span className="footer-title text-black">Social network & API</span>
          <div className="flex">
            <a className="link link-hover btn btn-ghost">
              <Image src={'/logos/githubLogo.png'} alt={'github'} className="h-5" />
            </a>
            <a className="link link-hover btn btn-ghost">
              <Image src={'/logos/linkedInLogo.png'} alt={'linkedin'} className="h-5" />
            </a>
          </div>
        </div>
      </footer>
      <footer
        className="footer py-4 text-base-content justify-center flex"
        style={{
          backgroundColor: 'rgb(7, 157, 236)',
        }}
      >
        <div className="items-center grid-flow-row justify-items-center w-full">
          <div className="h-0.5 bg-black mx-auto my-4 w-2/3"></div>
          <Image src={'/logos/favicon.png'} alt={'gobwah logo'} className="justify-center h-7" />
          <p className="text-center text-black">Make and build by Matthias Della Libera</p>
          <p className="text-center text-black">Copyright © 2023 - All right reserved</p>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
