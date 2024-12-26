import { Component, inject, PLATFORM_ID } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { navbarAnimation } from './shared/Animations/animations';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  animations: [navbarAnimation],
})

export class AppComponent {
  title = 'Personal Growth Tracker';
  private readonly platformId = inject(PLATFORM_ID);
  constructor(public _TranslateService: TranslateService) {
    this.setDefaultLang();
  }

  setDefaultLang() {
    this._TranslateService.use('en');
  }
}
