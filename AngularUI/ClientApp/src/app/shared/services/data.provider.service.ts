import { Injectable, Inject } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BaseService } from './base.service'
import { LoginModel } from '../models/user.login.interface'
import { UserViewModel } from '../models/user.viewmodel.inteface'
import { UserRegistration } from '../models/user.registration.interface'
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { TokenModel } from '../models/user.auth.token.interface';
import { DataReciverSingle } from '../models/data.reciver.single';
import { CSSR_Result_ViewModel } from '../models/cssr.result';
import { TCH_ASR_Result_ViewModel } from '../models/tch.asr.result.interface';
import { Line_Chart_ViewModel } from '../models/line.chart.view.model.interface';
import { Gauge_Chart_ViewModel } from '../models/gauge.chart.view.model';


@Injectable({
  providedIn: 'root',
})
export class DataProviderService extends BaseService {

  private base_Data_Provider_api_URL: string;
  private base_Login_api_URL: string;
  private error;


  constructor(private http: HttpClient, @Inject('BASE_URL') private baseUrl: string) {
    super();
    this.base_Data_Provider_api_URL = this.baseUrl + 'api/ApiDataProvider';
    this.base_Login_api_URL = this.baseUrl + 'api/ApiAuthentication';

  }

  public getCSSR(operators: Array<number>,
    technologies: Array<number>,
    fromDateInput: Date,
    toDateInput: Date): any {
    let data = <DataReciverSingle>
    {
      operators: operators,
      technologies: technologies,
      fromDate: fromDateInput,
      toDate: toDateInput
    };

    let sum_request = 0;
    let sum_response = 0;
    
    this.http.post<any>(this.base_Data_Provider_api_URL + '/GetCSSR', data).subscribe(
      (result: Array<CSSR_Result_ViewModel>) => {
        result.forEach((item) => {
          sum_request += item.mM_CMServiceRequest;
            sum_response += item.ranaP_RABAssignment_Response;
          }
        );
      }
    );

    return ((sum_response / sum_request) * 100);
  }

  public getCSSR_Current_Month(operators: Array<number>,
    technologies: Array<number>,
    fromDateInput: Date,
    toDateInput: Date): any {
    let data = <DataReciverSingle>
    {
      operators: operators,
      technologies: technologies,
      fromDate: fromDateInput,
      toDate: toDateInput
    };

    return this.http.post<number>(this.base_Data_Provider_api_URL + '/getCSSR_Current_Month', data);
  }
  
  public getCSSR_For_Line_Current_Month(operators: Array<number>,
    technologies: Array<number>,
    fromDateInput: Date,
    toDateInput: Date): any {
    let data = <DataReciverSingle>
    {
      operators: operators,
      technologies: technologies,
      fromDate: fromDateInput,
      toDate: toDateInput
    };

    return this.http.post(this.base_Data_Provider_api_URL + '/getCSSR_For_Line_Current_Month', data);
  }


  public getCSSR_For_Line_Last_Month(operators: Array<number>,
    technologies: Array<number>,
    fromDateInput: Date,
    toDateInput: Date): any {
    let data = <DataReciverSingle>
    {
      operators: operators,
      technologies: technologies,
      fromDate: fromDateInput,
      toDate: toDateInput
    };

    return this.http.post(this.base_Data_Provider_api_URL + '/getCSSR_For_Line_Last_Month', data);
  }

  public getTCH_ASR(operators: Array<number>,
    technologies: Array<number>,
    fromDateInput: Date,
    toDateInput: Date): any {
    let data = <DataReciverSingle>
    {
      operators: operators,
      technologies: technologies,
      fromDate: fromDateInput,
      toDate: toDateInput
      };

    let sum_request = 0;
    let sum_response = 0;

    this.http.post<any>(this.base_Data_Provider_api_URL + '/GetTCH_ASR', data).subscribe(
      (result: Array<TCH_ASR_Result_ViewModel>) => {
        result.forEach((item) => {
            sum_request += item.ranaP_RABAssignment_Request;
            sum_response += item.ranaP_RABAssignment_Response;
          }
        );
      }
    );

    return ((sum_response / sum_request) * 100);
  }
  
