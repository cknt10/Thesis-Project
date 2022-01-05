import { ProductCard } from "../interfaces/ProductCard";

const tempItems : ProductCard[] = [
    {
      id: "1",
      headline: "Martha's Hoodie",
      description: 'Feminime Bequemlichkeit im Urban-Style.',
      categories: ["Women, Kids"],
      tag: ["Ez-Wear", "Spotlight", "Home"],
      badges: ["Allrounder"],
      sizes:["S","M","L","XL"],
      price: 27.00,
      imgSrc: 'https://kk-ck-microfrontend.s3.eu-central-1.amazonaws.com/recommendation/pink.png'
    },
    {
      id: "2",
      headline: 'The Roadrunner',
      description: 'Für heiße Sohlen an kühlen Tagen.',
      categories: ["Sports"],
      tag: ["Ez-Wear", "Outdoor", "Fitness"],
      badges: ["Dauerbrenner"],
      sizes:["32","38","42","45"],
      price: 34.00,
      imgSrc: 'https://kk-ck-microfrontend.s3.eu-central-1.amazonaws.com/recommendation/shoe.png'
    },
    {
      id: "3",
      headline: 'The Chiller',
      description: 'Das Alpaka friert jetzt.',
      categories: ["Home"],
      tag: ["Ez-Wear", "Slim", "Bio"],
      badges: [],
      sizes:["S","M","L","XL"],
      price: 16.95,
      imgSrc: 'https://kk-ck-microfrontend.s3.eu-central-1.amazonaws.com/recommendation/white.png'
    },
    {
      id: "4",
      headline: 'Ghoul Shirt',
      description: 'Ein wahrer Tokyo Ghoul-Fan kommt daran nicht vorbei, wenn er in Tokyos Seitenstraßen einbiegen will.',
      categories: ["Urban"],
      tag: ["Ez-Wear","Slim","Sub-Culture"],
      badges: [],
      sizes:["S","M","L","XL"],
      price: 30.90,
      imgSrc: 'https://kk-ck-microfrontend.s3.eu-central-1.amazonaws.com/recommendation/ghoul.png'
    },
    {
      id: "5",
      headline: 'Neon Abyss-Aufnäher',
      description: 'AAA war gestern.',
      categories: ["Home"],
      tag: ["Ez-Wear","Gaming"],
      badges: ["Premium"],
      sizes:["8x6cm"],
      price: 8.95,
      privileges: ["VIP"],
      imgSrc: 'https://kk-ck-microfrontend.s3.eu-central-1.amazonaws.com/recommendation/abyss.png'
    }
]

export { tempItems };