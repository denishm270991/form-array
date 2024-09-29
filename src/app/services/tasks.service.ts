import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TasksType } from '../types/tasks.type';

@Injectable({
  providedIn: 'root',
})
export class TasksService {
  tasks = signal<TasksType[]>([]);

  constructor(private readonly http: HttpClient) {}

  getAllTasks() {
    return this.http.get(`https://jsonplaceholder.typicode.com/todos`);
  }

  getTaskById(id: number): TasksType {
    const taskList = this.tasks().filter((t) => t.id === id);
    return taskList[0];
  }

  changeStatusTask(id: number) {
    for (let i = 0; i < this.tasks().length; i++) {
      if (this.tasks()[i].id === id) {
        this.tasks()[i].completed = !this.tasks()[i].completed;
        break;
      }
    }
  }

  getTaskByState(state: string) {
    let taskList: TasksType[] = [];
    switch (state) {
      case '-1':
        taskList = this.tasks();
        break;
      case '0':
        taskList = this.tasks().filter((t) => !t.completed);
        break;
      default:
        taskList = this.tasks().filter((t) => t.completed);
        break;
    }
    return taskList;
  }
}
