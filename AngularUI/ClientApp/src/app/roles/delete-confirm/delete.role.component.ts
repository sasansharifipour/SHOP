import { Component, OnInit, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { OwlNotifierService, OwlDialogRef } from 'owl-ng';
import { OWL_DIALOG_DATA } from 'owl-ng';
import { RoleService } from 'src/app/shared/services/role.service';
import { RoleViewModel } from 'src/app/shared/models/role.viewmodel.inteface';

@Component({
  selector: 'app-delete-role',
  templateUrl: './delete.role.component.html',
  styleUrls: ['./delete.role.component.scss']
})
export class DeleteRoleComponent implements OnInit {

  errors: string;  
  msg: string = '';
  isRequesting: boolean;
  submitted: boolean = false;
  
  public entity_id: number = 0;
  public item: RoleViewModel;


  constructor(public dialogRef: OwlDialogRef<DeleteRoleComponent>,
    @Inject(OWL_DIALOG_DATA) public data: any,
    private router: Router,
    private spinner: NgxSpinnerService,
    private roleService: RoleService,
    private notifier: OwlNotifierService) {

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

  delete() {

    this.spinner.show();

    this.submitted = true;
    this.isRequesting = true;
    this.errors = '';

    this.roleService.delete(this.entity_id).subscribe(result => {
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
        this.errors = 'Can not delete role.';
      }
    }, error => {
      this.isRequesting = false;
      this.errors = 'Can not delete role.';
    });


    this.spinner.hide();

  }

  onCancelClick() {
    this.dialogRef.close();
  }

}
