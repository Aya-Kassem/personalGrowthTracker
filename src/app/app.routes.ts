import { Routes } from '@angular/router';
import { MainContentComponent } from './modules/MainContent/main-content.component';

export const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./modules/userModule/user.module').then((m) => m.UserModule),
  },
  {
    path: 'dashboard',
    loadChildren: () =>
      import('./modules/MainContent/main-content.module').then((m) => m.MainContentModule)
  }

  //IF USER AUTHORIZED WILDCARD ROUTES WILL REDIRECT TO DAHBOARD, IF NOT WILL REDIRECT TO AUTH
  // {
  //   path: '**',
  //   component: MainContentComponent
  // }
];
