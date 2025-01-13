import { Component, OnInit } from '@angular/core';
import { AdminDataService } from '../service/data/admin-data.service';
import { Router } from '@angular/router';
import { Todo } from '../list-todos/list-todos.component';

import { TodoDataService } from '../service/data/todo-data.service';



export class Admin{
  
  constructor(
    
    public id : number,
    public name : string,
    public gioitinh : boolean,
    public ngaysinh : Date,
    public chucvu : string,
  ){}
}

@Component({
  selector: 'app-list-amdin',
  templateUrl: './list-amdin.component.html',
  styleUrls: ['./list-amdin.component.css']
})
export class ListAmdinComponent implements OnInit {
amdin : Admin[]
todos: Todo[]
messages : string

username: string = 'dung12346';
// [
//   new Admin(1,'Chử Đức Dũng',false,new Date()),
//   new Admin(2,'Chử Đức Dũng',false,new Date()),
//   new Admin(3,'Chử Đức Dũng',true,new Date())
// ]
  // amdin = {
  //   id : 1,
  //   name : 'Chử Đức Dũng'
  // }

  constructor(
    private adminService:AdminDataService,
    private todoService : TodoDataService,
    private router : Router
  ) {}

  ngOnInit() {

    this.refreshAdmin();
    this.loadTodosAndAddToAdmin();
    
  }
  refreshAdmin(){
   
    this.adminService.retrieveAllAdmin('dung12346').subscribe(
      response =>{
        console.log(response);
        this.amdin =response;
        
      }
    )
  }


  

  loadTodosAndAddToAdmin() {
    this.todoService.retrieveAlltodos(this.username).subscribe({
      next: (response) => {
        console.log('Dữ liệu từ API:', response);
        this.todos = response || [];
        if (this.todos.length === 0) {
          this.messages = 'Không có dữ liệu Todo để thêm vào Admin.';
          return;
        }

        const newAdmins = this.todos.map(
          (todo) =>
            new Admin(
              todo.id,
              todo.description,
              todo.gioiTinh,
              todo.targetDate,
              todo.chucvu
            )
        );

        this.amdin = [...this.amdin, ...newAdmins];
        this.messages = 'Dữ liệu từ Todo đã được tự động thêm vào Admin!';
      },
      error: (err) => {
        console.error('Lỗi khi gọi API:', err);
        this.messages = 'Không thể tải dữ liệu từ Todo.';
      },
    });
  }
  


  deleteAdmin(id){
    console.log(`delete admin ${id}`)
    this.adminService.deleteAdmin('dung12346',id).subscribe(
      response => {
        console.log(response);
        this.messages = `Delete of Admin ${id} Successful!`
        this.refreshAdmin();
      }
    )
   
  }

  updateAdmin(id){
  
    console.log(`update ${id}`)
    this.router.navigate(['admins', id]);
   
  }

  Adminadd(){
    this.router.navigate(['admins', -1]);
  }

}
