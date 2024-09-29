import { NgFor } from '@angular/common';
import { Component } from '@angular/core';
import { TasksService } from 'src/app/services/tasks.service';
import { TasksType } from 'src/app/types/tasks.type';

@Component({
  selector: 'app-tasks',
  standalone: true,
  imports: [NgFor],
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss'],
})
export class TasksComponent {
  tasks: TasksType[] = [];

  constructor(private readonly tasksService: TasksService) {
    this.getAllTasks();
  }

  getAllTasks() {
    this.tasksService.getAllTasks().subscribe({
      next: (res) => {
        this.tasks = res as TasksType[];
      },
      error: (e) => {
        console.log(e);
      },
    });
  }
}
