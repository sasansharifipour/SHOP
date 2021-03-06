import { Component, OnInit, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { UserRegistration } from '../../shared/models/user.registration.interface';
import { UserService } from '../../shared/services/user.service';
import { OwlNotifierService, OwlDialogRef } from 'owl-ng';
import { OWL_DIALOG_DATA } from 'owl-ng';
import { UserViewModel } from 'src/app/shared/models/user.viewmodel.inteface';
import { UserChangePasswordModel } from 'src/app/shared/models/user.change.password.model';

@Component({
  selector: 'app-user-change-password',
  templateUrl: './user.change.password.component.html',
  styleUrls: ['./user.change.password.component.scss']
})
export class ChangeUserPasswordComponent implements OnInit {

  errors: string;  
  msg: string = '';
  isRequesting: boolean;
  submitted: boolean = false;

  public email: string = '';
  public showPassword: boolean = false;
  public showNewPassword: boolean = false;

  public user: UserViewModel;
  
  toggleNewPassword() {
    this.showNewPassword = !this.showNewPassword;
  }

  togglePassword() {
    this.showPassword = !this.showPassword;
  }

  constructor(public dialogRef: OwlDialogRef<ChangeUserPasswordComponent>,
    @Inject(OWL_DIALOG_DATA) public data: any,
    private router: Router,
    private spinner: NgxSpinnerService,
    private userService: UserService,
    private notifier: OwlNotifierService) {

    this.email = data.email;

    this.loadUserInfo(this.email);
  }

  loadUserInfo(username: string) {

    this.userService.loadUserInfo(username).subscribe(
        (result: UserViewModel) => {
          this.user = result;
        },
        error => {

        });
  }

  ngOnInit() { }

  UserChangePassword({ value, valid }: { value: UserChangePasswordModel, valid: boolean }) {
    value.email = this.email;

    this.spinner.show();

    this.submitted = true;
    this.isRequesting = true;
    this.errors = '';

    this.userService.UserChangePassword(value).subscribe(result => {
      if (result.value != '') {
        this.isRequesting = false;
        this.msg = result.value;

        let notifierRef = this.notifier.open(result.value, 'Close', {
          type: 'success',
          life: 2000,
          verticalPosition: 'top',
          horizontalPosition: 'center'
        });

        this.dialogRef.close();

      } else {
        this.isRequesting = false;
        this.errors = 'Can not change user password.';
      }
    }, error => {
      this.isRequesting = false;
      this.errors = 'Can not change user password.';
      });


    this.spinner.hide();
  }
  
}
