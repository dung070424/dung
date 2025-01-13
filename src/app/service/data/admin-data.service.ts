import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Admin } from 'src/app/list-amdin/list-amdin.component';

@Injectable({
  providedIn: 'root'
})
export class AdminDataService {

  constructor(
    private http:HttpClient
  ) { }

  retrieveAllAdmin(username){
    return this.http.get<Admin[]>(`http://localhost:8080/users/${username}/admins`)
  }

  deleteAdmin(username,id){
    return this.http.delete(`http://localhost:8080/users/${username}/admins/${id}`)
  }

  retrieveAdmin(username,id){
    return this.http.get<Admin>(`http://localhost:8080/users/${username}/admins/${id}`)
  }


  updateAdmin(username,id, admin){
    return this.http.put(`http://localhost:8080/users/${username}/admins/${id}`,admin)
  }
  createAdmin(username,admin){
    return this.http.post(`http://localhost:8080/users/${username}/admins`,admin)
  }

  
}
