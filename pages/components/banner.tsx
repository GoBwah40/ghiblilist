interface CardProps {
  image?: string;
  title?: string;
  titre_romanji?: string;
}

const Banner: React.FC<CardProps> = (info: CardProps) => {
  return (
    <div
      className="hero rounded-xl border-solid border-4 h-80"
      style={{
        backgroundImage: `url(${info?.image})`,
        borderColor: 'rgb(7, 157, 236)',
      }}
    >
      <div className="hero-overlay bg-opacity-60 h-32">
        <div className="flex hero-content text-center text-neutral-content">
          <div className=" content-center">
            <h1 className="mb-5 text-5xl font-bold text-center">{info?.title}</h1>
            <h2 className="mb-5 text-3xl font-bold">{info?.titre_romanji}</h2>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Banner;
