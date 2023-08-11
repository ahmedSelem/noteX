import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormGroup,
  FormControl,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { NotesService } from '../../notes.service';
import { Note } from '../../note-interface';

@Component({
  selector: 'app-edit-modal',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './edit-modal.component.html',
  styleUrls: ['./edit-modal.component.scss'],
})
export class EditModalComponent {
  @Output() closeModalEmit = new EventEmitter<void>();
  editForm?: FormGroup;
  noteObj?: Note;

  constructor(private _notesService: NotesService) {}

  ngOnInit(): void {
    this.editForm = new FormGroup({
      title: new FormControl(this.noteObj?.title, [
        Validators.required,
        Validators.minLength(3),
      ]),
      desc: new FormControl(this.noteObj?.desc, [
        Validators.required,
        Validators.minLength(3),
      ]),
    });
  }

  onEditNote() {
    this._notesService.editNote(
      this.noteObj?._id!,
      this.editForm?.value.title,
      this.editForm?.value.desc
    );
    this.onCloseModal();
  }

  onCloseModal() {
    this.closeModalEmit.next();
  }
}
