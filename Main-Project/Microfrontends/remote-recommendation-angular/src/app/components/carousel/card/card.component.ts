import { Component, Input, OnInit } from '@angular/core';
import { ProductCard } from 'src/app/interfaces/ProductCard';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {

  @Input() item: ProductCard = {
    headline: '',
    description: '',
    categories: [],
    tag: [],
    badges: [],
    price: 0,
    imgSrc: ''
  };

  // public card: ProductCard={
  //   headline: 'Produkt 1',
  //   description: 'Haben wir gestestet und gefällt jedem',
  //   categories: ["Senior, Kids"],
  //   tag: ["Ez-Wear", "Spolight", "Wedding"],
  //   badges: ["Allrounder"],
  //   price: 27.00,
  //   imgSrc: 'https://sc04.alicdn.com/kf/Ua492f96639a44f56a19d89def7ed9d595.jpg'
  // }

  constructor() { }

  ngOnInit(): void {

  }

}
