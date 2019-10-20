import { Injectable, ViewEncapsulation, Input } from '@angular/core';
import { ViewChild, Component  } from '@angular/core';
import { Chart } from 'chart.js';
import { Line_Chart_ViewModel } from 'src/app/shared/models/line.chart.view.model.interface';
import { MatTabChangeEvent } from '@angular/material';
import { Gauge_Result_ViewModel } from 'src/app/shared/models/Gauge.Result';

@Component({
  encapsulation: ViewEncapsulation.None,
  selector: 'Show-Data-Chart',
  templateUrl: './Show-Data.html',
  styleUrls: ['./Show-Data.scss']
})

@Injectable()
export class ShowDataComponent {
  @ViewChild('firsttabGroup') firsttabGroup;
  @ViewChild('secondtabGroup') secondtabGroup;
  
  @ViewChild('firstTabBarGroup') firstTabBarGroup;
  @ViewChild('secondTabBarGroup') secondTabBarGroup;

  @ViewChild('firstTabLineGroup') firstTabLineGroup;
  @ViewChild('compareTabLineGroup') compareTabLineGroup;
  @ViewChild('secondTabLineGroup') secondTabLineGroup;

  FirstLineChart_Current_Month: Chart;
  SecondLineChart_Current_Month: Chart;
  CompareLineChart_Current_Month: Chart;

  FirstLineChart_Last_Month: Chart;
  SecondLineChart_Last_Month: Chart;
  CompareLineChart_Last_Month: Chart;


  FirstTabBarChart_Current_Month: Chart;
  SecondTabBarChart_Current_Month: Chart;

  @Input() checklist_Operators: any;
  @Input() checklist_Technology: any;

  @Input() id: string;

  @Input() Left_Variables_Title: string[];
  @Input() Right_Variables_Title: string[];

  public First_Variable_Left_Bar_Data_Set: any[];
  public Second_Variable_Left_Bar_Data_Set: any[];
  public First_Variable_Right_Bar_Data_Set: any[];
  public Second_Variable_Right_Bar_Data_Set: any[];

  public First_Variable_Left_Line_Current_Month_Data_Set: any[];
  public Second_Variable_Left_Line_Current_Month_Data_Set: any[];
  public First_Variable_Right_Line_Current_Month_Data_Set: any[];
  public Second_Variable_Right_Line_Current_Month_Data_Set: any[];

  public First_Variable_Left_Line_Last_Month_Data_Set: any[];
  public Second_Variable_Left_Line_Last_Month_Data_Set: any[];
  public First_Variable_Right_Line_Last_Month_Data_Set: any[];
  public Second_Variable_Right_Line_Last_Month_Data_Set: any[];

  public First_Variable_Left_Bar_Selected_Operators: any[];
  public Second_Variable_Left_Bar_Selected_Operators: any[];
  public First_Variable_Right_Bar_Selected_Operators: any[];
  public Second_Variable_Right_Bar_Selected_Operators: any[];

  public First_Variable_Left_Line_Current_Month_Selected_Labels: any[];
  public Second_Variable_Left_Line_Current_Month_Selected_Labels: any[];
  public First_Variable_Right_Line_Current_Month_Selected_Labels: any[];
  public Second_Variable_Right_Line_Current_Month_Selected_Labels: any[];

  public First_Variable_Left_Line_Last_Month_Selected_Labels: any[];
  public Second_Variable_Left_Line_Last_Month_Selected_Labels: any[];
  public First_Variable_Right_Line_Last_Month_Selected_Labels: any[];
  public Second_Variable_Right_Line_Last_Month_Selected_Labels: any[];

  public First_Variable_Left_Gauge_Value : number;
  public Second_Variable_Left_Gauge_Value: number;
  public First_Variable_Right_Gauge_Value: number;
  public Second_Variable_Right_Gauge_Value: number;

  private _First_Variable_Left_Gauge_Data: Array<Gauge_Result_ViewModel>;
  private _Second_Variable_Left_Gauge_Data: Array<Gauge_Result_ViewModel>;
  private _First_Variable_Right_Gauge_Data: Array<Gauge_Result_ViewModel>;
  private _Second_Variable_Right_Gauge_Data: Array<Gauge_Result_ViewModel>;

  private _First_Variable_Left_Line_Current_Month_Data: Array<Line_Chart_ViewModel>;
  private _Second_Variable_Left_Line_Current_Month_Data: Array<Line_Chart_ViewModel>;
  private _First_Variable_Right_Line_Current_Month_Data: Array<Line_Chart_ViewModel>;
  private _Second_Variable_Right_Line_Current_Month_Data: Array<Line_Chart_ViewModel>;

  private _First_Variable_Left_Line_Last_Month_Data: Array<Line_Chart_ViewModel>;
  private _Second_Variable_Left_Line_Last_Month_Data: Array<Line_Chart_ViewModel>;
  private _First_Variable_Right_Line_Last_Month_Data: Array<Line_Chart_ViewModel>;
  private _Second_Variable_Right_Line_Last_Month_Data: Array<Line_Chart_ViewModel>;
  
