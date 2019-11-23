import { Subscription, concat } from 'rxjs';
import { Component, OnInit,OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { UserService } from '../../shared/services/user.service';
import { LoginModel } from '../../shared/models/user.login.interface';

import { NgxSpinnerService } from 'ngx-spinner';
import { error } from 'protractor';

import { Language, DefaultLocale, Currency } from 'angular-l10n';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html'
})

export class LoginFormComponent implements OnInit {

  @Language() lang: string;
  @DefaultLocale() defaultLocale: string;
  @Currency() currency: string;
  
  errors: string;
  isRequesting: boolean;
  submitted: boolean = false;

  public showPassword: boolean = false;

  togglePassword() {
    this.showPassword = ! this.showPassword;
  }

  constructor(private userService: UserService, private router: Router,
    private spinner: NgxSpinnerService,
    private activatedRoute: ActivatedRoute) { }

    ngOnInit() {  }


    login({ value, valid }: { value: LoginModel, valid: boolean }) {
      this.submitted = true;
      this.isRequesting = true;
      this.errors = '';
      if (valid) {
        this.userService.login(value)
          .subscribe((result: Boolean) => {
              if (result) {
                this.router.navigate(['/']);
              } else {
                this.isRequesting = false;
                this.errors = 'امکان ورود به سامانه وجود ندارد';
              }
            },
          error => {
              this.isRequesting = false;
              this.errors = error;
            });
      }
    }
}
