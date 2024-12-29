import { Component, inject, input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BehaviorSubject, takeUntil } from 'rxjs';
import { UnsubscripeHelperClass } from '../../../shared/Helpers/removeSubscription';
import { IMAGE_LOADER, ImageLoaderConfig } from '@angular/common';
import { TranslateService } from '@ngx-translate/core';
import { UserProfileInfo } from '../Models/user.interface';
import { FireStoreService } from '../../../shared/Services/fireStore.service';

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
  //DEPENDENCIES
  private formBuilder: FormBuilder = inject(FormBuilder);
  private fireStoreService = inject(FireStoreService);
  public translateService = inject(TranslateService);

  userProfile = input<UserProfileInfo>();
  userForm: FormGroup = new FormGroup({});
  defaultUserImg: string = '/img/default-profile.png';
  isEditMode: boolean = false;
  isUserProfileExists$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
    false
  );

  constructor() {
    super();
  }

  ngOnInit() {
    this.createUserForm();
    const userProfile = this.userProfile();
    if (userProfile) {
      this.userForm.patchValue(userProfile);
      this.isUserProfileExists$.next(true);
    }
    this.disableField();
  }

  createUserForm() {
    this.userForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      title: ['', [Validators.required, Validators.minLength(3)]],
      company: ['', [Validators.required, Validators.minLength(3)]],
      contractType: [''],
      img: [''],
      email: ['', [Validators.required, Validators.email]],
      github: [''],
      linkedin: [''],
      joinDate: ['']
    });
  }

  editProfile() {
    if (!this.userForm.valid) return;
    this.fireStoreService.setUserProfile(this.userForm.value);
  }

  disableField() {
    this.isUserProfileExists$.pipe(takeUntil(this.destroy$)).subscribe((isProfileExist) => {
      if (isProfileExist && !this.isEditMode) {
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
    this.isEditMode = true;
    this.disableField();
  }

  navigateToAccount(account: string, accountType: string){
    if(account) window.open(account, '_blank');
    else console.log(`Your Account is Not Correct ${accountType} Account`);    
  }
}
