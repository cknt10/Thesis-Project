import { Component, NgZone, OnInit } from '@angular/core';
import { ProductCard } from 'src/app/interfaces/ProductCard';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  public items: ProductCard[]= [];

  firstItem: ProductCard = {
    id: 1,
    headline: "Martha's Hoodie",
    description: 'Feminime Bequemlichkeit im Urban-Style.',
    categories: ["Women, Kids"],
    tag: ["Ez-Wear", "Spotlight", "Home"],
    badges: ["Allrounder"],
    price: 27.00,
    imgSrc: 'https://kk-ck-microfrontend.s3.eu-central-1.amazonaws.com/recommendation/pink.png'
  }

  secondItem: ProductCard = {
    id: 2,
    headline: 'The Roadrunner',
    description: 'Für heiße Sohlen an kühlen Tagen.',
    categories: ["Sports"],
    tag: ["Ez-Wear", "Outdoor", "Fitness"],
    badges: ["Dauerbrenner"],
    price: 34.00,
    imgSrc: 'https://kk-ck-microfrontend.s3.eu-central-1.amazonaws.com/recommendation/shoe.png'
  }

  thirdItem: ProductCard = {
    id: 3,
    headline: 'The Chiller',
    description: 'Das Alpaka friert jetzt.',
    categories: ["Home"],
    tag: ["Ez-Wear", "Slim", "Bio"],
    badges: [],
    price: 16.95,
    imgSrc: 'https://kk-ck-microfrontend.s3.eu-central-1.amazonaws.com/recommendation/white.png'
  }

  constructor() { }

  ngOnInit(): void {

  }

  addItem(){

    this.items.push(this.firstItem);

    this.items.push(this.secondItem);
    this.items.push(this.thirdItem);

    let temp :ProductCard[]= [];
    this.items = this.items.concat(temp);
    console.log("items", this.items);
  }

}
