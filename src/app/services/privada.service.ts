import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from './auth/token-auth.service';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PrivadaService {

  private _privadaUrl =  "http://localhost:3000/api/privada";
  constructor(private http: HttpClient, private authService: AuthService) { }

  getEvents() {
    // Obtiene el token de autenticación del servicio de autenticación
    const token = this.authService.getToken();
    // Verifica si hay un token disponible
    if (token) {
      // Crea un encabezado con el token de autenticación
      const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
      // Realiza la solicitud HTTP incluyendo el encabezado con el token
      return this.http.get<any>(this._privadaUrl, { headers });
    } else {
      // Si no hay token, puedes manejar este caso según tus necesidades
      // Por ejemplo, puedes redirigir al usuario a la página de inicio de sesión
      // O mostrar un mensaje de error al usuario
      // Aquí devolvemos un observable vacío
      alert('No hay token');
      return of(null);
    }
  }
}
