import { NgClass, NgFor, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { TasksService } from 'src/app/services/tasks.service';
import { PersonType } from 'src/app/types/person.type';
import { TasksType } from 'src/app/types/tasks.type';
@Component({
  selector: 'app-new-task',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, NgClass, RouterLink, NgIf, NgFor],
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
      people: new FormArray([this.initPerson()]),
    });
  }

  initPerson() {
    return new FormGroup({
      fullName: new FormControl('', [
        Validators.required,
        Validators.minLength(5),
      ]),
      age: new FormControl(18, [Validators.required, Validators.min(18)]),
      skills: new FormArray([this.initSkill()]),
    });
  }
  initSkill() {
    return new FormGroup({
      name: new FormControl('', Validators.required),
      versions: new FormArray([this.initVersion()]),
    });
  }
  initVersion() {
    return new FormGroup({
      name: new FormControl('', Validators.required),
    });
  }

  addPerson() {
    const control = <FormArray>this.form.get('people');
    control.push(this.initPerson());
  }

  addSkill(j: number) {
    const formArrayPeople = this.form.get('people') as FormArray;
    const control = formArrayPeople.controls[j].get('skills') as FormArray;
    control.push(this.initSkill());
  }

  addVersion(i: number, j: number) {
    const formArrayPeople = this.form.get('people') as FormArray;
    const formArraySkills = formArrayPeople.controls[i].get(
      'skills'
    ) as FormArray;
    const control = formArraySkills.controls[j].get('versions') as FormArray;
    control.push(this.initVersion());
  }

  get f() {
    return this.form.controls;
  }

  getPeople(form: any) {
    return form.controls.people.controls;
  }

  getSkills(form: any) {
    return form.controls.skills.controls;
  }

  getVersions(form: any) {
    return form.controls.versions.controls;
  }

  removePerson(i: any) {
    const control = <FormArray>this.form.get('people');
    control.removeAt(i);
  }

  removeSkill(i: number, j: number) {
    const formArrayPeople = this.form.get('people') as FormArray;
    const control = formArrayPeople.controls[i].get('skills') as FormArray;
    control.removeAt(j);
  }

  removeVersion(i: number, j: number, k: number) {
    const formArrayPeople = this.form.get('people') as FormArray;
    const formArraySkills = formArrayPeople.controls[i].get(
      'skills'
    ) as FormArray;
    const control = formArraySkills.controls[j].get('versions') as FormArray;
    control.removeAt(k);
  }

  getSizeSkillsByPositionPerson(i: number) {
    const formArray = this.form.get('people') as FormArray;
    const control = formArray.controls[i].get('skills') as FormArray;
    return control.length;
  }

  getSizeVerionsByPositionPersonAndSkills(i: number, j: number) {
    const formArrayPeople = this.form.get('people') as FormArray;
    const formArraySkills = formArrayPeople.controls[i].get(
      'skills'
    ) as FormArray;
    const control = formArraySkills.controls[j].get('versions') as FormArray;
    return control.length;
  }

  checkIfUniqueName(index: number) {
    let visitedList: string[] = [];
    let valueArr: string[] = [];
    const formArray = this.form.get('people') as FormArray;
    formArray.controls.forEach((control) => {
      visitedList.push(control.value.fullName);
      valueArr = visitedList.filter(
        (fullName) => fullName === control.value.fullName
      );
      if (valueArr.length > 1) {
        control.get('fullName')?.setErrors({ duplicatedFullName: true });
      }
    });
  }

  onSubmit() {
    this.submitted = true;

    if (this.form.invalid) return;
    const values: TasksType = this.form.value;
    let id = this.tasksService.tasks().length + 1;
    let people: PersonType[] = [];
    values.people.map((p) => people.push(p));

    let task: TasksType = {
      id: id,
      title: values.title,
      date: values.date,
      completed: false,
      people: people,
    };

    this.tasksService.tasks.update((values) => {
      return [...values, task];
    });

    alert('Tarea añadida con éxito.');
    this.router.navigate(['']);
  }
}
