import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductCard } from './interfaces/ProductCard';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'remote-pdp-angular';

  item: ProductCard;

  tempItems : ProductCard[] = [
    {
      id: 1,
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
      id: 2,
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
      id: 3,
      headline: 'The Chiller',
      description: 'Das Alpaka friert jetzt.',
      categories: ["Home"],
      tag: ["Ez-Wear", "Slim", "Bio"],
      badges: [],
      sizes:["S","M","L","XL"],
      price: 16.95,
      imgSrc: 'https://kk-ck-microfrontend.s3.eu-central-1.amazonaws.com/recommendation/white.png'
    },
  ]


  constructor(private route: ActivatedRoute){
    this.item = {
      id: 0,
      headline: '',
      description: '',
      categories: [],
      tag: [],
      badges: [],
      sizes:[],
      price: 0,
      imgSrc: ''
    }
  }



  ngOnInit() {
    this.route.queryParams
      .subscribe(params => {
        console.log(params); // { orderby: "price" }
        console.log("snap",this.route.snapshot.url[0]);
        this.tempItems.forEach(value => {
          /*
          if(value.id == params['id']){
            this.item = value;
          }
          */

          if(value.id.toString() == this.route.snapshot.url[0].path){
            this.item = value;
          }
        })

      }
    );
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
