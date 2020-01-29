import { Component, OnInit } from "@angular/core";
import { MatDialogRef } from "@angular/material";
import { TodoService } from "src/app/services/todo.service";

@Component({
  selector: "app-comfirm-delete-modal",
  templateUrl: "./comfirm-delete-modal.component.html",
  styleUrls: ["./comfirm-delete-modal.component.scss"],
  providers: [TodoService]
})
export class ComfirmDeleteModalComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<ComfirmDeleteModalComponent>,
    public todoService: TodoService
  ) {}

  ngOnInit() {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}
