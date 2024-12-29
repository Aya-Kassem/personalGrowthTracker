import { inject, Injectable } from '@angular/core';
import {
  Resolve,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from '@angular/router';
import { AuthService } from '../../modules/userModule/services/auth.service';
import { Observable } from 'rxjs';
import { Auth, authState } from '@angular/fire/auth';
import { FireStoreService } from '../Services/fireStore.service';

@Injectable({
  providedIn: 'root',
})
export class UserResolver implements Resolve<any> {
  constructor() {}
  private auth: Auth = inject(Auth);
  authState$ = authState(this.auth);
  authService = inject(AuthService);
  fireStoreService = inject(FireStoreService);

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<any> | Promise<any> | any {
    return new Promise((resolve, reject) => {
      this.authState$.subscribe((user) => {
        if (user) {
          this.fireStoreService.setCurrentUserInfo(user);
          resolve(user);
        } else {
          reject('No user logged in');
        }
      });
    });
  }
}
