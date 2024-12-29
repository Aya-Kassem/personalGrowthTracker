import { inject, Injectable } from '@angular/core';
import { FirebaseApp } from '@angular/fire/app';
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  Auth,
  UserCredential,
} from '@angular/fire/auth';


@Injectable({
  providedIn: 'root',
})
export class AuthService {
  app: FirebaseApp = inject(FirebaseApp);
  appAuth: Auth = getAuth(this.app);
  userAuth: { email: string; password: string } = {
    email: '',
    password: '',
  };

  
  createUser(email: string, password: string): Promise<UserCredential> {
    return createUserWithEmailAndPassword(this.appAuth, email, password);
  }

  logOut() {
    signOut(this.appAuth).then((val) => {
      console.log('LOG OUT -> ', val);
    });
  }

  signIn(email: string, password: string): Promise<UserCredential> {
    return signInWithEmailAndPassword(this.appAuth, email, password);
  }

  
}
