import { Component, OnInit } from '@angular/core';
import { TodoDataService } from '../service/data/todo-data.service';
import { Router } from '@angular/router';


export class Todo{
  constructor(
    public id: number,
    public description: String,
    public done: boolean,
    public targetDate: Date
  ){

  }}

@Component({
  selector: 'app-list-todos',
  templateUrl: './list-todos.component.html',
  styleUrls: ['./list-todos.component.css']
})
export class ListTodosComponent implements OnInit {
  todos : Todo[]

  message: string
  // todos = [
  //   new Todo(1,'Chử đức Dũng',false, new Date()),
  //   new Todo(2,'Chử đức Anh',false, new Date()),
  //   new Todo(3,'Chử đức Khải',false, new Date()),
    // {id : 1 , description: 'Chử Đức Dũng'},
    // {id : 2 , description: 'Chử Đức Anh'},
    // {id : 3 , description: 'Chử Đức Khải'},
  // ]
  // todo = {
  //   id : 1,
  //   description: 'Chử Đức Dũng'
  // }

  constructor(
    private todoService:TodoDataService,
    private router : Router
  ) { }

  ngOnInit() {
     this.refreshTodos();
  }


  refreshTodos(){
    this.todoService.retrieveAlltodos('dung123').subscribe({
      next: (response) => {
        this.todos = response;
        console.log('Todos retrieved:', this.todos);
      },
      error: (error) => {
        console.error('Error occurred while retrieving todos:', error);
        // Thêm xử lý tùy chỉnh cho lỗi nếu cần
      }
    });
  }

  deleteTodo(id){
     console.log(`delete ${id}`)

    this.todoService.deleteTodo('dung123', id).subscribe(
      response => {
        console.log(response);
        this.message= `Delete of Todo ${id} Successfull`;
        this.refreshTodos();
      }
    )
  }


  updateTodo(id){
    console.log(`update ${id}`)
    this.router.navigate(['todos', id]);
  }


  addTodo(){
    this.router.navigate(['todos', -1])
  }
}
