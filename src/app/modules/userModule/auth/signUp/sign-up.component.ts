import { Component, inject } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.scss',
  standalone: false,
})
export class SignUpComponent {
  private authService = inject(AuthService);
  _FormBuilder = inject(FormBuilder);
  signUpForm!: FormGroup;
  translateService = inject(TranslateService);
  router = inject(Router);

  ngOnInit() {
    //this.signIn();
    this.createSignInForm();
  }

  createSignInForm() {
    this.signUpForm = this._FormBuilder.group({
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required]],
    });
  }

  signUpUser(){
    // if(!this.signUpForm.valid) return;
    // let email = this.signUpForm.get('email')?.value;
    // let password = this.signUpForm.get('password')?.value;
    // this.authService.createUser(email, password).then((userCredential) => {
    //   console.log(userCredential.user);
    //   const token = userCredential?.user?.accessToken;
    //   this.saveToken(token);
    //   this.router.navigate(['signIn']);
    // }).catch((error) => {
    //   console.error(error);
    // })
  }

  saveToken(token: string){
    if(token) localStorage.setItem('authToken', token)
  }
}
