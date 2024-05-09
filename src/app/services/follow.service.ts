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
import { Follow, FollowForm } from '../interfaces/follows.interface';

const PATH = 'follows';

@Injectable({
  providedIn: 'root',
})
export class FollowService {
  private _firestore = inject(Firestore);
  private _collection = collection(this._firestore, PATH);

  constructor() {}

  //Saca todos los follows
  getFollows() {
    return collectionData(this._collection, { idField: 'id' }).pipe(
      take(1)
    ) as Observable<Follow[]>;
  }

  //Saca los follows de un usuario
  getFollowsByUser(id: string): Observable<any> {
    const queryRef = query(this._collection, where('id_usuario', '==', id));
    return collectionData(queryRef, { idField: 'id' }).pipe(
      take(1),
      map((follows) => {
        if (follows.length === 0) {
          return EMPTY; // Devuelve un observable vacío si no hay resultados
        } else {
          return follows; // Devuelve los resultados si se encontraron seguidores
        }
      })
    );
  }

  //Crea un follow
  async createFollow(follow: FollowForm) {
    // Obtener la consulta para encontrar el documento del usuario que sigue
    const userQuery = query(
      this._collection,
      where('id_usuario', '==', follow.id_usuario)
    );
    // Realizar la consulta
    const userDocs = await getDocs(userQuery);

    // Verificar si se encontró algún usuario
    if (userDocs.empty) {
      //Si no se encuentra, crea el usuario
      this.createNewFollow(follow);
    } else {
      // Actualizar la lista de seguidos del usuario
      const userDoc = userDocs.docs[0]; // Suponiendo que solo hay uno
      return await updateDoc(userDoc.ref, {
        id_usuarios_seguidos: arrayUnion(follow.id_usuarios_seguidos),
      });
    }
  }

  async createNewFollow(follow: FollowForm) {
    const followRef = doc(this._collection);
    await setDoc(followRef, {
      id_usuario: follow.id_usuario,
      id_usuarios_seguidos: [follow.id_usuarios_seguidos],
    });
  }

  async eliminarSeguido(follow: FollowForm) {
    // Obtener la consulta para encontrar el documento del usuario que sigue
    const userQuery = query(
      this._collection,
      where('id_usuario', '==', follow.id_usuario)
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
      id_usuarios_seguidos: arrayRemove(follow.id_usuarios_seguidos),
    });
  }
}
