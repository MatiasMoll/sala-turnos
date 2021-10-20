import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WhichRegisterComponent } from './which-register.component';

describe('WhichRegisterComponent', () => {
  let component: WhichRegisterComponent;
  let fixture: ComponentFixture<WhichRegisterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WhichRegisterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WhichRegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
