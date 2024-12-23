import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Todo } from 'src/app/list-todos/list-todos.component';

@Injectable({
  providedIn: 'root'
})
export class TodoDataService {

  constructor(
    private http:HttpClient

  ) { }


  retrieveAlltodos(username){
      return this.http.get<Todo[]>(`http://localhost:8080/users/${username}/todo`)
  
      // console.log("executeHelloWorldBeanService")
    }


    deleteTodo(username,id){
      return this.http.delete(`http://localhost:8080/users/${username}/todo/${id}`)
  
      // console.log("executeHelloWorldBeanService")
    }


    retrieveTodo(username,id){
      return this.http.get<Todo>(`http://localhost:8080/users/${username}/todo/${id}`)
  
      // console.log("executeHelloWorldBeanService")
    }


    updateTodo(username,id, todo){
      return this.http.put<Todo>(`http://localhost:8080/users/${username}/todo/${id}`, todo)
  
      // console.log("executeHelloWorldBeanService")
    }

    cerateTodo(username, todo){
      return this.http.post(`http://localhost:8080/users/${username}/todo`, todo)
  
      // console.log("executeHelloWorldBeanService")
    }
}
