import { Injectable, ViewEncapsulation } from '@angular/core';
import { ViewChild, Component, OnInit, ElementRef  } from '@angular/core';
import { Chart } from 'chart.js';
import { DataProviderService } from '../../shared/services/data.provider.service';
import { OperatorService } from "../../shared/services/Operator.Service"
import { TechnologyService } from "../../shared/services/Technology.Service"

import { OperatorModel } from 'src/app/shared/models/operator.model';
import { TechnologyModel } from 'src/app/shared/models/technology.viewmodel';
import { TCH_ASR_Result_ViewModel } from 'src/app/shared/models/tch.asr.result.interface';
import { ChartDataset } from 'src/app/shared/models/dataset.for.chart';
import { CSSR_Result_ViewModel } from 'src/app/shared/models/cssr.result';
import { Line_Chart_ViewModel } from 'src/app/shared/models/line.chart.view.model.interface';
import { MatTabChangeEvent } from '@angular/material';
import { Gauge_Chart_ViewModel } from 'src/app/shared/models/gauge.chart.view.model';

@Component({
  encapsulation: ViewEncapsulation.None,
  selector: 'app-home',
  templateUrl: './first-page.html',
  styleUrls: ['./first-page.scss']
})

@Injectable()
export class DashboardFirstPageComponent implements OnInit {

  @ViewChild('firsttabGroup') firsttabGroup;
  @ViewChild('secondtabGroup') secondtabGroup;

  @ViewChild('firstTabBarGroup') firstTabBarGroup;
  @ViewChild('secondTabBarGroup') secondTabBarGroup;

  @ViewChild('firstTabLineGroup') firstTabLineGroup;
  @ViewChild('compareTabLineGroup') compareTabLineGroup;
  @ViewChild('secondTabLineGroup') secondTabLineGroup;

  public checklist_Operators: any;
  checkedList_Operators: any;
  checkedList_Operators_Id: any;

  public checklist_Technology: any;
  checkedList_Technology: any;
  checkedList_Technology_Id: any;

  FirstTabBarChart_Current_Month: Chart;
  SecondTabBarChart_Current_Month: Chart;

  FirstLineChart_Current_Month: Chart;
  SecondLineChart_Current_Month: Chart;
  CompareLineChart_Current_Month: Chart;

  FirstLineChart_Last_Month: Chart;
  SecondLineChart_Last_Month: Chart;
  CompareLineChart_Last_Month: Chart;

  public date = new Date();
  public firstDay = new Date(this.date.getFullYear(), this.date.getMonth(), 1);
  public lastDay = new Date(this.date.getFullYear(), this.date.getMonth() + 1, 0);

  public selectedMoments = [
    this.firstDay,
    this.lastDay
  ];

  public First_2_variable_Label = ["CSSR","SDCCH Drop Rate"];
  public Second_2_variable_Label = ["TCH ASR", "CS IRAT HOSR"];

  public First_Selected_Label = "";
  public Second_Selected_Label = "";

  public First_Selected_Bar_Data = [];
  public Second_Selected_Bar_Data = [];
  
  firstGaugeChart_Tab_Change(tabChangeEvent: MatTabChangeEvent): void {

    this.loadFirstTab();

  }

  loadFirstTab() {

    if (this.firsttabGroup.selectedIndex == 0) {
      this.loadFirstGauge_FirstElement_Select();
    }
    else if (this.firsttabGroup.selectedIndex == 1) {
      this.loadFirstGauge_SecondElement_Select();
    }

    this.First_Selected_Label = this.First_2_variable_Label[this.firsttabGroup.selectedIndex];
  }

