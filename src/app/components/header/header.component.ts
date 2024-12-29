import { AsyncPipe, CommonModule } from '@angular/common';
import { Component, inject, input } from '@angular/core';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { Store } from '@ngrx/store';
import { Observable, takeUntil } from 'rxjs';
import {
  closeNavbar,
  openNavbar,
} from '../../shared/Store/navbar/navbar.actions';
import { MainButtonsDirective } from '../../shared/Directives/app-button.directive';
import { toggleTheme } from '../../shared/Store/project-theme/theme.action';
import { UnsubscripeHelperClass } from '../../shared/Helpers/removeSubscription';
import { AuthService } from '../../modules/userModule/services/auth.service';
import { FireStoreService } from '../../shared/Services/fireStore.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  standalone: true,
  imports: [TranslatePipe, CommonModule, AsyncPipe, MainButtonsDirective],
})
export class HeaderComponent extends UnsubscripeHelperClass {
  private AppStore = inject(
    Store<{ navbarToggler: boolean; themeToggler: boolean }>
  );
  isDarkMode$: Observable<boolean> = this.AppStore.select('themeToggler');
  isNavbarCollapsed$: Observable<boolean> =
    this.AppStore.select('navbarToggler');
  isNavOpened: boolean = true;
  currentLang: string = '';
  translateService = inject(TranslateService);
  authService = inject(AuthService);
  fireStoreService = inject(FireStoreService);
  withinDashboard = input<boolean>();
  router = inject(Router);

  constructor() {
    super();
  }

  ngOnInit() {
    this.getNavStatus();
  }

  changeLang() {
    this.currentLang =
      this.translateService.currentLang === 'en' ? 'ar' : 'en';
    this.translateService.use(this.currentLang);
  }

  toggleNavbar() {
    this.isNavOpened
      ? this.AppStore.dispatch(closeNavbar())
      : this.AppStore.dispatch(openNavbar());
  }

  getNavStatus() {
    this.isNavbarCollapsed$
      .pipe(takeUntil(this.destroy$))
      .subscribe((status) => (this.isNavOpened = !status));
  }

  switchMode() {
    this.AppStore.dispatch(toggleTheme());
  }

  navigateToProfile(){
    this.router.navigate(['dashboard/profile']);
  }
}
