import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';

import { HeaderComponent } from '../shared/header/header.component';
import { NoteItemComponent } from './note-item/note-item.component';
import { Note } from './note-interface';
import { NotesService } from './notes.service';
import { User } from '../auth/user.model';
import { PlaceholderComponent } from './placeholder/placeholder.component';
import { PlaceholderDirective } from './modal/app-placeholder-directive.directive';
import { CreateModalService } from './modal/create-modal.service';

@Component({
  selector: 'app-notes',
  standalone: true,
  imports: [
    CommonModule,
    HeaderComponent,
    NoteItemComponent,
    PlaceholderComponent,
    PlaceholderDirective,
  ],
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.scss'],
})
export class NotesComponent implements OnInit, OnDestroy {
  notesList: Note[] = [];
  currentUser?: User;
  subscription?: Subscription;
  isError: boolean = false;
  isLoading: boolean = false;
  @ViewChild(PlaceholderDirective, { static: true })
  modalHost?: PlaceholderDirective;

  constructor(
    private _notesService: NotesService,
    private _createModal: CreateModalService
  ) {}

  ngOnInit(): void {
    this.isLoading = true;

    this._notesService.fetchCurrentUser();
    this._notesService.fetchNotes();

    this.subscription = this._notesService.loadingChanged.subscribe((loadingValue)=> {
      this.isLoading = loadingValue;
    })
    
    this.subscription = this._notesService.notesChanged.subscribe((notes) => {
      if (notes.length <= 0) {
        this.isError = true;
        return;
      }
      this.isError = false;
      this.notesList = notes!;
    });
  }

  onAddNote(typeClick: string) {
    this._createModal.createNewCmpProgrammatically(typeClick, this.modalHost!);
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }
}
