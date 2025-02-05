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
  todo: Todo
  constructor(
    private todoService: TodoDataService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];
    this.todo = new Todo(this.id, '', false, '', new Date());
    if (this.id != -1) {
      this.todoService.retrieveTodo('dung12346', this.id).subscribe(
        data => {
          console.log('Data retrieved:', data);
          this.todo = {
            ...data,
            done: data.done ? true : false,
          };
        })
    }

  }


  saveTodo() {
    // Kiểm tra email hợp lệ
    if (!this.todo.mail || !this.todo.mail.match(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)) {
      
      return;
    }



    if (this.id == -1 || this.todo.id == null) {
      this.todo.id = undefined;
      this.todoService.cerateTodo('dung12346', this.todo).subscribe(
        data => {
          console.log('Todo đã được tạo:', data);
         
          this.router.navigate(['todos']);
        },
        error => {
          console.error('Lỗi khi tạo todo:', error);
          alert('Có lỗi xảy ra khi thêm công việc');
        }
      );
    } else {
      this.todoService.updateTodo('dung12346', this.id, this.todo).subscribe(
        data => {
          console.log('Todo đã được cập nhật:', data);
          
          this.router.navigate(['todos']);
        },
        error => {
          console.error('Lỗi khi cập nhật todo:', error);
          alert('Có lỗi xảy ra khi cập nhật công việc');
        }
      );
    }
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


