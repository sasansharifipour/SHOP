import { Injectable, ViewEncapsulation } from '@angular/core';
import { Component } from '@angular/core';
import { DataProviderService } from '../../shared/services/data.provider.service';
import { OperatorService } from "../../shared/services/Operator.Service"
import { TechnologyService } from "../../shared/services/Technology.Service"

import { OperatorModel } from 'src/app/shared/models/operator.model';
import { TechnologyModel } from 'src/app/shared/models/technology.viewmodel';
import { TCH_ASR_Result_ViewModel } from 'src/app/shared/models/tch.asr.result.interface';
import { CSSR_Result_ViewModel } from 'src/app/shared/models/cssr.result';
import { Line_Chart_ViewModel } from 'src/app/shared/models/line.chart.view.model.interface';
import { Gauge_Chart_ViewModel } from 'src/app/shared/models/gauge.chart.view.model';
import { Gauge_Result_ViewModel } from 'src/app/shared/models/Gauge.Result';

@Component({
  encapsulation: ViewEncapsulation.None,
  selector: 'app-home-second',
  templateUrl: './second-page.html',
  styleUrls: ['./second-page.scss']
})

@Injectable()
export class DashboardSecondPageComponent {

  public checklist_Operators: any;
  public checklist_Technology: any;

  checkedList_Operators_Id: any;
  checkedList_Technology_Id: any;

  public date = new Date();
  public firstDay = new Date(this.date.getFullYear(), this.date.getMonth(), 1);
  public lastDay = new Date(this.date.getFullYear(), this.date.getMonth() + 1, 0);

  public selectedMoments = [
    this.firstDay,
    this.lastDay
  ];

  First_Variable_Left_Gauge_Data: Array<Gauge_Result_ViewModel>;
  Second_Variable_Left_Gauge_Data: Array<Gauge_Result_ViewModel>;
  First_Variable_Right_Gauge_Data: Array<Gauge_Result_ViewModel>;
  Second_Variable_Right_Gauge_Data: Array<Gauge_Result_ViewModel>;

  First_Variable_Left_Line_Current_Month_Data: Array<Line_Chart_ViewModel>;
  Second_Variable_Left_Line_Current_Month_Data: Array<Line_Chart_ViewModel>;
  First_Variable_Right_Line_Current_Month_Data: Array<Line_Chart_ViewModel>;
  Second_Variable_Right_Line_Current_Month_Data: Array<Line_Chart_ViewModel>;

  First_Variable_Left_Line_Last_Month_Data: Array<Line_Chart_ViewModel>;
  Second_Variable_Left_Line_Last_Month_Data: Array<Line_Chart_ViewModel>;
  First_Variable_Right_Line_Last_Month_Data: Array<Line_Chart_ViewModel>;
  Second_Variable_Right_Line_Last_Month_Data: Array<Line_Chart_ViewModel>;

  loadRRC_CCSR_Current_Month(operators: Array<number>, technologies: Array<number>
    , fromDateInput: Date, toDateInput: Date) {

    let temp_data: Array<Gauge_Result_ViewModel> = [];

    this.dataProviderService.getRRC_CCSR_Current_Month(operators, technologies, fromDateInput, toDateInput).subscribe(

      (result: Array<Gauge_Chart_ViewModel>) => {

        result.forEach((item) => {

            let temp_item: Gauge_Result_ViewModel =
            {
              accurance_date: item.accurance_date,
              numerator: (item.data * item.weight),
              denominator: item.weight,
              operatorId: item.operatorId,
              technologyId: item.technologyId
            };

            temp_data.push(temp_item);

          }
        );

        this.First_Variable_Left_Gauge_Data = temp_data;
      }
    );

  }


  loadRRC_CCSR_For_Line_Current_Month(operators: Array<number>, technologies: Array<number>
    , fromDateInput: Date, toDateInput: Date) {

    this.dataProviderService.getRRC_CCSR_For_Line_Current_Month(operators, technologies
      , fromDateInput, toDateInput).subscribe(
      (result: Array<Line_Chart_ViewModel>) => {
        this.First_Variable_Left_Line_Current_Month_Data = result;
      }
    );

  }

  loadRRC_CCSR_For_Line_Last_Month(operators: Array<number>, technologies: Array<number>
    , fromDateInput: Date, toDateInput: Date) {

    this.dataProviderService.getRRC_CCSR_For_Line_Last_Month(operators, technologies, fromDateInput, toDateInput)
      .subscribe(
      (result: Array<Line_Chart_ViewModel>) => {
        this.First_Variable_Left_Line_Last_Month_Data = result;
      }
    );

  }

  loadSDCCH_DR_Current_Month(operators: Array<number>, technologies: Array<number>
    , fromDateInput: Date, toDateInput: Date) {

    let temp_data: Array<Gauge_Result_ViewModel> = [];

    this.dataProviderService.getSDCCH_DR_Current_Month(operators, technologies, fromDateInput, toDateInput).subscribe(

      (result: Array<Gauge_Chart_ViewModel>) => {
        
        result.forEach((item) => {
          
            let temp_item: Gauge_Result_ViewModel =
            {
              accurance_date: item.accurance_date,
              numerator: (item.data * item.weight),
              denominator: item.weight,
              operatorId: item.operatorId,
              technologyId: item.technologyId
            };

            temp_data.push(temp_item);
          
        }
        );

        this.Second_Variable_Left_Gauge_Data = temp_data;
      }
    );

  }

