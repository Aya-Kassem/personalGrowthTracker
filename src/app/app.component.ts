import { Component, HostListener, inject, PLATFORM_ID } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HeaderComponent } from './components/header/header.component';
import { TranslateService } from '@ngx-translate/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/internal/Observable';
import { AsyncPipe, CommonModule, isPlatformBrowser } from '@angular/common';
import { navbarAnimation } from './shared/Animations/animations';
import { closeNavbar, openNavbar } from './shared/Store/navbar/navbar.actions';
import { collection, Firestore } from '@angular/fire/firestore';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    NavbarComponent,
    HeaderComponent,
    AsyncPipe,
    CommonModule
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  animations: [navbarAnimation],
})
export class AppComponent {
  title = 'Personal Growth Tracker';
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

  constructor(public _TranslateService: TranslateService) {
    this.setDefaultLang();
  }

  ngOnInit(){
    if(isPlatformBrowser(this.platformId)) this.getScreenWidth();
    this.testFireStore();
  }

async testFireStore(){
    try {  
      //const usersCollection = collection(this.fire, "personalGrowthTracker");
      //console.log(usersCollection);
      // const docRef = await addDoc(usersCollection, {
      //   first: "Ada",
      //   last: "Lovelace",
      //   born: 1815
      // });
      // console.log("Document written with ID: ", docRef.id);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  }


  setDefaultLang() {
    this._TranslateService.use('en');
  }

  @HostListener('window:resize', ['$event'])
  getScreenWidth() {
    window.innerWidth <= 899
      ? this.AppStore.dispatch(closeNavbar())
      : this.AppStore.dispatch(openNavbar());
  }
}