  public getTCH_ASR_Current_Month(operators: Array<number>,
    technologies: Array<number>,
    fromDateInput: Date,
    toDateInput: Date): any {
    let data = <DataReciverSingle>
    {
      operators: operators,
      technologies: technologies,
      fromDate: fromDateInput,
      toDate: toDateInput
    };

    return this.http.post<number>(this.base_Data_Provider_api_URL + '/getTCH_ASR_Current_Month', data);
  }
  
  public getTCH_ASR_Last_Month(operators: Array<number>,
    technologies: Array<number>,
    fromDateInput: Date,
    toDateInput: Date): any {
    let data = <DataReciverSingle>
    {
      operators: operators,
      technologies: technologies,
      fromDate: fromDateInput,
      toDate: toDateInput
    };

    return this.http.post<number>(this.base_Data_Provider_api_URL + '/getTCH_ASR_Last_Month', data);
  }

  public getTCH_ASR_For_Line_Current_Month(operators: Array<number>,
    technologies: Array<number>,
    fromDateInput: Date,
    toDateInput: Date): any {
    let data = <DataReciverSingle>
    {
      operators: operators,
      technologies: technologies,
      fromDate: fromDateInput,
      toDate: toDateInput
    };

    return this.http.post(this.base_Data_Provider_api_URL + '/getTCH_ASR_For_Line_Current_Month', data);
  }

  public getTCH_ASR_For_Line_Last_Month(operators: Array<number>,
    technologies: Array<number>,
    fromDateInput: Date,
    toDateInput: Date): any {
    let data = <DataReciverSingle>
    {
      operators: operators,
      technologies: technologies,
      fromDate: fromDateInput,
      toDate: toDateInput
    };

    return this.http.post(this.base_Data_Provider_api_URL + '/getTCH_ASR_For_Line_Last_Month', data);
  }

  public getSDCCH_DR(operators: Array<number>,
    technologies: Array<number>,
    fromDateInput: Date,
    toDateInput: Date): any {
    let data = <DataReciverSingle>
      {
        operators: operators,
        technologies: technologies,
        fromDate: fromDateInput,
        toDate: toDateInput
      };

    let sum_data = 0;
    let sum_weight = 0;

    this.http.post<any>(this.base_Data_Provider_api_URL + '/GetSDCCH_DR', data).subscribe(
      (result: Array<Gauge_Chart_ViewModel>) => {
        result.forEach((item) => {
            sum_data += (item.data * item.weight);
            sum_weight += item.weight;
        }
        );
      }
    );

    return ((sum_data / sum_weight) * 100);
  }

  public getSDCCH_DR_Current_Month(operators: Array<number>,
    technologies: Array<number>,
    fromDateInput: Date,
    toDateInput: Date): any {
    let data = <DataReciverSingle>
      {
        operators: operators,
        technologies: technologies,
        fromDate: fromDateInput,
        toDate: toDateInput
      };

    return this.http.post<number>(this.base_Data_Provider_api_URL + '/getSDCCH_DR_Current_Month', data);
  }

  public getSDCCH_DR_Last_Month(operators: Array<number>,
    technologies: Array<number>,
    fromDateInput: Date,
    toDateInput: Date): any {
    let data = <DataReciverSingle>
      {
        operators: operators,
        technologies: technologies,
        fromDate: fromDateInput,
        toDate: toDateInput
      };

    return this.http.post<number>(this.base_Data_Provider_api_URL + '/getSDCCH_DR_Last_Month', data);
  }

  public getSDCCH_DR_For_Line_Current_Month(operators: Array<number>,
    technologies: Array<number>,
    fromDateInput: Date,
    toDateInput: Date): any {
    let data = <DataReciverSingle>
      {
        operators: operators,
        technologies: technologies,
        fromDate: fromDateInput,
        toDate: toDateInput
      };

    return this.http.post(this.base_Data_Provider_api_URL + '/getSDCCH_DR_For_Line_Current_Month', data);
  }


