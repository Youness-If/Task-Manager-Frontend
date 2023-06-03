import { Pipe, PipeTransform } from '@angular/core';
import { Task } from './models/task.model';

@Pipe({
  name: 'sortTasks'
})
export class SortTasksPipe implements PipeTransform {

  transform(tasks: Task[], sortBy: string): Task[] {
    if (sortBy === 'deadline') {
      return tasks.sort((a: Task, b: Task) => {
        if (!a.deadline && !b.deadline) return 0;
        if (!a.deadline) return 1;
        if (!b.deadline) return -1;
        return new Date(a.deadline).getTime() - new Date(b.deadline).getTime();
      });
    } else if (sortBy === 'status') {
      return tasks.sort((a: Task, b: Task) => {
        if (a.completed === b.completed) return 0;
        if (!a.completed) return 1;
        if (!b.completed) return -1;
        return 0; // Ajout d'une valeur par défaut pour éviter undefined
      });
    } else {
      return tasks;
    }
  }

}
