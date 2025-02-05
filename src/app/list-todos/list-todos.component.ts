import { Component, OnInit, ViewChild } from '@angular/core';
import { TodoDataService } from '../service/data/todo-data.service';
import { Router } from '@angular/router';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material';

export class Todo {
  constructor(
    public id: number,
    public description: string,
    public done: boolean,
    public mail: string,
    public targetDate: Date,
  ) { }
}

@Component({
  selector: 'app-list-todos',
  templateUrl: './list-todos.component.html',
  styleUrls: ['./list-todos.component.css']
})
export class ListTodosComponent implements OnInit {
  todos: Todo[];
  message: string;
  displayedColumns: string[] = ['description', 'targetDate','mail', 'done', 'update', 'actions'];
  dataSource: MatTableDataSource<Todo>;

  @ViewChild(MatPaginator) paginator: MatPaginator;

  @ViewChild(MatSort) sort: MatSort;

  

  ngAfterViewInit() {
    if (this.dataSource) {
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }
  }


  

  constructor(
    private todoService: TodoDataService,
    private router: Router
  ) { }

  ngOnInit() {
    this.refreshTodos();
  }

 

  refreshTodos() {
    this.todoService.retrieveAlltodos('dung12346').subscribe({
      next: (response) => {
        this.todos = response;
        this.dataSource = new MatTableDataSource(this.todos); // Gán lại dataSource mỗi lần dữ liệu thay đổi
        // Gán paginator và sort sau khi dataSource đã được khởi tạo
        if (this.dataSource) {
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
          
        }
        console.log('Todos retrieved:', this.todos);
      },
      error: (error) => {
        console.error('Error occurred while retrieving todos:', error);
      }
    });
  }

  deleteTodo(id) {
    console.log(`delete ${id}`);
    this.todoService.deleteTodo('dung12346', id).subscribe(response => {
      console.log(response);
      this.message = `Delete of Todo ${id} Successful`;
      this.refreshTodos();
    });
  }

  updateTodo(id) {
    console.log(`update ${id}`);
    this.router.navigate(['todos', id]);
  }

  addTodo() {
    this.router.navigate(['todos', -1]);
  }
}
