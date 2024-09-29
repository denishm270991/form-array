import { PersonType } from "./person.type";

export type TasksType = {
  id: number;
  title: string;
  date: string;
  completed: boolean;
  people: PersonType[];
};
