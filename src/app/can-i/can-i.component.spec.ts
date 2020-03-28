import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CanIComponent } from './can-i.component';

describe('CanIComponent', () => {
  let component: CanIComponent;
  let fixture: ComponentFixture<CanIComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CanIComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CanIComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
