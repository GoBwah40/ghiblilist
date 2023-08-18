import Link from "next/link"

export const Header:React.FC = () => {
    return <div className="navbar" color="#282c34">
            <div className="navbar-start">
                <Link href={"/"} className="btn btn-ghost">
                <img src="/logos/logoMGL.png" className="h-12"></img>
                </Link>
                <p className="px-3 text-2xl font-bold text-neutral-50">The GhibliList</p>
            </div>
            <div className="navbar-center">
                <div className="form-control">
                    <input type="text" placeholder="Search" className="input input-bordered w-24 md:w-auto" />
                </div>
            </div>
            <div className="navbar-end">
                <Link href={"https://ghibliapi.vercel.app/#"} target="blank" className="px-3">
                    <img src="/logos/ghibliLogo.png" className="h-10"></img>
                </Link>
                <Link href={"https://github.com/GoBwah40"} target="blank" className="px-3">
                    <img src="/logos/githubLogo.png" className="h-10"></img>
                </Link>
                <Link href={"https://www.linkedin.com/in/matthias-della-libera-9b6721174/"} target="blank"className="px-3">
                    <img src="/logos/linkedInLogo.png" className="h-10"></img>
                </Link>
            </div>
        </div>
}