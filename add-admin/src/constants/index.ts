
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

export const getSubdomain = (): string => {
  if (typeof window !== "undefined") {
      const hostname = window.location.hostname; 
      const parts = hostname.split(".");

      const localhostIndex = parts.indexOf("localhost");
      if (localhostIndex > 0) {
          return parts.slice(0, localhostIndex).join("."); 
      }
  }
  return "public"; 
};
