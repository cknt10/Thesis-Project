import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { ProductCard } from '../interfaces/ProductCard';

@Injectable({
  providedIn: 'root'
})
export class RecommendationService {


  constructor(private http: HttpClient) { }

  getCookie(name: string){
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts && parts.length === 2) return parts.pop()?.split(';').shift();
    else return undefined;
  }

  async getProducts(){
    return new Promise<ProductCard []>(async (resolve, reject) => {
      try{

        let params = new HttpParams();
        if(this.getCookie("dy_uId")){
          params = new HttpParams().set('dy_uId', this.getCookie("dy_uId")!);
        }

        const response = await lastValueFrom(this.http.get<ProductCard []>('http://localhost:8086/products'  , { params: params }));

        console.log("reco response in frontend",response);

        resolve(response);

      }catch (error){
        reject(error);
      }
    })
  }
}
