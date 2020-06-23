import { Component, OnInit } from '@angular/core';
import { Http, Headers, RequestOptions} from '@angular/http';
import { NgForm,FormControl,FormGroup, Validators ,FormBuilder }   from '@angular/forms';
import{CustomValidators} from '../custom-validators';
import { Router } from '@angular/router';
import {AuthServiceService} from '../auth-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
data = [];
public form = {
  email: null,
  password : null
}
emailInvalid = false;
Invalid = false;
  constructor(private _http:Http, private router: Router,private AuthServiceService : AuthServiceService) {
    document.body.className = "authentication-bg";
   }
   private header = new Headers({'X-Requested-With' : 'XMLHttpRequest'});

  ngOnInit() {
  }

  onSubmit(form : NgForm)
  {
    this.AuthServiceService.signin(form.value.email , form.value.password)
    .subscribe(
      response=>{
        if(response.token)
        {
          this.router.navigate(['/profile']);
        }
      
      },
       (error) => 
       {
         console.log(error);
         if(error._body == '{"error":"Invalid credentials"}')
         {
          this.emailInvalid = false;
          this.Invalid = true;
         }
         if(error._body == '{"email":["The email must be a valid email address."]}')
         {
          this.Invalid = false;
          this.emailInvalid = true;
         }
       }
    
      );
  }

}
