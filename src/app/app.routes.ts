import { Routes } from '@angular/router';
import { MainContentComponent } from './modules/MainContent/main-content.component';
import { UserResolver } from './shared/Resolvers/user.resolver';

export const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./modules/userModule/user.module').then((m) => m.UserModule),
    resolve: {
      userUid : UserResolver
    }
  },
  {
    path: 'dashboard',
    loadChildren: () =>
      import('./modules/MainContent/main-content.module').then((m) => m.MainContentModule),
    resolve: {
      userUid : UserResolver
    }
  }

  //IF USER AUTHORIZED WILDCARD ROUTES WILL REDIRECT TO DAHBOARD, IF NOT WILL REDIRECT TO AUTH
  // {
  //   path: '**',
  //   component: MainContentComponent
  // }
];
