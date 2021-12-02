import { Component } from '@angular/core';
import { ProductCard } from './interfaces/ProductCard';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'remote-pdp-angular';


  firstItem: ProductCard = {
    headline: "Martha's Hoodie",
    description: 'Feminime Bequemlichkeit im Urban-Style.',
    categories: ["Women, Kids"],
    tag: ["Ez-Wear", "Spotlight", "Home"],
    badges: ["Allrounder"],
    sizes:["S","M","L","XL"],
    price: 27.00,
    imgSrc: 'https://kk-ck-microfrontend.s3.eu-central-1.amazonaws.com/recommendation/pink.png'
  }

  /*
    firstItem: ProductCard = {
    headline: "Martha's Hoodie",
    description: 'Feminime Bequemlichkeit im Urban-Style.',
    categories: ["Women, Kids"],
    tag: ["Ez-Wear", "Spotlight", "Home"],
    badges: ["Allrounder"],
    price: 27.00,
    imgSrc: 'https://kk-ck-microfrontend.s3.eu-central-1.amazonaws.com/recommendation/pink.png'
  }

  secondItem: ProductCard = {
    headline: 'The Roadrunner',
    description: 'Für heiße Sohlen an kühlen Tagen.',
    categories: ["Sports"],
    tag: ["Ez-Wear", "Outdoor", "Fitness"],
    badges: ["Dauerbrenner"],
    price: 34.00,
    imgSrc: 'https://kk-ck-microfrontend.s3.eu-central-1.amazonaws.com/recommendation/shoe.png'
  }

  thirdItem: ProductCard = {
    headline: 'The Chiller',
    description: 'Das Alpaka friert jetzt.',
    categories: ["Home"],
    tag: ["Ez-Wear", "Slim", "Bio"],
    badges: [],
    price: 16.95,
    imgSrc: 'https://kk-ck-microfrontend.s3.eu-central-1.amazonaws.com/recommendation/white.png'
  }
  */
}
