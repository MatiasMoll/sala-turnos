import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowHCComponent } from './show-hc.component';

describe('ShowHCComponent', () => {
  let component: ShowHCComponent;
  let fixture: ComponentFixture<ShowHCComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShowHCComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowHCComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
