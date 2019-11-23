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
import { trigger, transition, animate, style } from '@angular/animations';
import { MatOptionSelectionChange } from '@angular/material';

import { language } from './shared/services/change.language';

interface FoodNode {
  name: string;
  children?: FoodNode[];
}

const TREE_DATA: FoodNode[] = [
  {
    name: 'Fruit',
    children: [
      { name: 'Apple' },
      { name: 'Banana' },
      { name: 'Fruit loops' },
    ]
  }, {
    name: 'Vegetables',
    children: [
      {
        name: 'Green',
        children: [
          { name: 'Broccoli' },
          { name: 'Brussel sprouts' },
        ]
      }, {
        name: 'Orange',
        children: [
          { name: 'Pumpkins' },
          { name: 'Carrots' },
        ]
      },
    ]
  },
];

/** Flat node with expandable and level information */
interface ExampleFlatNode {
  expandable: boolean;
  name: string;
  level: number;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [
    trigger(
      'detailExpand', [
        transition(':enter', [
          style({ opacity: 0 }),
          animate(1000)
        ]),
        transition(':leave', [
          style({ height: '*' }),
          animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)', style({ height: '0px', minHeight: '0', display: 'none' }))
        ])
      ]
    )
  ]
})

export class AppComponent implements OnInit, OnDestroy {

  private transformer = (node: FoodNode, level: number) => {
    return {
      expandable: !!node.children && node.children.length > 0,
      name: node.name,
      level: level,
    };
  }

  treeControl = new FlatTreeControl<ExampleFlatNode>(
    node => node.level, node => node.expandable);

  treeFlattener = new MatTreeFlattener(
    this.transformer, node => node.level, node => node.expandable, node => node.children);

  dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);

  hasChild = (_: number, node: ExampleFlatNode) => node.expandable;

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
        }
      }
    );
    this.languageService.set_language_class();
  }
  
  logout() {
    this.userService.logout();
  }


  constructor(dir: Directionality, private router: Router,
    private userService: UserService, public languageService: language
  ) {
    this.dataSource.data = TREE_DATA;
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

  change_language(language: string) {
    this.languageService.change_language(language);
  }

}
