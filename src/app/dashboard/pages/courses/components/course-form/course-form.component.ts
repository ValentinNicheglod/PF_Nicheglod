import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-course-form',
  templateUrl: './course-form.component.html',
  styleUrls: ['./course-form.component.scss']
})
export class CourseFormComponent {
  action: 'Crear' | 'Editar' = 'Crear';
  courseForm: FormGroup = new FormGroup({});

  formControls = {
    name: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required),
    startDate: new FormControl('', Validators.required),
    endDate: new FormControl('', Validators.required)
  };

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<CourseFormComponent>
  ) {
    this.setFormData();
  }

  setFormData() {
    this.courseForm = new FormGroup(this.formControls);

    if (this.data?.course) {
      this.action = 'Editar';
      this.courseForm.patchValue(this.data.course);
      this.courseForm.updateValueAndValidity();
    }
  }

  onSubmit() {
    if (this.courseForm.valid) {
      const courseData = this.courseForm.getRawValue();
      if (this.data?.course.id) {
        courseData.id = this.data.course.id;
      }
      this.dialogRef.close(courseData);
    }
  }

  cancel() {
    this.dialogRef.close();
  }
}
