import { Injectable, inject } from '@angular/core';
import {
  Firestore,
  addDoc,
  arrayRemove,
  arrayUnion,
  collection,
  collectionData,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  query,
  setDoc,
  updateDoc,
  where,
} from '@angular/fire/firestore';
import { EMPTY, Observable, map, take } from 'rxjs';
import { Favorite, FavoriteForm } from '../interfaces/favorites.interface';

const PATH = 'favorites';

@Injectable({
  providedIn: 'root'
})
export class FavoritesService {

  constructor() { }

  private _firestore = inject(Firestore);
  private _collection = collection(this._firestore, PATH);

    //Saca todos los favoritos
    getFavorites() {
      return collectionData(this._collection, { idField: 'id' }).pipe(
        take(1)
      ) as Observable<Favorite[]>;
    }

    getFavoritesByUser(id: string): Observable<any> {
      const queryRef = query(this._collection, where('id_usuario', '==', id));
      return collectionData(queryRef, { idField: 'id' }).pipe(
        take(1),
        map((favorites) => {
          if (favorites.length === 0) {
            return EMPTY; // Devuelve un observable vacío si no hay resultados
          } else {
            return favorites; // Devuelve los resultados si se encontraron seguidores
          }
        })
      );
    }

      //Crea un favorito
  async createFavorite(favorite: FavoriteForm) {
    // Obtener la consulta para encontrar el documento del usuario que sigue
    const userQuery = query(
      this._collection,
      where('id_usuario', '==', favorite.id_usuario)
    );
    // Realizar la consulta
    const userDocs = await getDocs(userQuery);

    // Verificar si se encontró algún usuario
    if (userDocs.empty) {
      // Si no se encuentra ningún usuario con el id_usuario especificado, simplemente agregar el documento de seguimiento
      //return addDoc(this._collection, follow);
      this.createNewFollow(favorite);
    } else {
      // Actualizar la lista de seguidos del usuario
      const userDoc = userDocs.docs[0]; // Suponiendo que solo hay uno
      return await updateDoc(userDoc.ref, {
        id_peliculas_favoritas: arrayUnion(favorite.id_peliculas_favoritas),
      });
    }
  }

  async createNewFollow(favorite: FavoriteForm) {
    const favoriteRef = doc(this._collection);
    await setDoc(favoriteRef, {
      id_usuario: favorite.id_usuario,
      id_peliculas_favoritas: [favorite.id_peliculas_favoritas],
    });
  }

  async deleteFavorite(favorite: FavoriteForm) {
    // Obtener la consulta para encontrar el documento del usuario que sigue
    const userQuery = query(
      this._collection,
      where('id_usuario', '==', favorite.id_usuario)
    );

    // Realizar la consulta
    const userDocs = await getDocs(userQuery);

    // Verificar si se encontró algún usuario
    if (userDocs.empty) {
      throw new Error('No se encontró ningún usuario con el ID proporcionado.');
    }
    // Obtener el documento del usuario
    const userDoc = userDocs.docs[0]; // Suponiendo que solo hay uno

    // Eliminar el idUsuarioSeguido del array id_usuarios_seguidos
    await updateDoc(userDoc.ref, {
      id_peliculas_favoritas: arrayRemove(favorite.id_peliculas_favoritas),
    });
  }

}
