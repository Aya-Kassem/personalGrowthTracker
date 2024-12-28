import { Component, inject } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router';
import { UserCredential } from 'firebase/auth';

@Component({
  selector: 'app-signIn',
  templateUrl: './signIn.component.html',
  styleUrls: ['./signIn.component.scss'],
})
export class SignInComponent {
  private authService = inject(AuthService);
  _FormBuilder = inject(FormBuilder);
  signInForm!: FormGroup;
  translateService = inject(TranslateService);
  router = inject(Router);

  ngOnInit() {
    this.createSignInForm();
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
        if (userCredential?.user?.uid) {
          this.authService.createUserCollection();
          this.router.navigate(['profile'])
        };
      })
      .catch((err) => {
        console.error(err);
      });
  }
}
