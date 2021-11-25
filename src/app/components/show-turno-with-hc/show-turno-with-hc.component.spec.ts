import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowTurnoWithHCComponent } from './show-turno-with-hc.component';

describe('ShowTurnoWithHCComponent', () => {
  let component: ShowTurnoWithHCComponent;
  let fixture: ComponentFixture<ShowTurnoWithHCComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShowTurnoWithHCComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowTurnoWithHCComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
