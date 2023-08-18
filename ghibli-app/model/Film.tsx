class Film {
    desciption: string;
    title: string;
    image: string;
    id: string;
    movie_banner: string;
    original_title_romanised: string;

    constructor(title: string, image:string, description: string, id: string, movie_banner: string, original_title_romanised: string) {
        this.title = title;
        this.desciption = description;
        this.id = id;
        this.image = image;
        this.movie_banner = movie_banner;
        this.original_title_romanised = original_title_romanised;
    }    
}