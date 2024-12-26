import { Component, inject } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';

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
  ngOnInit() {
    //this.signIn();
    this.createSignInForm();
  }

  createSignInForm() {
    this.signUpForm = this._FormBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
  }

  signUpUser(){}
}
