import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  registrationForm: FormGroup;

  constructor(private formBuilder: FormBuilder) {
    this.registrationForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required, Validators.minLength(6)]],
      fullName: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.registrationForm.valid) {
      // Aquí puedes agregar la lógica para registrar al usuario utilizando los valores del formulario.
      console.log('Email:', this.registrationForm.value.email);
      console.log('Password:', this.registrationForm.value.password);
      console.log('Full Name:', this.registrationForm.value.fullName);
    } else {
      // El formulario no es válido, puedes mostrar mensajes de error o realizar alguna acción en este caso.
    }
  }
}
