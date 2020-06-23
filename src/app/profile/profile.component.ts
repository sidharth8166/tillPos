import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {ApiService} from '../api.service';
import { AuthServiceService } from '../auth-service.service';
import { DomSanitizer, SafeResourceUrl, SafeUrl } from '@angular/platform-browser';
import { NgForm,FormControl, FormGroup, FormBuilder, Validators }   from '@angular/forms';
import{CustomValidators} from '../custom-validators';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  name :any;
  email :any;
  contact :any;
  nameFm :any;
  emailFm :any;
  contactFm :any;
  profileData : FormGroup;
  changePassForm : FormGroup;
  passwordChanged = false;
  newPassword : any;
  submitted = false;
  profileUpdated = false;
  submitPass = false;
  constructor(private AuthService : AuthServiceService , private router : Router, private formBuilder : FormBuilder) { }
  user = [];
  ngOnInit() {

  //fetching user information
    this.AuthService.getUser()
    .subscribe((res)=>{
      this.user = res.user;
      this.name = res.user.name;
      this.email = res.user.email;
      this.contact = res.user.contact;
      this.nameFm = res.user.name;
      this.emailFm = res.user.email;
      this.contactFm = res.user.contact;
    })

  //password validation
    this.changePassForm = this.formBuilder.group({
      password: [ null, Validators.compose([
        // 1. Password Field is Required
        Validators.required,
        // 2. check whether the entered password has a number
        CustomValidators.patternValidator(/\d/, { hasNumber: true }),
        // 3. check whether the entered password has upper case letter
        CustomValidators.patternValidator(/[A-Z]/, { hasCapitalCase: true }),
        // 4. check whether the entered password has a lower-case letter
        CustomValidators.patternValidator(/[a-z]/, { hasSmallCase: true }),
        // 5. check whether the entered password has a special character
        CustomValidators.patternValidator(/[ !@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/, { hasSpecialCharacters: true }),
        // 6. Has a minimum length of 8 characters
        Validators.minLength(8)])
     ]
  });

  //update form validation
    this.profileData = this.formBuilder.group({
      'name' : ['' , Validators.required],
      'email' : ['', [Validators.required , Validators.email]],
      'contact' : ['' , [Validators.required , Validators.pattern('[6-9]\\d{9}')]],
    });
  }

   // convenience getter for easy access to form fields
 get f() { return this.changePassForm.controls; }
 get c() { return this.profileData.controls; }

  onSubmit(form:NgForm){
    this.submitPass = true;
    if (this.changePassForm.invalid) {
       return;
     }
     this.AuthService.changePassword(form.value.password)
     .subscribe((res)=>{
       this.passwordChanged = true;
     })
  }

  onUpdate(form:NgForm){
    this.submitted= true;
    if (this.profileData.invalid) {
       return;
     }
     this.AuthService.updateProfile(form.value.name, form.value.email, form.value.contact)
     .subscribe((res)=>{
       this.profileUpdated = true;
     })
  }

}