  @Input() set First_Variable_Left_Gauge_Data(value: Array<Gauge_Result_ViewModel>) {

    this._First_Variable_Left_Gauge_Data = value;
    this.First_Variable_Left_Gauge_Data_Change(this._First_Variable_Left_Gauge_Data);

  }
  @Input() set Second_Variable_Left_Gauge_Data(value: Array<Gauge_Result_ViewModel>) {

    this._Second_Variable_Left_Gauge_Data = value;
    this.Second_Variable_Left_Gauge_Data_Change(this._Second_Variable_Left_Gauge_Data);

  }
  @Input() set First_Variable_Right_Gauge_Data(value: Array<Gauge_Result_ViewModel>) {

    this._First_Variable_Right_Gauge_Data = value;
    this.First_Variable_Right_Gauge_Data_Change(this._First_Variable_Right_Gauge_Data);

  }
  @Input() set Second_Variable_Right_Gauge_Data(value: Array<Gauge_Result_ViewModel>) {

    this._Second_Variable_Right_Gauge_Data = value;
    this.Second_Variable_Right_Gauge_Data_Change(this._Second_Variable_Right_Gauge_Data);

  }

  @Input() set First_Variable_Left_Line_Current_Month_Data(value: Array<Line_Chart_ViewModel>) {

    this._First_Variable_Left_Line_Current_Month_Data = value;
    this.First_Variable_Left_Line_Current_Month_Data_Change(this._First_Variable_Left_Line_Current_Month_Data);

  }
  @Input() set Second_Variable_Left_Line_Current_Month_Data(value: Array<Line_Chart_ViewModel>) {

    this._Second_Variable_Left_Line_Current_Month_Data = value;
    this.Second_Variable_Left_Line_Current_Month_Data_Change(this._Second_Variable_Left_Line_Current_Month_Data);

  }
  @Input() set First_Variable_Right_Line_Current_Month_Data(value: Array<Line_Chart_ViewModel>) {

    this._First_Variable_Right_Line_Current_Month_Data = value;
    this.First_Variable_Right_Line_Current_Month_Data_Change(this._First_Variable_Right_Line_Current_Month_Data);

  }
  @Input() set Second_Variable_Right_Line_Current_Month_Data(value: Array<Line_Chart_ViewModel>) {

    this._Second_Variable_Right_Line_Current_Month_Data = value;
    this.Second_Variable_Right_Line_Current_Month_Data_Change(this._Second_Variable_Right_Line_Current_Month_Data);

  }

  @Input() set First_Variable_Left_Line_Last_Month_Data(value: Array<Line_Chart_ViewModel>) {

    this._First_Variable_Left_Line_Last_Month_Data = value;
    this.First_Variable_Left_Line_Last_Month_Data_Change(this._First_Variable_Left_Line_Last_Month_Data);

  }
  @Input() set Second_Variable_Left_Line_Last_Month_Data(value: Array<Line_Chart_ViewModel>) {

    this._Second_Variable_Left_Line_Last_Month_Data = value;
    this.Second_Variable_Left_Line_Last_Month_Data_Change(this._Second_Variable_Left_Line_Last_Month_Data);

  }
  @Input() set First_Variable_Right_Line_Last_Month_Data(value: Array<Line_Chart_ViewModel>) {

    this._First_Variable_Right_Line_Last_Month_Data = value;
    this.First_Variable_Right_Line_Last_Month_Data_Change(this._First_Variable_Right_Line_Last_Month_Data);

  }
  @Input() set Second_Variable_Right_Line_Last_Month_Data(value: Array<Line_Chart_ViewModel>) {

    this._Second_Variable_Right_Line_Last_Month_Data = value;
    this.Second_Variable_Right_Line_Last_Month_Data_Change(this._Second_Variable_Right_Line_Last_Month_Data);

  }

  get First_Variable_Left_Gauge_Data(): Array<Gauge_Result_ViewModel> {

    return this._First_Variable_Left_Gauge_Data;

  }
  get Second_Variable_Left_Gauge_Data(): Array<Gauge_Result_ViewModel> {

    return this._Second_Variable_Left_Gauge_Data;

  }
  get First_Variable_Right_Gauge_Data(): Array<Gauge_Result_ViewModel> {

    return this._First_Variable_Right_Gauge_Data;

  }
  get Second_Variable_Right_Gauge_Data(): Array<Gauge_Result_ViewModel> {

    return this._Second_Variable_Right_Gauge_Data;

  }

  get First_Variable_Left_Line_Current_Month_Data(): Array<Line_Chart_ViewModel> {

    return this._First_Variable_Left_Line_Current_Month_Data;

  }
  get Second_Variable_Left_Line_Current_Month_Data(): Array<Line_Chart_ViewModel> {

    return this._Second_Variable_Left_Line_Current_Month_Data;

  }
  get First_Variable_Right_Line_Current_Month_Data(): Array<Line_Chart_ViewModel> {

    return this._First_Variable_Right_Line_Current_Month_Data;

  }
  get Second_Variable_Right_Line_Current_Month_Data(): Array<Line_Chart_ViewModel> {

    return this._Second_Variable_Right_Line_Current_Month_Data;

  }

