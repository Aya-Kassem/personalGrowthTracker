import { Component, inject, PLATFORM_ID } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { navbarAnimation } from './shared/Animations/animations';
import { Auth, authState,  User } from '@angular/fire/auth';
import { CurrentUser } from './modules/userModule/Models/user.interface';
import { AuthService } from './modules/userModule/services/auth.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  animations: [navbarAnimation],
})
export class AppComponent {
  title = 'Personal Growth Tracker';
  private auth: Auth = inject(Auth);
  authState$ = authState(this.auth);
  authService = inject(AuthService);
  // private readonly platformId = inject(PLATFORM_ID);
  constructor(public _TranslateService: TranslateService) {
    this.setDefaultLang();
  }

  ngOnInit(){
    this.getCurrentUserInfo();
  }

  setDefaultLang() {
    this._TranslateService.use('en');
  }

  getCurrentUserInfo(){
    this.authState$.subscribe(async (aUser: User | null) => {
      this.authService.setCurrentUserInfo(aUser);
    });
  }
}
