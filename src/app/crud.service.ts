import { Injectable } from '@angular/core';

import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class CrudService {

  constructor(private firestore: AngularFirestore) { }


  create_NewTodo(record:any) {
    return this.firestore.collection('todos').add(record);
  }

  read_Todos() {
    return this.firestore.collection('todos').snapshotChanges();
  }

  update_Todo(recordID:any,record:any){
    this.firestore.doc('todos/' + recordID).update(record);
  }

  delete_Todo(recordId:any) {
    this.firestore.doc('todos/' + recordId).delete();
  }
}
