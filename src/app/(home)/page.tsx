'use client';
import { Button } from '../components/Button';
import { ContentWrapper } from './components/Wrapper';

export default function Home() {
  return (
    <div className="">
      <section className="flex flex-col items-center justify-center h-[calc(100dvh-4rem)]">
        <ContentWrapper>
          <div className="flex flex-col items-center justify-center gap-4">
            <div className="flex items-center gap-2">
              <span>Logo</span>
              <span className="px-5">|</span>
              <span>Logo name</span>
            </div>
            <h1 className="text-5xl lg:text-6xl md:w-[40%] text-center font-black">
              Random ipsum coolr Lorem ipsum dolor sit.
            </h1>
            <p className="text-center w-[85%] pt-4 md:w-1/3">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quidem. Lorem ipsum dolor sit amet consectetur, adipisicing elit. Temporibus, quos.
            </p>
          </div>
        </ContentWrapper>
      </section>

      <section>
        <ContentWrapper className="w-full mt-[10rem]">
          <div className="bg-white flex items-center justify-center w-full h-[40rem] mx-auto"></div>
          <div className="flex flex-col items-center justify-center gap-4 mt-[15rem]">
            <h1 className="text-4xl lg:text-6xl md:w-[40%] text-center font-black">
              Random ipsum coolr Lorem ipsum dolor sit.
            </h1>
            <p className="text-center w-[85%] pt-4 md:w-1/3 text-xl">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quidem. Lorem ipsum dolor sit amet consectetur, adipisicing elit. Temporibus, quos.
            </p>
          </div>
        </ContentWrapper>
      </section>

      <section>
        <ContentWrapper className="w-full mt-[25rem]">
          <div className="w-full mx-auto flex flex-col items-center justify-center gap-4">
            <div className="bg-white flex items-center justify-center w-full h-[40rem] mx-auto"></div>
            <div className="flex flex-col items-start justify-center gap-4 mt-8">
              <h2 className="text-4xl lg:text-6xl md:w-[40%] text-left font-black">How it works.</h2>
              <p className="text-left w-[85%] py-4 md:w-1/3 text-xl">
                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Eaque fuga eos, accusamus quisquam porro eligendi quod repellendus illo repudiandae esse?
              </p>
            </div>
          </div>
        </ContentWrapper>
      </section>

      <div className="flex items-center justify-center mt-[10rem] md:mt-[15rem] text-4xl md:text-5xl">Something random.</div>

      <section>
        <ContentWrapper className="w-full mt-[10rem] md:mt-[25rem]">
          <div className="w-full mx-auto flex flex-col items-center justify-center gap-4">
            <div className="bg-white flex items-center justify-center w-full h-[40rem] mx-auto"></div>
            <div className="flex flex-col items-start justify-center gap-4 mt-8">
              <h2 className="text-4xl lg:text-6xl md:w-[40%] text-left font-black">About this project.</h2>
              <p className="text-left w-[85%] py-4 md:w-1/3 text-xl">
                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Eaque fuga eos, accusamus quisquam porro eligendi quod repellendus illo repudiandae esse?
              </p>
            </div>
          </div>
        </ContentWrapper>
      </section>

      <section>
        <ContentWrapper className='w-full mx-auto flex flex-col items-start justify-center gap-4 mt-[5rem] md:mt-[15rem]'>
          <div className="">
            <h2 className='text-[8rem]'>80%</h2>
            <p className='lg:w-1/2 text-xl'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quidem Lorem ipsum dolor sit amet consectetur, adipisicing elit. </p>
          </div>
        </ContentWrapper>
      </section>

      <section className='my-[10rem] md:my-[15rem]'>
        <ContentWrapper>
            <div className="flex flex-col items-center justify-center gap-4">
              <h2 className='text-4xl lg:text-6xl'>Feeling skeptical?</h2>
              <p className='text-xl text-center'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quidem</p>
            </div>
            <div className="flex flex-col md:flex-row items-center justify-between gap-4 mt-8">
              <div className="w-full md:w-1/2 h-[30rem] bg-white"></div>
              <div className="w-full md:w-1/2 h-[30rem] bg-white"></div>
            </div>
        </ContentWrapper>
      </section>
    </div>
  );
}