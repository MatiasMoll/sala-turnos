import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalAgregarEspecialidadComponent } from './modal-agregar-especialidad.component';

describe('ModalAgregarEspecialidadComponent', () => {
  let component: ModalAgregarEspecialidadComponent;
  let fixture: ComponentFixture<ModalAgregarEspecialidadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalAgregarEspecialidadComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalAgregarEspecialidadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
