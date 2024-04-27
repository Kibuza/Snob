import { NgFor } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { NgxFileDropModule } from 'ngx-file-drop';
import {
  NgxFileDropEntry,
  FileSystemFileEntry,
  FileSystemDirectoryEntry,
} from 'ngx-file-drop';
import { AuthService } from '../../services/auth/token-auth.service';

@Component({
  selector: 'app-upload-files',
  standalone: true,
  imports: [NgxFileDropModule, NgFor],
  templateUrl: './upload-files.component.html',
  styleUrl: './upload-files.component.css',
})
export class UploadFilesComponent {
  private _privadaUrl = 'http://localhost:3000/api/upload_img';
  public files: NgxFileDropEntry[] = [];
  private usuario: any | null = null;

  constructor(private http: HttpClient, private authService: AuthService) {}

  public dropped(files: NgxFileDropEntry[]) {
    this.files = files;
    for (const droppedFile of files) {
      // Is it a file?
      if (droppedFile.fileEntry.isFile) {
        const fileEntry = droppedFile.fileEntry as FileSystemFileEntry;
        fileEntry.file((file: File) => {
          // Here you can access the real file
          console.log(droppedFile.relativePath, file);

          // You could upload it like this:
          const formData = new FormData();
          formData.append('avatar', file, droppedFile.relativePath);

          //Esto es únicamente para coger el token y enviarlo por la cabecera
          this.authService.getToken().subscribe((token) => {
            // Aquí puedes utilizar el token para autenticar al usuario o realizar otras acciones
            if (token) {
              const headers = new HttpHeaders().set(
                'Authorization',
                `Bearer ${token}`
              );
              this.authService.getUser().subscribe((data) => {
                if (data) {
                  this.usuario = data;
                  this.http
                    .post(this._privadaUrl, formData, {
                      headers: headers,
                      responseType: 'blob',
                    })
                    .subscribe((data) => {
                      this.actualizarAvatarEnBaseDeDatos(
                        this.usuario._id,
                        droppedFile.relativePath
                      );
                    });
                }
              });
            } else {
              // El token es null, el usuario no está autenticado
            }
          });
        });
      } else {
        // It was a directory (empty directories are added, otherwise only files)
        const fileEntry = droppedFile.fileEntry as FileSystemDirectoryEntry;
        console.log(droppedFile.relativePath, fileEntry);
      }
    }
  }

  private actualizarAvatarEnBaseDeDatos(userId: string, nombreArchivo: string) {
    const url = `http://localhost:3000/api/users/${userId}/avatar`;
    const partes = nombreArchivo.split(".");
    const extension = partes[partes.length - 1]; // Tomamos la última parte
    const nombre = `${userId}-avatar.${extension}`;

    this.authService.getToken().subscribe((token) => {
      if (token) {
        const headers = new HttpHeaders().set(
          'Authorization',
          `Bearer ${token}`
        );
        const body = { avatar: nombre }; // El cuerpo de la solicitud debe contener el nuevo nombre del archivo
        this.http.put(url, body, { headers: headers }).subscribe((data) => {
          window.location.reload();
        });
      } else {
        // El token es null, el usuario no está autenticado
      }
    });
  }

  public fileOver(event: any) {
    console.log(event);
  }

  public fileLeave(event: any) {
    console.log(event);
  }
}
