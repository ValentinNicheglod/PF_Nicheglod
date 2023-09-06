import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss']
})
export class UserFormComponent {
  action: 'Crear' | 'Editar' = 'Crear'
  userForm: FormGroup = new FormGroup({});

  formControls = {
    name: new FormControl('', Validators.required),
    surname: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(8)]),
    role: new FormControl('', Validators.required)
  };

  userRoles = [{
    label: 'Administrador',
    value: 'admin'
  }, {
    label: 'Usuario',
    value: 'user',
  }]

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<UserFormComponent>
  ) {
    this.setFormData();
  }

  setFormData() {
    this.userForm = new FormGroup(this.formControls);

    if (this.data?.user) {
      this.action = 'Editar'
      this.userForm.patchValue(this.data.user);
      this.userForm.updateValueAndValidity();
    }
  }

   onSubmit() {
    if (this.userForm.valid) {
      const userData = this.userForm.getRawValue();
      if (this.data?.user.id) {
        userData.id = this.data.user.id
      }
      this.dialogRef.close(userData);
    }
  }
}
