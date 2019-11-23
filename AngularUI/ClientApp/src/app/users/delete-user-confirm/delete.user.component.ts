import { Component, OnInit, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { UserRegistration } from '../../shared/models/user.registration.interface';
import { UserService } from '../../shared/services/user.service';
import { OwlNotifierService, OwlDialogRef } from 'owl-ng';
import { OWL_DIALOG_DATA } from 'owl-ng';
import { UserViewModel } from 'src/app/shared/models/user.viewmodel.inteface';
import { language } from 'src/app/shared/services/change.language';


@Component({
  selector: 'app-delete-user',
  templateUrl: './delete.user.component.html',
  styleUrls: ['./delete.user.component.scss']
})
export class DeleteUserComponent implements OnInit {

  errors: string;  
  msg: string = '';
  isRequesting: boolean;
  submitted: boolean = false;
  public email: string ='';
  public showPassword: boolean = false;
  public user: UserViewModel;

  togglePassword() {
    this.showPassword = !this.showPassword;
  }

  constructor(public dialogRef: OwlDialogRef<DeleteUserComponent>,
    @Inject(OWL_DIALOG_DATA) public data: any,
    private router: Router,
    private spinner: NgxSpinnerService,
    private userService: UserService,
    private notifier: OwlNotifierService,
    public languageService: language) {

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

  deleteUser() {

    this.spinner.show();

    this.submitted = true;
    this.isRequesting = true;
    this.errors = '';

    this.userService.deleteUser(this.email).subscribe(result => {
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
        this.errors = 'Can not delete user.';
      }
    }, error => {
      this.isRequesting = false;
      this.errors = 'Can not delete user.';
    });


    this.spinner.hide();

  }

  onCancelClick() {
    this.dialogRef.close();
  }

}