  public getSDCCH_DR_For_Line_Last_Month(operators: Array<number>,
    technologies: Array<number>,
    fromDateInput: Date,
    toDateInput: Date): any {
    let data = <DataReciverSingle>
    {
      operators: operators,
      technologies: technologies,
      fromDate: fromDateInput,
      toDate: toDateInput
    };

    return this.http.post(this.base_Data_Provider_api_URL + '/getSDCCH_DR_For_Line_Last_Month', data);
  }
  //-----------------------------------------------------------------------------------------------
  public getCS_IRAT_HOSR(operators: Array<number>,
    technologies: Array<number>,
    fromDateInput: Date,
    toDateInput: Date): any {
    let data = <DataReciverSingle>
      {
        operators: operators,
        technologies: technologies,
        fromDate: fromDateInput,
        toDate: toDateInput
      };

    let sum_data = 0;
    let sum_weight = 0;

    this.http.post<any>(this.base_Data_Provider_api_URL + '/GetCS_IRAT_HOSR', data).subscribe(
      (result: Array<Gauge_Chart_ViewModel>) => {
        result.forEach((item) => {
          sum_data += (item.data * item.weight);
          sum_weight += item.weight;
        }
        );
      }
    );

    return ((sum_data / sum_weight) * 100);
  }

  public getCS_IRAT_HOSR_Current_Month(operators: Array<number>,
    technologies: Array<number>,
    fromDateInput: Date,
    toDateInput: Date): any {
    let data = <DataReciverSingle>
      {
        operators: operators,
        technologies: technologies,
        fromDate: fromDateInput,
        toDate: toDateInput
      };

    return this.http.post<number>(this.base_Data_Provider_api_URL + '/getCS_IRAT_HOSR_Current_Month', data);
  }

  public getCS_IRAT_HOSR_Last_Month(operators: Array<number>,
    technologies: Array<number>,
    fromDateInput: Date,
    toDateInput: Date): any {
    let data = <DataReciverSingle>
      {
        operators: operators,
        technologies: technologies,
        fromDate: fromDateInput,
        toDate: toDateInput
      };

    return this.http.post<number>(this.base_Data_Provider_api_URL + '/getCS_IRAT_HOSR_Last_Month', data);
  }

  public getCS_IRAT_HOSR_For_Line_Current_Month(operators: Array<number>,
    technologies: Array<number>,
    fromDateInput: Date,
    toDateInput: Date): any {
    let data = <DataReciverSingle>
      {
        operators: operators,
        technologies: technologies,
        fromDate: fromDateInput,
        toDate: toDateInput
      };

    return this.http.post(this.base_Data_Provider_api_URL + '/getCS_IRAT_HOSR_For_Line_Current_Month', data);
  }

  public getCS_IRAT_HOSR_For_Line_Last_Month(operators: Array<number>,
    technologies: Array<number>,
    fromDateInput: Date,
    toDateInput: Date): any {
    let data = <DataReciverSingle>
    {
      operators: operators,
      technologies: technologies,
      fromDate: fromDateInput,
      toDate: toDateInput
    };

    return this.http.post(this.base_Data_Provider_api_URL + '/getCS_IRAT_HOSR_For_Line_Last_Month', data);
  }

  //-----------------------------------------------------------------------------------------------
  public getRRC_CCSR(operators: Array<number>,
    technologies: Array<number>,
    fromDateInput: Date,
    toDateInput: Date): any {
    let data = <DataReciverSingle>
      {
        operators: operators,
        technologies: technologies,
        fromDate: fromDateInput,
        toDate: toDateInput
      };

    let sum_data = 0;
    let sum_weight = 0;

    this.http.post<any>(this.base_Data_Provider_api_URL + '/GetRRC_CCSR', data).subscribe(
      (result: Array<Gauge_Chart_ViewModel>) => {
        result.forEach((item) => {
          sum_data += (item.data * item.weight);
          sum_weight += item.weight;
        }
        );
      }
    );

    return ((sum_data / sum_weight) * 100);
  }

  public getRRC_CCSR_Current_Month(operators: Array<number>,
    technologies: Array<number>,
    fromDateInput: Date,
    toDateInput: Date): any {
    let data = <DataReciverSingle>
      {
        operators: operators,
        technologies: technologies,
        fromDate: fromDateInput,
        toDate: toDateInput
      };

    return this.http.post<number>(this.base_Data_Provider_api_URL + '/getRRC_CCSR_Current_Month', data);
  }

