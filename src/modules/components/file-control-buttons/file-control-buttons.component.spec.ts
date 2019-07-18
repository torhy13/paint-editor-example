import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FileControlButtonsComponent } from './file-control-buttons.component';

describe('FileControlButtonsComponent', () => {
  let component: FileControlButtonsComponent;
  let fixture: ComponentFixture<FileControlButtonsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FileControlButtonsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FileControlButtonsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
