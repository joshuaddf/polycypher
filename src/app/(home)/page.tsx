'use client';
import { Button } from '../components/Button';
import { howItWorks, SecurityInfo } from '../utils/data';
import { ContentWrapper } from '../components/Wrapper';
import { Lock } from 'lucide-react';

export default function Home() {
  return (
    <div className="">
      <section className="flex flex-col items-center justify-center h-[calc(100dvh-4rem)]">
        <ContentWrapper>
          <div className="flex flex-col items-center justify-center gap-4">
            <div className="flex items-center gap-2 opacity-50">
              <span>Logo</span>
              <span className="px-5">|</span>
              <span className='text-sm'>PCOS insights at your fingertips.</span>
            </div>
            <h1 className="text-5xl lg:text-6xl md:w-[47%] text-center font-black">
              Early PCOS Detection Made Simple.
            </h1>
            <p className="text-center w-[85%] md:w-[50%] lg:w-1/3">
              Get personalized insights about PCOS risk through our comprehensive assessment tool. Take control of your reproductive health with evidence-based predictions.
            </p>
          </div>
        </ContentWrapper>
      </section>

      <section>
        <ContentWrapper className="w-full mt-[10rem]">
          <div className="bg-white flex items-center justify-center w-full h-[40rem] mx-auto"></div>
          <div className="flex flex-col items-center justify-center gap-4 mt-[15rem]">
            <h1 className="text-4xl lg:text-5xl md:w-[47%] text-center font-black">
              Understand Your PCOS Risk Today.
            </h1>
            <p className="text-center text-base w-[85%] md:w-[50%] lg:w-1/3 opacity-50">
              Our platform uses advanced analytics to assess your symptoms and provide clear, actionable insights to manage PCOS effectively.
            </p>
          </div>
        </ContentWrapper>
      </section>

      <section>
        <ContentWrapper className="w-full mt-[15rem]">
          <div className="w-full mx-auto flex flex-col items-center justify-center gap-4">
            <div className="bg-white flex items-center justify-center w-full h-[40rem] mx-auto"></div>
            <div className="flex flex-col md:flex-row items-start justify-center md:justify-between gap-4 mt-8">
              <h2 className="text-3xl md:text-4xl lg:text-5xl md:w-[47%] text-left font-black">About this project.</h2>
              <p className="text-left w-[85%] md:w-[50%] lg:w-1/3 text-base opacity-65">
                Developed in collaboration with reproductive health specialists, our platform combines clinical expertise with machine learning to help women identify PCOS symptoms early and seek appropriate medical care.
              </p>
            </div>
          </div>
        </ContentWrapper>
      </section>

      <ContentWrapper>
        <div className="flex flex-col items-center justify-center mt-[10rem] lg:max-w-3/5 mx-auto  md:mt-[20rem] text-2xl font-black md:text-4xl">
          <p className='text-center'>1 in 10 women have PCOS. <br /> Are you one of them? Early detection changes everything.</p>
        </div>
      </ContentWrapper>

      <section>
        <ContentWrapper className="w-full mt-[10rem] md:mt-[25rem]">
          <div className="w-full mx-auto flex flex-col items-center justify-center gap-4">
            <div className="bg-white flex items-center justify-center w-full h-[40rem] mx-auto"></div>
            <div className="flex flex-col md:flex-row items-start justify-center md:justify-between gap-4 mt-8">
              <h2 className="text-4xl md:text-5xl lg:text-6xl md:w-[47%] text-left font-black">How it works.</h2>
              <div className="text-left w-[85%] py-4 md:w-[50%] lg:w-1/3 text-xl">
                {howItWorks.map((item, index) => (
                  <div key={index} className="flex flex-col items-center justify-center pb-5">
                    <div className=" flex flex-col items-start justify-center w-full mx-auto">
                      <div className="flex gap-2">
                        <span>({index + 1})</span>
                        <h2 className='text-lg font-bold'>{item.title}</h2>
                      </div>
                      <p className=" w-[85%] lg:w-full py-1 md:w-[50%] text-base opacity-65">{item.description}.</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </ContentWrapper>
      </section>

      <section>
        <ContentWrapper className='w-full mx-auto flex flex-col items-start justify-center gap-4 mt-[5rem] md:mt-[15rem]'>
          <div className="">
            <h2 className='text-[8rem]'>85%</h2>
            <p className=' md:w-[50%] text-base md:text-lg opacity-65'>Clinical accuracy rate in identifying PCOS risk factors based on validation studies.</p>
          </div>
        </ContentWrapper>
      </section>

      <section className='my-[10rem] md:my-[15rem]'>
        <ContentWrapper>
          <div className="flex flex-col items-center justify-center gap-4">
            <h2 className='text-4xl md:text-5xl lg:text-6xl'>Feeling skeptical?</h2>
            <p className='text-base md:w-[50%] lg:w-1/3 text-center opacity-65'>Our assessment is based on peer-reviewed research and validated clinical criteria used by healthcare professionals worldwide.</p>
          </div>
        </ContentWrapper>
      </section>

      <section>
        <ContentWrapper className="flex flex-col items-start justify-center gap-4 my-[8rem] md:my-[12rem] lg:my-[15rem]">
          <h2 className="text-4xl md:text-5xl lg:text-6xl md:w-[50%] text-left font-black mb-10">
            Built with strong security and Privacy.
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 relative">
            {SecurityInfo.map((info, index) => (
              <div
                key={index}
                className="flex flex-col items-start min-h-[10rem] border-[1px] justify-start  w-full p-7 rounded-sm"
              >
                <div className="flex gap-2 items-center justify-center">
                  <span className=" flex items-center justify-center">{info.icon}</span>
                  <span className='text-sm opacity-50'>{info.caption}</span>
                </div>
                <h3 className="text-2xl md:text-3xl py-5 font-bold md:w-2/3">{info.title}</h3>
                <p className="text-base w-full opacity-55">{info.description}</p>
              </div>
            ))}
            <div className="hidden md:flex absolute top-[49.5%] left-1/2 -translate-x-1/2 -translate-y-1/2  items-center justify-center ">
              <span className='size-4 flex items-center justify-center text-3xl font-light'>+</span>
            </div>
          </div>
        </ContentWrapper>
      </section>
    </div>
  );
}