import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { UserRegistration } from '../../shared/models/user.registration.interface';
import { UserService } from '../../shared/services/user.service';
import { OwlNotifierService, OwlDialogRef } from 'owl-ng';
import { RoleService } from 'src/app/shared/services/role.service';
import { RoleViewModel } from 'src/app/shared/models/role.viewmodel.inteface';

@Component({
  selector: 'app-add-role',
  templateUrl: './add.role.component.html',
  styleUrls: ['./add.role.component.scss']
})
export class AddRoleComponent implements OnInit {

  errors: string;  
  msg: string = '';
  isRequesting: boolean;
  submitted: boolean = false;

  public showPassword: boolean = false;

  togglePassword() {
    this.showPassword = !this.showPassword;
  }

  constructor(public dialogRef: OwlDialogRef<AddRoleComponent>,
    private router: Router, private spinner: NgxSpinnerService,
    private roleService: RoleService, private notifier: OwlNotifierService) { }

  ngOnInit() { }

  registerRole({ value, valid }: { value: RoleViewModel, valid: boolean }) {

    this.spinner.show();

    this.submitted = true;
    this.isRequesting = true;
    this.errors = '';

    this.roleService.createRole(value).subscribe(result => {
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
        this.errors = 'Can not create role.';
      }
    }, error => {
      this.isRequesting = false;
      this.errors = 'Can not create role.';
      });


    this.spinner.hide();
  }
  
}
