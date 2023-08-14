import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-inscription-form',
  templateUrl: './inscription-form.component.html',
  styleUrls: ['./inscription-form.component.scss']
})
export class InscriptionFormComponent {
  action: 'Crear' | 'Editar' = 'Crear';
  inscriptionForm: FormGroup = new FormGroup({});

  formControls = {
    student: new FormControl('', Validators.required),
    inscription: new FormControl('', Validators.required)
  };

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<InscriptionFormComponent>
  ) {
    this.setFormData();
  }

  setFormData() {
    this.inscriptionForm = new FormGroup(this.formControls);

    if (this.data?.inscription) {
      this.action = 'Editar';
      this.inscriptionForm.patchValue(this.data.inscription);
      this.inscriptionForm.updateValueAndValidity();
    }
  }

  onSubmit() {
    if (this.inscriptionForm.valid) {
      const courseData = this.inscriptionForm.getRawValue();
      if (this.data?.inscription.id) {
        courseData.id = this.data.inscription.id;
      }
      this.dialogRef.close(courseData);
    }
  }

  cancel() {
    this.dialogRef.close();
  }
}
