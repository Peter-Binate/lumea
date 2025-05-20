import Image from 'next/image';

export default function LogoImage() {
  return (
    <div className="absolute bottom-0 left-0">
      <Image
        src="/images/lumea_logo.png"
        alt="Logo de Lumea"
        width={380}
        height={380}
        className="object-contain"
      />
    </div>
  );
}
