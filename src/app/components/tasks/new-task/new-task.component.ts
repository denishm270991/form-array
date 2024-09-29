import { JsonPipe, NgClass, NgFor, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { TasksService } from 'src/app/services/tasks.service';
import { PersonType } from 'src/app/types/person.type';
import { TasksType } from 'src/app/types/tasks.type';

export type SkillType = {
  positionPerson: number;
  name: string;
};

@Component({
  selector: 'app-new-task',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    NgClass,
    RouterLink,
    NgIf,
    NgFor,
    JsonPipe,
  ],
  templateUrl: './new-task.component.html',
  styleUrls: ['./new-task.component.scss'],
})
export class NewTaskComponent implements OnInit {
  //FORM
  submitted: boolean = false;
  form: FormGroup;
  skills: SkillType[] = [];
  skillName: string = 'name of skill ';

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly tasksService: TasksService,
    private readonly router: Router
  ) {
    this.form = this.formBuilder.group({
      title: ['', Validators.required],
      date: ['', Validators.required],
      people: this.formBuilder.array([]),
    });
  }
  ngOnInit(): void {
    this.addPerson();
    this.skills.push({ positionPerson: 0, name: '' });
  }

  get f() {
    return this.form.controls;
  }
  get people(): FormArray {
    return this.form.get('people') as FormArray;
  }

  addPerson() {
    const person = this.formBuilder.group({
      fullName: ['', [Validators.required, Validators.minLength(5)]],
      age: [18, [Validators.required, Validators.min(18)]],
      skills: [''],
    });
    this.people.push(person);
  }

  deletePerson(index: number) {
    this.people.removeAt(index);
  }

  addSkill(positionPerson: number) {
    console.log(positionPerson)
   console.log( this.skills)
   console.log(this.skillName)
    for (let i = 0; i < this.skills.length; i++) {
      if (this.skills[i].positionPerson === positionPerson) {
        this.skills[i].name = this.skillName;
        break;
      }
    }
    console.log( this.skills)
  }
  // deleteSkill(indexPerson: number, indexSkill: number) {
  //   (this.people.at(indexPerson).get('skills') as FormArray).removeAt(
  //     indexSkill
  //   );
  // }

  // addSkill(indexPerson: number) {
  //   const skill = this.formBuilder.group({
  //     name: [''],
  //   });
  //   (this.people.at(indexPerson).get('skills') as FormArray).push(skill);
  // }

  onSubmit() {
    this.submitted = true;

    console.log(this.form);
    if (this.form.invalid) return;
    const values: TasksType = this.form.value;
    let id = this.tasksService.tasks().length + 1;

    console.log(values);
    return;
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
