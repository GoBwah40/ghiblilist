import Image from 'next/image';

interface CardProps {
  info: {
    function: string;
    name: string;
  };
}

export const Avatar: React.FC<CardProps> = (info) => {
  return (
    <div>
      <div className="grid grid-rows-3 justify-items-center items-center">
        <h1 className="text-center underline">{info.info.function}</h1>
        <div className="avatar">
          <div className="w-12 rounded">
            <Image src="/ghibli_avatar.png" alt="Avatar" />
          </div>
        </div>
        <h1 className="text-center p-3 font-bold text-xl">{info.info.name}</h1>
      </div>
      <div></div>
    </div>
  );
};
