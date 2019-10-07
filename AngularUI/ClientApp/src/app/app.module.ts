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
import { HttpModule } from '@angular/http';
import { JwtInterceptor } from './helpers/jwt.interceptor'
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { OwlRadioModule, OwlFormFieldModule, OwlInputModule, OwlAccordionModule, OwlInputMaskModule  } from 'owl-ng';
import { GaugeChartModule } from 'angular-gauge-chart';
import { ReactiveFormsModule } from '@angular/forms';
import { DemoMaterialModule } from './material-module';
import {
  MatButtonModule, MatNativeDateModule, MatIconModule,
  MatSidenavModule, MatListModule, MatToolbarModule } from '@angular/material';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTreeModule } from '@angular/material/tree';
import { TreeViewModule } from '@syncfusion/ej2-angular-navigations';
import { GaugesModule } from 'ng-canvas-gauges';

@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    HomeComponent,
    DashboardFirstPageComponent,
    CounterComponent,
    FetchDataComponent,
    GetUsersComponent,
    RegistrationFormComponent,
    LoginFormComponent,
    autoFocus
  ],
  exports: [autoFocus, MatButtonModule, MatToolbarModule, MatNativeDateModule,
    MatIconModule, MatSidenavModule, MatListModule],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,
    NgxSpinnerModule,
    HttpModule,
    ShowHidePasswordModule,
    NgxChartsModule,
    MatTabsModule,
    BrowserAnimationsModule,
    MatButtonModule, MatNativeDateModule, MatIconModule,
    MatSidenavModule, MatListModule, MatToolbarModule,
    OwlDateTimeModule, OwlNativeDateTimeModule, OwlInputMaskModule ,
    GaugeChartModule,
    OwlRadioModule, OwlFormFieldModule, OwlInputModule, OwlAccordionModule ,
    ReactiveFormsModule,
    MatTreeModule,
    GaugesModule,
    TreeViewModule,
    DemoMaterialModule,
    RouterModule.forRoot([
      { path: '', component: HomeComponent, pathMatch: 'full' },
      { path: 'counter', component: CounterComponent },
      { path: 'fetch-data', component: FetchDataComponent },
      { path: 'users/get', component: GetUsersComponent },
      { path: 'dashboard/firstpage', component: DashboardFirstPageComponent },
      { path: 'users/create', component: RegistrationFormComponent },
      { path: 'users/login', component: LoginFormComponent },
    ])
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
