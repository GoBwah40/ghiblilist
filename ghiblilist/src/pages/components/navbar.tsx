import Link from "next/link";

export const Navbar:React.FC = () => {
    return <div className="navbar bg-neutral-content flex h-16">
        <div className="navbar-start h-16">
            <Link href={"/"} className="btn btn-ghost">
                    <img src="/logoMGL.png" alt="logo" className="h-10"></img>
                </Link>
        </div>
        <div className="navbar-center h-16">
            <div className="form-control">
                <input type="text" placeholder="Rechercher..." className="input input-bordered w-24 md:w-auto" />
            </div>
        </div>
        <div className="navbar-end h-16">
            <div className="px-3 btn btn-ghost normal-case text-xl">
                <Link href={"/tests"}>
                    1er
                </Link>
            </div>
            <div className="px-3 btn btn-ghost normal-case text-xl">2eme</div>
            <div className="px-3 btn btn-ghost normal-case text-xl">3eme</div>
        </div>
    </div>;
}