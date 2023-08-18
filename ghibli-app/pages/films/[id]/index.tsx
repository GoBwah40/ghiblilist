import { useRouter } from "next/router";
import { title } from "process";

export default function FilmPage({
    params,
    searchParams,
  }: {
    params: { id: string }
    searchParams?: { [key: string]: string | string[] | undefined }
  }) {
    const router = useRouter();
    const { id } = router.query;
    const film: Film = () async: any => {

    }

return <div>
       Film Page
       <p>{title}</p>
    </div>
}