import { trigger, state, style, animate, transition, group } from '@angular/animations';

export const dropDownAnimate = trigger('triggerDropdown', [
    state('inactive', style({ visibility: 'hidden' })),
    state('active',   style({visibility: 'visible' })),
    transition('inactive => active', [
        style({ opacity: 0, transform: 'translateY(-15px)' }),
        group([
            animate('0.3s ease-in', style({
                visibility: 'visible',
                opacity: 1
            })),
            animate('0.3s ease-in', style({
                transform: 'translateY(0)'
            }))
        ])
    ]),
    transition('active => inactive', [
        style({ opacity: 1, transform: 'translateY(0)' }),
        group([
            animate('0.3s ease-out', style({
                opacity: 0
            })),
            animate('0.3s ease-out', style({
                transform: 'translateY(-15px)'
            }))
        ])
    ])
]);
