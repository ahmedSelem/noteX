import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Note } from '../note-interface';
import { PlaceholderDirective } from '../modal/app-placeholder-directive.directive';
import { CreateModalService } from '../modal/create-modal.service';

@Component({
  selector: 'app-note-item',
  standalone: true,
  imports: [CommonModule, PlaceholderDirective],
  templateUrl: './note-item.component.html',
  styleUrls: ['./note-item.component.scss'],
})
export class NoteItemComponent {
  @Input() noteObj?: Note;
  @Input() modalHost?: PlaceholderDirective;
  @Input() noteIndex?: number;

  constructor(private _createModalService: CreateModalService) {}


  onEventNote(typeClick: string) {
    this._createModalService.createNewCmpProgrammatically(
      typeClick,
      this.modalHost!,
      this.noteObj,
      this.noteIndex
    );
  }
}
