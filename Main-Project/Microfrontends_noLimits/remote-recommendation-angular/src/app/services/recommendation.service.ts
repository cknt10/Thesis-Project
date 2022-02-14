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

  getTest(){
    return new Promise(async (resolve,reject) => {

      var myHeaders = new Headers();
      myHeaders.append("DY-API-Key", "b19202c4997c857541d3bd9f972bad35195fa0acb4aa9474d74e28f8995b0d65");
      myHeaders.append("Content-Type", "application/json");


      var raw = JSON.stringify({
        "selector": {
          "names": [
            "CK: A/B Test Bubble"
          ]
        },
        "user": {},
        "session": {},
        "context": {
          "page": {
            "type": "HOMEPAGE",
            "location": "https://example.org",
            "locale": "en_US",
            "data": []
          },
          "device": {
            "userAgent": "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/56.0.2924.87 Safari/537.36",
            "ip": "54.100.200.255"
          }
        },
        "options": {
          "isImplicitPageview": false,
          "returnAnalyticsMetadata": false
        }
      });

      var requestOptions = {
        method: 'POST',
        //mode: 'no-cors',
        headers: myHeaders,
        body: raw
      };


      let response = await fetch("https://direct.dy-api.com/v2/serve/user/choose", requestOptions)
        .then(response => response.json())
        .then(result => {
          return result;
        })
        .catch(error => console.log('error', error));

        resolve(response);
    });

  }

  async getProducts(){
    return new Promise<ProductCard []>(async (resolve, reject) => {
      try{

        let params = new HttpParams();
        if(this.getCookie("dy_uId")){
          params = new HttpParams().set('dy_uId', this.getCookie("dy_uId")!);
        }

        console.log("prod params", params,this.getCookie("dy_uId"));
        const response = await lastValueFrom(this.http.get<ProductCard []>('http://localhost:8086/products'  , { params: params }));

        console.log("reco response in frontend",response);

        resolve(response);

      }catch (error){
        reject(error);
      }
    })
  }
}
