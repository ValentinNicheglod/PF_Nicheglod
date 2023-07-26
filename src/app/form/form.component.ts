import { Component, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent {
  userForm: FormGroup = new FormGroup({});

  formControls = {
    firstName: new FormControl('', Validators.required),
    lastName: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(8), Validators.pattern('^(?=.*[A-Z]).{8,}$')])
  };

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public modalRef: MatDialogRef<FormComponent>
  ) {
    this.setFormData();
  }

  setFormData() {
    this.userForm = new FormGroup({
      firstName: this.formControls.firstName,
      lastName: this.formControls.lastName,
      email: this.formControls.email,
      password: this.formControls.password
    });

    if (this.data.user) {
      this.userForm.patchValue(this.data.user);
    }
  }
}
