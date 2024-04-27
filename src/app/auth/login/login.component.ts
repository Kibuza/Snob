import { NgClass, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { LoginService } from '../../services/auth/login.service';
import { loginRequest } from './loginRequest';
import { AuthService } from '../../services/auth/token-auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, NgIf, RouterLink, NgClass],
  styleUrl: './login.component.css',
  templateUrl: './login.component.html',
})
export class LoginComponent implements OnInit {
  loginUserData = {};
  random: number = 0; // Inicializamos la variable random
  backgroundClass: string = ''; //Inicializamos la variable del fondo como string vacío
  loginError: string = '';
  //Con FormBuilder creas un el formulario de LOGIN
  loginForm = this.formBuilder.group({
    email: ['carlos@gmail.com', [Validators.required, Validators.email]],
    password: ['', Validators.required],
  });

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private loginService: LoginService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    //Método para generar un número random y definir el fondo en base a ese número
    this.random = Math.floor(Math.random() * 3); // Generar un número aleatorio del 0 al 2
    this.backgroundClass = 'background-' + this.random.toString();
  }

  //Getters para obtener los valores del formControl y usarlos desde el template
  get email() {
    return this.loginForm.controls.email;
  }

  get password() {
    return this.loginForm.controls.password;
  }

  //Método que hace la lógica, si es válido (pasa los Validators) llama al servicio de login, si no, saca error
  loginUser() {
    if (this.loginForm.valid) {
      this.loginService
        .loginUser(this.loginForm.value as loginRequest)
        .subscribe({
          next: () => {
            console.info('Logeado con éxito');
            this.router.navigateByUrl('/inicio');
            this.loginForm.reset();
          },
          error: (errorData) => {
            console.error(errorData);
            this.loginError = errorData;
          }
        });
    } else {
      this.loginForm.markAllAsTouched();
      //alert('Datos incorrectos');
    }
  }
  
}
