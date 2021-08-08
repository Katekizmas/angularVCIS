import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { SkydelisComponent } from './skydelis.component';
describe('SkydelisComponent', () => {
  let component: SkydelisComponent;
  let fixture: ComponentFixture<SkydelisComponent>;
  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [SkydelisComponent]
    }).compileComponents();
  }));
  beforeEach(() => {
    fixture = TestBed.createComponent(SkydelisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
