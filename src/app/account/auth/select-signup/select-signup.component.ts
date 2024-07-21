import { Component } from '@angular/core';

@Component({
  selector: 'app-select-signup',
  templateUrl: './select-signup.component.html',
  styleUrls: ['./select-signup.component.scss']
})
export class SelectSignupComponent {
  year: number = new Date().getFullYear();
  fieldTextType!: boolean;

  /**
 * Password Hide/Show
 */
  toggleFieldTextType() {
    this.fieldTextType = !this.fieldTextType;
  }
}
