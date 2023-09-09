import { TestBed } from '@angular/core/testing';
import { NoteItemComponent } from './note-item.component';
import { CreateModalService } from '../modal/create-modal.service';
import { PlaceholderDirective } from '../modal/app-placeholder-directive.directive';
import { Note } from '../note-interface';

describe('NoteItemComponent', () => {
  let component: NoteItemComponent;
  let createModalServiceMock: jasmine.SpyObj<CreateModalService>;
  let mockModalHost: PlaceholderDirective;
  let testNote: Note;

  beforeEach(() => {
    createModalServiceMock = jasmine.createSpyObj('CreateModalService', [
      'createNewCmpProgrammatically',
    ]);
    mockModalHost = {} as PlaceholderDirective;
    testNote = { _id: '1', title: 'Test Note', desc: 'Test Description' };

    component = new NoteItemComponent(createModalServiceMock);
    component.noteObj = testNote;
    component.modalHost = mockModalHost;
    component.noteIndex = 1;
  });

  it('should create component', () => {
    let fixture = TestBed.createComponent(NoteItemComponent);
    let app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should call createNewCmpProgrammatically when onEventNote is called', () => {
    component.onEventNote('clickType');

    expect(
      createModalServiceMock.createNewCmpProgrammatically
    ).toHaveBeenCalledWith('clickType', mockModalHost, testNote, 1);
  });
});