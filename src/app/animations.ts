import { trigger, transition, style, query, animateChild, animate,group } from "@angular/animations";

export const slideInAnimation =
trigger('slideInOut', [
  transition('* <=> *', [
    style({ position: 'relative' }),
    query(':enter', [
      style({
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%'
      })
    ], {optional:true}),
    query(':enter', [
      animate('300ms ease-in', style({transform: 'translateY(-100%)'}))
    ],{optional:true}),
    // query(':leave', animateChild()),
    // group([
    //   // query(':leave',[
    //   //   style({transform: 'translateY(-100%)'}),
    //   //   animate('300ms ease-in', style({transform: 'translateY(0%)'}))
    //   // ]),
      query(':enter', [
        animate('300ms ease-in', style({transform: 'translateY(-100%)'}))
      ],{optional:true}),
    // ]),
    query(':enter', animateChild(),{optional:true}),
  ]),
  transition('* <=> *', [
    style({ position: 'relative' }),
    query(':enter', [
      style({
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%'
      })
    ],{optional:true}),
    query(':enter', [
      animate('300ms ease-in', style({transform: 'translateY(-100%)'}))
    ],{optional:true}),
    // query(':leave', animateChild()),
    // group([
    //   // query(':leave', [
    //   //   style({transform: 'translateY(-100%)'}),
    //   //   animate('300ms ease-in', style({transform: 'translateY(0%)'}))
    //   // ]),
      query(':enter', [
        animate('300ms ease-in', style({transform: 'translateY(-100%)'}))
      ],{optional:true}),
    // ]),
    query(':enter', animateChild(),{optional:true}),
  ])
]);
// trigger('slideInOut', [
//   transition(':enter', [
//     style({transform: 'translateY(-100%)'}),
//     animate('200ms ease-in', style({transform: 'translateY(0%)'}))
//   ]),
//   transition(':leave', [
//     animate('200ms ease-in', style({transform: 'translateY(-100%)'}))
//   ])
// ]);