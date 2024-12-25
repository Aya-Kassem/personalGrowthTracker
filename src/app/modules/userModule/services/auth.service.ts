import { inject, Injectable } from '@angular/core';
import { FirebaseApp } from '@angular/fire/app';
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from '@angular/fire/auth';
import { addDoc, collection, Firestore, setDoc } from '@angular/fire/firestore';
import { doc } from '@firebase/firestore';
import { Auth } from 'firebase/auth';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  app: FirebaseApp = inject(FirebaseApp);
  appAuth: Auth = getAuth(this.app);
  userUID: string = '';
  fire = inject(Firestore);

  createUser(email: string, password: string): Observable<any> {
    console.log('User Created');
    const signUpUser = createUserWithEmailAndPassword(
      this.appAuth,
      email,
      password
    );
    return of(signUpUser);
  }

  signIn(email: string, password: string) {
    console.log('User Signed In');
    return signInWithEmailAndPassword(this.appAuth, email, password);
  }

  async setUserDocument(uid: string, email: string, data: any) {
    // const data = {
    //   name: 'Aya Kassem',
    //   title: 'FrontEnd Developer',
    //   company: 'T-Tech',
    //   'contract-type': 'Full Time',
    //   email: 'aya.kassem66@gmail.com',
    //   github: 'https://github.com/Aya-Kassem',
    //   linkedin: 'https://www.linkedin.com/in/ayakassem',
    // };

    try {
    //   await setDoc(doc(this.fire, 'personalGrowthTracker', uid), data);

    } catch (e) {
      console.error('Error adding document: ', e);
    }
  }
}
