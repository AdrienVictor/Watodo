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

import { ClickOutsideModule } from "ng-click-outside";

import {
  MatCheckboxModule,
  MatStepperModule,
  MatButtonModule,
  MatFormFieldModule,
  MatInputModule,
  MatIconModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatListModule
} from "@angular/material";

@NgModule({
  declarations: [AppComponent, TodoListComponent, TodoItemComponent],
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
    ClickOutsideModule,
    MatCheckboxModule,
    MatStepperModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    MatIconModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatListModule
  ],
  providers: [TodoService, AngularFirestore],
  bootstrap: [AppComponent]
})
export class AppModule {}
