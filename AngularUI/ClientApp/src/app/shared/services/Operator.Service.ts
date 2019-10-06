import { BaseService } from "./base.service";
import { HttpClient } from "@angular/common/http";
import { Inject, Injectable } from "@angular/core";
import { OperatorModel } from "../models/operator.model"

@Injectable({
  providedIn: 'root',
})

export class OperatorService extends BaseService {

  private base_Operator_api_URL: string;

  constructor(private http: HttpClient, @Inject('BASE_URL') private baseUrl: string) {
    super();

    this.base_Operator_api_URL = this.baseUrl + 'api/ApiOperator';
  }

  public loadOperators(): any {
    return this.http.get<OperatorModel[]>(this.base_Operator_api_URL);
  }
}
