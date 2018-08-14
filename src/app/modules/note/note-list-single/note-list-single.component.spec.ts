import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NoteListSingleComponent } from './note-list-single.component';

describe('NoteListSingleComponent', () => {
  let component: NoteListSingleComponent;
  let fixture: ComponentFixture<NoteListSingleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NoteListSingleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NoteListSingleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
