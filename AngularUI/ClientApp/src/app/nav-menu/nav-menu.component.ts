import { Component, OnInit, OnDestroy } from '@angular/core';
import { UserService } from '../shared/services/user.service';
import { Subscription } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.css']
})
export class NavMenuComponent implements OnInit, OnDestroy {
  isExpanded = false;
  status: boolean;
  subscription: Subscription;
 

  constructor(private router: Router,private userService: UserService) { }


  ngOnInit() {
    this.subscription = this.userService.authNavStatus$.subscribe(
      status => {
        this.status = status;
/*
        if (!this.status) {
          this.router.navigate(['/users/login']);
        }*/
      }
    );

  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  logout() {
    this.userService.logout();
  }

  collapse() {
    this.isExpanded = false;
  }

  toggle() {
    this.isExpanded = !this.isExpanded;
  }
}
