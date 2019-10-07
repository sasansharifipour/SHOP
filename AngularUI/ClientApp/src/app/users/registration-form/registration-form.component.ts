import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { UserRegistration } from '../../shared/models/user.registration.interface';
import { UserService } from '../../shared/services/user.service';
import { error } from 'protractor';

@Component({
  selector: 'app-registration-form',
  templateUrl: './registration-form.component.html',
  styleUrls: ['./registration-form.component.scss']
})
export class RegistrationFormComponent implements OnInit {

  errors: string;  
  isRequesting: boolean;
  submitted: boolean = false;

  public showPassword: boolean = false;

  togglePassword() {
    this.showPassword = !this.showPassword;
  }

  constructor(private router: Router, private spinner: NgxSpinnerService,
    private userService: UserService) { }

  ngOnInit() { }

  registerUser({ value, valid }: { value: UserRegistration, valid: boolean }) {

    this.spinner.show();

    this.submitted = true;
    this.isRequesting = true;
    this.errors = '';

    this.userService.createUser(value).subscribe(result => {

    }, error => {
      console.error(error);
      });

    if (valid) {
      
    }

    this.spinner.hide();
  }
  
}
