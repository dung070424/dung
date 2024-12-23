import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HardcodeAuthenticationService } from '../hardcode-authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  username = 'dung123'
  password = ''
  errorMessage = 'Invalid Credentials'
  invalidLogin = false
 

  //Router
  //Angular.giveMeRouter
  //Dependency Ịnection


  constructor(private router : Router,
    private hardcodeAuthenticationService: HardcodeAuthenticationService
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

}
