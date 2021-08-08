import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IstorijaSkiepasComponent } from './istorija-skiepas.component';

describe('IstorijaSkiepasComponent', () => {
  let component: IstorijaSkiepasComponent;
  let fixture: ComponentFixture<IstorijaSkiepasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IstorijaSkiepasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IstorijaSkiepasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
