import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TasksComponent } from './components/tasks/tasks.component';

const routes: Routes = [
  {
    path: '',
    component: TasksComponent,
  },
  {
    path: 'new-task',
    loadComponent: () =>
      import('../app/components/tasks/new-task/new-task.component').then(
        (c) => c.NewTaskComponent
      ),
  },
  {
    path: 'see-task/:id',
    loadComponent: () =>
      import('../app/components/tasks/see-task/see-task.component').then(
        (c) => c.SeeTaskComponent
      ),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
