import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { NotesService } from '../../notes.service';
import { Note } from '../../note-interface';

@Component({
  selector: 'app-add-modal',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './add-modal.component.html',
  styleUrls: ['./add-modal.component.scss']
})
export class AddModalComponent implements OnInit {
  @Output() closeModalEmit = new EventEmitter<void>();
  addedForm?: FormGroup;
  noteObj?: Note; 

  constructor(private _notesService: NotesService ) {}

  ngOnInit(): void {
    this.addedForm = new FormGroup({
      title: new FormControl(null, [Validators.required, Validators.minLength(3)]),
      desc: new FormControl(null, [Validators.required, Validators.minLength(3)]),
    }) 
  }

  onAddNote() {
    this._notesService.addNewNote(this.addedForm!.value.title, this.addedForm!.value.desc);
    this.onCloseModal();
  }

  onCloseModal() {
    this.closeModalEmit.next();
  }

}