  First_Variable_Left_Gauge_Data_Change(result: Array<Gauge_Result_ViewModel>) {

    let selected_operators = [];
    let selected_datasets = [];
    let sum_request = 0;
    let sum_response = 0;
    let technology_name = '';
    let counter = 0;
    let color = ['rgba(255, 99, 132, 0.6)', 'rgba(54, 162, 235, 0.6)', 'rgba(255, 206, 86, 0.6)'];

    result.forEach((item) => {

        sum_request += item.denominator;
        sum_response += item.numerator;

        for (var i = 0; i < this.checklist_Operators.length; i++) {
          if (this.checklist_Operators[i].id == item.operatorId &&
            selected_operators.indexOf(this.checklist_Operators[i].value) === -1)
            selected_operators.push(this.checklist_Operators[i].value);
        }

        for (var i = 0; i < this.checklist_Technology.length; i++) {
          if (this.checklist_Technology[i].id == item.technologyId)
            technology_name = this.checklist_Technology[i].value;
        }

        let finded = false;

        for (var i = 0; i < selected_datasets.length; i++) {
          if (selected_datasets[i].label == technology_name) {
            finded = true;

            selected_datasets[i].data.push((item.numerator / item.denominator) *
              100);
          }
        }

        if (finded == false) {
          let x =
          {
            label: technology_name,
            data: [((item.numerator / item.denominator) * 100)],
            backgroundColor: color[counter]
          };
          counter++;
          selected_datasets.push(x);
        }

      }
    );

    this.First_Variable_Left_Gauge_Value = ((sum_response / sum_request) * 100);
    this.First_Variable_Left_Bar_Data_Set = selected_datasets;
    this.First_Variable_Left_Bar_Selected_Operators = selected_operators;

    this.loadFirstTab();
  }
  Second_Variable_Left_Gauge_Data_Change(result: Array<Gauge_Result_ViewModel>) {

    let selected_operators = [];
    let selected_datasets = [];
    let sum_request = 0;
    let sum_response = 0;
    let technology_name = '';
    let counter = 0;
    let color = ['rgba(255, 99, 132, 0.6)', 'rgba(54, 162, 235, 0.6)', 'rgba(255, 206, 86, 0.6)'];

    result.forEach((item) => {

        sum_request += item.denominator;
        sum_response += item.numerator;

        for (var i = 0; i < this.checklist_Operators.length; i++) {
          if (this.checklist_Operators[i].id == item.operatorId &&
            selected_operators.indexOf(this.checklist_Operators[i].value) === -1)
            selected_operators.push(this.checklist_Operators[i].value);
        }

        for (var i = 0; i < this.checklist_Technology.length; i++) {
          if (this.checklist_Technology[i].id == item.technologyId)
            technology_name = this.checklist_Technology[i].value;
        }

        let finded = false;

        for (var i = 0; i < selected_datasets.length; i++) {
          if (selected_datasets[i].label == technology_name) {
            finded = true;

            selected_datasets[i].data.push((item.numerator / item.denominator) *
              100);
          }
        }

        if (finded == false) {
          let x =
          {
            label: technology_name,
            data: [((item.numerator / item.denominator) * 100)],
            backgroundColor: color[counter]
          };
          counter++;
          selected_datasets.push(x);
        }

      }
    );

    this.Second_Variable_Left_Gauge_Value = ((sum_response / sum_request) * 100);
    this.Second_Variable_Left_Bar_Data_Set = selected_datasets;
    this.Second_Variable_Left_Bar_Selected_Operators = selected_operators;

    this.loadFirstTab();
  }
  First_Variable_Right_Gauge_Data_Change(result: Array<Gauge_Result_ViewModel>) {

    let selected_operators = [];
    let selected_datasets = [];
    let sum_request = 0;
    let sum_response = 0;
    let technology_name = '';
    let counter = 0;
    let color = ['rgba(255, 99, 132, 0.6)', 'rgba(54, 162, 235, 0.6)', 'rgba(255, 206, 86, 0.6)'];

    result.forEach((item) => {

      sum_request += item.denominator;
      sum_response += item.numerator;

      for (var i = 0; i < this.checklist_Operators.length; i++) {
        if (this.checklist_Operators[i].id == item.operatorId &&
          selected_operators.indexOf(this.checklist_Operators[i].value) === -1)
          selected_operators.push(this.checklist_Operators[i].value);
      }

      for (var i = 0; i < this.checklist_Technology.length; i++) {
        if (this.checklist_Technology[i].id == item.technologyId)
          technology_name = this.checklist_Technology[i].value;
      }

      let finded = false;

      for (var i = 0; i < selected_datasets.length; i++) {
        if (selected_datasets[i].label == technology_name) {
          finded = true;

          selected_datasets[i].data.push((item.numerator / item.denominator) *
            100);
        }
      }

      if (finded == false) {
        let x =
        {
          label: technology_name,
          data: [((item.numerator / item.denominator) * 100)],
          backgroundColor: color[counter]
        };
        counter++;
        selected_datasets.push(x);
      }

    }
    );

    this.First_Variable_Right_Gauge_Value = ((sum_response / sum_request) * 100);
    this.First_Variable_Right_Bar_Data_Set = selected_datasets;
    this.First_Variable_Right_Bar_Selected_Operators = selected_operators;

    this.loadSecondTab();
  }
  Second_Variable_Right_Gauge_Data_Change(result: Array<Gauge_Result_ViewModel>) {

    let selected_operators = [];
    let selected_datasets = [];
    let sum_request = 0;
    let sum_response = 0;
    let technology_name = '';
    let counter = 0;
    let color = ['rgba(255, 99, 132, 0.6)', 'rgba(54, 162, 235, 0.6)', 'rgba(255, 206, 86, 0.6)'];

    result.forEach((item) => {

      sum_request += item.denominator;
      sum_response += item.numerator;

      for (var i = 0; i < this.checklist_Operators.length; i++) {
        if (this.checklist_Operators[i].id == item.operatorId &&
          selected_operators.indexOf(this.checklist_Operators[i].value) === -1)
          selected_operators.push(this.checklist_Operators[i].value);
      }

      for (var i = 0; i < this.checklist_Technology.length; i++) {
        if (this.checklist_Technology[i].id == item.technologyId)
          technology_name = this.checklist_Technology[i].value;
      }

      let finded = false;

      for (var i = 0; i < selected_datasets.length; i++) {
        if (selected_datasets[i].label == technology_name) {
          finded = true;

          selected_datasets[i].data.push((item.numerator / item.denominator) *
            100);
        }
      }

      if (finded == false) {
        let x =
        {
          label: technology_name,
          data: [((item.numerator / item.denominator) * 100)],
          backgroundColor: color[counter]
        };
        counter++;
        selected_datasets.push(x);
      }

    }
    );

    this.Second_Variable_Right_Gauge_Value = ((sum_response / sum_request) * 100);
    this.Second_Variable_Right_Bar_Data_Set = selected_datasets;
    this.Second_Variable_Right_Bar_Selected_Operators = selected_operators;

    this.loadSecondTab();
  }
  
