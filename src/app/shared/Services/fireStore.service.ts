import { inject, Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Firestore, getDoc } from '@angular/fire/firestore';
import {
  CurrentUser,
  UserProfileInfo,
} from '../../modules/userModule/Models/user.interface';
import { BehaviorSubject } from 'rxjs';
import { User } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root',
})
export class FireStoreService {
  angularFire = inject(AngularFirestore);
  fire: Firestore = inject(Firestore);
  baseCollectionPath: string = 'personalGrowthTracker';
  currentUser: BehaviorSubject<CurrentUser> = new BehaviorSubject<CurrentUser>({
    email: '',
    uid: '',
  });

  async setCurrentUserInfo(userInfo: User | null) {
    userInfo!.getIdToken().then((token) => {
      if (token) localStorage.setItem('authToken', token);
    });
    const uid = userInfo?.uid!;
    const email = userInfo?.email!;

    this.currentUser.next({ email, uid });
  }

  async createUserCollection() {
    try {
      await this.angularFire
        .collection('users')
        .doc(this.getCurrentUserUid())
        .set({ email: this.currentUser.value.email });
    } catch (err) {
      console.log(err);
    }
  }

  async setUserProfile(data: UserProfileInfo) {
    const userDatabase = this.angularFire
      .collection('profile')
      .doc(this.getCurrentUserUid());

    return await userDatabase.set(data);
  }

  async checkIfDocumentExist(collectionName: string) {
    const docRef = this.angularFire
      .collection(collectionName)
      .doc(this.getCurrentUserUid()).ref;
    const docSnapshot = await getDoc(docRef);
    return docSnapshot.exists() ? true : false;
  }

  async getCollectionData(collectionName: string) {
    const docRef = this.angularFire
      .collection(collectionName)
      .doc(this.getCurrentUserUid()).ref;
    const docSnapshot = (await getDoc(docRef)).data();
    return docSnapshot;
  }

  setCollection(collectionName: string) {
    const userDatabase = this.angularFire
      .collection(this.baseCollectionPath)
      .doc(this.getCurrentUserUid());
    userDatabase.collection(collectionName);
  }

  setDocument(path: string) {}

  setCollectionData(collectionName: string, data: any) {}
  setDocumentData(path: string, data: any) {}

  getCurrentUserUid() {
    return this.currentUser.value.uid;
  }
}
