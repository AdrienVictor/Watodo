import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

import { TodoService } from "src/app/services/todo.service";
import { Todo } from "../../interfaces/todo";
import { MatDialogRef } from "@angular/material";

@Component({
  selector: "app-add-todo-modal",
  templateUrl: "./add-todo-modal.component.html",
  styleUrls: ["./add-todo-modal.component.scss"]
})
export class AddTodoModalComponent implements OnInit {
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
    private _formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<AddTodoModalComponent>
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

  onNoClick(): void {
    this.dialogRef.close();
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
}