  First_Variable_Left_Line_Current_Month_Data_Change(result: Array<Line_Chart_ViewModel>) {

    let selected_labels = [];
    let selected_datasets = [];
    let counter = 0;
    let color = ['rgba(255, 99, 132, 0.6)', 'rgba(54, 162, 235, 0.6)', 'rgba(255, 206, 86, 0.6)'];

    let x =
    {
      label: this.Left_Variables_Title[0],
      data: [],
      fill: true,
      lineTension: 0.3,
      borderColor: color[counter],
      pointBackgroundColor: color[counter],
      pointHoverRadius: 10,
      borderWidth: 4

    };
    counter++;
    selected_datasets.push(x);

    result.forEach((item) => {
        selected_labels.push(item.accurance_date);
        selected_datasets[0].data.push(item.data * 100);
      }
    );

    this.First_Variable_Left_Line_Current_Month_Data_Set = selected_datasets;
    this.First_Variable_Left_Line_Current_Month_Selected_Labels = selected_labels;

    this.loadFirstTab();
  }
  Second_Variable_Left_Line_Current_Month_Data_Change(result: Array<Line_Chart_ViewModel>) {

    let selected_labels = [];
    let selected_datasets = [];
    let counter = 0;
    let color = ['rgba(255, 99, 132, 0.6)', 'rgba(54, 162, 235, 0.6)', 'rgba(255, 206, 86, 0.6)'];

    let x =
    {
      label: this.Left_Variables_Title[1],
      data: [],
      fill: true,
      lineTension: 0.3,
      borderColor: color[counter],
      pointBackgroundColor: color[counter],
      pointHoverRadius: 10,
      borderWidth: 4

    };
    counter++;
    selected_datasets.push(x);

    result.forEach((item) => {
        selected_labels.push(item.accurance_date);
        selected_datasets[0].data.push(item.data * 100);
      }
    );

    this.Second_Variable_Left_Line_Current_Month_Data_Set = selected_datasets;
    this.Second_Variable_Left_Line_Current_Month_Selected_Labels = selected_labels;

    this.loadFirstTab();
  }
  First_Variable_Right_Line_Current_Month_Data_Change(result: Array<Line_Chart_ViewModel>) {

    let selected_labels = [];
    let selected_datasets = [];
    let counter = 1;
    let color = ['rgba(255, 99, 132, 0.6)', 'rgba(54, 162, 235, 0.6)', 'rgba(255, 206, 86, 0.6)'];

    let x =
    {
      label: this.Right_Variables_Title[0],
      data: [],
      fill: true,
      lineTension: 0.3,
      borderColor: color[counter],
      pointBackgroundColor: color[counter],
      pointHoverRadius: 10,
      borderWidth: 4

    };
    counter++;
    selected_datasets.push(x);

    result.forEach((item) => {
        selected_labels.push(item.accurance_date);
        selected_datasets[0].data.push(item.data * 100);
      }
    );

    this.First_Variable_Right_Line_Current_Month_Data_Set = selected_datasets;
    this.First_Variable_Right_Line_Current_Month_Selected_Labels = selected_labels;

    this.loadSecondTab();
  }
  Second_Variable_Right_Line_Current_Month_Data_Change(result: Array<Line_Chart_ViewModel>) {

    let selected_labels = [];
    let selected_datasets = [];
    let counter = 1;
    let color = ['rgba(255, 99, 132, 0.6)', 'rgba(54, 162, 235, 0.6)', 'rgba(255, 206, 86, 0.6)'];

    let x =
    {
      label: this.Right_Variables_Title[1],
      data: [],
      fill: true,
      lineTension: 0.3,
      borderColor: color[counter],
      pointBackgroundColor: color[counter],
      pointHoverRadius: 10,
      borderWidth: 4

    };
    counter++;
    selected_datasets.push(x);

    result.forEach((item) => {
        selected_labels.push(item.accurance_date);
        selected_datasets[0].data.push(item.data * 100);
      }
    );

    this.Second_Variable_Right_Line_Current_Month_Data_Set = selected_datasets;
    this.Second_Variable_Right_Line_Current_Month_Selected_Labels = selected_labels;

    this.loadSecondTab();
  }

