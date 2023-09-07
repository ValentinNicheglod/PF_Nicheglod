import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { InscriptionsActions } from '../../store/inscriptions.actions';
import { Observable } from 'rxjs';
import { Course } from '../../../courses/models';
import { courseOptions, studentOptions } from '../../store/inscriptions.selectors';
import { Student } from '../../../students/models';

@Component({
  selector: 'app-inscription-form',
  templateUrl: './inscription-form.component.html',
  styleUrls: ['./inscription-form.component.scss']
})
export class InscriptionFormComponent implements OnInit {
  action: 'Crear' | 'Editar' = 'Crear';
  inscriptionForm: FormGroup = new FormGroup({});

  formControls = {
    studentId: new FormControl('', Validators.required),
    courseId: new FormControl('', Validators.required)
  };

  courseOptions: Observable<Course[]>;
  studentOptions: Observable<Student[]>;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<InscriptionFormComponent>,
    private store: Store
  ) {
    this.setFormData();
    this.courseOptions = store.select(courseOptions);
    this.studentOptions = store.select(studentOptions);
  }

  ngOnInit(): void {
    this.store.dispatch(InscriptionsActions.loadCourseOptions());
    this.store.dispatch(InscriptionsActions.loadStudentOptions());
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
