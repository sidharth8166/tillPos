import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule,ReactiveFormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
//import { AgmCoreModule } from '@agm/core';
import { RegisterComponent } from './register/register.component';
import {AuthServiceService} from './auth-service.service';
import {ApiService} from './api.service';
import { AddMemberComponent } from './add-member/add-member.component';
import { Ng4GeoautocompleteModule } from 'ng4-geoautocomplete';
import { MembersComponent } from './members/members.component';
import { MemberProfileComponent } from './member-profile/member-profile.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { FileSelectDirective } from 'ng2-file-upload';
import { ProfileComponent } from './profile/profile.component';
//import { Select2Module } from 'ng2-select2';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SidebarComponent,
    FooterComponent,
    HeaderComponent,
    RegisterComponent,
    AddMemberComponent,
    MembersComponent,
    MemberProfileComponent,
    ForgotPasswordComponent,
    ResetPasswordComponent,
    FileSelectDirective,
    ProfileComponent,
    
  ],
  imports: [
    HttpModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    Ng4GeoautocompleteModule.forRoot()
  ],
  providers: [AuthServiceService , ApiService],
  bootstrap: [AppComponent]
})
export class AppModule { }
