import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HardcodeAuthenticationService } from '../hardcode-authentication.service';
import { BasicAuthenticationService } from '../service/basic-authentication.service ';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  username = 'dung123'
  password = '123456'
  errorMessage = 'Invalid Credentials'
  invalidLogin = false
 

  //Router
  //Angular.giveMeRouter
  //Dependency Ịnection


  constructor(private router : Router,
    private hardcodeAuthenticationService: HardcodeAuthenticationService,
    private BasicAuthenticationService :BasicAuthenticationService,
   
  ) {
    
   }

  ngOnInit() {
  }

  handleLogin(){
    // console.log(this.username);
    // if(this.username==="dung123" && this.password === "123456"){
      //Chuyển Hướng Về welcome 
    if(this.hardcodeAuthenticationService.authenticate(this.username, this.password)){
      this.router.navigate(['welcome', this.username])
      this.invalidLogin= false
    }else{
      this.invalidLogin= true
    }
    
  }


  // handleBasicAuthLogin(){
  //   // console.log(this.username);
  //   // if(this.username==="dung123" && this.password === "123456"){
  //     //Chuyển Hướng Về welcome 
  //   this.BasicAuthenticationService.executeAuthenticationService(this.username, this.password)
  //     .subscribe(
  //       data => {
  //         console.log(data)
  //         this.router.navigate(['welcome', this.username])
  //         this.invalidLogin = false
  //       },
  //       error =>{
  //         console.log(error)
  //         this.invalidLogin = true
  //       }
  //     )
      
    
  // }


  handleJWTAuthLogin(){
    // console.log(this.username);
    // if(this.username==="dung123" && this.password === "123456"){
      //Chuyển Hướng Về welcome 
    this.BasicAuthenticationService.executeJWTAuthenticationService(this.username, this.password)
      .subscribe(
        data => {
          console.log(data)
          sessionStorage.setItem('role', data.roles); // Debug
          this.router.navigate(['welcome', this.username])
          this.invalidLogin = false
        },
        error =>{
          console.log(error)
          this.invalidLogin = true
        }
      )
      
    
  }
}
