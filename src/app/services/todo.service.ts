import { Injectable } from "@angular/core";
import { Todo } from "../interfaces/todo";
import {
  AngularFirestore,
  AngularFirestoreCollection,
  AngularFirestoreDocument
} from "@angular/fire/firestore";
import { Observable } from "rxjs";

@Injectable()
export class TodoService {
  todosCollection: AngularFirestoreCollection<Todo>;
  todos: Observable<Todo[]>;
  todoDoc: AngularFirestoreDocument<Todo>;

  filter: string = "all";

  constructor(public db: AngularFirestore) {}

  getTodos() {
    this.todosCollection = this.db.collection("Todos", ref =>
      ref.orderBy("date", "asc")
    );
    this.todos = this.todosCollection.valueChanges({ idField: "id" });
    return this.todos;
  }

  addTodo(todo: Todo) {
    this.todosCollection.add(todo);
  }

  deleteTodo(todo: Todo): void {
    this.todoDoc = this.db.doc(`Todos/${todo.id}`);
    this.todoDoc.delete();
  }

  doneEditing(todo: Todo) {
    if (todo.title != "") {
      this.todoDoc = this.db.doc(`Todos/${todo.id}`);
      this.todoDoc.set(todo);
    }
  }

  filterTodo(completedFilter: boolean) {
    this.todos = this.db
      .collection("Todos", ref =>
        ref.where("completed", "==", completedFilter).orderBy("date", "asc")
      )
      .valueChanges();

    return this.todos;
  }

  checkAllTodos() {
    this.todosCollection.get().forEach(todo => {
      return todo.docs.map(todo => {
        return this.db.doc(`Todos/${todo.id}`).update({ completed: true });
      });
    });
  }

  clearCompleted() {
    const completed = this.db.collection("Todos", ref =>
      ref.where("completed", "==", true)
    );
    completed.get().forEach(todo => {
      return todo.docs.map(todo => {
        return this.db.doc(`Todos/${todo.id}`).delete();
      });
    });
  }
  // completeTodo(todo: Todo): void {
  //   this.todoDoc = this.db.doc(`Todos/${todo.id}`);
  //   this.todoDoc.update(todo);
  // }

  // remaining(): number {
  //   // return this.todos.filter(todo => !todo.completed).length;
  //   this.todos.forEach(todo => {
  //     console.log(todo);
  //   });
  // }

  // atLeastOneCompleted(): boolean {
  //   return this.todos.filter(todo => todo.completed).length > 0;
  // }
}
