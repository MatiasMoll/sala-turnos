import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowFabButtonsComponent } from './show-fab-buttons.component';

describe('ShowFabButtonsComponent', () => {
  let component: ShowFabButtonsComponent;
  let fixture: ComponentFixture<ShowFabButtonsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShowFabButtonsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowFabButtonsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
