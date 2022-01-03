import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient) {
  }

  defineUser(intention?: string){
    return new Promise<boolean | string>(async (resolve, reject) => {
      try{

        let data: string;

        if(intention){
          console.log("with intention/post", intention);

          const params = new HttpParams()
          .set('intention', intention);
  
          console.log("my params", params);
          data = await this.http.post<string>('http://localhost:7999/defineUser',{params: params}).toPromise();
          resolve(true);
        }
        else{
          console.log("am i logged in?");
          let response = await this.http.get<object>('http://localhost:7999/defineUser').toPromise();
          console.log("lolxD", response["response"]);
          resolve(response["response"]);
        }

        //console.log("data", data);
      }catch(er){
        console.log("Error:", er);
        resolve(false);
      }
    });
  }
}
