import { Component, OnInit } from "@angular/core";
import { TodoService } from "src/app/services/todo.service";
import { Todo } from "../../interfaces/todo";

import { MatDialog } from "@angular/material";
import { AddTodoModalComponent } from "../add-todo-modal/add-todo-modal.component";

@Component({
  selector: "todo-list",
  templateUrl: "./todo-list.component.html",
  styleUrls: ["./todo-list.component.scss"],
  providers: [TodoService]
})
export class TodoListComponent implements OnInit {
  todos: Todo[];
  todo: Todo = {
    title: "",
    date: new Date(),
    completed: false,
    timestamp: new Date()
  };

  constructor(public todoService: TodoService, public dialog: MatDialog) {}

  openDialog(): void {
    const dialogRef = this.dialog.open(AddTodoModalComponent, {});

    dialogRef.afterClosed().subscribe(result => {
      console.log("The dialog was closed");
    });
  }

  ngOnInit() {
    this.todoService.getTodos().subscribe(todos => {
      this.todos = todos;
    });
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
