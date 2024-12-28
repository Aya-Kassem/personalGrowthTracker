import { inject, Injectable } from '@angular/core';
import { FirebaseApp } from '@angular/fire/app';
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  Auth,
  UserCredential,
  setPersistence,
  browserSessionPersistence,
  authState,
  User,
} from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import {
  Firestore,
  doc,
  setDoc,
  collection,
  docData,
} from '@angular/fire/firestore';
import { BehaviorSubject } from 'rxjs';
import { CurrentUser, UserProfileInfo } from '../Models/user.interface';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  angularFire = inject(AngularFirestore);
  fire: Firestore = inject(Firestore);
  app: FirebaseApp = inject(FirebaseApp);
  appAuth: Auth = getAuth(this.app);
  baseCollectionPath: string = 'personalGrowthTracker';

  currentUser: CurrentUser = {
    email: '',
    uid: '',
    token: '',
  };

  createUser(email: string, password: string): Promise<any> {
    return createUserWithEmailAndPassword(this.appAuth, email, password);
  }

  signIn(email: string, password: string) {
    console.log('User Signed In');
    return signInWithEmailAndPassword(this.appAuth, email, password);
  }

  async setCurrentUserInfo(userInfo : User | null) {
    const token = await userInfo?.getIdToken() ?? '';
    const uid = userInfo?.uid ?? '';
    const email = userInfo?.email ?? '';

    this.currentUser = {email, uid, token};
  }

  async createUserCollection() {
    try {
      await this.angularFire
        .collection('users')
        .doc(this.currentUser.uid)
        .set({ email: this.currentUser.email });
      // await this.angularFire.collection(this.baseCollectionPath).doc(uid).collection('courses').doc('Javascript Testing').set({
      //   courseDuration: '50 hours',
      //   courseProgress: '50%',
      //   courseLocation: 'Online',
      //   joinedDate: '01/01/2024'
      // })
    } catch (err) {
      console.log(err);
    }
  }

  async setUserProfile(data: UserProfileInfo) {
    const userDatabase = this.angularFire
    .collection('profile')
    .doc(this.currentUser.uid);

    await userDatabase.set(data);
  }

  setCollection(collectionName: string) {
    const userDatabase = this.angularFire
      .collection(this.baseCollectionPath)
      .doc(this.currentUser.uid);
    userDatabase.collection(collectionName);
  }

  setDocument(path: string) {}

  setCollectionData(collectionName: string, data: any){}
  setDocumentData(path: string, data: any){}

  checkIfUserExist() {
    const userToken = localStorage.getItem('authToken') || '';
    return userToken ? true : false;
  }
}