  First_Variable_Left_Line_Last_Month_Data_Change(result: Array<Line_Chart_ViewModel>) {

    let selected_labels = [];
    let selected_datasets = [];
    let counter = 0;
    let color = ['rgba(255, 99, 132, 0.6)', 'rgba(54, 162, 235, 0.6)', 'rgba(255, 206, 86, 0.6)'];

    let x =
    {
      label: this.Left_Variables_Title[0],
      data: [],
      fill: true,
      lineTension: 0.3,
      borderColor: color[counter],
      pointBackgroundColor: color[counter],
      pointHoverRadius: 10,
      borderWidth: 4

    };
    counter++;
    selected_datasets.push(x);

    result.forEach((item) => {
      selected_labels.push(item.accurance_date);
      selected_datasets[0].data.push(item.data * 100);
    }
    );

    this.First_Variable_Left_Line_Last_Month_Data_Set = selected_datasets;
    this.First_Variable_Left_Line_Last_Month_Selected_Labels = selected_labels;

    this.loadFirstTab();
  }
  Second_Variable_Left_Line_Last_Month_Data_Change(result: Array<Line_Chart_ViewModel>) {

    let selected_labels = [];
    let selected_datasets = [];
    let counter = 0;
    let color = ['rgba(255, 99, 132, 0.6)', 'rgba(54, 162, 235, 0.6)', 'rgba(255, 206, 86, 0.6)'];

    let x =
    {
      label: this.Left_Variables_Title[1],
      data: [],
      fill: true,
      lineTension: 0.3,
      borderColor: color[counter],
      pointBackgroundColor: color[counter],
      pointHoverRadius: 10,
      borderWidth: 4

    };
    counter++;
    selected_datasets.push(x);

    result.forEach((item) => {
      selected_labels.push(item.accurance_date);
      selected_datasets[0].data.push(item.data * 100);
    }
    );

    this.Second_Variable_Left_Line_Last_Month_Data_Set = selected_datasets;
    this.Second_Variable_Left_Line_Last_Month_Selected_Labels = selected_labels;

    this.loadFirstTab();
  }
  First_Variable_Right_Line_Last_Month_Data_Change(result: Array<Line_Chart_ViewModel>) {

    let selected_labels = [];
    let selected_datasets = [];
    let counter = 1;
    let color = ['rgba(255, 99, 132, 0.6)', 'rgba(54, 162, 235, 0.6)', 'rgba(255, 206, 86, 0.6)'];

    let x =
    {
      label: this.Right_Variables_Title[0],
      data: [],
      fill: true,
      lineTension: 0.3,
      borderColor: color[counter],
      pointBackgroundColor: color[counter],
      pointHoverRadius: 10,
      borderWidth: 4

    };
    counter++;
    selected_datasets.push(x);

    result.forEach((item) => {
      selected_labels.push(item.accurance_date);
      selected_datasets[0].data.push(item.data * 100);
    }
    );

    this.First_Variable_Right_Line_Last_Month_Data_Set = selected_datasets;
    this.First_Variable_Right_Line_Last_Month_Selected_Labels = selected_labels;

    this.loadSecondTab();
  }
  Second_Variable_Right_Line_Last_Month_Data_Change(result: Array<Line_Chart_ViewModel>) {

    let selected_labels = [];
    let selected_datasets = [];
    let counter = 1;
    let color = ['rgba(255, 99, 132, 0.6)', 'rgba(54, 162, 235, 0.6)', 'rgba(255, 206, 86, 0.6)'];

    let x =
    {
      label: this.Right_Variables_Title[1],
      data: [],
      fill: true,
      lineTension: 0.3,
      borderColor: color[counter],
      pointBackgroundColor: color[counter],
      pointHoverRadius: 10,
      borderWidth: 4

    };
    counter++;
    selected_datasets.push(x);

    result.forEach((item) => {
      selected_labels.push(item.accurance_date);
      selected_datasets[0].data.push(item.data * 100);
    }
    );

    this.Second_Variable_Right_Line_Last_Month_Data_Set = selected_datasets;
    this.Second_Variable_Right_Line_Last_Month_Selected_Labels = selected_labels;

    this.loadSecondTab();
  }

  createFirstTabBarChart_Current_Month(operators: any, dataset_value: any) {

    if (this.FirstTabBarChart_Current_Month
      && this.FirstTabBarChart_Current_Month.chart) {
      var ci = this.FirstTabBarChart_Current_Month.chart;

      ci.destroy();

    }

    this.FirstTabBarChart_Current_Month = new Chart(this.id + '_FirstTabBarChart_Current_Month' ,
      {
        type: 'horizontalBar',
        data: {
          labels: operators,
          datasets: dataset_value
        },
        options: {
          legend: {

          },
          title: {
            display: false
          },
          scales: {
            xAxes: [{
              ticks: {
                min: 0
              }
            }],
            yAxes: [
              {
                ticks: {
                  beginAtZero: true
                }
              }
            ]
          }
        }
      });

    var ci = this.FirstTabBarChart_Current_Month.chart;
    ci.update();
  }

