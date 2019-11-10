import { Component, ViewChild, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { UserViewModel } from '../../shared/models/user.viewmodel.inteface';
import { UserService } from '../../shared/services/user.service';
import { MatPaginator, MatTableDataSource, MatSort } from '@angular/material';
import { OwlDialogService, OwlDialogRef } from 'owl-ng';
import { RoleViewModel } from 'src/app/shared/models/role.viewmodel.inteface';
import { RoleService } from 'src/app/shared/services/role.service';
import { AddRoleComponent } from '../add/add.role.component';
import { DeleteRoleComponent } from '../delete-confirm/delete.role.component';
import { EditRoleComponent } from '../edit/edit.role.component';

@Component({
  selector: 'app-roles-get-component',
  styleUrls: ['get.roles.component.scss'],
  templateUrl: './get.roles.component.html'
})

export class GetRolesComponent implements OnInit {
  public roles: RoleViewModel[];
  displayedColumns: string[] = ['name', 'actions'];
  dataSource = new MatTableDataSource<RoleViewModel>(this.roles);

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private spinner: NgxSpinnerService, private roleService: RoleService,
    private dialogService: OwlDialogService) { }
    
  ngOnInit() {
    this.loadData();
  }

  loadData() {

    this.spinner.show();

    this.roleService.loadRoles().subscribe(result => {
        this.roles = result;

        this.dataSource = new MatTableDataSource<RoleViewModel>(this.roles);

        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      error => {
        console.error(error);
        this.spinner.hide();
      },
      () => {
        this.spinner.hide();
      });

  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  public openDialog_add(event: any): void {
    const dialogRef = this.dialogService.open(AddRoleComponent, {
      width: '600px',
      dialogClass: 'dummy-dialog',
      //data: { team: 'Golden State Warriors' },
      transitionX: event.clientX,
      transitionY: event.clientY,
    });
    
    dialogRef.afterClosed().subscribe((data: any) => {
      this.loadData();
    });/**/
  }

  public openDialog_edit(event: any, id: number): void {
    const dialogRef = this.dialogService.open(EditRoleComponent,
      {
        width: '600px',
        dialogClass: 'dummy-dialog',
        data: { entity_id: id  },
        transitionX: event.clientX,
        transitionY: event.clientY,
      });

    dialogRef.afterClosed().subscribe((data: any) => {
      this.loadData();
    });
  }
  
  public openDialog_delete(event: any, id: number): void {
      const dialogRef = this.dialogService.open(DeleteRoleComponent, {
        width: '600px',
        dialogClass: 'dummy-dialog',
        data: { entity_id: id },
        transitionX: event.clientX,
        transitionY: event.clientY,
      });

    dialogRef.afterClosed().subscribe((data: any) => {
      this.loadData();
    });
  }
}


