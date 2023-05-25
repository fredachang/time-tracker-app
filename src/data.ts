import { v4 as uuidv4 } from "uuid";

export interface Project {
  id: string;
  title: string;
  targetHours: number;
  time: {
    Monday: number | "";
    Tuesday: number | "";
    Wednesday: number | "";
    Thursday: number | "";
    Friday: number | "";
    Saturday: number | "";
    Sunday: number | "";
  }[];
}

export type DayKey =
  | "Monday"
  | "Tuesday"
  | "Wednesday"
  | "Thursday"
  | "Friday"
  | "Saturday"
  | "Sunday";

export const weekDefault = {
  Monday: 0,
  Tuesday: 0,
  Wednesday: 0,
  Thursday: 0,
  Friday: 0,
  Saturday: 0,
  Sunday: 0,
};

export const initialProjects = [
  {
    id: uuidv4(),
    title: "Test Project 1",
    targetHours: 10,
    time: [weekDefault],
  },
  {
    id: uuidv4(),
    title: "Test Project 2",
    targetHours: 10,
    time: [weekDefault],
  },
];
