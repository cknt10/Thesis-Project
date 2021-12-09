import { Injectable } from '@angular/core';
import { ProductCard } from '../interfaces/ProductCard';
import { HttpClient, HttpParams } from '@angular/common/http';
import { lastValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) { }

  async getProduct(id: string){
    return new Promise<ProductCard>(async (resolve, reject) => {
      try{
        if(id){
          const params = new HttpParams()
          .set('id', id);

          const response = await lastValueFrom(this.http.get<ProductCard>('http://localhost:8085/product', { params: params }));

          console.log("resp",response);

          resolve(response);
        }

      }catch (error){
        reject(error)
      }
    })
  }
}
