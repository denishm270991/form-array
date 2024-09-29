import { NgClass, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { TasksService } from 'src/app/services/tasks.service';
import { TasksType } from 'src/app/types/tasks.type';

@Component({
  selector: 'app-new-task',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    NgClass,
    RouterLink,
    NgIf,
  ],
  templateUrl: './new-task.component.html',
  styleUrls: ['./new-task.component.scss'],
})
export class NewTaskComponent {
  //FORM
  submitted: boolean = false;
  form: FormGroup;

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly tasksService: TasksService,
    private readonly router: Router
  ) {
    this.form = this.formBuilder.group({
      title: ['', Validators.required],
      date: ['', Validators.required],
    });
  }

  get f() {
    return this.form.controls;
  }

  onSubmit() {
    this.submitted = true;

    if (this.form.invalid) return;
    const values: TasksType = this.form.value;
    let id = this.tasksService.tasks().length + 1;

    let task: TasksType = {
      id: id,
      title: values.title,
      date: values.date,
      completed: false,
    };
    this.tasksService.tasks.update((values) => {
      return [...values, task];
    });

    alert('Tarea añadida con éxito.');
    this.router.navigate(['']);
  }
}
