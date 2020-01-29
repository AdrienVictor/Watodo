import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { environment } from "../environments/environment";
import { AngularFireModule } from "@angular/fire";
import { AngularFirestore } from "@angular/fire/firestore";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { TodoListComponent } from "./components/todo-list/todo-list.component";

import { TodoItemComponent } from "./components/todo-item/todo-item.component";
import { ServiceWorkerModule } from "@angular/service-worker";
import { TodoService } from "./services/todo.service";

import {
  MatCheckboxModule,
  MatStepperModule,
  MatButtonModule,
  MatFormFieldModule,
  MatInputModule,
  MatIconModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatListModule,
  MatDialogModule,
  MatToolbarModule
} from "@angular/material";

import { AddTodoModalComponent } from "./components/add-todo-modal/add-todo-modal.component";
import { ComfirmDeleteModalComponent } from "./components/comfirm-delete-modal/comfirm-delete-modal.component";

@NgModule({
  declarations: [
    AppComponent,
    TodoListComponent,
    TodoItemComponent,
    AddTodoModalComponent,
    ComfirmDeleteModalComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    AngularFireModule.initializeApp(environment.firebase, "Watodo"),
    ServiceWorkerModule.register("ngsw-worker.js", {
      enabled: environment.production
    }),
    MatCheckboxModule,
    MatStepperModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    MatIconModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatListModule,
    MatDialogModule,
    MatToolbarModule
  ],
  entryComponents: [AddTodoModalComponent, ComfirmDeleteModalComponent],
  providers: [TodoService, AngularFirestore],
  bootstrap: [AppComponent]
})
export class AppModule {}
