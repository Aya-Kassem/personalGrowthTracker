import { isPlatformBrowser } from '@angular/common';
import { Component, HostListener, inject, PLATFORM_ID } from '@angular/core';
import { Firestore } from '@angular/fire/firestore';
import { Store } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';
import { Observable } from 'rxjs';
import {
  closeNavbar,
  openNavbar,
} from '../../shared/Store/navbar/navbar.actions';
import { navbarAnimation } from '../../shared/Animations/animations';

@Component({
  selector: 'app-main-content',
  templateUrl: './main-content.component.html',
  styleUrl: './main-content.component.scss',
  standalone: false,
  animations: [navbarAnimation]
})
export class MainContentComponent {
  private AppStore = inject(
    Store<{
      navbarToggler: boolean;
      themeToggler: boolean;
    }>
  );
  isNavbarCollapsed$: Observable<boolean> =
    this.AppStore.select('navbarToggler');
  isDarkMode$: Observable<boolean> = this.AppStore.select('themeToggler');
  private readonly platformId = inject(PLATFORM_ID);
  public fire = inject(Firestore);

  constructor(public _TranslateService: TranslateService) {}

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) this.getScreenWidth();
  }

  @HostListener('window:resize', ['$event'])
  getScreenWidth() {
    window.innerWidth <= 899
      ? this.AppStore.dispatch(closeNavbar())
      : this.AppStore.dispatch(openNavbar());
  }
}
