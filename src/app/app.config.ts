import { provideEffects } from '@ngrx/effects';
import { provideFirebaseApp, initializeApp, FirebaseApp } from '@angular/fire/app';
import { Auth, AuthModule, getAuth, provideAuth } from '@angular/fire/auth';
import { FirestoreModule, getFirestore, provideFirestore } from '@angular/fire/firestore';
import { HttpClient, provideHttpClient } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { provideTranslateService, TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { provideStore } from '@ngrx/store';
import { navbarReducer } from './shared/Store/navbar/navbar.reducers';
import { ThemeReducer } from './shared/Store/project-theme/theme.reducer';
import { ThemeEffects } from './shared/Store/project-theme/theme.effects';
import { provideAnimations } from '@angular/platform-browser/animations';
import { ApplicationConfig, importProvidersFrom, inject, provideZoneChangeDetection } from '@angular/core';
import { environment } from '../envirements/enviroments';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { AngularFireModule, FIREBASE_OPTIONS } from '@angular/fire/compat';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';


export function HttpLoaderFactory(httpClient: HttpClient) {
  return new TranslateHttpLoader(httpClient);
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideClientHydration(withEventReplay()),
    provideHttpClient(),
    provideTranslateService({
      defaultLanguage: 'en',
    }),
    importProvidersFrom(
      TranslateModule.forRoot({
        loader: {
          provide: TranslateLoader,
          useFactory: HttpLoaderFactory,
          deps: [HttpClient],
        },
      }),
      AngularFireModule,
      AngularFirestoreModule,
      AuthModule,
    ),
    provideFirebaseApp(() => initializeApp(environment.firebaseConfig)),
    provideFirestore(() => getFirestore()),
    provideAuth(() => getAuth(inject(FirebaseApp))),
    { provide: FIREBASE_OPTIONS, useValue: environment.firebaseConfig },
    provideStore({
      navbarToggler: navbarReducer,
      themeToggler: ThemeReducer,
    }),
    provideEffects([ThemeEffects]),
    provideAnimations(),
  ]
};
