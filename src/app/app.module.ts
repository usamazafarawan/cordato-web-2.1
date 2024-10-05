import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';  
import {DatePipe} from '@angular/common';
import { NgApexchartsModule } from "ng-apexcharts";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { FullCalendarModule } from '@fullcalendar/angular';  
import dayGridPlugin from '@fullcalendar/daygrid'; 
import interactionPlugin from '@fullcalendar/interaction'; // a plugin! 
// import interactionPlugin from '@fullcalendar/interaction';

import { NgxIntlTelInputModule } from 'ngx-intl-tel-input'; 

import { AgmCoreModule } from '@agm/core'; 

import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';    
 

 
import { LoginComponent } from './login/login.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { RegisterSetpasswordComponent } from './register-setpassword/register-setpassword.component';
import { RegisterProfileComponent } from './register-profile/register-profile.component';
import { RegisterPersonalComponent } from './register-personal/register-personal.component';
import { RegisterMedicationComponent } from './register-medication/register-medication.component';
import { RegisterDiagnosedComponent } from './register-diagnosed/register-diagnosed.component';
import { RegisterClickonComponent } from './register-clickon/register-clickon.component';
import { RegisterMembershipComponent } from './register-membership/register-membership.component';
import { RegisterPaymentComponent } from './register-payment/register-payment.component';
import { HeaderComponent } from './header/header.component';
import { SidenavComponent } from './sidenav/sidenav.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ManageSubscriptionComponent } from './manage-subscription/manage-subscription.component';
import { ManageAccountComponent } from './manage-account/manage-account.component';
import { SwitchUserComponent } from './switch-user/switch-user.component';
import { ContactSupportComponent } from './contact-support/contact-support.component';
import { PrivacyComponent } from './privacy/privacy.component';
import { TermOfServiceComponent } from './term-of-service/term-of-service.component';
import { RewardsComponent } from './rewards/rewards.component';
import { SettingComponent } from './setting/setting.component';
import { NotificationComponent } from './notification/notification.component';
import { VaccinationComponent } from './vaccination/vaccination.component';
import { AppointmentUpcomingComponent } from './appointment-upcoming/appointment-upcoming.component';
import { AppointmentPastComponent } from './appointment-past/appointment-past.component';
import { AppointmentDetailsComponent } from './appointment-details/appointment-details.component';
import { AppointmentAvatarComponent } from './appointment-avatar/appointment-avatar.component';
import { HistoryLabComponent } from './history-lab/history-lab.component';
import { HistoryLabDetailsComponent } from './history-lab-details/history-lab-details.component';
import { AppointmentBookComponent } from './appointment-book/appointment-book.component';
import { AppointmentBookMedicationComponent } from './appointment-book-medication/appointment-book-medication.component';
import { AppointmentBookReasonComponent } from './appointment-book-reason/appointment-book-reason.component';
import { AppointmentBookVitalsComponent } from './appointment-book-vitals/appointment-book-vitals.component';
import { AppointmentBookDoctorComponent } from './appointment-book-doctor/appointment-book-doctor.component';
import { AppointmentBookDoctorDetailsComponent } from './appointment-book-doctor-details/appointment-book-doctor-details.component'; 
import { AppointmentBookDateComponent } from './appointment-book-date/appointment-book-date.component';
import { CheckinComponent } from './checkin/checkin.component';
import { CheckinBottheringComponent } from './checkin-botthering/checkin-botthering.component';
import { CheckinSymptomsComponent } from './checkin-symptoms/checkin-symptoms.component';
import { CheckinDoctorComponent } from './checkin-doctor/checkin-doctor.component';
import { HealthRecordComponent } from './health-record/health-record.component';
import { HealthRecordDetailsComponent } from './health-record-details/health-record-details.component';  


import { HttpClientModule } from '@angular/common/http';
// import { ToastrModule ,ToastNoAnimationModule} from 'ngx-toastr';
import { NgxStripeModule } from 'ngx-stripe';

import { AppProvider } from './app.provider';
// import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { GoogleMapsModule } from '@angular/google-maps';
import { CheckinAvatarComponent } from './checkin-avatar/checkin-avatar.component';
import { CheckinBookDoctorComponent } from './checkin-book-doctor/checkin-book-doctor.component';
import { CheckinBookDateComponent } from './checkin-book-date/checkin-book-date.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { ResetSuccessComponent } from './reset-success/reset-success.component';
import { ResetTokenexpireComponent } from './reset-tokenexpire/reset-tokenexpire.component';
import { CheckinBookDoctorDetailsComponent } from './checkin-book-doctor-details/checkin-book-doctor-details.component';
import { SessionViewComponent } from './session-view/session-view.component';
import { SessionDetailsComponent } from './session-details/session-details.component';
import { SwitchDashboardComponent } from './switch-dashboard/switch-dashboard.component';
import { SwitchSessionViewComponent } from './switch-session-view/switch-session-view.component';
import { SwitchSessionDetailsComponent } from './switch-session-details/switch-session-details.component';
import { MedicalChartComponent } from './medical-chart/medical-chart.component';
import { PaymentGatwayComponent } from './payment-gatway/payment-gatway.component';
import { PreviousInteractionComponent } from './previous-interaction/previous-interaction.component';
import { RegisterFamilyMemberComponent } from './register-family-member/register-family-member.component';
import { RegisterFamilyMemberAddComponent } from './register-family-member-add/register-family-member-add.component';
import { RegisterFamilyMemberEditComponent } from './register-family-member-edit/register-family-member-edit.component';
import { HomeComponent } from './home/home.component';
import { SupportComponent } from './support/support.component';
  
