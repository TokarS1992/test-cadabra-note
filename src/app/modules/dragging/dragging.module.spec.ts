import { DraggingModule } from './dragging.module';

describe('DraggingModule', () => {
  let draggingModule: DraggingModule;

  beforeEach(() => {
    draggingModule = new DraggingModule();
  });

  it('should create an instance', () => {
    expect(draggingModule).toBeTruthy();
  });
});
