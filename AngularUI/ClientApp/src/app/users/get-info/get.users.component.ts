import { Component } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { UserViewModel } from '../../shared/models/user.viewmodel.inteface';
import { UserService } from '../../shared/services/user.service';

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}


@Component({
  selector: 'app-users-get-component',
  templateUrl: './get.users.component.html'
})

export class GetUsersComponent {
  public displayedColumns: string[] = [ 'name'];
  public dataSource = [
    { position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H' },
    { position: 2, name: 'Helium', weight: 4.0026, symbol: 'He' },
    { position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li' },
    { position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be' },
    { position: 5, name: 'Boron', weight: 10.811, symbol: 'B' },
    { position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C' },
    { position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N' },
    { position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O' },
    { position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F' },
    { position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne' },
  ];
  public users: UserViewModel[];


  constructor (private spinner: NgxSpinnerService, private userService: UserService){ }
    
  ngOnInit() {
    
    this.spinner.show();

    this.userService.loadUsers().subscribe(result => {
      this.users = result;
    },
    error => {
      console.error(error);
      this.spinner.hide();
    },
    () => {
        this.spinner.hide();
    });
    
  }


}

