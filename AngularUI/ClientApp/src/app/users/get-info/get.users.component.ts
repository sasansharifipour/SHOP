import { Component } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { UserViewModel } from '../../shared/models/user.viewmodel.inteface';
import { UserService } from '../../shared/services/user.service';


@Component({
  selector: 'app-users-get-component',
  templateUrl: './get.users.component.html'
})

export class GetUsersComponent {

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

