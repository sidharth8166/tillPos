import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, NgForm } from '@angular/forms';
import { AuthServiceService } from '../auth-service.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {

  constructor(private formBuilder : FormBuilder , private AuthService : AuthServiceService) {
    document.body.className = "authentication-bg";
   }

  recoverPaswordForm : FormGroup;
  success = false;
  submitted = false;
  noRecord = false;

  ngOnInit() {
    this.recoverPaswordForm = this.formBuilder.group({
      'email' : ['' , [Validators.required , Validators.email]]
    });
  }

  onSubmit(form : NgForm)
  {
    this.submitted = true;
    if(this.recoverPaswordForm.invalid)
    {
      return;
    }
    else
    {
      this.AuthService.recoverpassword(form.value.email)
      .subscribe((res)=>{
        if(res.callback == "done")
        {
          this.noRecord = false;
          this.success = true;
        }
        else if(res.callback == "no record")
        {
          this.noRecord = true;
        }
      },
      error => console.log(error)
      );
    }
    
  }

  get f (){return this.recoverPaswordForm.controls};

}
