import { Component, ViewChild, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { UserViewModel } from '../../shared/models/user.viewmodel.inteface';
import { UserService } from '../../shared/services/user.service';
import { MatPaginator, MatTableDataSource, MatSort } from '@angular/material';
import { RegistrationFormComponent } from '../registration-form/registration-form.component';
import { OwlDialogService, OwlDialogRef } from 'owl-ng';

@Component({
  selector: 'app-users-get-component',
  styleUrls: ['get.users.component.scss'],
  templateUrl: './get.users.component.html'
})

export class GetUsersComponent implements OnInit {
  public users: UserViewModel[];
  displayedColumns: string[] = ['name', 'family', 'mobile', 'eMail', 'userName', 'actions'];
  dataSource = new MatTableDataSource<UserViewModel>(this.users);

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(private spinner: NgxSpinnerService, private userService: UserService,
    private dialogService: OwlDialogService) { }
    
  ngOnInit() {
    this.loadData();
  }

  loadData() {

    this.spinner.show();

    this.userService.loadUsers().subscribe(result => {
        this.users = result;

        this.dataSource = new MatTableDataSource<UserViewModel>(this.users);

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

  public openDialog_addUser(event: any): void {
    const dialogRef = this.dialogService.open(RegistrationFormComponent, {
      width: '600px',
      dialogClass: 'dummy-dialog',
      data: { team: 'Golden State Warriors' },
      transitionX: event.clientX,
      transitionY: event.clientY,
    });

    dialogRef.afterClosed().subscribe((data: any) => {
      this.loadData();
    });
  }

}


