import { Component, OnInit } from '@angular/core';
import { TodoDataService } from '../service/data/todo-data.service';
import { Todo } from '../list-todos/list-todos.component';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent implements OnInit {
  id: number
  todo : Todo
  constructor(
    private todoService: TodoDataService,
    private route : ActivatedRoute,
    private router : Router
  ) { }

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];
    this.todo = new Todo(this.id,'',false,new Date(),'',false);
    if(this.id!=-1){
      this.todoService.retrieveTodo('dung123', this.id).subscribe(
         data => {
    console.log('Data retrieved:', data);
    this.todo = {
      ...data,
      gioiTinh: data.gioiTinh?true:false,
    };
  })
    }

  }


  saveTodo(){
// console.log("===========",this.todo)
    // const todoData:Todo={...this.todo,gioitinh:this.todo.gioitinh?true:false};
    if(this.id == -1){
      
      this.todo.id=undefined
      this.todoService.cerateTodo('dung123', this.todo).subscribe(
        date => {
          console.log(date)
          this.router.navigate(['todos'])

          
        }
      )
    }else{
      this.todoService.updateTodo('dung123', this.id, this.todo).subscribe(
        date => {
          console.log(date)
          this.router.navigate(['todos'])
        }
      )
    }

    // if (this.id === -1) {
      
    //   this.todoService.cerateTodo('dung123', null).subscribe(
    //     (data) => {
    //       console.log(data);
    //       this.router.navigate(['todos']);
    //     },
    //     (err) => {
    //       console.log(err);
    //     }
    //   );
    // }
   
  }

}
