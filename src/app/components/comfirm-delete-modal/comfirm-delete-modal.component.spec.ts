import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ComfirmDeleteModalComponent } from './comfirm-delete-modal.component';

describe('ComfirmDeleteModalComponent', () => {
  let component: ComfirmDeleteModalComponent;
  let fixture: ComponentFixture<ComfirmDeleteModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ComfirmDeleteModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ComfirmDeleteModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
