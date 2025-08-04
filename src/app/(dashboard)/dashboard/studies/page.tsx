"use client"

import { ContentWrapper } from "@/app/components/Wrapper"
import { cn } from "@/lib/utils"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { BookOpen, ExternalLink, Heart, Stethoscope } from "lucide-react"
import Link from "next/link"


const StudiesPage = () => {
  const keyStudies = [
    {
      id: 1,
      title: "PCOS Diagnosis Guidelines",
      summary: "A 2023 study outlines criteria for diagnosing PCOS using hormone tests and ultrasound.",
      link: "https://www.nichd.nih.gov/health/topics/pcos",
    },
    {
      id: 2,
      title: "Lifestyle Changes for PCOS",
      summary: "A 2023 study found diet and exercise can reduce PCOS symptoms like weight gain.",
      link: "https://ovarianresearch.biomedcentral.com/articles/10.1186/s13048-022-01072-3",
    },
    {
      id: 3,
      title: "Genetic Factors in PCOS",
      summary: "A 2024 study identified genes linked to PCOS, explaining family patterns.",
      link: "https://www.nature.com/articles/s41598-024-75719-0",
    },
  ]

  const trustedResources = [
    {
      title: "PCOS Basics",
      description: "Easy-to-read info on PCOS symptoms and treatments.",
      link: "https://medlineplus.gov/polycysticovarysyndrome.html",
    },
    {
      title: "PCOS Treatment Options",
      description: "Guide to PCOS treatments including medications and lifestyle changes.",
      link: "https://www.womenshealth.gov/a-z-topics/polycystic-ovary-syndrome",
    },
    {
      title: "PCOS Support Community",
      description: "Connect with others for PCOS support and advice.",
      link: "https://pcoschallenge.org",
    },
  ]

  const getCategoryIcon = (index: number) => {
    const icons = [<Stethoscope className="h-4 w-4" />, <Heart className="h-4 w-4" />, <BookOpen className="h-4 w-4" />]
    return icons[index % icons.length]
  }

  return (
    <>
      <section className="mt-5">
        <ContentWrapper className="max-w-[1440px] space-y-6">
          {/* Introduction */}
          <div className="border-[1px] rounded-2xl p-6 bg-foreground">
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">PCOS Studies & Resources</h1>
            <p className="text-background text-sm md:text-base max-w-2xl">
              PCOS is a common hormonal condition that can affect periods, weight, and fertility. Explore key research and trusted resources to learn more.
            </p>
          </div>

          {/* Key Studies */}
          <div className="border-[1px] rounded-2xl p-2 md:p-4">
            <h2 className="text-xl md:text-2xl font-semibold mb-4 flex items-center gap-2">
              <BookOpen className="h-5 w-5" />
              Key Studies
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {keyStudies.map((study) => (
                <Card key={study.id} className="w-full h-full">
                  <CardHeader className="">
                    <CardTitle className="text-base md:text-lg">{study.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="pt-0 space-y-3">
                    <p className="text-sm">{study.summary}</p>
                    <Button size="sm" variant="outline" asChild>
                      <Link href={study.link} target="_blank" rel="noopener noreferrer" className="flex items-center">
                        <ExternalLink className="h-3 w-3 mr-1" />
                        Learn More
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Trusted Resources */}
          <div className="border-[1px] rounded-2xl p-4 md:p-6">
            <h2 className="text-xl md:text-2xl font-semibold mb-4 flex items-center gap-2">
              <BookOpen className="h-5 w-5" />
              Trusted Resources
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {trustedResources.map((resource, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow">
                  <CardHeader className="pb-3">
                    <div className="flex items-center gap-1 mb-2">
                      {getCategoryIcon(index)}
                      <CardDescription className="text-xs ">{resource.title}</CardDescription>
                    </div>
                    <CardTitle className="text-base md:text-lg">{resource.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="pt-0 space-y-3">
                    <p className="text-sm ">{resource.description}</p>
                    <Button size="sm" variant="outline" asChild>
                      <a href={resource.link} target="_blank" rel="noopener noreferrer" className="flex items-center">
                        <ExternalLink className="h-3 w-3 mr-1" />
                        Visit Resource
                      </a>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Clinical Trials */}
          {/* <div className="border-[1px] rounded-2xl p-4 md:p-6">
            <h2 className="text-xl md:text-2xl font-semibold mb-4 flex items-center gap-2">
              <Stethoscope className="h-5 w-5" />
              Clinical Trials
            </h2>
            <Card className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6 space-y-3">
                <p className="text-sm">
                  Explore ongoing PCOS clinical trials to learn about new treatments and how to participate.
                </p>
                <Button size="sm" variant="outline" asChild>
                  <a
                    href="https://clinicaltrials.gov/ct2/results?cond=PCOS"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center"
                  >
                    <ExternalLink className="h-3 w-3 mr-1" />
                    Find Trials
                  </a>
                </Button>
              </CardContent>
            </Card>
          </div> */}
        </ContentWrapper>
      </section>
    </>
  )
}

export default StudiesPage