import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { ProductCard } from '../interfaces/ProductCard';

@Injectable({
  providedIn: 'root'
})
export class RecommendationService {


  constructor(private http: HttpClient) { }

  async getProducts(id: string){
    return new Promise<ProductCard []>(async (resolve, reject) => {
      try{
        if(id){
          //const params = new HttpParams()
          //.set('id', id);

          const response = await lastValueFrom(this.http.get<ProductCard []>('http://localhost:8086/products'  /*, { params: params }*/));

          console.log("resp",response);

          resolve(response);
        }

      }catch (error){
        reject(error);
      }
    })
  }
}
