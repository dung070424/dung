import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Admin } from 'src/app/list-amdin/list-amdin.component';

@Injectable({
  providedIn: 'root'
})
export class AdminDataService {
  private baseUrl: string = 'http://localhost:8080';
  constructor(
    private http:HttpClient
  ) { }



  

  retrieveAllAdminPaginated(username: string, page: number, size: number) {
    return this.http.get<any>(`http://localhost:8080/users/${username}/admins`, {
      params: {
        page: page.toString(),
        size: size.toString(),
      },
    });
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

  getAdminDetails(id: number): Observable<any> {
    return this.http.get(`http://localhost:8080/users/admins/${id}`);
  }


  searchAdmins(username: string, name: string, page: number, size: number, sortBy: string, sortDirection: string) {
    return this.http.get<any>(
      `http://localhost:8080/users/${username}/admins/search?name=${name}&page=${page}&size=${size}&sortBy=${sortBy}&sortDirection=${sortDirection}`
    );
  }

  

  
}
