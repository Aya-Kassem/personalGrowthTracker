import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BehaviorSubject, takeUntil } from 'rxjs';
import { UnsubscripeHelperClass } from '../../../shared/Helpers/removeSubscription';
import { IMAGE_LOADER, ImageLoaderConfig } from '@angular/common';
import { TranslateService } from '@ngx-translate/core';
import { Auth, AuthModule, getAuth, onAuthStateChanged } from '@angular/fire/auth';
import { FirebaseApp } from '@angular/fire/app';
import { addDoc, collection, Firestore } from 'firebase/firestore';
import { AuthService } from '../services/auth.service';

@Component({
  standalone: false,
  selector: 'app-navbar',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss'],
  providers: [
    {
      provide: IMAGE_LOADER,
      useValue: (config: ImageLoaderConfig) => {
        const { src, width } = config;
        return `${src}?${width}`;
      },
    },
  ],
})
export class UserProfileComponent extends UnsubscripeHelperClass {
  private _FormBuilder: FormBuilder = inject(FormBuilder);
  userForm: FormGroup = new FormGroup({});
  defaultUserImg: string = '/img/default-profile.png';
  isEditMode$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  app: FirebaseApp = inject(FirebaseApp);
  appAuthState = inject(Auth);
  authService = inject(AuthService);
  
  constructor(public _TranslateService: TranslateService) {
    super();
  }
  ngOnInit() {
    this.createUserForm();
    this.disableField();
    

    // onAuthStateChanged(this.appAuthState, (user) => {
    //   if (user) {
    //     console.log('User is signed in:', user.uid);
    //     this.authService.testFireStore(user.uid);
    //   } else {
    //     console.log('No user is signed in.');
    //   }
    // })
    
  }
  
  createUserForm() {
    this.userForm = this._FormBuilder.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      title: ['', [Validators.required, Validators.minLength(3)]],
      company: ['', [Validators.required, Validators.minLength(3)]],
      contractType: [''],
      img: [''],
      email: ['', [Validators.required, Validators.email]],
      github: [''],
      linkedin: [''],
    });
  }

  editProfile() {
    // if(!this.isEditMode$.value) return;
  }

  disableField() {
    this.isEditMode$
      .pipe(takeUntil(this.destroy$))
      .subscribe((isEditMode) => {
        if (!isEditMode) {
          Object.keys(this.userForm.controls).forEach((key) => {
            this.userForm.controls[key].disable();
          });
        } else {
          Object.keys(this.userForm.controls).forEach((key) => {
            this.userForm.controls[key].enable();
          });
        }
      });
  }

  enableEditMode() {
    this.isEditMode$.next(true);
  }
}
