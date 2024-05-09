import { NgClass, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { loginForm } from './loginRequest';
import { UserFService } from '../../services/user-f.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, NgIf, RouterLink, NgClass],
  styleUrl: './login.component.css',
  templateUrl: './login.component.html',
})
export class LoginComponent implements OnInit {
  loginUserData = {};
  random: number = 0; // Inicializamos la variable random (para el fondo)
  backgroundClass: string = ''; //Inicializamos la variable del fondo como string vacío
  loginError: string = '';
  error_msg: string = '';
  //Con FormBuilder creas un el formulario de LOGIN
  loginForm = this.formBuilder.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required],
  });

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authService: UserFService
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

  loginUser() {
    if (this.loginForm.valid) {
      this.authService
        .login(this.loginForm.value as loginForm)
        .then((response) => {
          //console.log(response);
          this.router.navigateByUrl('/inicio');
          this.loginForm.reset();
        })
        .catch((errorData) => {
          console.error(errorData);
          this.error_msg = 'Los datos no son correctos.';
        });
    } else {
      this.loginForm.markAllAsTouched();
    }
  }

  loginWithGoogle() {
    this.authService.loginWithGoogle().then((response)=>{
      //console.log(response);
      this.router.navigateByUrl('/inicio');
    });
  }
}