  public getRRC_CCSR_Last_Month(operators: Array<number>,
    technologies: Array<number>,
    fromDateInput: Date,
    toDateInput: Date): any {
    let data = <DataReciverSingle>
      {
        operators: operators,
        technologies: technologies,
        fromDate: fromDateInput,
        toDate: toDateInput
      };

    return this.http.post<number>(this.base_Data_Provider_api_URL + '/getRRC_CCSR_Last_Month', data);
  }

  public getRRC_CCSR_For_Line_Current_Month(operators: Array<number>,
    technologies: Array<number>,
    fromDateInput: Date,
    toDateInput: Date): any {
    let data = <DataReciverSingle>
      {
        operators: operators,
        technologies: technologies,
        fromDate: fromDateInput,
        toDate: toDateInput
      };

    return this.http.post(this.base_Data_Provider_api_URL + '/getRRC_CCSR_For_Line_Current_Month', data);
  }

  public getRRC_CCSR_For_Line_Last_Month(operators: Array<number>,
    technologies: Array<number>,
    fromDateInput: Date,
    toDateInput: Date): any {
    let data = <DataReciverSingle>
      {
        operators: operators,
        technologies: technologies,
        fromDate: fromDateInput,
        toDate: toDateInput
      };

    return this.http.post(this.base_Data_Provider_api_URL + '/getRRC_CCSR_For_Line_Last_Month', data);
  }

  //-----------------------------------------------------------------------------------------------
  public getRRC_CSSR(operators: Array<number>,
    technologies: Array<number>,
    fromDateInput: Date,
    toDateInput: Date): any {
    let data = <DataReciverSingle>
      {
        operators: operators,
        technologies: technologies,
        fromDate: fromDateInput,
        toDate: toDateInput
      };

    let sum_data = 0;
    let sum_weight = 0;

    this.http.post<any>(this.base_Data_Provider_api_URL + '/GetRRC_CSSR', data).subscribe(
      (result: Array<Gauge_Chart_ViewModel>) => {
        result.forEach((item) => {
          sum_data += (item.data * item.weight);
          sum_weight += item.weight;
        }
        );
      }
    );

    return ((sum_data / sum_weight) * 100);
  }

  public getRRC_CSSR_Current_Month(operators: Array<number>,
    technologies: Array<number>,
    fromDateInput: Date,
    toDateInput: Date): any {
    let data = <DataReciverSingle>
      {
        operators: operators,
        technologies: technologies,
        fromDate: fromDateInput,
        toDate: toDateInput
      };

    return this.http.post<number>(this.base_Data_Provider_api_URL + '/getRRC_CSSR_Current_Month', data);
  }

  public getRRC_CSSR_Last_Month(operators: Array<number>,
    technologies: Array<number>,
    fromDateInput: Date,
    toDateInput: Date): any {
    let data = <DataReciverSingle>
      {
        operators: operators,
        technologies: technologies,
        fromDate: fromDateInput,
        toDate: toDateInput
      };

    return this.http.post<number>(this.base_Data_Provider_api_URL + '/getRRC_CSSR_Last_Month', data);
  }

  public getRRC_CSSR_For_Line_Current_Month(operators: Array<number>,
    technologies: Array<number>,
    fromDateInput: Date,
    toDateInput: Date): any {
    let data = <DataReciverSingle>
      {
        operators: operators,
        technologies: technologies,
        fromDate: fromDateInput,
        toDate: toDateInput
      };

    return this.http.post(this.base_Data_Provider_api_URL + '/getRRC_CSSR_For_Line_Current_Month', data);
  }

  public getRRC_CSSR_For_Line_Last_Month(operators: Array<number>,
    technologies: Array<number>,
    fromDateInput: Date,
    toDateInput: Date): any {
    let data = <DataReciverSingle>
      {
        operators: operators,
        technologies: technologies,
        fromDate: fromDateInput,
        toDate: toDateInput
      };

    return this.http.post(this.base_Data_Provider_api_URL + '/getRRC_CSSR_For_Line_Last_Month', data);
  }
}
