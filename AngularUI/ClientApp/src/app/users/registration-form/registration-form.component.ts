import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { UserRegistration } from '../../shared/models/user.registration.interface';
import { UserService } from '../../shared/services/user.service';
import { OwlNotifierService, OwlDialogRef } from 'owl-ng';
import { language } from 'src/app/shared/services/change.language';

@Component({
  selector: 'app-registration-form',
  templateUrl: './registration-form.component.html',
  styleUrls: ['./registration-form.component.scss']
})
export class RegistrationFormComponent implements OnInit {

  errors: string;  
  msg: string = '';
  isRequesting: boolean;
  submitted: boolean = false;

  public showPassword: boolean = false;

  togglePassword() {
    this.showPassword = !this.showPassword;
  }

  constructor(public dialogRef: OwlDialogRef<RegistrationFormComponent>,
    private router: Router, private spinner: NgxSpinnerService,
    private userService: UserService, private notifier: OwlNotifierService,
    public languageService: language) { }

  ngOnInit() { }

  registerUser({ value, valid }: { value: UserRegistration, valid: boolean }) {

    this.spinner.show();

    this.submitted = true;
    this.isRequesting = true;
    this.errors = '';

    this.userService.createUser(value).subscribe(result => {
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
        this.errors = 'Can not create user.';
      }
    }, error => {
      this.isRequesting = false;
      this.errors = 'Can not create user.';
      });


    this.spinner.hide();
  }
  
}
