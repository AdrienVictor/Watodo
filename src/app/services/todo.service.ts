import { Injectable } from "@angular/core";
import { Todo } from "../interfaces/todo";
import {
  AngularFirestore,
  AngularFirestoreCollection,
  AngularFirestoreDocument
} from "@angular/fire/firestore";
import { Observable, BehaviorSubject, combineLatest } from "rxjs";
import { map } from "rxjs/operators";

@Injectable()
export class TodoService {
  todosCollection: AngularFirestoreCollection<Todo>;
  todos: Observable<Todo[]>;
  todoDoc: AngularFirestoreDocument<Todo>;

  filter: string = "all";

  constructor(public db: AngularFirestore) {}

  getTodos() {
    this.todos = this.db
      .collection("Todos", ref => ref.orderBy("timestamp", "asc"))
      .valueChanges();

    this.todosCollection = this.db.collection("Todos", ref =>
      ref.orderBy("timestamp", "asc")
    );
    this.todos = this.todosCollection.snapshotChanges().pipe(
      map(actions =>
        actions.map(a => {
          const data = a.payload.doc.data() as Todo;
          const id = a.payload.doc.id;
          return { id, ...data };
        })
      )
    );
    return this.todos;
  }

  addTodo(todo: Todo): void {
    this.todosCollection.add(todo);
  }

  deleteTodo(todo: Todo): void {
    this.todoDoc = this.db.doc(`Todos/${todo.id}`);
    this.todoDoc.delete();
  }

  doneEditing(todo: Todo): void {
    if (todo.title != "") {
      this.todoDoc = this.db.doc(`Todos/${todo.id}`);
      this.todoDoc.update(todo);
    }
  }

  filterTodo(completedFilter: boolean) {
    this.todos = this.db
      .collection("Todos", ref =>
        ref
          .where("completed", "==", completedFilter)
          .orderBy("timestamp", "asc")
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

  // clearCompleted(): void {
  //   this.todos = this.todos.filter(todo => !todo.completed);
  // }

  // checkAllTodos(): void {
  //   this.todos.forEach(
  //     todo => (todo.completed = (<HTMLInputElement>event.target).checked)
  //   );
  // }

  // filterTodos(): Todo[] {
  //   if (this.filter === "all") {
  //     return this.todos;
  //   } else if (this.filter === "active") {
  //     return this.todos.filter(todo => !todo.completed);
  //   } else if (this.filter === "completed") {
  //     return this.todos.filter(todo => todo.completed);
  //   }
  //   return this.todos;
  // }
}
