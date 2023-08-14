import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-student-form',
  templateUrl: './student-form.component.html',
  styleUrls: ['./student-form.component.scss']
})
export class StudentFormComponent {

  action: 'Crear' | 'Editar' = 'Crear';
  studentForm: FormGroup = new FormGroup({});

  formControls = {
    name: new FormControl('', Validators.required),
    surname: new FormControl('', Validators.required),
    email: new FormControl('', Validators.required),
  };

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<StudentFormComponent>
  ) {
    this.setFormData();
  }

  setFormData() {
    this.studentForm = new FormGroup(this.formControls);

    if (this.data?.student) {
      this.action = 'Editar';
      this.studentForm.patchValue(this.data.student);
      this.studentForm.updateValueAndValidity();
    }
  }

  onSubmit() {
    if (this.studentForm.valid) {
      const studentData = this.studentForm.getRawValue();
      if (this.data?.student.id) {
        studentData.id = this.data.student.id;
      }
      this.dialogRef.close(studentData);
    }
  }

  cancel() {
    this.dialogRef.close();
  }

}
