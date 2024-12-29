import { Component, inject, input } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router';
import { FireStoreService } from '../../../../shared/Services/fireStore.service';

@Component({
  selector: 'app-signIn',
  templateUrl: './signIn.component.html',
  styleUrls: ['./signIn.component.scss'],
})
export class SignInComponent {
  private authService = inject(AuthService);
  private fireStoreService = inject(FireStoreService);
  _FormBuilder = inject(FormBuilder);
  signInForm!: FormGroup;
  translateService = inject(TranslateService);
  router = inject(Router);

  ngOnInit() {
    this.createSignInForm();
    this.signInForm.get('email')?.setValue(this.authService.userAuth.email);
    this.signInForm.get('password')?.setValue(this.authService.userAuth.password);
  }

  createSignInForm() {
    this.signInForm = this._FormBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
  }

  signInUser() {
    let email = this.signInForm.get('email')?.value;
    let password = this.signInForm.get('password')?.value;
    if (!this.signInForm.valid) return;
    this.authService
      .signIn(email, password)
      .then((userCredential) => {
        if (userCredential?.user?.uid) this.checkIfUserExist();
      })
      .catch((err) => {
        console.error(err);
      });
  }

  checkIfUserExist() {
    this.fireStoreService.checkIfDocumentExist('users').then((userExist) => {
      if (!userExist) this.fireStoreService.createUserCollection();
      this.router.navigate(['profile']);
    });
  }
}