  createSecondTabBarChart_Current_Month(operators: any, dataset_value: any) {

    if (this.SecondTabBarChart_Current_Month
      && this.SecondTabBarChart_Current_Month.chart) {
      var ci = this.SecondTabBarChart_Current_Month.chart;

      ci.destroy();

    }

    this.SecondTabBarChart_Current_Month = new Chart(this.id + '_SecondTabBarChart_Current_Month',
      {
        type: 'horizontalBar',
        data: {
          labels: operators,
          datasets: dataset_value
        },
        options: {
          legend: {

          },
          title: {
            display: false
          },
          scales: {
            xAxes: [{
              ticks: {
                min: 0
              }
            }],
            yAxes: [
              {
                ticks: {
                  beginAtZero: true
                }
              }
            ]
          }
        }
      });

    var ci = this.SecondTabBarChart_Current_Month.chart;
    ci.update();
  }

  createFirstLineChart_Current_Month(labels_value: any, dataset_value: any) {
    if (labels_value == undefined || dataset_value == undefined)
      return;
    else {
      if (this.FirstLineChart_Current_Month && this.FirstLineChart_Current_Month.chart) {
        var ci = this.FirstLineChart_Current_Month.chart;

        ci.destroy();

      }

      this.FirstLineChart_Current_Month = new Chart(this.id + '_FirstLineChart_Current_Month',
        {
          type: 'line',
          data: {
            labels: labels_value,
            datasets: dataset_value
          },
          options: {
            legend: {
            },
            title: {
              display: false
            },
            scales: {
              yAxes: [
                {
                  ticks: {
                    beginAtZero: true
                  }
                }
              ]
            }
          }
        });

      var ci = this.FirstLineChart_Current_Month.chart;
      ci.update();
    }
  }

  createSecondLineChart_Current_Month(labels_value: any, dataset_value: any) {
    if (labels_value == undefined || dataset_value == undefined)
      return;
    else {
      if (this.SecondLineChart_Current_Month && this.SecondLineChart_Current_Month.chart) {
        var ci = this.SecondLineChart_Current_Month.chart;

        ci.destroy();

      }

      this.SecondLineChart_Current_Month = new Chart(this.id + '_SecondLineChart_Current_Month',
        {
          type: 'line',
          data: {
            labels: labels_value,
            datasets: dataset_value
          },
          options: {
            legend: {
            },
            title: {
              display: false
            },
            scales: {
              yAxes: [
                {
                  ticks: {
                    beginAtZero: true
                  }
                }
              ]
            }
          }
        });

      var ci = this.SecondLineChart_Current_Month.chart;
      ci.update();
    }
  }

  createCompareLineChart_Current_Month(labels_value: any, left_dataset_value: any, right_dataset_value: any) {
    if (labels_value == undefined || left_dataset_value == undefined || right_dataset_value == undefined )
      return;
    else {

      let dataset_value = [];
      dataset_value.push(left_dataset_value[0]);
      dataset_value.push(right_dataset_value[0]);

      if (dataset_value.length > 0) {
        if (this.CompareLineChart_Current_Month && this.CompareLineChart_Current_Month.chart) {
          var ci = this.CompareLineChart_Current_Month.chart;

          ci.destroy();

        }

        this.CompareLineChart_Current_Month = new Chart(this.id + '_CompareLineChart_Current_Month',
          {
            type: 'line',
            data: {
              labels: labels_value,
              datasets: dataset_value
            },
            options: {
              legend: {
              },
              title: {
                display: false
              },
              scales: {
                yAxes: [
                  {
                    ticks: {
                      beginAtZero: true
                    }
                  }
                ]
              }
            }
          });

        var ci = this.CompareLineChart_Current_Month.chart;
        ci.update();
      }
    }
  }

  createCompareLineChart_Last_Month(labels_value: any, left_dataset_value: any, right_dataset_value: any) {
    if (labels_value == undefined || left_dataset_value == undefined || right_dataset_value == undefined)
      return;
    else {

      let dataset_value = [];
      dataset_value.push(left_dataset_value[0]);
      dataset_value.push(right_dataset_value[0]);

      if (dataset_value.length > 0) {

        if (this.CompareLineChart_Last_Month && this.CompareLineChart_Last_Month.chart) {
          var ci = this.CompareLineChart_Last_Month.chart;

          ci.destroy();

        }

        this.CompareLineChart_Last_Month = new Chart(this.id + '_CompareLineChart_Last_Month',
          {
            type: 'line',
            data: {
              labels: labels_value,
              datasets: dataset_value
            },
            options: {
              legend: {
              },
              title: {
                display: false
              },
              scales: {
                yAxes: [
                  {
                    ticks: {
                      beginAtZero: true
                    }
                  }
                ]
              }
            }
          });

        var ci = this.CompareLineChart_Last_Month.chart;
        ci.update();
      }
    }
  }
  
  createFirstLineChart_Last_Month(labels_value: any, dataset_value: any) {

    if (labels_value == undefined || dataset_value == undefined)
      return;
    else
    {

      if (this.FirstLineChart_Last_Month && this.FirstLineChart_Last_Month.chart) {
        var ci = this.FirstLineChart_Last_Month.chart;

        ci.destroy();

      }

      this.FirstLineChart_Last_Month = new Chart(this.id + '_FirstLineChart_Last_Month',
        {
          type: 'line',
          data: {
            labels: labels_value,
            datasets: dataset_value
          },
          options: {
            legend: {
            },
            title: {
              display: false
            },
            scales: {
              yAxes: [
                {
                  ticks: {
                    beginAtZero: true
                  }
                }
              ]
            }
          }
        });

      var ci = this.FirstLineChart_Last_Month.chart;
      ci.update();
    }
  }

