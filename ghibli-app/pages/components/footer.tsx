import Link from "next/link"

export const Footer:React.FC = () => {
    return <div>
        <footer className="footer p-5 bg-base-200 text-base-content justify-around">
    <div>
      <span className="footer-title">Languages & Frameworks</span> 
      <a className="link link-hover" href="https://nextjs.org/">Next.js</a> 
      <a className="link link-hover" href="https://tailwindcss.com/" target="blank">Tailwindcss</a> 
      <a className="link link-hover" href="https://daisyui.com/">DaisyUI</a> 
    </div> 
    <div>
      <span className="footer-title">Social network</span> 
      <div className="flex">
      <a className="link link-hover px-2"><img src="/logos/githubLogo.png" alt="github" className="h-5"/></a> 
      <a className="link link-hover px-2"><img src="/logos/linkedInLogo.png" alt="linkedin" className="h-5"/></a> 
      </div>
    </div>
  </footer>
  <footer className="footer px-10 py-4 border-t bg-base-200 text-base-content border-base-300 justify-center">
  <div className="items-center grid-flow-row justify-items-center">
    <img src="/logos/favicon.png" alt="gobwah logo" className="justify-center h-7"/>
    <p className="text-center">Make and build by Matthias Della Libera</p>
    <p className="text-center">Copyright © 2023 - All right reserved</p>
  </div> 
</footer>
    </div>
}