import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { Todo } from "../../interfaces/todo";
import { trigger, transition, style, animate } from "@angular/animations";
import { TodoService } from "src/app/services/todo.service";

@Component({
  selector: "todo-item",
  templateUrl: "./todo-item.component.html",
  styleUrls: ["./todo-item.component.scss"],
  animations: [
    trigger("fade", [
      transition(":enter", [
        style({ opacity: 0, transform: "translateY(30px)" }),
        animate(200, style({ opacity: 1, transform: "translateY(0px)" }))
      ]),
      transition(":leave", [
        animate(200, style({ opacity: 1, transform: "translateY(30px)" }))
      ])
    ])
  ]
})
export class TodoItemComponent implements OnInit {
  @Input() todo: Todo;
  todos: Todo[];
  editState: boolean = false;
  todoToEdit: Todo;
  beforeEditCache: string = "";

  constructor(private todoService: TodoService) {}

  ngOnInit() {}

  editTodo(event, todo) {
    this.beforeEditCache = todo.title;
    this.editState = true;
    this.todoToEdit = this.todo;
  }

  cancelEditing(event, todo): void {
    todo.title = this.beforeEditCache;
    this.editState = false;
  }
}
