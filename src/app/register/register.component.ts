import { Component, OnInit, Inject } from '@angular/core';
import { Http, Headers, RequestOptions} from '@angular/http';
import { NgForm,FormControl,FormGroup, Validators ,FormBuilder }   from '@angular/forms';
import{CustomValidators} from '../custom-validators';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import {AuthServiceService} from '../auth-service.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  phone:any;
  name:any;
  email:any;
  password:any;
  registerForm: FormGroup;
  otpForm : FormGroup;
  submitted = false;
  enteredOtp : any;
  public recievedOtp : any = [];
  otpError = false;
  data = [];
  phoneExist = false;
  user = [];

  constructor(private _http:Http,private router: Router,private formBuilder: FormBuilder , private AuthServiceService : AuthServiceService) {
    document.body.className = "authentication-bg authentication-bg-pattern";
  }
 
  private header = new Headers({'Content-Type': 'application/json'});


  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
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
     ],
      phone:['',[Validators.required , Validators.pattern('[6-9]\\d{9}')]]
  });
  }


 // convenience getter for easy access to form fields
 get f() { return this.registerForm.controls; }

 onSubmit(form:NgForm){
   if (this.registerForm.invalid) {
      return;
    }
  this.AuthServiceService.signup(form.value.firstName , form.value.email , form.value.password , form.value.phone)
  .subscribe(response => {
      if(response.token)
      {
        this.router.navigate(['/profile']);
      }
    },
    
    error => console.log(error)
  );
 }
}

