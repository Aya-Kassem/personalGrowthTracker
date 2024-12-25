import { Component, inject } from '@angular/core';
import { Auth, signInWithEmailAndPassword } from '@angular/fire/auth';
import { AuthService } from '../../services/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-signIn',
  templateUrl: './signIn.component.html',
  styleUrls: ['./signIn.component.scss'],
})
export class SignInComponent {
  private authService = inject(AuthService);
  _FormBuilder = inject(FormBuilder);
  signInForm!: FormGroup;

  ngOnInit() {
    //this.signIn();
    this.createSignInForm();
  }

  createSignInForm(){
    this.signInForm = this._FormBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    })
  }


  signInUser() {
    console.log(this.signInForm.value);
    
  //   let email = 'aya@gmail.com';
  //   this.authService
  //     .signIn(email, '123456')
  //     .then(userCredential => {
  //       this.authService.setUserDocument(userCredential.user.uid, email, {email: email})
  //       userCredential.user?.getIdToken().then(token => {
  //         sessionStorage.setItem('authToken', token);
  //         console.log(userCredential.user);
  //       });
  //     });
  }
}
