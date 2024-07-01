import BackgoundImage from "@/public/background.jpg";
import Image from "next/image";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="relative flex flex-col items-center justify-center bg-neutral-900 p-8 rounded-xl min-h-[400px] h-[calc(100vh-200px)] [perspective:2000px]">
      <Image
        alt="background"
        sizes="100vw"
        src={BackgoundImage}
        className="absolute size-full object-cover rounded-xl z-[-1]"
        priority
      />
      {children}
    </div>
  );
}
