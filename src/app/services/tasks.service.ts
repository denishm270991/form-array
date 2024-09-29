import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class TasksService {
  constructor(private readonly http: HttpClient) {}

  getAllTasks() {
    return this.http.get(`https://jsonplaceholder.typicode.com/todos`);
  }
}
