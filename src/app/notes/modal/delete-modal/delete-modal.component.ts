import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NotesService } from '../../notes.service';
import { Note } from '../../note-interface';

@Component({
  selector: 'app-delete-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './delete-modal.component.html',
  styleUrls: ['./delete-modal.component.scss']
})
export class DeleteModalComponent {
  @Output() closeModalEmit = new EventEmitter<void>();
  noteObj?: Note;

  constructor(private _noteService: NotesService) {}

  onDeleteNote() {
    this._noteService.delelteNote(this.noteObj?._id!);
    this.onCloseModal();
  }

  onCloseModal() {
    this.closeModalEmit.next();
  }

}
