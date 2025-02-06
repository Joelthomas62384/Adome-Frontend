import { Check } from 'lucide-react'
import React from 'react'
import { Card, CardDescription, CardTitle } from '../ui/card'
import Link from 'next/link'
import { Button } from '../ui/button'

type Props = {}

const PricingCard = (props: Props) => {
  return (
    <Card className="p-7 mt-10 md:w-auto w-full bg-themeBlack border-themeGray">
    <div className="flex flex-col gap-2">
      <CardTitle>99/m</CardTitle>
      <CardDescription className="text-[#B4B0AE]">
        Great if you’re just getting started
      </CardDescription>
      <Link href="#" className="w-full mt-3">
        <Button
          variant="default"
          className="bg-[#333337] w-full rounded-2xl text-white hover:text-[#333337]"
        >
          Start for free
        </Button>
      </Link>
    </div>
    <div className="flex flex-col gap-2 text-[#B4B0AE] mt-5">
      <p>Features</p>
      <span className="flex gap-2 mt-3 items-center">
        <Check />
        Feature number 1
      </span>
      <span className="flex gap-2 items-center">
        <Check />
        Feature number 1
      </span>
      <span className="flex gap-2 items-center">
        <Check />
        Feature number 1
      </span>
      <span className="flex gap-2 items-center">
        <Check />
        Feature number 1
      </span>
      <span className="flex gap-2 items-center">
        <Check />
        Feature number 1
      </span>
    </div>
  </Card>
  )
}

export default PricingCard