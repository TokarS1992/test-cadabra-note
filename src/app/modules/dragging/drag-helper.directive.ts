import { Directive, OnDestroy, OnInit, TemplateRef, ViewContainerRef, HostBinding } from '@angular/core';
import { DraggableDirective } from './draggable.directive';
import { GlobalPositionStrategy, Overlay, OverlayRef } from '@angular/cdk/overlay';
import { TemplatePortal } from '@angular/cdk/portal';

@Directive({
  selector: '[appDragHelper]'
})
export class DragHelperDirective implements OnInit, OnDestroy {
    private overlayRef: OverlayRef;
    private positionStrategy = new GlobalPositionStrategy();
    private startPosition?: { x: number; y: number };

    constructor(private draggable: DraggableDirective,
                private templateRef: TemplateRef<any>,
                private viewContainerRef: ViewContainerRef,
                private overlay: Overlay) { }

    ngOnInit(): void {
        this.draggable.dragStart.subscribe(event => this.onDragStart(event));
        this.draggable.dragMove.subscribe(event => this.onDragMove(event));
        this.draggable.dragEnd.subscribe(() => this.onDragEnd());

        // create an overlay
        this.overlayRef = this.overlay.create({
            positionStrategy: this.positionStrategy
        });
    }

    ngOnDestroy(): void {
        // remove the overlay with dragging element
        this.overlayRef.dispose();
    }

    private onDragStart(event: PointerEvent): void {
        // determine relative start position
        const clientRect = this.draggable.element.nativeElement.getBoundingClientRect();

        this.startPosition = {
            x: event.clientX - clientRect.left,
            y: event.clientY - clientRect.top
        };

        this.overlayRef.overlayElement.style.width = `${this.draggable.element.nativeElement.clientWidth}px`;
    }

    private onDragMove(event: PointerEvent): void {
        if (!this.overlayRef.hasAttached()) {

            // render dragging element in the overlay
            this.overlayRef.attach(new TemplatePortal(this.templateRef, this.viewContainerRef));

            // styling dragging element
            const rootElement = this.overlayRef.overlayElement.firstChild as HTMLElement;
            rootElement.style.width = `${this.draggable.element.nativeElement.clientWidth}px`;
            rootElement.style.boxSizing = 'border-box';
            rootElement.style.backgroundColor = '#A2D7F5';
            rootElement.style.padding = '15px 0 20px 20px';
            rootElement.style.boxShadow = '0 4px 8px 0 rgba(0,0,0,0.25)';
        }

        // position the helper...
        this.positionStrategy.left(`${event.clientX - this.startPosition.x}px`);
        this.positionStrategy.top(`${event.clientY - this.startPosition.y}px`);
        this.positionStrategy.apply();
    }

    private onDragEnd(): void {
        // remove the helper from the overlay
        this.overlayRef.detach();
    }
}
