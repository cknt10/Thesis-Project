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
    this.start();

    /*
    if(this.recoService_.getCookie("dy_uId")){
      this.fetchProducts();

      this.recoService_.getTest();
    }
    else{

     this.recoService_.getTest();
    }
    */
  }

  async start(){

    await this.fetchProducts();
    try{
      const variant: any = await this.recoService_.getTest();
      console.log("isn", variant.choices[0].name = "CK: A/B Test Bubble",  variant.choices[0].variations[0].payload.data.variation);

    } catch(e){

    }
    //eig reload mit der Referenz
    this.fetchProducts();
  }

  async fetchProducts(){

    let newProducts = await this.recoService_.getProducts();
    this.items = newProducts;
    let temp :ProductCard[]= [];
    this.items = this.items.concat(temp);
    console.log("fetch items", this.items);
  }

}
