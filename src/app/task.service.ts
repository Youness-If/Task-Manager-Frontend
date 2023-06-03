import { Injectable } from '@angular/core';
import { WebRequestService } from './web-request.service';
import { Task } from './models/task.model';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor(private webReqService: WebRequestService) { }

  createList(title: string) {
    return this.webReqService.post('lists', { title });
  }

  updateList(id: string, title: string) {
    return this.webReqService.patch(`lists/${id}`, { title });
  }

  updateTask(listId: string, taskId: string, title: string, description: string, deadline: string) {
    return this.webReqService.patch(`lists/${listId}/tasks/${taskId}`, { title, description, deadline });
  }

  createTask(title: string, description: string, deadline: Date, listId: string) {
    return this.webReqService.post(`lists/${listId}/tasks`, { title, description, deadline });
  }

  deleteList(id: string) {
    return this.webReqService.delete(`lists/${id}`);
  }

  deleteTask(listId: string, taskId: string) {
    return this.webReqService.delete(`lists/${listId}/tasks/${taskId}`);
  }

  getLists() {
    return this.webReqService.get('lists');
  }

  getTasks(listId: string) {
    return this.webReqService.get(`lists/${listId}/tasks`);
  }

  complete(task: Task) {
    return this.webReqService.patch(`lists/${task._listId}/tasks/${task._id}`, {
      completed: !task.completed
    });
  }

  searchTasks(listId: string, keyword: string) {
    return this.webReqService.get(`lists/${listId}/tasks/search?keyword=${keyword}`);
  }
}
