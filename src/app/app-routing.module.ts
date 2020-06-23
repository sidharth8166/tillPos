import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LoginComponent} from './login/login.component';
import{RegisterComponent} from './register/register.component';
import {AddMemberComponent} from './add-member/add-member.component';
import { MembersComponent } from './members/members.component';
import { MemberProfileComponent } from './member-profile/member-profile.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { ProfileComponent } from './profile/profile.component';

const routes: Routes = [
  {
    path : 'login',
    component : LoginComponent
  },
  {
    path : "",
    component : LoginComponent
  },
 
  {
    path : 'register',
    component : RegisterComponent
  },
  {
    path : 'addMember',
    component : AddMemberComponent
  },
  {
    path : "members",
    component : MembersComponent
  },
  {
    path : "memberProfile",
    component : MemberProfileComponent
  },
  {
    path : 'recoverPassword',
    component : ForgotPasswordComponent
  },
  {
    path : 'resetpassword/:id',
    component : ResetPasswordComponent
  },
  {
    path : 'profile',
    component : ProfileComponent
  }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
