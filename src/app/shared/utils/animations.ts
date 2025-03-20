import { animate, style, transition, trigger } from '@angular/animations';

export const dropdownAnimation = trigger('dropdown', [
  transition(':enter', [
    style({ opacity: 0, transform: 'translateY(-10px)' }),
    animate('150ms ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
  ]),
  transition(':leave', [
    animate('150ms ease-in', style({ opacity: 0, transform: 'translateY(-10px)' }))
  ])
]);
export const slideAnimation = trigger('slideAnimation', [
  transition(':enter', [
    style({
      opacity: 0,
      transform: 'translateY(10px)',
      'will-change': 'transform, opacity'
    }),
    animate('200ms cubic-bezier(0.4, 0.0, 0.2, 1)', 
      style({
        opacity: 1,
        transform: 'translateY(0)'
      })
    )
  ]),
  transition(':leave', [
    style({ 'will-change': 'transform, opacity' }),
    animate('200ms cubic-bezier(0.4, 0.0, 0.2, 1)', 
      style({
        opacity: 0,
        transform: 'translateY(-10px)'
      })
    )
  ])
]);