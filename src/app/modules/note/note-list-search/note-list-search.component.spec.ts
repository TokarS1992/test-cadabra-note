import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NoteListSearchComponent } from './note-list-search.component';

describe('NoteListSearchComponent', () => {
  let component: NoteListSearchComponent;
  let fixture: ComponentFixture<NoteListSearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NoteListSearchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NoteListSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
