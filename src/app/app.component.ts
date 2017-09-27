import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms'
import { Note } from './note';
import { NoteService } from './note.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [NoteService]
})
export class AppComponent implements OnInit {
  title = 'My Notes';
  myForm: any;
  reg: Note;
  model = new Note();
  chgid: number;

  constructor(public noteService: NoteService) { }

  ngOnInit() {
    this.getNote();
  }
  getNote() {
    this.noteService.getAll()
      .subscribe(reg => {
        this.reg = reg;
      })
  }

  addNote() {
    if (!this.model.id) {
      this.noteService.save(this.model)
        .subscribe(reg => {
          this.model = reg;
          this.getNote();
          this.clearModel();
        });
    }
    else {
      console.log('editNote ' + this.model.id);
      this.noteService.update(this.model.id, this.model)
        .subscribe(reg => {
          this.model = reg;
          this.getNote();
          this.clearModel();
        });
    }
  }

  deleteNote(id) {
    this.noteService.delete(id)
      .subscribe(() => {
        this.getNote();
      });
  }

  editNote(id) {
    console.log('updateNote ' + id);
    this.noteService.find(id)
      .subscribe(regs => {
        this.model = regs;
      });
  }

  clearModel() {
    this.model.id = 0;
    this.model.date = "";
    this.model.notes = "";

  }

}
