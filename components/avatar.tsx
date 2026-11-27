import Image from 'next/image';

interface AvatarProps {
  label: string;
  value: string;
}

const Avatar = ({ label, value }: AvatarProps) => {
  return (
    <div className="flex flex-col items-center gap-2 p-2 text-center">
      <dt className="text-sm font-semibold tracking-wide text-muted uppercase">{label}</dt>
      <dd className="flex flex-col items-center gap-2 text-lg font-bold sm:text-xl">
        <Image src="/ghibli_avatar.png" alt="" width={40} height={49} className="rounded" />
        {value}
      </dd>
    </div>
  );
};

export default Avatar;
