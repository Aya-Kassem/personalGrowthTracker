import { NgModule } from '@angular/core';
import { UserProfileComponent } from './profile/user-profile.component';
import { UserRoutingModule } from './user-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MainButtonsDirective } from '../../shared/Directives/app-button.directive';
import { AsyncPipe, CommonModule, NgOptimizedImage } from '@angular/common';
import { TranslatePipe } from '@ngx-translate/core';
import { SignInComponent } from './auth/SignIn/signIn.component';
import { SignUpComponent } from './auth/signUp/sign-up.component';
import { HeaderComponent } from '../../components/header/header.component';

@NgModule({
  declarations: [UserProfileComponent, SignInComponent, SignUpComponent],
  imports: [
    UserRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MainButtonsDirective,
    AsyncPipe,
    CommonModule,
    NgOptimizedImage,
    TranslatePipe,
    HeaderComponent
  ],
  exports: []
})
export class UserModule {}
