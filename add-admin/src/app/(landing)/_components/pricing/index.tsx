import BackdropGradient from "@/components/global/backdrop-gradiant"
import GradientText from "@/components/global/gradiant-text"
import PricingCard from "@/components/pricing-carrd"
import { Button } from "@/components/ui/button"
import { Card, CardDescription, CardTitle } from "@/components/ui/card"
import { Check } from "@/icons"
import Link from "next/link"

type Props = {}

export const PricingSection = (props: Props) => {
  return (
    <div className="w-full pt-20 flex flex-col items-center gap-3" id="pricing">
      <BackdropGradient className="w-8/12 h-full opacity-40 flex flex-col items-center">
        <GradientText
          className="text-4xl font-semibold text-center"
          element="H2"
        >
          Pricing Plans That Fit Your Right
        </GradientText>
        <p className="text-sm md:text-center text-left text-muted-foreground">
          Grouple is a vibrant online community platform that empowers people to
          connect, <br className="hidden md:block" />
          collaborate, and cultivate meaningful relationships
        </p>
      </BackdropGradient>
    
    <div className="flex gap-36">
    <PricingCard />
    <PricingCard />
    <PricingCard />
    </div>
    </div>
  )
}