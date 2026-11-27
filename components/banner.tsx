import Image from 'next/image';

interface BannerProps {
  image: string;
  title: string;
  subtitle: string;
}

const Banner = ({ image, title, subtitle }: BannerProps) => {
  return (
    <div className="relative h-48 overflow-hidden rounded-xl border-4 border-ghibli sm:h-64 lg:h-80">
      <Image
        src={image}
        alt=""
        fill
        sizes="(min-width: 1024px) 66vw, 100vw"
        className="object-cover"
      />
      <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/50 p-4 text-center">
        <p className="text-3xl font-bold sm:text-5xl" lang="ja">
          {title}
        </p>
        <p className="mt-2 text-xl font-bold sm:text-3xl">{subtitle}</p>
      </div>
    </div>
  );
};

export default Banner;
