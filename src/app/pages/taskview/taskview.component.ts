import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { List } from 'src/app/models/list.model';
import { TaskService } from 'src/app/task.service';
import { Task } from 'src/app/models/task.model';

@Component({
  selector: 'app-taskview',
  templateUrl: './taskview.component.html',
  styleUrls: ['./taskview.component.scss']
})
export class TaskviewComponent implements OnInit {

  lists!: any;
  tasks!: any;
  searchKeyword: string = '';
  sortBy: string = 'deadline';

  selectedListId!: string;

  showPopup: boolean = false;

  constructor(private taskService: TaskService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      if (params['listId']) {
        this.selectedListId = params['listId'];
        this.getTasks(this.selectedListId);
      } else {
        this.tasks = [];
      }
    });

    this.taskService.getLists().subscribe((lists: List) => {
      this.lists = lists;
    });
  }

  getTasks(listId: string): void {
    this.taskService.getTasks(listId).subscribe((tasks: Task) => {
      this.tasks = tasks;
    });
  }

  onTaskClick(task: Task): void {
    this.taskService.complete(task).subscribe(() => {
      task.completed = !task.completed;
    });
  }

  onDeleteListClick(): void {
    this.taskService.deleteList(this.selectedListId).subscribe((res: any) => {
      this.router.navigate(['/lists']);
    });
  }

  onDeleteTaskClick(taskId: string | undefined): void {
    if (taskId) {
      this.taskService.deleteTask(this.selectedListId, taskId).subscribe((res: any) => {
        this.tasks = this.tasks.filter((task: Task) => task._id !== taskId);
      });
    }
  }
  

  searchTasks(): void {
    if (this.searchKeyword.trim() !== '') {
      this.taskService.searchTasks(this.selectedListId, this.searchKeyword).subscribe((tasks: Task) => {
        this.tasks = tasks;
      });
    } else {
      this.getTasks(this.selectedListId);
    }
  }

  onSortChange(): void {
    this.getTasks(this.selectedListId); // Re-fetch the tasks with the new sorting
  }


  
}
