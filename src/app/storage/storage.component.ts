import { Component, OnInit, inject } from '@angular/core';
import {
  Storage,
  getDownloadURL,
  listAll,
  ref,
  uploadBytesResumable,
} from '@angular/fire/storage';
import { UserFService } from '../services/user-f.service';
import { get } from 'http';

@Component({
  selector: 'app-storage',
  standalone: true,
  templateUrl: './storage.component.html',
})
export class StorageComponent implements OnInit {

  selectedFileName = "";
  message = "";

  private authService: UserFService = inject(UserFService);
  ngOnInit(): void {
    //this.getImages();
  }
  private readonly storage: Storage = inject(Storage);

  async uploadFile(input: HTMLInputElement) {
    if (!input.files) return;
      const file = input.files.item(0);
      if (file) {
        const storageRef = ref(this.storage, `avatares/${file.name}`);
        await uploadBytesResumable(storageRef, file).then(async (response) => {
          const url = await getDownloadURL(storageRef);
          this.authService.updateAvatar(url).then((response) => {
            this.message = "Subida correctamente";
            //console.log("Subida correctamente al perfil");
          });
        });
      }
    
  }

  getImages() {
    const imagesRef = ref(this.storage, 'avatares');
    const listTask = listAll(imagesRef);
    listTask
      .then((response) => {
        response.items.forEach((item) => {
          const url = getDownloadURL(item);
          //console.log(url);
        });
      })
      .catch((error) => {
        //console.log(error);
      });
  }

  onFileSelected(event): void {
    this.selectedFileName = event.target.files[0].name;
    this.message = "Vas a subir: " + this.selectedFileName;
  }
}