  createSecondLineChart_Last_Month(labels_value: any, dataset_value: any) {
    if (labels_value == undefined || dataset_value == undefined)
      return;
    else {
      if (this.SecondLineChart_Last_Month && this.SecondLineChart_Last_Month.chart) {
        var ci = this.SecondLineChart_Last_Month.chart;

        ci.destroy();

      }

      this.SecondLineChart_Last_Month = new Chart(this.id + '_SecondLineChart_Last_Month',
        {
          type: 'line',
          data: {
            labels: labels_value,
            datasets: dataset_value
          },
          options: {
            legend: {
            },
            title: {
              display: false
            },
            scales: {
              yAxes: [
                {
                  ticks: {
                    beginAtZero: true
                  }
                }
              ]
            }
          }
        });

      var ci = this.SecondLineChart_Last_Month.chart;
      ci.update();
    }
  }
  
  firstGaugeChart_Tab_Change(tabChangeEvent: MatTabChangeEvent): void {
    this.loadFirstTab();
  }

  secondGaugeChart_Tab_Change(tabChangeEvent: MatTabChangeEvent): void {
    this.loadSecondTab();
  }

  loadFirstTab() {

    if (this.firsttabGroup.selectedIndex == 0)
    {
      this.createFirstTabBarChart_Current_Month(this.First_Variable_Left_Bar_Selected_Operators,
        this.First_Variable_Left_Bar_Data_Set);

      if (this.firstTabLineGroup.selectedIndex == 0)
      {
        this.createFirstLineChart_Current_Month(this.First_Variable_Left_Line_Current_Month_Selected_Labels,
          this.First_Variable_Left_Line_Current_Month_Data_Set);
      }
      else if (this.firstTabLineGroup.selectedIndex == 1)
      {
        this.createFirstLineChart_Last_Month(this.First_Variable_Left_Line_Last_Month_Selected_Labels,
          this.First_Variable_Left_Line_Last_Month_Data_Set);
      }
    }
    else if (this.firsttabGroup.selectedIndex == 1)
    {
      this.createFirstTabBarChart_Current_Month(this.Second_Variable_Left_Bar_Selected_Operators,
        this.Second_Variable_Left_Bar_Data_Set);

      if (this.firstTabLineGroup.selectedIndex == 0)
      {
        this.createFirstLineChart_Current_Month(this.Second_Variable_Left_Line_Current_Month_Selected_Labels,
          this.Second_Variable_Left_Line_Current_Month_Data_Set);
      }
      else if (this.firstTabLineGroup.selectedIndex == 1)
      {
        this.createFirstLineChart_Last_Month(this.Second_Variable_Left_Line_Last_Month_Selected_Labels,
          this.Second_Variable_Left_Line_Last_Month_Data_Set);
      }
    }

    this.updateCompareTab();
  }

  loadSecondTab() {

    if (this.secondtabGroup.selectedIndex == 0) {
      this.createSecondTabBarChart_Current_Month(this.First_Variable_Right_Bar_Selected_Operators,
        this.First_Variable_Right_Bar_Data_Set);

      if (this.secondTabLineGroup.selectedIndex == 0) {
        this.createSecondLineChart_Current_Month(this.First_Variable_Right_Line_Current_Month_Selected_Labels,
          this.First_Variable_Right_Line_Current_Month_Data_Set);
      }
      else if (this.secondTabLineGroup.selectedIndex == 1) {
        this.createSecondLineChart_Last_Month(this.First_Variable_Right_Line_Last_Month_Selected_Labels,
          this.First_Variable_Right_Line_Last_Month_Data_Set);
      }
    }
    else if (this.secondtabGroup.selectedIndex == 1) {
      this.createSecondTabBarChart_Current_Month(this.Second_Variable_Right_Bar_Selected_Operators,
        this.Second_Variable_Right_Bar_Data_Set);

      if (this.secondTabLineGroup.selectedIndex == 0) {
        this.createSecondLineChart_Current_Month(this.Second_Variable_Right_Line_Current_Month_Selected_Labels,
          this.Second_Variable_Right_Line_Current_Month_Data_Set);
      }
      else if (this.secondTabLineGroup.selectedIndex == 1) {
        this.createSecondLineChart_Last_Month(this.Second_Variable_Right_Line_Last_Month_Selected_Labels,
          this.Second_Variable_Right_Line_Last_Month_Data_Set);
      }
    }

    this.updateCompareTab();
  }

  updateLeftLineChart() {
    if (this.firsttabGroup.selectedIndex == 0) {
      if (this.firstTabLineGroup.selectedIndex == 0) {
        this.createFirstLineChart_Current_Month(this.First_Variable_Left_Line_Current_Month_Selected_Labels,
          this.First_Variable_Left_Line_Current_Month_Data_Set);
      }
      else if (this.firstTabLineGroup.selectedIndex == 1) {
        this.createFirstLineChart_Last_Month(this.First_Variable_Left_Line_Last_Month_Selected_Labels,
          this.First_Variable_Left_Line_Last_Month_Data_Set);
      }
    }
    else if (this.firsttabGroup.selectedIndex == 1) {
      if (this.firstTabLineGroup.selectedIndex == 0) {
        this.createFirstLineChart_Current_Month(this.Second_Variable_Left_Line_Current_Month_Selected_Labels,
          this.Second_Variable_Left_Line_Current_Month_Data_Set);
      }
      else if (this.firstTabLineGroup.selectedIndex == 1) {
        this.createFirstLineChart_Last_Month(this.Second_Variable_Left_Line_Last_Month_Selected_Labels,
          this.Second_Variable_Left_Line_Last_Month_Data_Set);
      }
    }
  }