  loadFirstGauge_FirstElement_Select() {

    this.getChecked_OperatorItemList();
    this.getChecked_TechnologyItemList();

    this.loadCSSR_Current_Month(this.checkedList_Operators_Id, this.checkedList_Technology_Id,
      this.selectedMoments[0], this.selectedMoments[1]);

    this.loadCSSR_For_Line_Current_Month(this.checkedList_Operators_Id, this.checkedList_Technology_Id,
      this.selectedMoments[0], this.selectedMoments[1]);

    this.loadCSSR_For_Line_Last_Month(this.checkedList_Operators_Id, this.checkedList_Technology_Id,
      this.selectedMoments[0], this.selectedMoments[1]);
  }

  loadFirstGauge_SecondElement_Select() {

    this.getChecked_OperatorItemList();
    this.getChecked_TechnologyItemList();

    this.loadSDCCH_DR_Current_Month(this.checkedList_Operators_Id, this.checkedList_Technology_Id,
      this.selectedMoments[0], this.selectedMoments[1]);

    this.loadSDCCH_DR_For_Line_Current_Month(this.checkedList_Operators_Id, this.checkedList_Technology_Id,
      this.selectedMoments[0], this.selectedMoments[1]);

    this.loadSDCCH_DR_For_Line_Last_Month(this.checkedList_Operators_Id, this.checkedList_Technology_Id,
      this.selectedMoments[0], this.selectedMoments[1]);
  }

  secondGaugeChart_Tab_Change(tabChangeEvent: MatTabChangeEvent): void {

    this.loadSecondTab();

  }

  loadSecondTab() {

    if (this.secondtabGroup.selectedIndex == 0) {
      this.loadSecondGauge_FirstElement_Select();
    }
    else if (this.secondtabGroup.selectedIndex == 1) {
      this.loadSecondGauge_SecondElement_Select();
    }

    this.Second_Selected_Label = this.Second_2_variable_Label[this.secondtabGroup.selectedIndex];
  }

  loadSecondGauge_FirstElement_Select() {

    this.getChecked_OperatorItemList();
    this.getChecked_TechnologyItemList();

    this.loadTCH_ASR_Current_Month(this.checkedList_Operators_Id, this.checkedList_Technology_Id,
      this.selectedMoments[0], this.selectedMoments[1]);

    this.loadTCH_ASR_For_Line_Current_Month(this.checkedList_Operators_Id, this.checkedList_Technology_Id,
      this.selectedMoments[0], this.selectedMoments[1]);

    this.loadTCH_ASR_For_Line_Last_Month(this.checkedList_Operators_Id, this.checkedList_Technology_Id,
      this.selectedMoments[0], this.selectedMoments[1]);
  }

  loadSecondGauge_SecondElement_Select() {

    this.getChecked_OperatorItemList();
    this.getChecked_TechnologyItemList();

    this.loadCS_IRAT_HOSR_Current_Month(this.checkedList_Operators_Id, this.checkedList_Technology_Id,
      this.selectedMoments[0], this.selectedMoments[1]);

    this.loadCS_IRAT_HOSR_For_Line_Current_Month(this.checkedList_Operators_Id, this.checkedList_Technology_Id,
      this.selectedMoments[0], this.selectedMoments[1]);

    this.loadCS_IRAT_HOSR_For_Line_Last_Month(this.checkedList_Operators_Id, this.checkedList_Technology_Id,
      this.selectedMoments[0], this.selectedMoments[1]);
  }

  public CSSR_Gauge_needle_value = 0;
  public SDCCH_DR_Gauge_needle_value = 0;
  public TCH_ASR_Gauge_needle_value = 0;
  public CS_IRAT_HOSR_Gauge_needle_value = 0;
   
  constructor(
    private dataProviderService: DataProviderService,
    private operatorService: OperatorService,
    private technologyService: TechnologyService) {

    this.loadOperators();
    this.loadTechnologies();
  }

  loadOperators() {

    this.operatorService.loadOperators().subscribe(result => {
        this.checklist_Operators = [];

        result.forEach(
          (myObject: OperatorModel) => {
            if (myObject.title) {
              this.checklist_Operators.push(
                { id: myObject.id, value: myObject.title, isSelected: true }
              );
            }
          }
        );

      this.getChecked_OperatorItemList();

      if (this.checklist_Technology) {
        this.loadCurrentMonthdata();

      }

      },
      error => {
        console.log(error);
      });
  }
  
