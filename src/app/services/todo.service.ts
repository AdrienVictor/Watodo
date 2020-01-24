import { Injectable } from "@angular/core";
import { Todo } from "../interfaces/todo";
import {
  AngularFirestore,
  AngularFirestoreCollection
} from "@angular/fire/firestore";
import { Observable } from "rxjs";

@Injectable()
export class TodoService {
  todos: Todo[] = [
    {
      id: 1,
      title: "do a todo list",
      completed: false,
      editing: false
    },
    {
      id: 2,
      title: "practice angular",
      completed: false,
      editing: false
    }
  ];
  // todosCollection: AngularFirestoreCollection<Todo>;
  // todos: Observable<Todo[]>;

  todoTitle: string = "";
  idForTodo: number = 4;
  beforeEditCache: string = "";
  filter: string = "all";

  constructor() {}

  // getTodos() {
  //   return this.todos;
  // }

  addTodo(todoTitle: string): void {
    if (todoTitle.trim().length === 0) {
      return;
    }
    this.todos.push({
      id: this.idForTodo,
      title: todoTitle,
      completed: false,
      editing: false
    });
    this.todoTitle = "";
    this.idForTodo++;
  }

  deleteTodo(id: number): void {
    this.todos = this.todos.filter(todo => todo.id !== id);
  }

  editTodo(todo: Todo): void {
    this.beforeEditCache = todo.title;
    todo.editing = true;
  }

  doneEditing(todo: Todo): void {
    if (todo.title.trim().length === 0) {
      todo.title = this.beforeEditCache;
    }
    todo.editing = false;
  }

  cancelEditing(todo: Todo): void {
    todo.title = this.beforeEditCache;
    todo.editing = false;
  }

  remaining(): number {
    return this.todos.filter(todo => !todo.completed).length;
  }

  atLeastOneCompleted(): boolean {
    return this.todos.filter(todo => todo.completed).length > 0;
  }

  clearCompleted(): void {
    this.todos = this.todos.filter(todo => !todo.completed);
  }

  checkAllTodos(): void {
    this.todos.forEach(
      todo => (todo.completed = (<HTMLInputElement>event.target).checked)
    );
  }

  filterTodos(): Todo[] {
    if (this.filter === "all") {
      return this.todos;
    } else if (this.filter === "active") {
      return this.todos.filter(todo => !todo.completed);
    } else if (this.filter === "completed") {
      return this.todos.filter(todo => todo.completed);
    }
    return this.todos;
  }
}
