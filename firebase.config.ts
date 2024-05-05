import { EnvironmentProviders, importProvidersFrom } from '@angular/core';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { getStorage, provideStorage } from '@angular/fire/storage';
import { environment } from './src/environments/environment';

const firebaseProviders: EnvironmentProviders = importProvidersFrom(
    provideFirebaseApp(() =>
      initializeApp(environment.firebase) //Viene de src/environments/environment.ts
    ),
    provideFirestore(() => getFirestore()),
    provideAuth(() => getAuth()),
    provideStorage(() => getStorage()),
  );

  export { firebaseProviders };
