"use client"

import { ContentWrapper } from "@/app/components/Wrapper"
import { Button } from "@/components/ui/button"
import { BookOpen, ExternalLink, ExternalLinkIcon, Heart, Stethoscope } from "lucide-react"
import Link from "next/link"
import { pcosInfo, trustedResources } from "@/app/utils/data";
import { useRef } from "react"
import gsap from "gsap";
import { useGSAP } from "@gsap/react"

const StudiesPage = () => {

  const titleRef = useRef(null);
  const paraRef = useRef(null);

  useGSAP(() => {
    if (!titleRef.current) return;
    if (!paraRef.current) return;

    // Set initial states
    gsap.set(titleRef.current, { clipPath: "inset(100% 0 0 0)" });
    gsap.set(paraRef.current, { opacity: 0, y: 30 });

    // Create timeline for coordinated animations
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: titleRef.current,
        start: "top 80%",
        end: "top 30%",
        scrub: 1,
      },
    });

    // Add animations to timeline
    tl.to(titleRef.current, {
      clipPath: "inset(0% 0 0 0)",
      duration: 1
    })
    .to(paraRef.current, {
      opacity: 1,
      y: 0,
      duration: 0.8
    }); // Start paragraph animation 0.5 seconds before title animation ends

    return () => {
      tl.kill();
    }
  }, [])

  const getCategoryIcon = (index: number) => {
    const icons = [<Stethoscope className="h-4 w-4" />, <Heart className="h-4 w-4" />, <BookOpen className="h-4 w-4" />]
    return icons[index % icons.length]
  }

  return (
    <div className="">
      <section className="flex flex-col items-center justify-center min-h-[calc(100dvh-4rem)]">
        <ContentWrapper>
          <div className="flex flex-col items-center justify-center gap-4">
            <div className="flex items-center gap-2 opacity-75">
              <span>PCOS</span>
              <span className="px-5">|</span>
              <span className='text-sm'>Understanding your health.</span>
            </div>
            <h1 className="text-3xl lg:text-6xl md:w-[47%] text-center font-black">
              Understanding PCOS.
            </h1>
            <p className="text-center w-[85%] md:w-[50%] lg:w-1/3">
              Polycystic Ovary Syndrome (PCOS) affects millions of women. Learn about its symptoms, diagnosis, treatments, and how to live well with this condition.
            </p>
          </div>
        </ContentWrapper>
      </section>

      <section>
        <ContentWrapper className="w-full mt-[5rem]">
          <div className="flex flex-col md:flex-row items-start justify-center md:justify-between gap-4">
            <h2 ref={titleRef} className="text-3xl md:text-4xl lg:text-5xl md:w-[47%] text-left font-black">What is PCOS?</h2>
            <div className="text-left w-full md:w-[50%] lg:w-1/3 text-base opacity-75">
              {pcosInfo.whatIsPcos.map((paragraph, index) => (
                <p ref={paraRef}
                  className="mb-4" key={index}>{paragraph}</p>
              ))}
            </div>
          </div>
        </ContentWrapper>
      </section>

      <section>
        <ContentWrapper className="w-full mt-[10rem]">
          <div className="flex flex-col md:flex-row items-start justify-center md:justify-between gap-4">
            <h2 className="text-3xl md:text-4xl lg:text-5xl md:w-[47%] text-left font-black">What causes PCOS?</h2>
            <div className="text-left w-full md:w-[50%] lg:w-1/3 text-base opacity-75">
              {pcosInfo.cause.map((paragraph, index) => (
                <p className="mb-4" key={index}>{paragraph}</p>
              ))}
            </div>
          </div>
        </ContentWrapper>
      </section>

      <section>
        <ContentWrapper className="w-full mt-[10rem]">
          <div className="w-full mx-auto flex flex-col items-center justify-center gap-4">
            <div className="flex flex-col md:flex-row items-start justify-center md:justify-between gap-4">
              <h2 className="text-4xl md:text-5xl lg:text-6xl md:w-[47%] text-left font-black">Symptoms & Diagnosis.</h2>
              <div className="text-left w-full py-4 md:w-[50%] lg:w-1/3 text-xl">
                <div className="flex flex-col items-start justify-center w-full mx-auto">
                  <div className="flex gap-2 mb-4">
                    <span className="text-lg font-bold">The symptom of PCOS may include:</span>
                  </div>
                  <ul className="w-full lg:w-full py-1 md:w-[50%] text-base opacity-75 space-y-2">
                    {pcosInfo.symptoms.map((symptom, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <span className="text-sm opacity-75">•</span>
                        <span>{symptom}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="flex flex-col items-start justify-center w-full mx-auto mt-8">
                  <div className="flex gap-2 mb-4">
                    <span className="text-lg font-bold">How It's Diagnosed</span>
                  </div>
                  <p className="w-full lg:w-full py-1 md:w-[50%] text-base opacity-75">
                    {pcosInfo.diagnosis}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </ContentWrapper>
      </section>

      <section>
        <ContentWrapper className="w-full mt-[10rem]">
          <div className="flex flex-col md:flex-row items-start justify-center md:justify-between gap-4">
            <h2 className="text-3xl md:text-4xl lg:text-5xl md:w-[47%] text-left font-black">Treatment Options.</h2>
            <p className="text-left w-full md:w-[50%] lg:w-1/3 text-base opacity-75">
              {pcosInfo.treatment}
            </p>
          </div>
        </ContentWrapper>
      </section>

      <section>
        <ContentWrapper className="w-full mt-[10rem]">
          <div className="flex flex-col md:flex-row items-start justify-center md:justify-between gap-4">
            <h2 className="text-3xl md:text-4xl lg:text-5xl md:w-[47%] text-left font-black">Living with PCOS.</h2>
            <p className="text-left w-full md:w-[50%] lg:w-1/3 text-base opacity-75">
              {pcosInfo.livingWithPcos}
            </p>
          </div>

          <div className="flex items-center justify-center mt-20">
            <Button variant="outline" className="rounded-full ">
              <Link href="https://www.hopkinsmedicine.org/health/conditions-and-diseases/polycystic-ovary-syndrome-pcos" target="_blank" className="flex items-center gap-3">
                <ExternalLinkIcon />
                Source
              </Link>
            </Button>
          </div>
        </ContentWrapper>
      </section>

      <section className='mt-[10rem] md:mt-[15rem]'>
        <ContentWrapper>
          <div className="flex flex-col items-center justify-center gap-4">
            <h2 className='text-4xl md:text-5xl lg:text-6xl text-center font-black'>Trusted Resources.</h2>
            <p className='text-base md:w-[50%] lg:w-1/3 text-center opacity-75 pb-10'>
              Access reliable information and support from trusted medical sources and community organizations.
            </p>
          </div>
        </ContentWrapper>
      </section>

      <section>
        <ContentWrapper className="flex flex-col items-start justify-center gap-4 py-10">
          <div className="grid grid-cols-1 md:grid-cols-3 relative gap-6">
            {trustedResources.map((resource, index) => (
              <div
                key={index}
                className="flex flex-col items-start min-h-[10rem] border-[1px] justify-start w-full p-7 rounded-sm hover:shadow-lg transition-shadow"
              >
                <div className="flex gap-2 items-center justify-center mb-4">
                  <span className="flex items-center justify-center">{getCategoryIcon(index)}</span>
                  <span className='text-xs opacity-75'>{resource.caption}</span>
                </div>
                <h3 className="text-2xl md:text-3xl py-5 font-bold w-full">{resource.title}</h3>
                <p className="text-base w-full opacity-75 mb-6">{resource.description}</p>
                <Button size="sm" variant="outline" asChild className="mt-auto">
                  <Link href={resource.link} target="_blank" rel="noopener noreferrer" className="flex items-center">
                    <ExternalLink className="h-3 w-3 mr-1" />
                    Visit Resource
                  </Link>
                </Button>
              </div>
            ))}
          </div>
        </ContentWrapper>
      </section>
    </div>
  )
}

export default StudiesPage