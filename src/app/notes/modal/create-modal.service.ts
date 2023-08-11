import { Injectable } from '@angular/core';

import { PlaceholderDirective } from './app-placeholder-directive.directive';
import { AddModalComponent } from './add-modal/add-modal.component';
import { DeleteModalComponent } from './delete-modal/delete-modal.component';
import { EditModalComponent } from './edit-modal/edit-modal.component';
import { Note } from '../note-interface';
import { ViewModalComponent } from './view-modal/view-modal.component';

@Injectable({
  providedIn: 'root',
})
export class CreateModalService {
  constructor() {}

  createNewCmpProgrammatically(
    typeClick: string,
    modalHost: PlaceholderDirective,
    noteObj?: Note,
    noteIndex?: number
  ) {
    const hostViewContainerRef = modalHost.viewContaineRef;
    hostViewContainerRef?.clear();

    let createComponentRef;
    switch (typeClick) {
      case 'add':
        createComponentRef =
          hostViewContainerRef?.createComponent(AddModalComponent);
        break;
      case 'delete':
        createComponentRef =
          hostViewContainerRef?.createComponent(DeleteModalComponent);
        console.log('here!');
        break;
      case 'edit':
        createComponentRef =
          hostViewContainerRef?.createComponent(EditModalComponent);
        break;
      default:
        createComponentRef =
          hostViewContainerRef?.createComponent(ViewModalComponent);
        break;
    }
    createComponentRef!.instance.noteObj = noteObj;
    createComponentRef!.instance.closeModalEmit.subscribe(() => {
      hostViewContainerRef?.clear();
    });
  }
}
