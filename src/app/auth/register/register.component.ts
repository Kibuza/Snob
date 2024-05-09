import { NgClass, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  ReactiveFormsModule,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { registerRequest } from './registerRequest';
import { UserFService } from '../../services/user-f.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, NgIf, RouterLink, NgClass],
  styleUrl: './register.component.css',
  templateUrl: './register.component.html',
})
export class RegisterComponent implements OnInit {
  random: number = 0; // Inicializamos la variable random
  backgroundClass: string = ''; //Inicializamos la variable del fondo como string vacío
  error_msg: string = '';

  //Este es el formGroup del registro, lo que está conectado con el HTML y puedes ponerle validadores
  registerForm = this.formBuilder.group({
    email: ['', [Validators.required, Validators.email]],
    username: ['', Validators.required],
    password: ['', [Validators.required, this.passwordValidator()]],
    r_password: ['', Validators.required],
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

  registerUser() {
    if (this.registerForm.valid) {
      if (
        this.registerForm.value.password !== this.registerForm.value.r_password
      ) {
        this.error_msg = 'Las contraseñas no coinciden.';
        return;
      }
      this.authService
        .register(this.registerForm.value)
        .then((response) => {
          console.log(response);
          this.router.navigateByUrl('/inicio');
          this.registerForm.reset();
        })
        .catch((error) => {
          console.error(error);
        });
    } else {
      this.registerForm.markAllAsTouched();
    }
  }

  passwordValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const value: string = control.value;

      // Define la expresión regular para verificar la contraseña
      const passwordRegex =
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+-])[A-Za-z\d!@#$%^&*()_+-]{7,}$/;

      // Comprueba si la contraseña cumple con la expresión regular
      if (!passwordRegex.test(value)) {
        return { invalidPassword: true };
      }

      return null;
    };
  }

  loginWithGoogle() {
    this.authService.loginWithGoogle().then((response)=>{
      //console.log(response);
      this.router.navigateByUrl('/inicio');
    });
  }
}
