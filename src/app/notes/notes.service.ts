import { Subject, BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Note, NoteInterface } from './note-interface';
import { AuthService } from '../auth/auth.service';
import { User } from '../auth/user.model';
import { ToasterService } from '../shared/toaster.service';

@Injectable({
  providedIn: 'root',
})
export class NotesService {
  private mainUrl: string = 'https://movies-api.routemisr.com';
  private notesList: Note[] = [];
  notesChanged = new Subject<Note[]>();
  loadingChanged = new Subject<boolean>();
  currentUser?: User;

  constructor(
    private _httpClient: HttpClient,
    private _authService: AuthService,
    private _toasterService: ToasterService
  ) {}

  fetchCurrentUser() {
    this._authService.currentUser.subscribe((user) => {
      this.currentUser = user!;
    });
  }

  fetchNotes() {
    this._httpClient
      .post<NoteInterface>(`${this.mainUrl}/getUserNotes`, {
        token: this.currentUser?.token,
        userID: this.currentUser?.id,
      })
      .subscribe({
        next: (response) => {
          if (response.message !== 'success') {
             this.notesList = [];
             this.notesChanged.next(this.notesList.slice());
             this.loadingChanged.next(false);
            return;
          }
          this.notesList = response.Notes;
          this.notesChanged.next(this.notesList.slice());
          this.loadingChanged.next(false);
        },
      });
  }

  addNewNote(title: string, desc: string) {
    this._httpClient
      .post<NoteInterface>(`${this.mainUrl}/addNote`, {
        title: title,
        desc: desc,
        citizenID: this.currentUser?.id,
        token: this.currentUser?.token,
      })
      .subscribe({
        next: (response) => {
          if (response.message !== 'success') {
            this._toasterService.showToastError('Error Has Occurred!');
            return;
          }
          this.loadingChanged.next(true);
          this.fetchNotes();
          this._toasterService.showToastSuccess('Note Added Successfully!');
        },
        error: (_) => {
          this._toasterService.showToastError('Error Has Occurred!');
        },
      });
  }

  delelteNote(noteId: string) {
    this._httpClient
      .delete<{ message: string }>(`${this.mainUrl}/deleteNote`, {
        body: {
          token: this.currentUser!.token,
          NoteID: noteId,
        },
      })
      .subscribe({
        next: (response) => {
          if (response.message !== 'deleted') {
            this._toasterService.showToastError('Error Has Occurred!');
            return;
          }
          this.loadingChanged.next(true);
          this.fetchNotes();
          this._toasterService.showToastSuccess('Note Deleted Successfully!');
        },
        error: (_) => {
          this._toasterService.showToastError('Error Has Occurred!');
        },
      });
  }

  editNote(noteId: string, noteTitle: string, noteDsc: string) {
    this._httpClient.put<NoteInterface>(`${this.mainUrl}/updateNote`, {
      token: this.currentUser?.token,
      title: noteTitle,
      desc: noteDsc,
      NoteID: noteId
    }).subscribe({
      next: (response) => {
        console.log(response);
        if (response.message !== 'updated') {
          this._toasterService.showToastError('Error Has Occurred!');
          return;
        }
        this.fetchNotes();
        this.loadingChanged.next(true);
        this._toasterService.showToastSuccess('Note Updated Successfully!');
      },
      error: (_) => { 
        this._toasterService.showToastError('Error Has Occurred!');
      }
    })
  }
}
