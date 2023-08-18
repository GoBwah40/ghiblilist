class Film {
    description: string;
    title: string;
    image: string;
    id: string;
    movie_banner: string;
    original_title_romanised: string;
    original_title: string;
    release_date: string;
    rt_score: string;
    running_time: string;
    producer: string;
    director: string;
    
    constructor(
        description: string,
        title: string,
        image: string,
        id: string,
        movie_banner: string,
        original_title_romanised: string,
        original_title: string,
        release_date: string,
        rt_score: string,
        running_time: string,
        producer: string,
        director: string
      ) {
        this.description = description;
        this.title = title;
        this.image = image;
        this.id = id;
        this.movie_banner = movie_banner;
        this.original_title_romanised = original_title_romanised;
        this.original_title = original_title;
        this.release_date = release_date;
        this.rt_score = rt_score;
        this.running_time = running_time;
        this.producer = producer;
        this.director = director;
      }
}