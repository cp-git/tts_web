import { Task } from "../task/class/task";

export interface Task2 {
    parentTasks: Task[];
    childTasks: Task[];
}