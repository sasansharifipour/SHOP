import { Injectable, OnInit } from "@angular/core";
import { LocaleService, Language, DefaultLocale, Currency } from 'angular-l10n';

@Injectable({
  providedIn: 'root',
})
export class language implements OnInit
{
  get lang(): string {
    return this.locale.getCurrentLanguage();
  };
  //@DefaultLocale() defaultLocale: string;
  //@Currency() currency: string;
  direction: string = 'ltr';
  selected_flag_class: string = 'flag-icon-gb';

  ngOnInit() {
    this.set_language_class();
  }

  constructor(public locale: LocaleService) {
  }

  change_language(language: string) {
    if (language == 'en') {
      this.selectLocale('en', 'GB', 'USD');
    }
    else if (language == 'pr') {
      this.selectLocale('pr', 'IR', 'IRR');
    }
  }

  selectLocale(language: string, country: string, currency: string): void {
    this.locale.setDefaultLocale(language, country);
    this.locale.setCurrentCurrency(currency);

    this.set_language_class();
  }

  set_language_class() {
    let language: string = this.locale.getCurrentLanguage();
    this.direction = this.locale.getLanguageDirection(language);

    if (language == 'en') {
      this.selected_flag_class = 'flag-icon-gb';
    }
    else if (language == 'pr') {
      this.selected_flag_class = 'flag-icon-ir';
    }
  }
}
