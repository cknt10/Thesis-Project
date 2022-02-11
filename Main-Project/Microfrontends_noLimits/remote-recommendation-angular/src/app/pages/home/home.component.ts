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

    if(this.recoService_.getCookie("dy_uId")){
      this.fetchProducts();

      this.recoService_.getTest();
    }
    else{

     this.recoService_.getTest();
    }
  }

  async fetchProducts(){

    let newProducts = await this.recoService_.getProducts();
    this.items = newProducts;
    let temp :ProductCard[]= [];
    this.items = this.items.concat(temp);
    console.log("fetch items", this.items);
  }

}
