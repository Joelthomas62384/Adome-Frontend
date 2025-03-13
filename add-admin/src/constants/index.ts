
import axiosInstance from "@/axios/public-instance";
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



export const getTwoLetters = (full_name:string|undefined) => {
  if (!full_name) return; 
  const splittedName = full_name.split(" ");
  if (splittedName.length > 1) {
    return splittedName[0][0] + splittedName[1][0];
  } else {
    return full_name[0];
  }
};
export const getLetters = (words: string): string => {
  if (!words.trim()) return ''; 
  

  return words
    .split(' ') 
    .map(word => word.charAt(0)) 
    .join('')
    .toUpperCase();
};