  loadTCH_ASR_Current_Month(operators: Array<number>,
    technologies: Array<number>,
    fromDateInput: Date,
    toDateInput: Date) {

    let temp_data: Array<Gauge_Result_ViewModel> = [];

    this.dataProviderService.getTCH_ASR_Current_Month(operators, technologies, fromDateInput, toDateInput).subscribe(

      (result: Array<TCH_ASR_Result_ViewModel>) => {
        
        result.forEach((item) => {

            let temp_item: Gauge_Result_ViewModel =
            {
              accurance_date: item.accurance_date,
              numerator: item.ranaP_RABAssignment_Response,
              denominator: item.ranaP_RABAssignment_Request,
              operatorId: item.operatorId,
              technologyId: item.technologyId
            };

            temp_data.push(temp_item);
          }
        );

        this.First_Variable_Right_Gauge_Data = temp_data;
      }
    );
  }

  loadCS_IRAT_HOSR_Current_Month(operators: Array<number>,
    technologies: Array<number>,
    fromDateInput: Date,
    toDateInput: Date) {

    let temp_data: Array<Gauge_Result_ViewModel> = [];

    this.dataProviderService.getCS_IRAT_HOSR_Current_Month(operators, technologies, fromDateInput, toDateInput)
      .subscribe(
        (result: Array<Gauge_Chart_ViewModel>) => {

          result.forEach((item) => {
              let temp_item: Gauge_Result_ViewModel =
              {
                accurance_date: item.accurance_date,
                numerator: (item.data * item.weight),
                denominator: item.weight,
                operatorId: item.operatorId,
                technologyId: item.technologyId
              };
              temp_data.push(temp_item);
            }
          );
          this.Second_Variable_Right_Gauge_Data = temp_data;
        }
      );
  }
  
  loadSDCCH_DR_For_Line_Current_Month(operators: Array<number>, technologies: Array<number>
    , fromDateInput: Date, toDateInput: Date) {

    this.dataProviderService.getSDCCH_DR_For_Line_Current_Month(operators, technologies, fromDateInput, toDateInput).subscribe(

      (result: Array<Line_Chart_ViewModel>) => {
        this.Second_Variable_Left_Line_Current_Month_Data = result;
      }
    );

  }
  
  loadTCH_ASR_For_Line_Current_Month(operators: Array<number>, technologies: Array<number>
    , fromDateInput: Date, toDateInput: Date) {

    this.dataProviderService.getTCH_ASR_For_Line_Current_Month(operators, technologies, fromDateInput, toDateInput).subscribe(

      (result: Array<Line_Chart_ViewModel>) => {

        this.First_Variable_Right_Line_Current_Month_Data = result;
      }
    );

  }

  loadCS_IRAT_HOSR_For_Line_Current_Month(operators: Array<number>, technologies: Array<number>
    , fromDateInput: Date, toDateInput: Date) {
    
    this.dataProviderService.getCS_IRAT_HOSR_For_Line_Current_Month(operators, technologies, fromDateInput, toDateInput).subscribe(

      (result: Array<Line_Chart_ViewModel>) => {
        this.Second_Variable_Right_Line_Current_Month_Data = result;
      }
    );

  }
  
  loadSDCCH_DR_For_Line_Last_Month(operators: Array<number>, technologies: Array<number>
    , fromDateInput: Date, toDateInput: Date) {

    this.dataProviderService.getSDCCH_DR_For_Line_Last_Month(operators, technologies, fromDateInput, toDateInput).subscribe(

      (result: Array<Line_Chart_ViewModel>) => {
        this.Second_Variable_Left_Line_Last_Month_Data = result;
      }
    );

  }

  loadTCH_ASR_For_Line_Last_Month(operators: Array<number>, technologies: Array<number>
    , fromDateInput: Date, toDateInput: Date) {

    this.dataProviderService.getTCH_ASR_For_Line_Last_Month(operators, technologies
      , fromDateInput, toDateInput).subscribe(

      (result: Array<Line_Chart_ViewModel>) => {
        this.First_Variable_Right_Line_Last_Month_Data = result;
      }
    );

  }

  loadCS_IRAT_HOSR_For_Line_Last_Month(operators: Array<number>, technologies: Array<number>
    , fromDateInput: Date, toDateInput: Date) {


    this.dataProviderService.getCS_IRAT_HOSR_For_Line_Last_Month(operators, technologies, fromDateInput, toDateInput).subscribe(

      (result: Array<Line_Chart_ViewModel>) => {
        this.Second_Variable_Right_Line_Last_Month_Data = result;
      }
    );

  }

  loadData() {

    this.loadFirstGauge_FirstElement_Select();
    this.loadFirstGauge_SecondElement_Select();
    this.loadSecondGauge_FirstElement_Select();
    this.loadSecondGauge_SecondElement_Select();
    
  }

  loadFirstGauge_FirstElement_Select() {

    this.getChecked_OperatorItemList();
    this.getChecked_TechnologyItemList();

    this.loadRRC_CCSR_Current_Month(this.checkedList_Operators_Id, this.checkedList_Technology_Id,
      this.selectedMoments[0], this.selectedMoments[1]);

    this.loadRRC_CCSR_For_Line_Current_Month(this.checkedList_Operators_Id, this.checkedList_Technology_Id,
      this.selectedMoments[0], this.selectedMoments[1]);

    this.loadRRC_CCSR_For_Line_Last_Month(this.checkedList_Operators_Id, this.checkedList_Technology_Id,
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
          this.loadData();
        }

      },
      error => {
        console.log('Second page line 405' + error);
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
          this.loadData();

        }
      },
      error => {
        console.log('Second page line 432' + error);
      });
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

  constructor(
    private dataProviderService: DataProviderService,
    private operatorService: OperatorService,
    private technologyService: TechnologyService) {

    this.loadOperators();
    this.loadTechnologies();
  }

  filterChnage() {
    this.getChecked_TechnologyItemList();
    this.getChecked_OperatorItemList();

    this.loadData();
  }
}
