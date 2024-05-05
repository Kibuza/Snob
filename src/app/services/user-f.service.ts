import { Injectable, OnDestroy, inject } from '@angular/core';
import {
  Auth,
  getAuth,
  User,
  user,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  signOut,
  signInWithPopup,
  GoogleAuthProvider,
} from '@angular/fire/auth';
import { Observable, Subscription, take } from 'rxjs';
import { Firestore, addDoc, collection, collectionData, deleteDoc, doc, getDoc, getDocs, query, setDoc, updateDoc, where } from '@angular/fire/firestore';
import { registerRequest } from '../auth/register/registerRequest';

const PATH='users';
@Injectable({
  providedIn: 'root',
})
export class UserFService implements OnDestroy {

  private auth: Auth = inject(Auth);
  private firestore: Firestore = inject(Firestore);
  user$ = user(this.auth);
  userSubscription: Subscription;

  private _collection = collection(this.firestore, PATH);

  constructor() {
    this.userSubscription = this.user$.subscribe((aUser: User | null) => {
        //handle user state changes here. Note, that user will be null if there is no currently logged in user.
     //console.log(aUser);
    })
  }

  async register({ email, password, username }: any) {
    try {
      return await createUserWithEmailAndPassword(this.auth, email, password)
        .then(async (userCredential) => {
          const user = userCredential.user;
  
          // Actualizar el perfil del usuario con el nombre de usuario y la foto predeterminada
          await Promise.all([
            updateProfile(user, { displayName: username }),
            updateProfile(user, { photoURL: 'https://firebasestorage.googleapis.com/v0/b/snobs-58321.appspot.com/o/avatares%2Fperfil.jpg?alt=media&token=56aafda1-4291-4781-9cb9-1221e770a1f3' })
          ]);
  
          // Crear documento de usuario en Firestore con el UID como ID del documento
          await setDoc(doc(this._collection, user.uid), {
            uid: user.uid,
            email: user.email,
            username: username,
            rol: 'USER_ROLE',
            avatar: user.photoURL,
            // Otros datos del usuario que desees almacenar
          });
  
        })
        .catch((error) => {
          // Manejar errores
          console.error('Error al registrar:', error);
          throw error;
        });
    } catch (error) {
      console.error('Error al registrar:', error);
      throw error;
    }
  }
  

  async login({ email, password }: any) {
    try {
      const { user } = await signInWithEmailAndPassword(
        this.auth,
        email,
        password
      );
      return user;
    } catch (error) {
      throw error;
    }
  }

  loginWithGoogle() {
    return signInWithPopup(this.auth, new GoogleAuthProvider()).then(async (userCredential) => {
      const user = userCredential.user;
      console.log(user);
      // Crear documento de usuario en Firestore con el UID como ID del documento
       await setDoc(doc(this._collection, user.uid), {
         uid: user.uid,
         email: user.email,
         username: user.displayName,
         rol: 'USER_ROLE',
         avatar: user.photoURL,
         // Otros datos del usuario que desees almacenar
       });

    })
    .catch((error) => {
      // Manejar errores
      console.error('Error al registrar:', error);
      throw error;
    });
} catch (error) {
  console.error('Error al registrar:', error);
  throw error;
};

  logout() {
    this.ngOnDestroy();
    return signOut(this.auth);
  }

  async updateAvatar( photoURL : any) {
    await updateProfile(this.auth.currentUser, {displayName: this.auth.currentUser.displayName, photoURL} ).then(() => {
      const document = doc(this._collection, this.auth.currentUser.uid);
      updateDoc(document, {avatar: photoURL}).then(() => {
        console.log('Avatar actualizado');
      });
    });
  }
  async getUser(id: string) {
    const docSnap = await getDoc(doc(this._collection, id));
    if (docSnap.exists()) {
        return docSnap.data();
    } else {
        throw new Error('No se encontró ningún documento con el ID proporcionado.');
    }
}

getUsers() {
  return collectionData(this._collection, {idField: 'id'}).pipe(take(1)) as Observable<User[]>;
}

  ngOnDestroy() {
    // when manually subscribing to an observable remember to unsubscribe in ngOnDestroy
    this.userSubscription.unsubscribe();
  }
}
