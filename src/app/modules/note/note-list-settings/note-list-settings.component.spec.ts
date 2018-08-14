import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NoteListSettingsComponent } from './note-list-settings.component';

describe('NoteListSettingsComponent', () => {
  let component: NoteListSettingsComponent;
  let fixture: ComponentFixture<NoteListSettingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NoteListSettingsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NoteListSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