  loadTechnologies() {

    this.technologyService.loadTechnologies().subscribe(result => {
      this.checklist_Technology = [];

        result.forEach(
          (myObject: TechnologyModel) => {
            if (myObject.title) {
              this.checklist_Technology.push(
                { id: myObject.id, value: myObject.title, isSelected: true }
              );
            }
          }
        );

        this.getChecked_TechnologyItemList();

        if (this.checklist_Operators) {
          this.loadCurrentMonthdata();

        }
      },
      error => {
        console.log(error);
      });
  }

  filterChnage() {
    this.getChecked_TechnologyItemList();
    this.getChecked_OperatorItemList();

    this.loadCurrentMonthdata();
  }

  getChecked_TechnologyItemList() {
    this.checkedList_Technology_Id = [];
    for (var i = 0; i < this.checklist_Technology.length; i++) {
      if (this.checklist_Technology[i].isSelected)
        this.checkedList_Technology_Id.push(this.checklist_Technology[i].id);
    }
  }
  
  getChecked_OperatorItemList() {
    this.checkedList_Operators_Id = [];
    for (var i = 0; i < this.checklist_Operators.length; i++) {
      if (this.checklist_Operators[i].isSelected)
        this.checkedList_Operators_Id.push(this.checklist_Operators[i].id);
    }
  }

  ngOnInit() {
  }
  
  ngAfterViewInit() {
  }

  loadCurrentMonthdata() {
    this.loadFirstTab();
    this.loadSecondTab();
  }

  loadLastMonth() {
    this.getChecked_OperatorItemList();
    this.getChecked_TechnologyItemList();
  }
  
