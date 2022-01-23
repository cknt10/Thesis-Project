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

    if(localStorage.getItem("voodo reco-bubble")){
      this.fetchProducts();
    }
    else{

      // @ts-ignore
      window.JSLib.push(["add","recommendation","CK: A/B Test Bubble",async (event) =>{
        for(let key in event){

          if(event[key].experimentName === "CK: A/B Test Bubble"){

            if(event[key].variant/* === 1*/){
              await this.fetchProducts();
              localStorage.setItem("voodo reco-bubble", event[key].variant);
            }
          }
        }

      }]);
    }

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
