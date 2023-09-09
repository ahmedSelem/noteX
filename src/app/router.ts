import { NotesComponent } from './notes/notes.component';
import { Routes } from '@angular/router';
import { AuthComponent } from './auth/auth.component';
import { authGuard } from './auth/auth.guard';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'notes',
    pathMatch: 'full',
  },
  {
    path: 'authentication',
    component: AuthComponent,
    title: 'Authentication',
  },
  {
    path: 'notes',
    component: NotesComponent,
    title: 'Notes',
    canActivate: [authGuard],
  },
];
