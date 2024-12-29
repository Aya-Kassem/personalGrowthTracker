import { inject, Injectable } from '@angular/core';
import {
  Resolve,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from '@angular/router';
import { Observable, from } from 'rxjs';
import { Auth, authState } from '@angular/fire/auth';
import {
  defaultUserProfile,
  UserProfileInfo,
} from '../../modules/userModule/Models/user.interface';
import { FireStoreService } from '../Services/fireStore.service';


@Injectable({
  providedIn: 'root',
})
export class UserProfileResolver implements Resolve<any> {
  constructor() {}
  private auth: Auth = inject(Auth);
  authState$ = authState(this.auth);
  fireStoreService = inject(FireStoreService);

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<UserProfileInfo> {
    return this.checkIfProfileCreated();
  }

  checkIfProfileCreated() {
    const profile = this.fireStoreService
      .checkIfDocumentExist('profile')
      .then((val) => {
        return val ? this.getUserProfile() : defaultUserProfile();
      });
    return from(profile);
  }

  getUserProfile() {
    return this.fireStoreService.getCollectionData('profile').then((value) => {
      return value as UserProfileInfo;
    });
  }
}
