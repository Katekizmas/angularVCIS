import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { RegistracijaComponent } from './registracija.component';
describe('RegistracijaComponent', () => {
  let component: RegistracijaComponent;
  let fixture: ComponentFixture<RegistracijaComponent>;
  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [RegistracijaComponent]
    }).compileComponents();
  }));
  beforeEach(() => {
    fixture = TestBed.createComponent(RegistracijaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
