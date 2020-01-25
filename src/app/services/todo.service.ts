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

  // todoTitle: string = "";
  // idForTodo: number = 4;
  // beforeEditCache: string = "";
  filter: string = "all";

  constructor(public db: AngularFirestore) {}

  getTodos() {
    this.todos = this.db
      .collection("Todos", ref => ref.orderBy("date", "asc"))
      .valueChanges();

    this.todosCollection = this.db.collection("Todos", ref =>
      ref.orderBy("date", "asc")
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
        ref.where("completed", "==", completedFilter).orderBy("date", "asc")
      )
      .valueChanges();

    return this.todos;
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
