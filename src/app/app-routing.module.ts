import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
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
import { ManageSubscriptionGenrateComponent } from './manage-subscription-genrate/manage-subscription-genrate.component';
import { HealthGiftComponent } from './health-gift/health-gift.component';

import { CoachLoginComponent } from './coach-login/coach-login.component';
import { CoachDashboardComponent } from './coach-dashboard/coach-dashboard.component'; 
import { CoachSettingComponent } from './coach-setting/coach-setting.component';
import { CoachPersonalHealthComponent } from './coach-personal-health/coach-personal-health.component';
import { CoachPersonalDetailsComponent } from './coach-personal-details/coach-personal-details.component';


import { DashboardGraphComponent } from './dashboard-graph/dashboard-graph.component';
import { CheckinNewComponent } from './checkin-new/checkin-new.component';

import { GuardService as AuthGuard } from './guard.service';

const routes: Routes = [
  
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'forgot', component: ForgotPasswordComponent },
  { path: 'reset-password', component: ResetPasswordComponent },
  { path: 'reset-success', component: ResetSuccessComponent },
  { path: 'token-expire', component: ResetTokenexpireComponent },
  { path: 'register-setpassword', component: RegisterSetpasswordComponent },
  { path: 'register-profile', component: RegisterProfileComponent },
  { path: 'register-personal', component: RegisterPersonalComponent },
  { path: 'register-medication', component: RegisterMedicationComponent },
  { path: 'register-diagnosed', component: RegisterDiagnosedComponent },
  { path: 'register-clickon', component: RegisterClickonComponent },
  { path: 'register-membership', component: RegisterMembershipComponent },
  { path: 'register-payment', component: RegisterPaymentComponent },

  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard], },
  { path: 'manage-subscription', component: ManageSubscriptionComponent, canActivate: [AuthGuard], },
  { path: 'manage-account', component: ManageAccountComponent, canActivate: [AuthGuard], },
  { path: 'switch-user', component: SwitchUserComponent, canActivate: [AuthGuard], },
  { path: 'contact-support', component: ContactSupportComponent, canActivate: [AuthGuard], },
  { path: 'privacy', component: PrivacyComponent, canActivate: [AuthGuard], },
  { path: 'term-of-service', component: TermOfServiceComponent, canActivate: [AuthGuard], },
  { path: 'rewards', component: RewardsComponent, canActivate: [AuthGuard], },
  { path: 'setting', component: SettingComponent, canActivate: [AuthGuard], },
  { path: 'notification', component: NotificationComponent, canActivate: [AuthGuard], },
  { path: 'vaccination', component: VaccinationComponent, canActivate: [AuthGuard], },
  { path: 'appointment-upcoming', component: AppointmentUpcomingComponent, canActivate: [AuthGuard], },
  { path: 'appointment-past', component: AppointmentPastComponent, canActivate: [AuthGuard], },
  { path: 'appointment-details', component: AppointmentDetailsComponent, canActivate: [AuthGuard], },
  { path: 'appointment-avatar', component: AppointmentAvatarComponent, canActivate: [AuthGuard], },
  { path: 'history-lab', component: HistoryLabComponent, canActivate: [AuthGuard], },
  { path: 'history-lab-details', component: HistoryLabDetailsComponent, canActivate: [AuthGuard], },
  { path: 'appointment-book', component: AppointmentBookComponent, canActivate: [AuthGuard], },
  { path: 'appointment-book-mdication', component: AppointmentBookMedicationComponent, canActivate: [AuthGuard], },
  { path: 'appointment-book-reason', component: AppointmentBookReasonComponent, canActivate: [AuthGuard], },
  { path: 'appointment-book-vitals', component: AppointmentBookVitalsComponent, canActivate: [AuthGuard], },
  { path: 'appointment-book-doctor', component: AppointmentBookDoctorComponent, canActivate: [AuthGuard], },
  { path: 'appointment-book-doctor-details', component: AppointmentBookDoctorDetailsComponent, canActivate: [AuthGuard], },
  { path: 'appointment-book-date', component: AppointmentBookDateComponent, canActivate: [AuthGuard], },
  { path: 'chekin', component: CheckinComponent, canActivate: [AuthGuard], },
  { path: 'chekin-bothering', component: CheckinBottheringComponent, canActivate: [AuthGuard], },
  { path: 'chekin-symptoms', component: CheckinSymptomsComponent, canActivate: [AuthGuard], },
  { path: 'chekin-doctor', component: CheckinDoctorComponent, canActivate: [AuthGuard], },
  { path: 'chekin-avatar', component: CheckinAvatarComponent, canActivate: [AuthGuard], },
  { path: 'chekin-book-doctor', component: CheckinBookDoctorComponent, canActivate: [AuthGuard], },
  { path: 'chekin-book-doctor-details', component: CheckinBookDoctorDetailsComponent, canActivate: [AuthGuard], },
  { path: 'chekin-book-date', component: CheckinBookDateComponent, canActivate: [AuthGuard], },
  { path: 'health-record', component: HealthRecordComponent, canActivate: [AuthGuard], },
  { path: 'health-record-details', component: HealthRecordDetailsComponent, canActivate: [AuthGuard], },
  { path: 'session-view', component: SessionViewComponent, canActivate: [AuthGuard], },
  { path: 'session-details', component: SessionDetailsComponent, canActivate: [AuthGuard], },

  { path: 'switch-dashboard', component: SwitchDashboardComponent, canActivate: [AuthGuard], },
  { path: 'switch-session-view', component: SwitchSessionViewComponent, canActivate: [AuthGuard], },
  { path: 'switch-session-details', component: SwitchSessionDetailsComponent, canActivate: [AuthGuard], },
  { path: 'medical-chart', component: MedicalChartComponent, canActivate: [AuthGuard], },
  { path: 'payment-gatway', component: PaymentGatwayComponent, canActivate: [AuthGuard], },
  { path: 'previous-interaction', component: PreviousInteractionComponent, canActivate: [AuthGuard], },


  { path: 'register-family-member', component: RegisterFamilyMemberComponent },
  { path: 'register-family-member-add', component: RegisterFamilyMemberAddComponent },
  { path: 'register-family-member-edit', component: RegisterFamilyMemberEditComponent },

  { path: 'support', component: SupportComponent , canActivate: [AuthGuard],},
  { path: 'manage-account-genrate', component: ManageSubscriptionGenrateComponent , canActivate: [AuthGuard],},
  { path: 'health-gift', component: HealthGiftComponent , canActivate: [AuthGuard],},

  { path: 'coach-login', component: CoachLoginComponent },
  { path: 'coach-dashboard', component: CoachDashboardComponent },
  { path: 'coach-setting', component: CoachSettingComponent },
  { path: 'coach-personal-health', component: CoachPersonalHealthComponent },
  { path: 'coach-personal-details', component: CoachPersonalDetailsComponent },


  { path: 'dashboard-graph', component: DashboardGraphComponent, canActivate: [AuthGuard], },
  { path: 'chekin-new', component: CheckinNewComponent, canActivate: [AuthGuard], },
 

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { 
      useHash: true,
      scrollPositionRestoration: 'enabled',
      anchorScrolling: 'enabled',
    })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
