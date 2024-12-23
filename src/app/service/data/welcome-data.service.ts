import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

export class HelloWorldBean{
    constructor(public message: string){}
}

@Injectable({
  providedIn: 'root'
})
export class WelcomeDataService {

  constructor(
    private http : HttpClient
  ) {
    // console.log("Execute hello World")
   }

   executeHelloWorldBeanService(){
    return this.http.get<HelloWorldBean>('http://localhost:8080/hello-world-bean')

    // console.log("executeHelloWorldBeanService")
  }


  //http://localhost:8080/hello-world/path-variable/dung123


  executeHelloWorldBeanWithPathVariable(name){

    let basicAuthHeaderString = this.createBasicAuthenticationHttpHeader();

    let headers = new HttpHeaders({
      Authorization : basicAuthHeaderString
    }
    )
    return this.http.get<HelloWorldBean>
    (`http://localhost:8080/hello-world/path-variable/${name}`, {headers});

    // console.log("executeHelloWorldBeanService")
  }

  createBasicAuthenticationHttpHeader(){
    let username = 'dung123'
    let password = '123456'
    let basicAuthHeaderString = 'Basic' + window.btoa(username + ':' + password);
    return basicAuthHeaderString;
  }
}
