import { Subscription, concat } from 'rxjs';
import { Component, OnInit,OnDestroy, Inject } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { UserService } from '../../shared/services/user.service';
import { LoginModel } from '../../shared/models/user.login.interface';

import { NgxSpinnerService } from 'ngx-spinner';
import { error } from 'protractor';
import { OwlDialogRef, OWL_DIALOG_DATA } from 'owl-ng';

@Component({
  selector: 'app-inline-login-form',
  templateUrl: './inline-login-form.component.html'
})

export class InlineLoginFormComponent implements OnInit {
  
  errors: string;
  isRequesting: boolean;
  submitted: boolean = false;
  public this_page_url: string = '';
  public showPassword: boolean = false;

  togglePassword() {
    this.showPassword = ! this.showPassword;
  }

  constructor(public dialogRef: OwlDialogRef<InlineLoginFormComponent>,
    @Inject(OWL_DIALOG_DATA) public data: any,
    private userService: UserService,
    private router: Router,
    private spinner: NgxSpinnerService,
    private activatedRoute: ActivatedRoute) {

    this.this_page_url = data.url;
  }

    ngOnInit() {  }


    login({ value, valid }: { value: LoginModel, valid: boolean }) {
      this.submitted = true;
      this.isRequesting = true;
      this.errors = '';
      if (valid) {
        this.userService.login(value)
          .subscribe((result: Boolean) => {
            if (result) {
              this.router.navigateByUrl('/',
                { skipLocationChange: true }).then(() =>
              {
                this.router.navigate([this.this_page_url]);
              });

                this.dialogRef.close();

              } else {
                this.isRequesting = false;
                this.errors = 'Can not login';
              }
            },
          error => {
              this.isRequesting = false;
              this.errors = error;
            });
      }
    }
}
