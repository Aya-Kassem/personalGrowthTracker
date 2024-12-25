import { createReducer, on } from '@ngrx/store';
import { closeNavbar, openNavbar } from './navbar.actions';


export const isNavbarCollapsed = false; 
export const navbarReducer = createReducer(
  isNavbarCollapsed,
  on(closeNavbar, (state) => state = true),
  on(openNavbar, (state) => state = false)
);


