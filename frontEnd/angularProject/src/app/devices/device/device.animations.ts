
import { trigger, state, style, transition, animate, keyframes } from '@angular/animations';

export const PRETTY_ANIMATION = trigger('heroState', [
  state('inactive', style({
    backgroundColor: '#eee',
    transform: 'scale(1)'
  })),
  state('active',   style({
    backgroundColor: '#cfd8dc',
    transform: 'scale(1.1)'
  })),
  transition('inactive => active', animate('100ms ease-in')),
  transition('active => inactive', animate('100ms ease-out'))
]);


export const removingDevice = trigger('myAwesomeAnimation', [
  state('small', style({
    transform: 'scale(0.2)',
  })),
  state('normal', style({
    transform: 'scale(1)',
  })),
  state('large', style({
    transform: 'scale(1.5)',
  })),
  transition('normal => small', animate('1000ms ease-in',
  // keyframes([
  //   style({opacity: 0, transform: 'translateY(-75%)', offset: 0}),
  //   style({opacity: 1, transform: 'translateY(35px)',  offset: 0.5}),
  //   style({opacity: 1, transform: 'translateY(0)',     offset: 1.0})
  // ])
))
]);
