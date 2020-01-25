import { Component, OnInit } from "@angular/core";
import { TodoService } from "src/app/services/todo.service";
import { Todo } from "../../interfaces/todo";

@Component({
  selector: "todo-list",
  templateUrl: "./todo-list.component.html",
  styleUrls: ["./todo-list.component.scss"],
  providers: [TodoService]
})
export class TodoListComponent implements OnInit {
  // todoTitle: string;
  todos: Todo[];
  todo: Todo = {
    title: "",
    date: new Date().toDateString(),
    timestamp: new Date(),
    completed: false
  };

  constructor(public todoService: TodoService) {}

  ngOnInit() {
    this.todoService.getTodos().subscribe(todos => {
      this.todos = todos;
    });
  }

  addTodo(): void {
    if (this.todo.title != "") {
      this.todoService.addTodo(this.todo);
    } else return;
    this.todo.title = "";
  }

  filterTodo(completedFilter: boolean) {
    this.todoService.filterTodo(completedFilter).subscribe(todos => {
      this.todos = todos;
    });
  }
}
