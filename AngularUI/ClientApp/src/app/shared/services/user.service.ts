import { Injectable, Inject } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import { BaseService } from './base.service'
import { LoginModel } from '../models/user.login.interface'
import { UserViewModel } from '../models/user.viewmodel.inteface'
import { UserRegistration } from '../models/user.registration.interface'
import { Http, Response, Headers, RequestOptions  } from '@angular/http';
import { TokenModel } from '../models/user.auth.token.interface';
import { FindUserModel } from '../models/user.find.interface';


@Injectable({
  providedIn: 'root',
})

export class UserService extends BaseService {

  private base_User_api_URL: string;
  private base_Login_api_URL: string;
  private loggedIn = false;
  private currentUserTokenSubject: BehaviorSubject<string>;
  public currentUserToken: Observable<string>;
  private error;

  private _authNavStatusSource = new BehaviorSubject<boolean>(false);

  // Observable navItem stream
  authNavStatus$ = this._authNavStatusSource.asObservable();

  constructor(private http: HttpClient, @Inject('BASE_URL') private baseUrl: string) {
    super();
    this.base_User_api_URL = this.baseUrl + 'api/ApiUsers';
    this.base_Login_api_URL = this.baseUrl + 'api/ApiAuthentication';

    this.isLoggedIn();
  }

  public loadUsers(): any {
    return this.http.get<UserViewModel[]>(this.base_User_api_URL);
  }

  updateUser(user: UserRegistration): any {
    return this.http.post(this.base_User_api_URL + '/UpdateUser', user);
  }

  createUser(user: UserRegistration): any {
    return this.http.post(this.base_User_api_URL, user);
  }
  
  loadUserInfo(email: string): any {
    let data: FindUserModel = { username : email };

    return this.http.post(this.base_User_api_URL + '/UserInfo/', data);
  }

  logout() {
    localStorage.removeItem('auth_token');
    this.currentUserTokenSubject.next('');
    this.loggedIn = false;
    this._authNavStatusSource.next(false);
  }

  isLoggedIn() {
    this.loggedIn = !!localStorage.getItem('auth_token');
    this.currentUserTokenSubject = new BehaviorSubject<string>
      (localStorage.getItem('auth_token'));

    this.currentUserToken = this.currentUserTokenSubject.asObservable();

    if (this.loggedIn) {
      this._authNavStatusSource.next(true);
    }

    return this.loggedIn;
  }


  public currentUserTokenValue(): string {
    return this.currentUserTokenSubject.value;
  }

  login(login: LoginModel): Observable<boolean> {

    const resultObservable = new Observable<boolean>(observer => {
      this.http.post(this.base_Login_api_URL + '/login', login).subscribe(
        (result: TokenModel) => {
          if (result.access_token != '') {

            localStorage.setItem('auth_token', result.access_token);
            this.currentUserTokenSubject.next(result.access_token);
            this.loggedIn = true;
            this._authNavStatusSource.next(true);
            observer.next(true);
          }
          else {
            observer.next(false);
          }
        }, error => {
          observer.next(false);
        });
    });
    
    return resultObservable;    
  }
}
