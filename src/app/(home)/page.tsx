export default function Home() {
  return (
    <section className="flex flex-col items-center justify-center h-screen">
      <div className="flex flex-col items-center justify-center gap-4">
        <div className="flex items-center gap-2">
          <span>Logo</span>
          <span className="px-5">|</span>
          <span>Logo name</span>
        </div>
        <h1 className="text-5xl md:text-6xl md:w-[40%] text-center font-black">Lorem ipsum dolor Lorem ipsum dolor sit.</h1>
        <p className="text-center w-[85%] md:w-1/3">Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quidem. Lorem ipsum dolor sit amet consectetur, adipisicing elit. Temporibus, quos.</p>
      </div>

      {/* <div className="bg-white w-full h-[20rem] pt-30"></div> */}
    </section>
  );
}
