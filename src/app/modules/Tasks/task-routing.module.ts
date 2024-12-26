import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddNewTaskComponent } from './addTask/add-task.component';

const routes: Routes = [
  { path: '', redirectTo: 'add-task', pathMatch: 'full'},
  { path: 'add-task', component: AddNewTaskComponent },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})

export class TasksRoutingModule {}