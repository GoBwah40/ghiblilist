import Image from 'next/image';

interface AvatarProps {
  label: string;
  value: string;
}

const Avatar = ({ label, value }: AvatarProps) => {
  return (
    <div className="flex flex-col items-center gap-2 p-2 text-center">
      <dt className="underline">{label}</dt>
      <Image src="/ghibli_avatar.png" alt="" width={40} height={49} className="rounded" />
      <dd className="text-lg font-bold sm:text-xl">{value}</dd>
    </div>
  );
};

export default Avatar;
