import { NgClass, NgFor } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { TasksService } from 'src/app/services/tasks.service';
import { TasksType } from 'src/app/types/tasks.type';

@Component({
  selector: 'app-tasks',
  standalone: true,
  imports: [RouterLink, NgFor, FormsModule, ReactiveFormsModule, NgClass],
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss'],
})
export class TasksComponent {

  constructor(public readonly tasksService: TasksService) {
    // this.getAllTasks();
  }

  getAllTasks() {
    this.tasksService.getAllTasks().subscribe({
      next: (res) => {
        this.tasksService.tasks.set(res as TasksType[]);
      },
      error: (e) => {
        console.log(e);
      },
    });
  }

  see(idTask: number) {
    console.log('show task');
  }
}
