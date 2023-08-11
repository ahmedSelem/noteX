import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Note } from '../../note-interface';

@Component({
  selector: 'app-view-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './view-modal.component.html',
  styleUrls: ['./view-modal.component.scss']
})
export class ViewModalComponent {
  @Output() closeModalEmit = new EventEmitter<void>();
  noteObj?: Note; 

  
  onCloseModal() {
    this.closeModalEmit.next();
  }
}
