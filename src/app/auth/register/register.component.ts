import { NgClass, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { RegisterService } from '../../services/auth/register.service';
import { registerRequest } from './registerRequest';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, NgIf, RouterLink, NgClass],
  styleUrl: './register.component.css',
  templateUrl: './register.component.html'
})
export class RegisterComponent implements OnInit {

  random: number = 0; // Inicializamos la variable random
  backgroundClass: string = ''; //Inicializamos la variable del fondo como string vacío

  registerUserData = {};

  //Este es el formGroup del registro, lo que está conectado con el HTML y puedes ponerle validadores
  registerForm = this.formBuilder.group({
    email: ['carlos@gmail.com', [Validators.required, Validators.email]],
    username: ['carlitos', Validators.required],
    password: ['', [Validators.required, Validators.minLength(7)]],
    r_password: ['', Validators.required],
  });

  constructor(private formBuilder: FormBuilder, private router: Router, private registerService:RegisterService){}

  ngOnInit(): void {

    //Método para generar un número random y definir el fondo en base a ese número
    this.random = Math.floor(Math.random() * 3); // Generar un número aleatorio del 0 al 2
    this.backgroundClass = 'background-'+this.random.toString();
  }

  get email() {
    return this.registerForm.controls.email;
  }

  get password() {
    return this.registerForm.controls.password;
  }

  get r_password() {
    return this.registerForm.controls.r_password;
  }

  get username() {
    return this.registerForm.controls.username;
  }

  //Método para registrar al usuario, se conecta con el servicio y devuelve la respuesta
  registerUser() {
    if (this.registerForm.valid && this.registerForm.value.password === this.registerForm.value.r_password) {
      this.registerService.registerUser(this.registerForm.value as registerRequest).subscribe({
        next: (userData) => {
          console.log("esto es el next del register");
          console.log(userData);
          localStorage.setItem('token', userData.token);
        },
        error: (errorData) => {
          console.error(errorData);
         // this.loginError=errorData;
        },
        complete: () => {
          console.info("Registrado con éxito");
          this.router.navigateByUrl('/inicio');
         // this.loginForm.reset();
        }
      });
    } else {
      this.registerService.markAllAsTouched();
      //alert('Datos incorrectos');
    }
  }
}
