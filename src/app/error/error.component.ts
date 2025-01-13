import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.css']
})
export class ErrorComponent implements OnInit {

  errorMessage= "Bạn không có quyền được truy cập vào bảng Admin"

  constructor() { }

  ngOnInit() {
  }

}