import { LottieModule } from 'ngx-lottie';
import player from 'lottie-web';

// import { ToastrModule } from 'ngx-toastr';
 


import { ChartsModule } from 'ng2-charts';

import { DatepickerModule, BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { CreditCardDirectivesModule } from 'angular-cc-library';
import { ManageSubscriptionGenrateComponent } from './manage-subscription-genrate/manage-subscription-genrate.component';
import { HealthGiftComponent } from './health-gift/health-gift.component';


import { CoachLoginComponent } from './coach-login/coach-login.component';
import { CoachDashboardComponent } from './coach-dashboard/coach-dashboard.component';
import { CoachSettingComponent } from './coach-setting/coach-setting.component';
import { CoachPersonalHealthComponent } from './coach-personal-health/coach-personal-health.component';
import { CoachPersonalDetailsComponent } from './coach-personal-details/coach-personal-details.component';
import { CoachHeaderComponent } from './coach-header/coach-header.component';
import { DashboardGraphComponent } from './dashboard-graph/dashboard-graph.component';
import { CheckinNewComponent } from './checkin-new/checkin-new.component';
 

import { ToastrModule } from 'ngx-toastr';



FullCalendarModule.registerPlugins([ 
  dayGridPlugin,
 interactionPlugin
])

export function playerFactory() {
  return player;
}


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ForgotPasswordComponent,
    RegisterSetpasswordComponent,
    RegisterProfileComponent,
    RegisterPersonalComponent,
    RegisterMedicationComponent,
    RegisterDiagnosedComponent,
    RegisterClickonComponent,
    RegisterMembershipComponent,
    RegisterPaymentComponent,
    HeaderComponent,
    SidenavComponent,
    DashboardComponent,
    ManageSubscriptionComponent,
    ManageAccountComponent,
    SwitchUserComponent,
    ContactSupportComponent,
    PrivacyComponent,
    TermOfServiceComponent,
    RewardsComponent,
    SettingComponent,
    NotificationComponent,
    VaccinationComponent,
    AppointmentUpcomingComponent,
    AppointmentPastComponent,
    AppointmentDetailsComponent,
    AppointmentAvatarComponent,
    HistoryLabComponent,
    HistoryLabDetailsComponent,
    AppointmentBookComponent,
    AppointmentBookMedicationComponent,
    AppointmentBookReasonComponent,
    AppointmentBookVitalsComponent,
    AppointmentBookDoctorComponent,
    AppointmentBookDoctorDetailsComponent, 
    AppointmentBookDateComponent,
    CheckinComponent,
    CheckinBottheringComponent,
    CheckinSymptomsComponent,
    CheckinDoctorComponent,
    HealthRecordComponent,
    HealthRecordDetailsComponent,
    CheckinAvatarComponent,
    CheckinBookDoctorComponent,
    CheckinBookDateComponent,
    ResetPasswordComponent,
    ResetSuccessComponent,
    ResetTokenexpireComponent,
    CheckinBookDoctorDetailsComponent,
    SessionViewComponent,
    SessionDetailsComponent,
    SwitchDashboardComponent,
    SwitchSessionViewComponent,
    SwitchSessionDetailsComponent,
    MedicalChartComponent,
    PaymentGatwayComponent,
    PreviousInteractionComponent,
    RegisterFamilyMemberComponent,
    RegisterFamilyMemberAddComponent,
    RegisterFamilyMemberEditComponent,
    HomeComponent,
    SupportComponent,
    ManageSubscriptionGenrateComponent,
    HealthGiftComponent,
    CoachLoginComponent,
    CoachDashboardComponent,
    CoachSettingComponent,
    CoachPersonalHealthComponent,
    CoachPersonalDetailsComponent,
    CoachHeaderComponent,
    DashboardGraphComponent,
    CheckinNewComponent, 
  ],
  imports: [
    CreditCardDirectivesModule,
    LottieModule,
    GoogleMapsModule,
    NgxIntlTelInputModule,
    BrowserAnimationsModule,
    BrowserModule,
    AppRoutingModule,      
    ReactiveFormsModule,
    FormsModule,
    NgApexchartsModule,
    FullCalendarModule, 
    HttpClientModule, 
    ChartsModule,
    BsDatepickerModule.forRoot(),
    DatepickerModule.forRoot(),
    NgMultiSelectDropDownModule.forRoot(),  
    AgmCoreModule.forRoot({  
      apiKey: 'AIzaSyDWVS_xZVoLUxoqR8_3Pgb-tmrQzDfiPAU'
    }),
    NgxStripeModule.forRoot('pk_test_51JGAl0Bwvgo3kO29oXTmEPk7vOGODEhtvmYgMbdMmgFQaPyEx1MEajYBGiqLkFqMOkLtzOKnvA6SEeRWfV4rWuyD00L36pTmuG'),
    LottieModule.forRoot({ player: playerFactory }),
    
    ToastrModule.forRoot(),
  ],
  providers: [AppProvider,DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
