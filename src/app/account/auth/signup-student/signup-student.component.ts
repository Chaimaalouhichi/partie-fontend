import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { RegisterService } from 'src/app/core/services/register.service';

@Component({
  selector: 'app-signup-student',
  templateUrl: './signup-student.component.html',
  styleUrls: ['./signup-student.component.scss']
})
export class SignupStudentComponent {
  // set the currenr year
  year: number = new Date().getFullYear();
  fieldTextType!: boolean;
  form!: FormGroup;
  submitted=false

  /**
 * Password Hide/Show
 */
 
  constructor(private fb: FormBuilder, private registerService: RegisterService){}
  passwordPatternValidator(control: AbstractControl): { [key: string]: any } | null {
    const passwordPattern = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/;
    const isValid = passwordPattern.test(control.value);
    return isValid ? null : { pattern: true };
  }
  ngOnInit(): void {
    this.form = this.fb.group({
      fullname: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, this.passwordPatternValidator.bind(this)]],
      phonenember: ['', Validators.required],
      adress: ['', Validators.required],
      emailparent: [''],
    });
    
  }
  
  toggleFieldTextType() {
    this.fieldTextType = !this.fieldTextType;
  }
  onSubmit(): void {
    this.submitted=true
    
    
    if (this.form.valid) {
      
      const studentData = this.form.value;
      console.log(studentData);
      // Make the API call to register the student
      this.registerService.registerStudent(studentData).subscribe(
        (response) => {
          console.log('Student registered successfully', response);
          
        },
        (error) => {
          console.error('Error registering student', error);
          
        }
      );
    } else {
      this.markFormGroupTouched(this.form);
    }
  }
  private markFormGroupTouched(formGroup: FormGroup): void {
    Object.values(formGroup.controls).forEach(control => {
      control.markAsTouched();

      if (control instanceof FormGroup) {
        this.markFormGroupTouched(control);
      }
    });
  }
}