  loadCSSR_Current_Month(operators: Array<number>, technologies: Array<number>
    , fromDateInput: Date, toDateInput: Date) {


    this.dataProviderService.getCSSR_Current_Month(operators, technologies, fromDateInput, toDateInput).subscribe(

      (result: Array<CSSR_Result_ViewModel>) => {
        let selected_operators = [];
        let selected_datasets = [];
        let sum_request = 0;
        let sum_response = 0;
        let technology_name = '';
        let counter = 0;
        let color = ['rgba(255, 99, 132, 0.6)', 'rgba(54, 162, 235, 0.6)', 'rgba(255, 206, 86, 0.6)'];

        result.forEach((item) => {

          sum_request += item.mM_CMServiceRequest;
          sum_response += item.ranaP_RABAssignment_Response;

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

              selected_datasets[i].data.push((item.ranaP_RABAssignment_Response / item.mM_CMServiceRequest) *
                100);
            }
          }

          if (finded == false) {
            let x =
            {
              label: technology_name,
              data: [((item.ranaP_RABAssignment_Response / item.mM_CMServiceRequest) * 100)],
              backgroundColor: color[counter]
            };
            counter++;
            selected_datasets.push(x);
          }

        }
        );

        this.CSSR_Gauge_needle_value = ((sum_response / sum_request) * 100);
        this.createFirstTabBarChart_Current_Month(selected_operators, selected_datasets);
      }
    );

  }

  loadCSSR_For_Line_Current_Month(operators: Array<number>, technologies: Array<number>
    , fromDateInput: Date, toDateInput: Date) {

    this.dataProviderService.getCSSR_For_Line_Current_Month(operators, technologies
      , fromDateInput, toDateInput).subscribe(
      (result: Array<Line_Chart_ViewModel>) => {
        let selected_labels = [];
        let selected_datasets = [];
        let counter = 0;
        let color = ['rgba(255, 99, 132, 0.6)', 'rgba(54, 162, 235, 0.6)', 'rgba(255, 206, 86, 0.6)'];

        let x =
        {
          label: this.First_2_variable_Label[0],
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

        this.createFirstLineChart_Current_Month(selected_labels, selected_datasets);
      }
    );

  }

  loadCSSR_For_Line_Last_Month(operators: Array<number>, technologies: Array<number>
    , fromDateInput: Date, toDateInput: Date) {

    this.dataProviderService.getCSSR_For_Line_Last_Month(operators, technologies, fromDateInput, toDateInput).subscribe(

      (result: Array<Line_Chart_ViewModel>) => {
        let selected_labels = [];
        let selected_datasets = [];
        let counter = 0;
        let color = ['rgba(255, 99, 132, 0.6)', 'rgba(54, 162, 235, 0.6)', 'rgba(255, 206, 86, 0.6)'];

        let x =
        {
          label: this.First_2_variable_Label[0],
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

        this.createFirstLineChart_Last_Month(selected_labels, selected_datasets);
      }
    );

  }

  loadSDCCH_DR_Current_Month(operators: Array<number>, technologies: Array<number>
    , fromDateInput: Date, toDateInput: Date) {


    this.dataProviderService.getSDCCH_DR_Current_Month(operators, technologies, fromDateInput, toDateInput).subscribe(

      (result: Array<Gauge_Chart_ViewModel>) => {
        let selected_operators = [];
        let selected_datasets = [];
        let sum_data = 0;
        let sum_weight = 0;
        let technology_name = '';
        let counter = 0;
        let color = ['rgba(255, 99, 132, 0.6)', 'rgba(54, 162, 235, 0.6)', 'rgba(255, 206, 86, 0.6)'];

        result.forEach((item) => {

            sum_data += (item.data * item.weight);
            sum_weight += item.weight;

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

              selected_datasets[i].data.push((item.data) * 100);
            }
          }

          if (finded == false) {
            let x =
            {
              label: technology_name,
              data: [((item.data) * 100)],
              backgroundColor: color[counter]
            };
            counter++;
            selected_datasets.push(x);
          }

        }
        );

        this.SDCCH_DR_Gauge_needle_value = ((sum_data / sum_weight) * 100);
        this.createFirstTabBarChart_Current_Month(selected_operators, selected_datasets);
      }
    );

  }

  loadSDCCH_DR_For_Line_Current_Month(operators: Array<number>, technologies: Array<number>
    , fromDateInput: Date, toDateInput: Date) {


    this.dataProviderService.getSDCCH_DR_For_Line_Current_Month(operators, technologies, fromDateInput, toDateInput).subscribe(

      (result: Array<Line_Chart_ViewModel>) => {
        let selected_labels = [];
        let selected_datasets = [];
        let counter = 0;
        let color = ['rgba(255, 99, 132, 0.6)', 'rgba(54, 162, 235, 0.6)', 'rgba(255, 206, 86, 0.6)'];

        let x =
        {
          label: this.First_2_variable_Label[1],
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

        this.createFirstLineChart_Current_Month(selected_labels, selected_datasets);
      }
    );

  }

  loadSDCCH_DR_For_Line_Last_Month(operators: Array<number>, technologies: Array<number>
    , fromDateInput: Date, toDateInput: Date) {


    this.dataProviderService.getSDCCH_DR_For_Line_Last_Month(operators, technologies, fromDateInput, toDateInput).subscribe(

      (result: Array<Line_Chart_ViewModel>) => {
        let selected_labels = [];
        let selected_datasets = [];
        let counter = 0;
        let color = ['rgba(255, 99, 132, 0.6)', 'rgba(54, 162, 235, 0.6)', 'rgba(255, 206, 86, 0.6)'];

        let x =
        {
          label: this.First_2_variable_Label[1],
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

        this.createFirstLineChart_Last_Month(selected_labels, selected_datasets);
      }
    );

  }

  loadCS_IRAT_HOSR_Current_Month(operators: Array<number>, technologies: Array<number>
    , fromDateInput: Date, toDateInput: Date) {


    this.dataProviderService.getCS_IRAT_HOSR_Current_Month(operators, technologies, fromDateInput, toDateInput).subscribe(

      (result: Array<Gauge_Chart_ViewModel>) => {
        let selected_operators = [];
        let selected_datasets = [];
        let sum_data = 0;
        let sum_weight = 0;
        let technology_name = '';
        let counter = 0;
        let color = ['rgba(255, 99, 132, 0.6)', 'rgba(54, 162, 235, 0.6)', 'rgba(255, 206, 86, 0.6)'];

        result.forEach((item) => {

          sum_data += (item.data * item.weight);
          sum_weight += item.weight;

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

              selected_datasets[i].data.push((item.data) * 100);
            }
          }

          if (finded == false) {
            let x =
            {
              label: technology_name,
              data: [((item.data) * 100)],
              backgroundColor: color[counter]
            };
            counter++;
            selected_datasets.push(x);
          }

        }
        );

        this.CS_IRAT_HOSR_Gauge_needle_value = ((sum_data / sum_weight) * 100);
        this.createSecondTabBarChart_Current_Month(selected_operators, selected_datasets);
      }
    );

  }

  loadCS_IRAT_HOSR_For_Line_Current_Month(operators: Array<number>, technologies: Array<number>
    , fromDateInput: Date, toDateInput: Date) {


    this.dataProviderService.getCS_IRAT_HOSR_For_Line_Current_Month(operators, technologies, fromDateInput, toDateInput).subscribe(

      (result: Array<Line_Chart_ViewModel>) => {
        let selected_labels = [];
        let selected_datasets = [];
        let counter = 1;
        let color = ['rgba(255, 99, 132, 0.6)', 'rgba(54, 162, 235, 0.6)', 'rgba(255, 206, 86, 0.6)'];

        let x =
        {
          label: this.Second_2_variable_Label[1],
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

        this.createSecondLineChart_Current_Month(selected_labels, selected_datasets);
      }
    );

  }

  loadCS_IRAT_HOSR_For_Line_Last_Month(operators: Array<number>, technologies: Array<number>
    , fromDateInput: Date, toDateInput: Date) {


    this.dataProviderService.getCS_IRAT_HOSR_For_Line_Last_Month(operators, technologies, fromDateInput, toDateInput).subscribe(

      (result: Array<Line_Chart_ViewModel>) => {
        let selected_labels = [];
        let selected_datasets = [];
        let counter = 1;
        let color = ['rgba(255, 99, 132, 0.6)', 'rgba(54, 162, 235, 0.6)', 'rgba(255, 206, 86, 0.6)'];

        let x =
        {
          label: this.Second_2_variable_Label[1],
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

        this.createSecondLineChart_Last_Month(selected_labels, selected_datasets);
      }
    );

  }

  loadTCH_ASR_For_Line_Current_Month(operators: Array<number>, technologies: Array<number>
    , fromDateInput: Date, toDateInput: Date) {


    this.dataProviderService.getTCH_ASR_For_Line_Current_Month(operators, technologies, fromDateInput, toDateInput).subscribe(

      (result: Array<Line_Chart_ViewModel>) => {
        let selected_labels = [];
        let selected_datasets = [];
        let counter = 1;
        let color = ['rgba(255, 99, 132, 0.6)', 'rgba(54, 162, 235, 0.6)', 'rgba(255, 206, 86, 0.6)'];

        let x =
        {
          label: 'TCH_ASR',
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

        this.createSecondLineChart_Current_Month(selected_labels, selected_datasets);
      }
    );

  }

  loadTCH_ASR_For_Line_Last_Month(operators: Array<number>, technologies: Array<number>
    , fromDateInput: Date, toDateInput: Date) {

    this.dataProviderService.getTCH_ASR_For_Line_Last_Month(operators, technologies
      , fromDateInput, toDateInput).subscribe(

      (result: Array<Line_Chart_ViewModel>) => {
        let selected_labels = [];
        let selected_datasets = [];
        let counter = 1;
        let color = ['rgba(255, 99, 132, 0.6)', 'rgba(54, 162, 235, 0.6)', 'rgba(255, 206, 86, 0.6)'];

        let x =
        {
          label: this.Second_2_variable_Label[0],
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

        this.createSecondLineChart_Last_Month(selected_labels, selected_datasets);
      }
    );

  }

  loadTCH_ASR_Current_Month(operators: Array<number>,
    technologies: Array<number>,
    fromDateInput: Date,
    toDateInput: Date) {
    
    this.dataProviderService.getTCH_ASR_Current_Month(operators, technologies, fromDateInput, toDateInput).subscribe(

      (result: Array<TCH_ASR_Result_ViewModel>) => {
        let selected_operators = [];
        let selected_datasets = [];
        let sum_request = 0;
        let sum_response = 0;
        let technology_name = '';
        let counter = 0;
        let color = ['rgba(255, 99, 132, 0.6)', 'rgba(54, 162, 235, 0.6)', 'rgba(255, 206, 86, 0.6)'];

        result.forEach((item) => {

          sum_request += item.ranaP_RABAssignment_Request;
          sum_response += item.ranaP_RABAssignment_Response;

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

                selected_datasets[i].data.push((item.ranaP_RABAssignment_Response / item.ranaP_RABAssignment_Request) *
                  100);
              }
            }

            if (finded == false) {
              let x =
              {
                label : technology_name,
                data: [((item.ranaP_RABAssignment_Response / item.ranaP_RABAssignment_Request) * 100)],
                backgroundColor: color[counter]
              };
              counter++;
              selected_datasets.push(x);
            }

          }
        );

        this.TCH_ASR_Gauge_needle_value = ((sum_response / sum_request) * 100);
        this.createSecondTabBarChart_Current_Month(selected_operators, selected_datasets);
      }
    );
  }

  createFirstLineChart_Current_Month(labels_value: any, dataset_value: any) {

    if (this.FirstLineChart_Current_Month
      && this.FirstLineChart_Current_Month.chart) {
      var ci = this.FirstLineChart_Current_Month.chart;

      ci.destroy();

    }

    this.FirstLineChart_Current_Month = new Chart('FirstLineChart_Current_Month',
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

    this.updateCompareLineChart_Current_Month();
    this.updateCompareLineChart_Last_Month();
  }

  createFirstLineChart_Last_Month(labels_value: any, dataset_value: any) {

    if (this.FirstLineChart_Last_Month
      && this.FirstLineChart_Last_Month.chart) {
      var ci = this.FirstLineChart_Last_Month.chart;

      ci.destroy();

    }

    this.FirstLineChart_Last_Month = new Chart('FirstLineChart_Last_Month',
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

    this.updateCompareLineChart_Current_Month();
    this.updateCompareLineChart_Last_Month();
  }

  createSecondLineChart_Current_Month(labels_value: any, dataset_value: any) {

    if (this.SecondLineChart_Current_Month
      && this.SecondLineChart_Current_Month.chart) {
      var ci = this.SecondLineChart_Current_Month.chart;

      ci.destroy();

    }

    this.SecondLineChart_Current_Month = new Chart('SecondLineChart_Current_Month',
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

    this.updateCompareLineChart_Current_Month();
    this.updateCompareLineChart_Last_Month();
  }

  createSecondLineChart_Last_Month(labels_value: any, dataset_value: any) {

    if (this.SecondLineChart_Last_Month
      && this.SecondLineChart_Last_Month.chart) {
      var ci = this.SecondLineChart_Last_Month.chart;

      ci.destroy();

    }

    this.SecondLineChart_Last_Month = new Chart('SecondLineChart_Last_Month',
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

    this.updateCompareLineChart_Current_Month();
    this.updateCompareLineChart_Last_Month();
  }

  updateCompareLineChart_Current_Month() {

    let labels_value = [];
    let dataset_value = [];

    if (this.FirstLineChart_Current_Month
      && this.FirstLineChart_Current_Month.chart) {
      var first_chart = this.FirstLineChart_Current_Month.chart;

      labels_value.push(first_chart.data.labels);
      dataset_value.push(first_chart.data.datasets[0]);
    }

    if (this.SecondLineChart_Current_Month
      && this.SecondLineChart_Current_Month.chart) {
      var second_chart = this.SecondLineChart_Current_Month.chart;

      labels_value.push(second_chart.data.labels);
      dataset_value.push(second_chart.data.datasets[0]);
    }
    

    if (this.CompareLineChart_Current_Month
      && this.CompareLineChart_Current_Month.chart) {
      var ci = this.CompareLineChart_Current_Month.chart;

      ci.destroy();

    }

    this.CompareLineChart_Current_Month = new Chart('CompareLineChart_Current_Month',
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

  updateCompareLineChart_Last_Month() {

    let labels_value = [];
    let dataset_value = [];

    if (this.FirstLineChart_Last_Month
      && this.FirstLineChart_Last_Month.chart) {
      var first_chart = this.FirstLineChart_Last_Month.chart;

      labels_value.push(first_chart.data.labels);
      dataset_value.push(first_chart.data.datasets[0]);
    }

    if (this.SecondLineChart_Last_Month
      && this.SecondLineChart_Last_Month.chart) {
      var second_chart = this.SecondLineChart_Last_Month.chart;

      labels_value.push(second_chart.data.labels);
      dataset_value.push(second_chart.data.datasets[0]);
    }


    if (this.CompareLineChart_Last_Month
      && this.CompareLineChart_Last_Month.chart) {
      var ci = this.CompareLineChart_Last_Month.chart;

      ci.destroy();

    }

    this.CompareLineChart_Last_Month = new Chart('CompareLineChart_Last_Month',
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

  compareLineChart_Tab_Change(tabChangeEvent: MatTabChangeEvent): void {

    this.updateCompareLineChart_Current_Month();
    this.updateCompareLineChart_Last_Month();
  }
  
  firstLineChart_Tab_Change(tabChangeEvent: MatTabChangeEvent): void {
    this.loadFirstTab();
  }

  secondLineChart_Tab_Change(tabChangeEvent: MatTabChangeEvent): void {
    this.loadSecondTab();
  }

  createSecondTabBarChart_Current_Month(operators: any, dataset_value: any) {

    if (this.SecondTabBarChart_Current_Month
      && this.SecondTabBarChart_Current_Month.chart) {
      var ci = this.SecondTabBarChart_Current_Month.chart;

      ci.destroy();

    }

    this.SecondTabBarChart_Current_Month = new Chart('SecondTabBarChart_Current_Month',
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
  
  createFirstTabBarChart_Current_Month(operators: any, dataset_value: any) {

    if (this.FirstTabBarChart_Current_Month
      && this.FirstTabBarChart_Current_Month.chart) {
      var ci = this.FirstTabBarChart_Current_Month.chart;

      ci.destroy();

    }

    this.FirstTabBarChart_Current_Month = new Chart('FirstTabBarChart_Current_Month',
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

  loadCSSR(operators: Array<number>, technologies: Array<number>
    , fromDateInput: Date, toDateInput: Date) {

    this.dataProviderService.getCSSR(operators, technologies
      , fromDateInput, toDateInput).subscribe((result: number) => {

        this.CSSR_Gauge_needle_value = (result * 100);

      }
    );
  }

  loadTCH_ASR(operators: Array<number>, technologies: Array<number>
    , fromDateInput: Date, toDateInput: Date) {

    this.dataProviderService.getTCH_ASR(operators, technologies
      , fromDateInput, toDateInput).subscribe((result: number) => {

        this.TCH_ASR_Gauge_needle_value = (result * 100);

      }
    );
  }
   
}
