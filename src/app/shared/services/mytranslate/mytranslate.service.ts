import { isPlatformBrowser } from '@angular/common';
import { Inject, inject, Injectable, PLATFORM_ID } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { platform } from 'os';

@Injectable({
  providedIn: 'root',
})
export class MytranslateService {
  constructor(
    private _TranslateService: TranslateService,
    @Inject(PLATFORM_ID) private platformId: object
  ) {
    if (isPlatformBrowser(platformId)) {
      // 1.set default lang
      let defaultLang = 'en';
      // 2. get lang from local storage
      let savedLang = localStorage.getItem('lang');
      // 3. check lang: true >> change default lang to saved lang
      if (savedLang) {
        defaultLang = savedLang;
      }

      // 4. set default lang
      _TranslateService.setDefaultLang(defaultLang);

      //5. set use language
      _TranslateService.use(defaultLang);

      // 6. call method change direction depending on lang
      this.changeDirection(defaultLang);
    }
  }

  changeDirection(lang: string) {
    if (lang === 'en' || lang === 'de') {
      document.getElementsByTagName('html')[0].setAttribute('dir', 'ltr');
    } else if (lang === 'ar') {
      document.getElementsByTagName('html')[0].setAttribute('dir', 'rtl');
    }
  }

  changeLang(lang: string) {
    // 1.set lang in the local storage
    localStorage.setItem('lang', lang);
    // 2.set default lang
    this._TranslateService.setDefaultLang(lang);
    // 3.set use lang
    this._TranslateService.use(lang);
    // 4.call direction method
    this.changeDirection(lang);
  }

  setLanguage(lang: string) {
    localStorage.setItem('lang', lang);
  }
}
