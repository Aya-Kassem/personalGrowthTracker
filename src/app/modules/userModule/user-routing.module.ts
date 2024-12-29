import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserProfileComponent } from './profile/user-profile.component';
import { SignInComponent } from './auth/SignIn/signIn.component';
import { SignUpComponent } from './auth/signUp/sign-up.component';
import { UserResolver } from '../../shared/Resolvers/user.resolver';
import { UserProfileResolver } from '../../shared/Resolvers/profile.resolver';

const routes: Routes = [
  { path: '', redirectTo: 'signUp', pathMatch: 'full' },
  { path: 'signIn', component: SignInComponent },
  { path: 'signUp', component: SignUpComponent },
  {
    path: 'profile',
    component: UserProfileComponent,
    resolve: {userProfile: UserProfileResolver},
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserRoutingModule {}
