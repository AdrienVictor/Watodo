import { Component, OnInit } from "@angular/core";
import { TodoService } from "src/app/services/todo.service";
import { Todo } from "../../interfaces/todo";

import { FormBuilder, FormGroup, Validators } from "@angular/forms";

@Component({
  selector: "todo-list",
  templateUrl: "./todo-list.component.html",
  styleUrls: ["./todo-list.component.scss"],
  providers: [TodoService]
})
export class TodoListComponent implements OnInit {
  isLinear: false;
  formGroup1: FormGroup;
  formGroup2: FormGroup;
  // todoTitle: string;
  todos: Todo[];
  todo: Todo = {
    title: "",
    date: new Date(),
    completed: false,
    timestamp: new Date()
  };

  constructor(
    public todoService: TodoService,
    private _formBuilder: FormBuilder
  ) {}

  ngOnInit() {
    this.formGroup1 = this._formBuilder.group({
      firstCtrl: ["", Validators.required]
    });
    this.formGroup2 = this._formBuilder.group({
      secondCtrl: ["", Validators.required]
    });

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
    console.log(this.todo);
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
