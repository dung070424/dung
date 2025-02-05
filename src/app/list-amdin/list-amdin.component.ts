import { Component, OnInit, OnDestroy } from '@angular/core';
import { AdminDataService } from '../service/data/admin-data.service';
import { Router } from '@angular/router';
import { TodoDataService } from '../service/data/todo-data.service';

import { MatTableDataSource } from '@angular/material/table';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, takeUntil } from 'rxjs/operators';

export class Admin {
  constructor(
    public id: number,
    public name: string,
    public gioitinh: boolean,
    public ngaysinh: Date,
    public chucvu: string
  ) { }
}

@Component({
  selector: 'app-list-amdin',
  templateUrl: './list-amdin.component.html',
  styleUrls: ['./list-amdin.component.css']
})
export class ListAmdinComponent implements OnInit, OnDestroy {
  admins: Admin[] = [];
  dataSource: MatTableDataSource<Admin> = new MatTableDataSource();
  messages: string = '';
  username: string = 'dung123';
  searchName: string = '';
  page: number = 0;
  size: number = 5;
  totalPages: number = 0;
  private searchSubject = new Subject<string>();
  private destroy$ = new Subject<void>();

  sortBy: string = 'id';
  sortDirection: string = 'asc';


  

  displayedColumns: string[] = ['name', 'gioitinh', 'ngaysinh', 'chucvu', 'update', 'delete', 'info'];

  constructor(
    private adminService: AdminDataService,
    private todoService: TodoDataService,
    private router: Router
  ) { }

  ngOnInit() {
    this.refreshAdmins();

    this.searchSubject
      .pipe(debounceTime(300), distinctUntilChanged(), takeUntil(this.destroy$))
      .subscribe((name) => this.searchAdmins(name));
  }

  refreshAdmins() {
    this.adminService.retrieveAllAdminPaginated(this.username, this.page, this.size).subscribe(
      (response) => {
        this.admins = response.content;
        this.totalPages = response.totalPages;
        this.dataSource.data = this.admins;
      },
      (error) => {
        this.messages = 'Không thể tải dữ liệu Admin.';
        console.error(error);
      }
    );
  }

  searchAdmins(name: string) {
    this.adminService.searchAdmins(this.username, name, this.page, this.size, this.sortBy, this.sortDirection)
      .subscribe(
        (response) => {
          this.admins = response.content;
          this.totalPages = response.totalPages;
          this.dataSource.data = this.admins;
        },
        (error) => {
          console.error('Lỗi khi tìm kiếm admin:', error);
          this.messages = 'Không tìm thấy kết quả.';
        }
      );
  }

  onSearchInputChange(name: string) {
    this.searchSubject.next(name);
  }

  changeSort(column: string) {
    if (this.sortBy === column) {
      this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortBy = column;
      this.sortDirection = 'asc';
    }
    this.searchAdmins(this.searchName);
  }

  deleteAdmin(id: number) {
    this.adminService.deleteAdmin(this.username, id).subscribe(
      () => {
        this.messages = `Xóa Admin ${id} thành công!`;
        this.refreshAdmins();
      },
      (error) => {
        console.error('Lỗi khi xoá admin:', error);
        this.messages = `Không thể xoá Admin ${id}.`;
      }
    );
  }


  updateAdmin(id: number) {
    this.router.navigate(['admins', id]);
  }

  Adminadd() {
    this.router.navigate(['admins', -1]);
  }

  nextPage() {
    if (this.page < this.totalPages - 1) {
      this.page++;
      this.refreshAdmins();
    }
  }

  previousPage() {
    if (this.page > 0) {
      this.page--;
      this.refreshAdmins();
    }
  }

  viewAdminInfo(adminId: number) {
    this.router.navigate(['/admin-detail', adminId]);
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}