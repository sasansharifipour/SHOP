import { Component, OnInit, OnDestroy, Injectable } from '@angular/core';
import { Directionality } from '@angular/cdk/bidi';
import { Subscription } from 'rxjs';
import { CollectionViewer, SelectionChange } from '@angular/cdk/collections';
import { FlatTreeControl } from '@angular/cdk/tree';
import { BehaviorSubject, merge, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { MatTreeFlatDataSource, MatTreeFlattener } from '@angular/material/tree';
import { UserService } from './shared/services/user.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})

export class AppComponent implements OnInit, OnDestroy {

  [x: string]: any;
  title = 'app';
  events: string[] = [];
  opened: boolean;
  status: boolean;
  subscription: Subscription;

  public treeData: Object[] = [
    {
      nodeId: '1', nodeText: 'KPI',
      nodeChild: [
        {
          nodeId: '11', nodeText: '11',
          nodeChild: [
            { nodeId: '111', nodeText: 'Team management.docx' },
            { nodeId: '112', nodeText: 'Entity Framework Core.pdf' },
          ]
        },
        {
          nodeId: '12', nodeText: '12',
          nodeChild: [
            { nodeId: '121', nodeText: 'Team management.docx' },
            { nodeId: '122', nodeText: 'Entity Framework Core.pdf' },
          ]
        },
        {
          nodeId: '13', nodeText: '13',
          nodeChild: [
            { nodeId: '131', nodeText: 'Team management.docx' },
            { nodeId: '132', nodeText: 'Entity Framework Core.pdf' },
          ]
        }
      ]
    }
  ];

  public treeFields: Object = {
    dataSource: this.treeData,
    id: 'nodeId',
    text: 'nodeText',
    child: 'nodeChild'
  };

  private isRtl: boolean;
  private _dirChangeSubscription = Subscription.EMPTY;

  ngOnInit() {
    this.subscription = this.userService.authNavStatus$.subscribe(
      status => {
        this.status = status;

        if (!this.status) {
          this.router.navigate(['/users/login']);
        }/**/
      }
    );

  }

  logout() {
    this.userService.logout();
  }


  constructor(dir: Directionality, private router: Router, private userService: UserService) {
    /*
    this.isRtl = dir.value === 'rtl';

    this._dirChangeSubscription = dir.change.subscribe(() => {
      this.flipDirection();
    });
    */
  }


  ngOnDestroy() {
    this._dirChangeSubscription.unsubscribe();
    this.subscription.unsubscribe();
  }

}
