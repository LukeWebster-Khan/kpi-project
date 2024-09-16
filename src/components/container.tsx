export default function Container({ children }: { children: React.ReactNode }) {
  return (
    <div className="mx-3 mt-7 h-[616px] lg:w-[876px] bg-white md:rounded-lg overflow-hidden rounded-tr-[9px] shadow-md flex md:flex-row flex-col md:mx-auto animate-[intro_0.3s_0.2s_backwards]">
      {children}
    </div>
  );
}
