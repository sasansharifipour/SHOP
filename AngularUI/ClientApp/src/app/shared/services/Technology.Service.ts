import { BaseService } from "./base.service";
import { HttpClient } from "@angular/common/http";
import { Inject, Injectable } from "@angular/core";
import { TechnologyModel } from "../models/technology.viewmodel"

@Injectable({
  providedIn: 'root',
})

export class TechnologyService extends BaseService {

  private base_Technology_api_URL: string;

  constructor(private http: HttpClient
    , @Inject('BASE_URL') private baseUrl: string) {
    super();

    this.base_Technology_api_URL = this.baseUrl + 'api/ApiTechnology';
  }

  public loadTechnologies(): any {
    return this.http.get<TechnologyModel[]>(this.base_Technology_api_URL);
  }
}
