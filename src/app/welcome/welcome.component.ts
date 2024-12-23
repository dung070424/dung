import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { WelcomeDataService } from '../service/data/welcome-data.service';

// import { AppComponent } from '../app.component';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit {
   message = 'Some Welcome Message'
   welcomeMessageFromService: string
  name = ''


   //Kích hoạt
  constructor(private route:ActivatedRoute,
              private service: WelcomeDataService

  ) { }

  ngOnInit() {
    console.log(this.message)
    // console.log(this.route.snapshot.params['name'])
    this.name = this.route.snapshot.params['name']
  }

  getWelcomeMessage(){
    // console.log("get kcxnvk")

    console.log(this.service.executeHelloWorldBeanService());
     this.service.executeHelloWorldBeanService().subscribe(
      response => this.handleSuccessfuResponse(response),
      error => this.handleErrorResponse(error)
     );

    //  console.log('last line of handleSuccessfuResponse')
    
  }


  executeHelloWorldBeanWithPathVariable(){
    // console.log("get kcxnvk")

    console.log(this.service.executeHelloWorldBeanService());
     this.service.executeHelloWorldBeanWithPathVariable(this.name).subscribe(
      response => this.handleSuccessfuResponse(response),
      error => this.handleErrorResponse(error)
     );

    //  console.log('last line of handleSuccessfuResponse')
    
  }

  handleSuccessfuResponse(response){

    this.welcomeMessageFromService = response.message
    // console.log(response);
    // console.log(response.message);
  }

  handleErrorResponse(error){
    // console.log(error);
    // console.log(error.error);
    // console.log(error.message);
    this.welcomeMessageFromService = error.error.message
  }

}

export class class1{

}

export class class2{
  
}