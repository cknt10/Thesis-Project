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
    this.start();

  }

  async start(){
    await this.fetchProducts();
    if(this.recoService_.getCookie("dy_uId")){
      this.fetchProducts();
    }
    else{

      // @ts-ignore
      window.JSLib.push(["add","recommendation","CK: A/B Test Bubble",async (event) =>{

        console.log("the event", event);
        //for(let key in event){

          //if(event[key].experimentName === "CK: A/B Test Bubble"){

            if(event.variant){
              await this.fetchProducts();
            }
          //}
        //}

      }]);
    }
  }

  async fetchProducts(){

    let newProducts = await this.recoService_.getProducts();
    this.items = newProducts;
    let temp :ProductCard[]= [];
    this.items = this.items.concat(temp);
    console.log("fetch items", this.items.length);
  }

}
