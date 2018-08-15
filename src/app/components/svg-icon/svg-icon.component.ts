import { Component, OnInit, Input } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { MatIconRegistry } from '@angular/material';

@Component({
    selector: 'app-svg-icon',
    template: '<ng-content></ng-content>'
})
export class SvgIconComponent implements OnInit {
    @Input() svgPath: string;
    @Input() nameIcon: string;
    constructor(
        public iconRegistry: MatIconRegistry,
        public sanitizer: DomSanitizer
    ) {}

    ngOnInit() {
        if (this.svgPath && this.nameIcon) {
            this.iconRegistry.addSvgIcon(
                this.nameIcon,
                this.sanitizer.bypassSecurityTrustResourceUrl(this.svgPath));
        }
    }
}
