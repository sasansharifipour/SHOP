import './polyfills';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { NgxSpinnerModule } from 'ngx-spinner';
import { AppComponent } from './app.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { HomeComponent } from './home/home.component';
import { CounterComponent } from './counter/counter.component';
import { FetchDataComponent } from './fetch-data/fetch-data.component';
import { GetUsersComponent } from './users/get-info/get.users.component';
import { RegistrationFormComponent } from './users/registration-form/registration-form.component';
import { autoFocus } from './auto.focus.directive';
import { ShowHidePasswordModule } from 'ngx-show-hide-password';
import { LoginFormComponent } from './users/login-form/login-form.component'
import { DashboardFirstPageComponent } from './Dashboard/First-Page/first-page'
import { DashboardSecondPageComponent } from './Dashboard/Second-Page/second-page'
import { HttpModule } from '@angular/http';
import { JwtInterceptor } from './helpers/jwt.interceptor'
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  OwlRadioModule, OwlDialogModule, OwlInputModule, OwlFanMenuModule, OwlClockModule ,
  OwlAccordionModule, OwlInputMaskModule, OwlNotifierModule, OwlRippleModule, OwlFormFieldModule 
} from 'owl-ng';
import { GaugeChartModule } from 'angular-gauge-chart';
import { ReactiveFormsModule } from '@angular/forms';
import { DemoMaterialModule } from './material-module';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';
import { TreeViewModule } from '@syncfusion/ej2-angular-navigations';
import { GaugesModule } from 'ng-canvas-gauges';
import { PortalModule } from '@angular/cdk/portal';
import { EditUserComponent } from './users/edit-user/edit.user.component';
import { DeleteUserComponent } from './users/delete-user-confirm/delete.user.component';
import { ChangeUserPasswordComponent } from './users/user-change-password/user.change.password.component';
import { InlineLoginFormComponent } from './users/inline-login-form/inline-login-form.component';
import { ShowDataComponent } from './Dashboard/Show-Data/Show-Data';

@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    HomeComponent,
    DashboardFirstPageComponent,
    DashboardSecondPageComponent,
    ShowDataComponent,
    CounterComponent,
    FetchDataComponent,
    GetUsersComponent,
    RegistrationFormComponent,
    LoginFormComponent,
    EditUserComponent,
    DeleteUserComponent,
    ChangeUserPasswordComponent,
    InlineLoginFormComponent,
    autoFocus
  ],
  exports: [autoFocus ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,
    NgxSpinnerModule,
    HttpModule,
    ShowHidePasswordModule,
    NgxChartsModule,
    BrowserAnimationsModule,
    OwlDateTimeModule, OwlNativeDateTimeModule, OwlInputMaskModule, OwlDialogModule, OwlFanMenuModule, OwlClockModule ,
    GaugeChartModule,
    OwlRadioModule, OwlFormFieldModule, OwlInputModule, OwlAccordionModule, OwlNotifierModule, OwlRippleModule ,
    ReactiveFormsModule,
    GaugesModule,
    PortalModule,
    TreeViewModule,
    DemoMaterialModule,
    RouterModule.forRoot([
      { path: '', component: HomeComponent, pathMatch: 'full' },
      { path: 'counter', component: CounterComponent },
      { path: 'fetch-data', component: FetchDataComponent },
      { path: 'users/get', component: GetUsersComponent },
      { path: 'dashboard/firstpage', component: DashboardFirstPageComponent },
      { path: 'dashboard/secondpage', component: DashboardSecondPageComponent },
      { path: 'users/create', component: RegistrationFormComponent },
      { path: 'users/edit', component: EditUserComponent },
      { path: 'users/changePassword', component: ChangeUserPasswordComponent },
      { path: 'users/delete', component: DeleteUserComponent },
      { path: 'users/login', component: LoginFormComponent },
      { path: 'users/inlinelogin', component: InlineLoginFormComponent },
    ])
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
  entryComponents: [
    RegistrationFormComponent
  ]
})
export class AppModule { }
