import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SelectDropDownModule } from 'ngx-select-dropdown';
import { NgxTypedJsModule } from 'ngx-typed-js';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';

import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/Auth/login/login.component';
// import { AuthGuardGuard } from './AuthGuards/auth-guard.guard';
import {InputNumberModule} from 'primeng/inputnumber';
import { ApiService } from './Services/api.service';
import { DashboardSidemenuComponent } from './components/commonModule/dashboard-sidemenu/dashboard-sidemenu.component';
import { FooterStyleOneComponent } from './components/commonModule/footer-style-one/footer-style-one.component';
import { NavbarStyleOneComponent } from './components/commonModule/navbar-style-one/navbar-style-one.component';
import { NavbarStyleTwoComponent } from './components/commonModule/navbar-style-two/navbar-style-two.component';
import { FooterStyleTwoComponent } from './components/commonModule/footer-style-two/footer-style-two.component';
import { CopyrightsComponent } from './components/commonModule/copyrights/copyrights.component';
import { DashboardNavbarComponent } from './components/commonModule/dashboard-navbar/dashboard-navbar.component';
import { DashboardMyProfileComponent } from './components/commonModule/dashboard-my-profile/dashboard-my-profile.component';
 
import { ToastModule } from 'primeng/toast';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { MessagesModule } from 'primeng/messages';
import { MessageModule } from 'primeng/message';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { DialogModule } from 'primeng/dialog';
import {InputTextModule} from 'primeng/inputtext';
import { AuthInterceptor } from './interceptor/auth.interceptor';
import { AgentComponent } from './components/Admin Module/forms/agent/agent.component';
import {TableModule} from 'primeng/table';
import { CompanyComponent } from './components/Admin Module/forms/company/company.component';
import { InsuranceComponent } from './components/Admin Module/forms/insurance/insurance.component';
import { PolicyComponent } from './components/Admin Module/forms/policy/policy.component';
import { PolicyTypeComponent } from './components/Admin Module/forms/policy-type/policy-type.component';
import { VallageComponent } from './components/Admin Module/forms/vallage/vallage.component';
import { VehicleTypeComponent } from './components/Admin Module/forms/vehicle-type/vehicle-type.component';
import { CalendarModule } from 'primeng/calendar';
import {KeyFilterModule} from 'primeng/keyfilter';
import { CommisionComponent } from './components/Admin Module/forms/commision/commision.component';
import { HomeComponent } from './components/website/home/home.component';

@NgModule({
  declarations: [
    AppComponent,
    FooterStyleOneComponent,
    NavbarStyleOneComponent,
    NavbarStyleTwoComponent,
    FooterStyleTwoComponent,
    DashboardSidemenuComponent,
    DashboardNavbarComponent,
    LoginComponent,
    CopyrightsComponent,
    DashboardMyProfileComponent,
    AgentComponent,
    CompanyComponent,
    InsuranceComponent,
    PolicyComponent,
    PolicyTypeComponent,
    VallageComponent,
    VehicleTypeComponent,
    CommisionComponent,
    HomeComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    SelectDropDownModule,
    NgxTypedJsModule,
    ReactiveFormsModule,
    FormsModule,
    NgxPaginationModule,
    HttpClientModule,
    ToastModule ,
    ConfirmDialogModule,
    MessagesModule,
    MessageModule,
    ButtonModule,
    RippleModule,
    DialogModule,
    TableModule,
    InputTextModule,
    InputNumberModule,
    CalendarModule,
    KeyFilterModule,
    InputNumberModule,
    CarouselModule
  ],
  providers: [ MessageService,ConfirmationService 
    ,{ provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },],
  bootstrap: [AppComponent]
})
export class AppModule { }
