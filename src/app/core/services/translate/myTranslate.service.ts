import { isPlatformBrowser } from '@angular/common';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root',
})
export class myTranslateService {
  constructor(
    private translate: TranslateService,
    @Inject(PLATFORM_ID) private id: object
  ) {
    translate.setDefaultLang('en');
    if (isPlatformBrowser(id)) {
      this.changeDirection();
    }
  }

  changeDirection() {
    let savedLang = localStorage.getItem('lang') || '';
    this.translate.use(savedLang);
    if (savedLang == 'en') {
      document.documentElement.dir = 'ltr';
    } else if (savedLang == 'ar') {
      document.documentElement.dir = 'rtl';
    }
  }
}
