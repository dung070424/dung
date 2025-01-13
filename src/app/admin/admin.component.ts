import { Component, OnInit } from '@angular/core';
import { AdminDataService } from '../service/data/admin-data.service';
import { Admin } from '../list-amdin/list-amdin.component';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  id: number;
  admin: Admin 

  constructor(
    private adminService: AdminDataService,
    private route: ActivatedRoute,
    private router : Router
  ) { }

  ngOnInit() {
   
    this.id = this.route.snapshot.params['id']
    this.admin = new Admin(0, '', false, new Date(),'');
   
    if(this.id!=-1){
      this.adminService.retrieveAdmin('dung12346', this.id)
    .subscribe(
      data => 
        this.admin = data
        
    )
    }
  }

  saveAdmin(){
    if(this.id === -1){
      this.adminService.createAdmin('dung12346', this.admin)
    .subscribe(
      data => {
        console.log(data)
        this.router.navigate(['amdin'])
      }
    )
    }else{
      this.adminService.updateAdmin('dung12346',this.id, this.admin)
    .subscribe(
      data => {
        console.log(data)
        this.router.navigate(['amdin'])
      }
    )
    }
  }

  

}
