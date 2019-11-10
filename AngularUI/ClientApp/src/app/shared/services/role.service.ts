import { Injectable, Inject } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { BaseService } from './base.service'
import { RoleViewModel } from '../models/role.viewmodel.inteface';


@Injectable({
  providedIn: 'root',
})

export class RoleService extends BaseService {

  private base_Role_api_URL: string;

  constructor(private http: HttpClient, @Inject('BASE_URL') private baseUrl: string) {
    super();
    this.base_Role_api_URL = this.baseUrl + 'api/ApiRoles';
  }

  public loadRoles(): any {
    return this.http.get<RoleViewModel[]>(this.base_Role_api_URL);
  }

  createRole(role: RoleViewModel): any {
    return this.http.post(this.base_Role_api_URL, role);
  }

  loadInfo(id: number): any {
    return this.http.get(this.base_Role_api_URL + '/' + id);
  }

  delete(id: number): any {
    return this.http.delete(this.base_Role_api_URL + '/' + id);
  }

  update(id: number, role: RoleViewModel): any {
    return this.http.put(this.base_Role_api_URL + '/' + id, role);
  }

}
