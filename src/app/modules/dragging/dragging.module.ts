import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OverlayModule } from '@angular/cdk/overlay';

import { DragHelperDirective } from './drag-helper.directive';
import { DraggableDirective } from './draggable.directive';
import { SortableDirective } from './sortable.directive';
import { SortableListDirective } from './sortable-list.directive';

@NgModule({
    imports: [
        CommonModule,
        OverlayModule
    ],
    declarations: [
        DragHelperDirective,
        DraggableDirective,
        SortableDirective,
        SortableListDirective
    ],
    exports: [
        DragHelperDirective,
        DraggableDirective,
        SortableDirective,
        SortableListDirective
    ]
})
export class DraggingModule { }
