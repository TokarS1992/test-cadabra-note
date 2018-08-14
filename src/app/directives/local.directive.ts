import { Directive, Input } from '@angular/core';

@Directive({
    selector: '[localVariables]',
    exportAs: 'localVariables'
})
export class LocalDirective {

    @Input('localVariables') set localVariables( vars: any ) {
        if ( typeof vars === 'object' ) {
            for (const variableName in vars ) {
                if (vars.hasOwnProperty(variableName)) {
                    this[variableName] = vars[variableName];
                }
            }
        }
    }
    constructor( ) {
    }
}
