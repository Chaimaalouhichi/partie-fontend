import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RegisterService } from 'src/app/core/services/register.service';

@Component({
  selector: 'app-signup-parent',
  templateUrl: './signup-parent.component.html',
  styleUrls: ['./signup-parent.component.scss']
})
export class SignupParentComponent {
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
    
   });
 }
 
 toggleFieldTextType() {
   this.fieldTextType = !this.fieldTextType;
 }
 onSubmit(): void {
   this.submitted=true
   if (this.form.valid) {
      
    const parentData = this.form.value;
    console.log(parentData);
    
    this.registerService.registerParent(parentData).subscribe(
      (response) => {
        console.log('Parent registered successfully', response);
        
      },
      (error) => {
        console.error('Error registering Parent', error);
        
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
