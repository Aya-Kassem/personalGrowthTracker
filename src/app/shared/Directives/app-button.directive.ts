import {
    Directive,
    ElementRef,
    Renderer2,
    AfterViewInit,
    inject,
  } from '@angular/core';
  import { Store } from '@ngrx/store';
  import { UnsubscripeHelperClass } from '../Helpers/removeSubscription';
  import { takeUntil } from 'rxjs';
  
  @Directive({
    selector: '[appMainButtons]',
    standalone: true
  })
  export class MainButtonsDirective
    extends UnsubscripeHelperClass
    implements AfterViewInit
  {
    private AppStore = inject(Store<{ themeToggler: boolean }>);
    private isDarkMode$ = this.AppStore.select('themeToggler');
  
    constructor(private _ElementRef: ElementRef, private _Renderer2: Renderer2) {
      super();
    }
  
    ngAfterViewInit() {
      const El = this._ElementRef.nativeElement;
      this.isDarkMode$
        .pipe(takeUntil(this.destroy$))
        .subscribe((isDarkMode) => {
          if (isDarkMode) {
            this._Renderer2.setStyle(
              El,
              'background',
              'oklch(16.93% .004 285.95) 0% 0% no-repeat padding-box'
            );
            this._Renderer2.setStyle(
              El,
              'box-shadow',
              '0px 3px 6px rgba(255, 255, 255, 0.2)'
            );
          } else {
            this._Renderer2.setStyle(
              El,
              'background',
              '#f8f9fa 0% 0% no-repeat padding-box'
            );
            this._Renderer2.setStyle(
              El,
              'box-shadow',
              '0px 3px 6px rgba(0, 0, 0, 0.16)'
            );
          }
  
          this._Renderer2.setStyle(El, 'border-radius', '16px');
        });
    }
  }
  