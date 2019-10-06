import { Injectable } from '@angular/core';
import { Component } from '@angular/core';
import { DataProviderService } from '../shared/services/data.provider.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})

@Injectable()
export class HomeComponent {

  public CSSR_VALUE: number = 0;
  public name: string;
  public value: number;

  public single = [
    {
      name: 'CSSR',
      value: 0
    }, {
      name: 'TCH ASR',
      value: 0
    }
  ];


  public TCH_ASR = [
    {
      name: 'TCH ASR',
      value: 0
    }
  ];

  constructor(private dataProviderService: DataProviderService) { }

  
  public selectedMoments = [
    new Date(2018, 1, 12, 10, 30),
    new Date(2019, 8, 21, 20, 30)
  ];

  title = 'Angular Charts';
  view: any[] = [600, 400];
  // options for the chart
  showXAxis = true;
  showYAxis = true;
  gradient = false;
  showLegend = true;
  showXAxisLabel = true;
  xAxisLabel = 'Country';
  showYAxisLabel = true;
  yAxisLabel = 'Sales';
  timeline = true;
  colorScheme = {
    domain: ['#9370DB', '#87CEFA', '#FA8072', '#FF7F50', '#90EE90', '#9370DB']
  };
  //pie
  showLabels = false;
  
  public multi = [
    {
      "name": "China",
      "series": [
        {
          "name": "2018",
          "value": 2243772
        },
        {
          "name": "2017",
          "value": 1227770
        }
      ]
    },
    {
      "name": "USA",
      "series": [
        {
          "name": "2018",
          "value": 1126000
        },
        {
          "name": "2017",
          "value": 764666
        }
      ]
    },
    {
      "name": "Norway",
      "series": [
        {
          "name": "2018",
          "value": 296215
        },
        {
          "name": "2017",
          "value": 209122
        }
      ]
    },
    {
      "name": "Japan",
      "series": [
        {
          "name": "2018",
          "value": 257363
        },
        {
          "name": "2017",
          "value": 205350
        }
      ]
    },
    {
      "name": "Germany",
      "series": [
        {
          "name": "2018",
          "value": 196750
        },
        {
          "name": "2017",
          "value": 129246
        }
      ]
    },
    {
      "name": "France",
      "series": [
        {
          "name": "2018",
          "value": 204617
        },
        {
          "name": "2017",
          "value": 149797
        }
      ]
    }
  ];

}
