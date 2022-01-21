import { Component, NgZone, OnInit } from '@angular/core';
import { ProductCard } from 'src/app/interfaces/ProductCard';
import { RecommendationService } from 'src/app/services/recommendation.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  public items: ProductCard[]= [];

  constructor(private recoService_: RecommendationService) {}

  ngOnInit(): void {
    console.log("init Reco-Home");
    //this.fetchProducts();
  }

  async fetchProducts(){

    let newProducts = await this.recoService_.getProducts("ka");
    // this.items.push(newProducts);
    this.items = newProducts;
    let temp :ProductCard[]= [];
    this.items = this.items.concat(temp);
    console.log("fetch items", this.items);
  }

}
