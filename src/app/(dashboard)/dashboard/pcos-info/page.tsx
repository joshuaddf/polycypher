"use client"

import { ContentWrapper } from "@/app/components/Wrapper"
import { cn } from "@/lib/utils"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { BookOpen, ExternalLink, Heart, Stethoscope } from "lucide-react"
import Link from "next/link"

const StudiesPage = () => {
  const pcosInfo = {
    whatIsPcos: "Polycystic Ovary Syndrome (PCOS) is a common hormonal disorder affecting women of reproductive age. It’s characterized by irregular menstrual cycles, excess androgen levels, and polycystic ovaries. PCOS can impact fertility, weight, and overall health, affecting about 1 in 10 women worldwide.",
    symptoms: [
      "Irregular or missed periods",
      "Excess hair growth (hirsutism)",
      "Acne or oily skin",
      "Weight gain or difficulty losing weight",
      "Thinning hair or hair loss",
      "Darkened skin patches",
    ],
    diagnosis: "PCOS is diagnosed through a combination of symptoms, physical exams, and tests. Doctors often look for at least two of these: irregular periods, high androgen levels (via blood tests), or polycystic ovaries (via ultrasound). Other conditions may be ruled out first.",
    treatment: "Treatment focuses on managing symptoms and preventing complications. Options include lifestyle changes like diet and exercise, medications such as birth control pills or metformin, and fertility treatments if needed. Consult a healthcare provider for a tailored plan.",
    livingWithPcos: "Managing PCOS is possible with the right strategies. Focus on a balanced diet, regular physical activity, and stress reduction. Connecting with support groups or healthcare professionals can also improve your quality of life.",
  }

  const trustedResources = [
    {
      title: "PCOS Basics",
      description: "Simple, clear info on PCOS symptoms and treatments.",
      link: "https://medlineplus.gov/polycysticovarysyndrome.html",
    },
    {
      title: "PCOS Treatment Guide",
      description: "Explore treatments from medications to lifestyle changes.",
      link: "https://www.womenshealth.gov/a-z-topics/polycystic-ovary-syndrome",
    },
    {
      title: "PCOS Support Network",
      description: "Join others for support and practical advice.",
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
        {/* Header Section */}
        <div className="border-[1px] rounded-2xl p-6 bg-foreground">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">Understanding PCOS</h1>
          <p className="text-background text-sm md:text-base max-w-2xl">
            Polycystic Ovary Syndrome (PCOS) affects millions of women. Learn about its symptoms, diagnosis, treatments, and how to live well with this condition.
          </p>
        </div>

        {/* What is PCOS */}
        <div className="border-[1px] rounded-2xl p-4 md:p-6">
          <h2 className="text-xl md:text-2xl font-semibold mb-4 flex items-center gap-2">
            <BookOpen className="h-5 w-5" />
            What is PCOS?
          </h2>
          <p className="text-sm md:text-base">{pcosInfo.whatIsPcos}</p>
        </div>

        {/* Symptoms and Diagnosis */}
        <div className="border-[1px] rounded-2xl p-4 md:p-6">
          <h2 className="text-xl md:text-2xl font-semibold mb-4 flex items-center gap-2">
            <Stethoscope className="h-5 w-5" />
            Symptoms & Diagnosis
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h3 className="text-lg font-medium mb-2">Common Symptoms</h3>
              <ul className="list-disc list-inside text-sm md:text-base">
                {pcosInfo.symptoms.map((symptom, index) => (
                  <li key={index}>{symptom}</li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-medium mb-2">How It’s Diagnosed</h3>
              <p className="text-sm md:text-base">{pcosInfo.diagnosis}</p>
            </div>
          </div>
        </div>

        {/* Treatment Options */}
        <div className="border-[1px] rounded-2xl p-4 md:p-6">
          <h2 className="text-xl md:text-2xl font-semibold mb-4 flex items-center gap-2">
            <Heart className="h-5 w-5" />
            Treatment Options
          </h2>
          <p className="text-sm md:text-base">{pcosInfo.treatment}</p>
        </div>

        {/* Living with PCOS */}
        <div className="border-[1px] rounded-2xl p-4 md:p-6">
          <h2 className="text-xl md:text-2xl font-semibold mb-4 flex items-center gap-2">
            <BookOpen className="h-5 w-5" />
            Living with PCOS
          </h2>
          <p className="text-sm md:text-base">{pcosInfo.livingWithPcos}</p>
        </div>

        {/* Trusted Resources */}
        <div className="border-[1px] rounded-2xl p-4 md:p-6">
          <h2 className="text-xl md:text-2xl font-semibold mb-4 flex items-center gap-2">
            <BookOpen className="h-5 w-5" />
            Trusted Resources
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {trustedResources.map((resource, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader className="p-4">
                  <div className="flex items-center gap-1 mb-2">
                    {getCategoryIcon(index)}
                    <CardDescription className="text-xs">{resource.title}</CardDescription>
                  </div>
                  <CardTitle className="text-base md:text-lg">{resource.title}</CardTitle>
                </CardHeader>
                <CardContent className="p-4 space-y-4">
                  <p className="text-sm">{resource.description}</p>
                  <Button size="sm" variant="outline" asChild>
                    <Link href={resource.link} target="_blank" rel="noopener noreferrer" className="flex items-center">
                      <ExternalLink className="h-3 w-3 mr-1" />
                      Visit Resource
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </ContentWrapper>
    </section>
  </>
  )
}

export default StudiesPage