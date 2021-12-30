import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient) {
  }

  login(){
    return new Promise(async (resolve, reject) => {
      try{
        let response= await this.http.post<string>('http://localhost:7999/login',{}).toPromise();

        //console.log("Response", response);
        resolve(true);
      }catch(er){
        console.log("Error:", er);
        resolve(false);
      }
    });
  }
}
