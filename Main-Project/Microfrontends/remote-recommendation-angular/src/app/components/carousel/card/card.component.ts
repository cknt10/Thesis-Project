import { Component, Input, OnInit } from '@angular/core';
import { ProductCard } from 'src/app/interfaces/ProductCard';
import { Router } from '@angular/router';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {

  private router: Router;

  @Input() item: ProductCard = {
    id: 0,
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

  constructor(r: Router) {
    this.router = r;
  }

  ngOnInit(): void {

  }

  routeToPDP(){
    console.log(this.router.url, this.item.id, "my log");
    //this.router.navigate(['./pdp']);
    //this.router.navigate(['/pdp', `${this.item.id}`]);
    this.router.navigate(['/pdp', `${this.item.id}`]).then(()=>{

    // @ts-ignore
    window.JSLib.push(["update","CK: A/B Test Relocation colorize-bundles"]);
    });
  }

}
