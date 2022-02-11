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

  async getTest(){

    var myHeaders = new Headers();
    myHeaders.append("dy-api-key", "249626a040af3d20cd87dadd2ef128554667170f06f779958f615a7a1cf132f1");
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Accept", "*/*");
    myHeaders.append("Accept-Encoding", "gzip, deflate, br")
    myHeaders.append("Connection", "keep-alive")
    myHeaders.append("Host", "dy-api.com")


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

    console.log("gogogo", requestOptions);

    fetch("https://dy-api.com/v2/serve/user/choose", requestOptions)
      .then(response => response.text())
      .then(result => console.log("wtf",result))
      .catch(error => console.log('error', error));
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
