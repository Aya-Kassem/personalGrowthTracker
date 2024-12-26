import { NgModule } from '@angular/core';
import { AsyncPipe, CommonModule } from '@angular/common';
import { MainContentComponent } from './main-content.component';

import { TasksModule } from '../Tasks/task.module';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { HeaderComponent } from '../../components/header/header.component';
import { MainContentRoutingModule } from './main-content-routing.module';

@NgModule({
  declarations: [MainContentComponent],
  imports: [
    MainContentRoutingModule,
    TasksModule,
    NavbarComponent,
    HeaderComponent,
    AsyncPipe,
    CommonModule
  ],
  exports: [],
})
export class MainContentModule {}
