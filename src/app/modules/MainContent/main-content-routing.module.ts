import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainContentComponent } from './main-content.component';
import { UserProfileComponent } from '../userModule/profile/user-profile.component';
import { UserProfileResolver } from '../../shared/Resolvers/profile.resolver';

const routes: Routes = [
  {
    path: '',
    component: MainContentComponent,
    children: [
      {
        path: 'profile',
        component: UserProfileComponent,
        resolve: { userProfile: UserProfileResolver },
      },
      {
        path: 'tasks',
        loadChildren: () =>
          import('./../Tasks/task.module').then((m) => m.TasksModule),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MainContentRoutingModule {}
