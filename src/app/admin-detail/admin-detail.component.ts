import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AdminDataService } from '../service/data/admin-data.service';

@Component({
  selector: 'app-admin-detail',
  templateUrl: './admin-detail.component.html',
  styleUrls: ['./admin-detail.component.css']
})
export class AdminDetailComponent implements OnInit {
  admin: any;
  todos: any[] = [];
  errorMessage: string = '';
  constructor(
    private route: ActivatedRoute,
    private adminService: AdminDataService
  ) { }

  ngOnInit() {

    const adminId = +this.route.snapshot.paramMap.get('id')!;
    this.loadAdminDetails(adminId);
  }
  loadAdminDetails(id: number) {
    this.adminService.getAdminDetails(id).subscribe(
      (response) => {
        this.admin = response.admin;
        this.todos = response.todos;
      },
      (error) => {
        console.error('Error fetching admin details:', error);
        this.errorMessage = 'Unable to load admin details';
      }
    );
  }

}
