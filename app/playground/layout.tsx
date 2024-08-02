export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div
      className="relative flex flex-col items-center justify-center bg-neutral-900 p-8 rounded-xl min-h-[400px] h-[calc(100vh-200px)] [perspective:2000px]"
      style={{
        backgroundImage:
          "linear-gradient(to bottom left, transparent 20%, pink, rgb(55,0,85)), radial-gradient(100% 90% at 0% 100%, transparent 80%, rgba(10,10,10,0.8)),repeating-linear-gradient(340deg, rgb(30,30,30) 0%, rgb(30,30,30) 5%, rgb(200,200,255) 9.9%, rgb(30,30,30) 10%)",
        backgroundBlendMode: "darken, normal, normal",
      }}
    >
      {children}
    </div>
  );
}
