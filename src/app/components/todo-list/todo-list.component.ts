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
    date: new Date().toLocaleDateString(),
    completed: false,
    timestamp: new Date()
  };

  constructor(public todoService: TodoService) {}

  ngOnInit() {
    this.todoService.getTodos().subscribe(todos => {
      this.todos = todos;
    });
  }

  addTodo() {
    if (this.todo.title != "") {
      this.todoService.addTodo(this.todo);
      this.todoService.getTodos().subscribe(todos => {
        this.todos = todos;
      });
      this.todoService.filter = "all";
    } else return;
    this.todo.title = "";
  }

  allTodos() {
    this.todoService.getTodos().subscribe(todos => {
      this.todos = todos;
    });
  }

  filterTodo(completedFilter: boolean) {
    this.todoService.filterTodo(completedFilter).subscribe(todos => {
      this.todos = todos;
    });
  }
}
