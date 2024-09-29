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
}
