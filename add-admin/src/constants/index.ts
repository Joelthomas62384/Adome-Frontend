import { LANDING_PAGE_MENU, MenuProps } from "./menus";

type AdomeConstantsProbs = {
    landingPageMenu: MenuProps[]
    
  }

export const ADOME_CONSTANTS: AdomeConstantsProbs = {
    landingPageMenu : LANDING_PAGE_MENU,
}




export const prices = [
  {
    price : 0,
    features : [
      "Unlimited users",
      "Website builder",
      "Unlimited Blogs",
      "Subdomain",
      "24/7 support"
    ]
  },
  {
    price : 5000,
    features : [
      "Everything in free",
      "AI Website builder",
      "Unlimited Courses",
      "Custom Domain",
      "24/7 Premium support"
    ]
  }
]