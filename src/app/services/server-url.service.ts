import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ServerURLService {

  private serverUrl = 'http://localhost:3000';

  getServerUrl() {
    return this.serverUrl;
  }
}