  updateRightLineChart() {
    if (this.secondtabGroup.selectedIndex == 0) {
      
      if (this.secondTabLineGroup.selectedIndex == 0) {
        this.createSecondLineChart_Current_Month(this.First_Variable_Right_Line_Current_Month_Selected_Labels,
          this.First_Variable_Right_Line_Current_Month_Data_Set);
      }
      else if (this.secondTabLineGroup.selectedIndex == 1) {
        this.createSecondLineChart_Last_Month(this.First_Variable_Right_Line_Last_Month_Selected_Labels,
          this.First_Variable_Right_Line_Last_Month_Data_Set);
      }
    }
    else if (this.secondtabGroup.selectedIndex == 1) {
      
      if (this.secondTabLineGroup.selectedIndex == 0) {
        this.createSecondLineChart_Current_Month(this.Second_Variable_Right_Line_Current_Month_Selected_Labels,
          this.Second_Variable_Right_Line_Current_Month_Data_Set);
      }
      else if (this.secondTabLineGroup.selectedIndex == 1) {
        this.createSecondLineChart_Last_Month(this.Second_Variable_Right_Line_Last_Month_Selected_Labels,
          this.Second_Variable_Right_Line_Last_Month_Data_Set);
      }
    }
  }

  updateCompareTab() {
    if (this.compareTabLineGroup.selectedIndex == 0) {
      if (this.firsttabGroup.selectedIndex == 0)
      {
        if (this.secondtabGroup.selectedIndex == 0) {
          this.createCompareLineChart_Current_Month(
            this.First_Variable_Left_Line_Current_Month_Selected_Labels,
            this.First_Variable_Left_Line_Current_Month_Data_Set,
            this.First_Variable_Right_Line_Current_Month_Data_Set);
        }
        else if (this.secondtabGroup.selectedIndex == 1) {
          this.createCompareLineChart_Current_Month(
            this.First_Variable_Left_Line_Current_Month_Selected_Labels,
            this.First_Variable_Left_Line_Current_Month_Data_Set,
            this.Second_Variable_Right_Line_Current_Month_Data_Set);
        }
      }
      else if (this.firsttabGroup.selectedIndex == 1)
      {
        if (this.secondtabGroup.selectedIndex == 0) {
          this.createCompareLineChart_Current_Month(
            this.Second_Variable_Left_Line_Current_Month_Selected_Labels,
            this.Second_Variable_Left_Line_Current_Month_Data_Set,
            this.First_Variable_Right_Line_Current_Month_Data_Set);
        }
        else if (this.secondtabGroup.selectedIndex == 1) {
          this.createCompareLineChart_Current_Month(
            this.Second_Variable_Left_Line_Current_Month_Selected_Labels,
            this.Second_Variable_Left_Line_Current_Month_Data_Set,
            this.Second_Variable_Right_Line_Current_Month_Data_Set);
        }
      }
    }
    else if (this.compareTabLineGroup.selectedIndex == 1) {
      if (this.firsttabGroup.selectedIndex == 0) {
        if (this.secondtabGroup.selectedIndex == 0) {
          this.createCompareLineChart_Last_Month(
            this.First_Variable_Left_Line_Last_Month_Selected_Labels,
            this.First_Variable_Left_Line_Last_Month_Data_Set,
            this.First_Variable_Right_Line_Last_Month_Data_Set);
        }
        else if (this.secondtabGroup.selectedIndex == 1) {
          this.createCompareLineChart_Last_Month(
            this.First_Variable_Left_Line_Last_Month_Selected_Labels,
            this.First_Variable_Left_Line_Last_Month_Data_Set,
            this.Second_Variable_Right_Line_Last_Month_Data_Set);
        }
      }
      else if (this.firsttabGroup.selectedIndex == 1) {
        if (this.secondtabGroup.selectedIndex == 0) {
          this.createCompareLineChart_Last_Month(
            this.Second_Variable_Left_Line_Last_Month_Selected_Labels,
            this.Second_Variable_Left_Line_Last_Month_Data_Set,
            this.First_Variable_Right_Line_Last_Month_Data_Set);
        }
        else if (this.secondtabGroup.selectedIndex == 1) {
          this.createCompareLineChart_Last_Month(
            this.Second_Variable_Left_Line_Last_Month_Selected_Labels,
            this.Second_Variable_Left_Line_Last_Month_Data_Set,
            this.Second_Variable_Right_Line_Last_Month_Data_Set);
        }
      }
    }
  }

  compareLineChart_Tab_Change(tabChangeEvent: MatTabChangeEvent): void {
    this.updateCompareTab();
  }

  firstLineChart_Tab_Change(tabChangeEvent: MatTabChangeEvent): void {
    this.updateLeftLineChart();
  }

  secondLineChart_Tab_Change(tabChangeEvent: MatTabChangeEvent): void {
    this.updateRightLineChart();
  }
  
  constructor() {}
}
