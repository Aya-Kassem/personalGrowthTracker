import {
    animate,
    state,
    style,
    transition,
    trigger
  } from '@angular/animations';
  
  export const navbarAnimation = trigger('toggleNavbar', [
    state('expanded', style({ gridTemplateColumns: '250px 1fr' })),
    state('collapsed', style({ gridTemplateColumns: '50px 1fr' })),
    transition('* <=> *', [animate('0.8s ease-in-out')]),
  ]);
  