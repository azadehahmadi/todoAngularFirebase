import { Component, OnInit } from '@angular/core';

import { CrudService } from './crud.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent  implements OnInit {
  title = 'todo App';
  todos: any;
  todoTitle!: string;
  constructor(private crudService: CrudService) { }

  ngOnInit() {
    this.crudService.read_Todos().subscribe((data:any) => {

      this.todos = data.map((e:any) => {
        return {
          id: e.payload.doc.id,
          isEdit: false,
          todoTitle: e.payload.doc.data()['todoTitle'],

        };
      })
      console.log(this.todos);

    });
  }

  CreateRecord() {
    let record : any={};
    record['todoTitle'] =this.todoTitle;
    this.crudService.create_NewTodo(record).then(resp => {
      this.todoTitle = " ";
     
      console.log(resp);
    })
      .catch((error:any) => {
        console.log(error);
      });
  }

  RemoveRecord(rowID:any) {
    this.crudService.delete_Todo(rowID);
  }

  EditRecord(record:any) {
    record.isEdit = true;
    record.EdittodoTitle = record.todoTitle;
  }
 

  UpdateRecord(recordRow:any) {
    let record:any = {};
    record['todoTitle'] = recordRow.EdittodoTitle;
    this.crudService.update_Todo(recordRow.id, record);
    recordRow.isEdit = false;
  }
 

}
