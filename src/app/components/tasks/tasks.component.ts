import { NgClass, NgFor, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { StateTaskPipe } from 'src/app/pipes/state-task.pipe';
import { TasksService } from 'src/app/services/tasks.service';
import { TasksType } from 'src/app/types/tasks.type';

@Component({
  selector: 'app-tasks',
  standalone: true,
  imports: [
    RouterLink,
    NgIf,
    NgFor,
    FormsModule,
    ReactiveFormsModule,
    NgClass,
    StateTaskPipe,
  ],
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss'],
})
export class TasksComponent {
  states = [
    { value: '-1', display: 'Todas' },
    { value: '0', display: 'Pendientes' },
    { value: '1', display: 'Completadas' },
  ];
  stateSelected: string = '-1';

  tasks: TasksType[] = [];

  constructor(
    public readonly tasksService: TasksService,
    private readonly router: Router
  ) {
    this.tasks = this.tasksService.tasks();
    // this.getAllTasks(); //por si se quiere ver el listado de las tarea del API
  }

  getAllTasks() {
    if (this.tasksService.tasks().length === 0) {
      this.tasksService.getAllTasks().subscribe({
        next: (res) => {
          this.tasksService.tasks.set(res as TasksType[]);
          this.tasks = res as TasksType[];
        },
        error: (e) => {
          console.log(e);
        },
      });
    }
  }

  see(idTask: number) {
    this.router.navigate([`see-task/${idTask}`]);
  }

  changeStateOfTask(idTask: number) {
    this.tasksService.changeStatusTask(idTask);
  }

  changeStateFilter() {
    this.tasks = this.tasksService.getTaskByState(this.stateSelected);
  }
}
