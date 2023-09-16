import Image from 'next/image';

interface CardProps {
  function?: string;
  name?: string;
}

const Avatar = (info: CardProps) => {
  return (
    <div>
      <div className="grid grid-rows-3 justify-items-center items-center">
        <h1 className="text-center underline">{info?.function}</h1>
        <div className="avatar">
          <div className="w-12 rounded">
            <Image src="/ghibli_avatar.png" alt="Avatar" />
          </div>
        </div>
        <h1 className="text-center p-3 font-bold text-xl">{info?.name}</h1>
      </div>
      <div></div>
    </div>
  );
};
export default Avatar;
