import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TODO_JPA_API_URL } from 'src/app/app.constants';
import { Todo } from 'src/app/list-todos/list-todos.component';

@Injectable({
  providedIn: 'root'
})
export class TodoDataService {

  constructor(
    private http:HttpClient

  ) { }


  retrieveAlltodos(username){
      return this.http.get<Todo[]>(`${ TODO_JPA_API_URL }/users/${username}/todo`)
  
      // console.log("executeHelloWorldBeanService")
    }


    deleteTodo(username,id){
      return this.http.delete(`${ TODO_JPA_API_URL }/users/${username}/todo/${id}`)
  
      // console.log("executeHelloWorldBeanService")
    }


    retrieveTodo(username,id){
      return this.http.get<Todo>(`${ TODO_JPA_API_URL }/users/${username}/todo/${id}`)
  
      // console.log("executeHelloWorldBeanService")
    }


    updateTodo(username,id, todo){
      return this.http.put<Todo>(`${ TODO_JPA_API_URL }/users/${username}/todo/${id}`, todo)
  
      // console.log("executeHelloWorldBeanService")
    }

    cerateTodo(username, todo){
      return this.http.post(`${ TODO_JPA_API_URL }/users/${username}/todo`, todo)
  
      // console.log("executeHelloWorldBeanService")
    }
}
