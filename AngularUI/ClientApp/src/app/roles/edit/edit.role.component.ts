import { Component, OnInit, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { UserRegistration } from '../../shared/models/user.registration.interface';
import { UserService } from '../../shared/services/user.service';
import { OwlNotifierService, OwlDialogRef } from 'owl-ng';
import { OWL_DIALOG_DATA } from 'owl-ng';
import { RoleViewModel } from 'src/app/shared/models/role.viewmodel.inteface';
import { RoleService } from 'src/app/shared/services/role.service';
import { language } from 'src/app/shared/services/change.language';

@Component({
  selector: 'app-edit-role',
  templateUrl: './edit.role.component.html',
  styleUrls: ['./edit.role.component.scss']
})
export class EditRoleComponent implements OnInit {

  errors: string;  
  msg: string = '';
  isRequesting: boolean;
  submitted: boolean = false;

  public entity_id: number = 0;
  public item: RoleViewModel;

  constructor(public dialogRef: OwlDialogRef<EditRoleComponent>,
    @Inject(OWL_DIALOG_DATA) public data: any,
    private router: Router,
    private spinner: NgxSpinnerService,
    private roleService: RoleService,
    private notifier: OwlNotifierService,
    public languageService: language) {

    this.entity_id = data.entity_id;

    this.loadInfo(this.entity_id);
  }

  loadInfo(id: number) {

    this.roleService.loadInfo(id).subscribe(
      (result: RoleViewModel) => {
        this.item = result;
      },
      error => {

      });
  }

  ngOnInit() { }

  update({ value, valid }: { value: RoleViewModel, valid: boolean }) {
    value.id = this.entity_id;

    this.spinner.show();

    this.submitted = true;
    this.isRequesting = true;
    this.errors = '';

    this.roleService.update(this.entity_id,value).subscribe(result => {
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
        this.errors = 'Can not update role.';
      }
    }, error => {
      this.isRequesting = false;
      this.errors = 'Can not update role.';
      });


    this.spinner.hide();
  }
  
}
