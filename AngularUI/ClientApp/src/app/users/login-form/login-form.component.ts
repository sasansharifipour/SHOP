import { Subscription, concat } from 'rxjs';
import { Component, OnInit,OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { UserService } from '../../shared/services/user.service';
import { LoginModel } from '../../shared/models/user.login.interface';

import { NgxSpinnerService } from 'ngx-spinner';
import { error } from 'protractor';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html'
})

export class LoginFormComponent implements OnInit {
  
  errors: string;
  isRequesting: boolean;
  submitted: boolean = false;

  public showPassword: boolean = false;

  constructor(private userService: UserService, private router: Router,
    private spinner: NgxSpinnerService,
    private activatedRoute: ActivatedRoute) { }

    ngOnInit() {  }

  togglePassword() {
    this.showPassword = ! this.showPassword;
  }

    login({ value, valid }: { value: LoginModel, valid: boolean }) {
      this.submitted = true;
      this.isRequesting = true;
      this.errors = '';
      if (valid) {
        this.userService.login(value)
          .subscribe((result: Boolean) => {
              console.log('test');
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
