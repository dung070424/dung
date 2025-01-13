import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListAmdinComponent } from './list-amdin.component';

describe('ListAmdinComponent', () => {
  let component: ListAmdinComponent;
  let fixture: ComponentFixture<ListAmdinComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListAmdinComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListAmdinComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
