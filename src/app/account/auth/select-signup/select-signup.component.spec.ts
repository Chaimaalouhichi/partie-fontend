import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectSignupComponent } from './select-signup.component';

describe('SelectSignupComponent', () => {
  let component: SelectSignupComponent;
  let fixture: ComponentFixture<SelectSignupComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SelectSignupComponent]
    });
    fixture = TestBed.createComponent(SelectSignupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
