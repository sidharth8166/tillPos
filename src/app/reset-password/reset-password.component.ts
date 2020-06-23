import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, NgForm } from '@angular/forms';
import { CustomValidators } from '../custom-validators';
import { ActivatedRoute } from '@angular/router';
import { AuthServiceService } from '../auth-service.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {

  constructor(private formBuilder : FormBuilder , private route: ActivatedRoute , private AuthService : AuthServiceService) { 
    document.body.className = "authentication-bg";
  }
  resetPaswordForm : FormGroup;
  password : any;
  submitted = false;
  id:any;
  success = false;
  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    this.id = id;

    this.resetPaswordForm = this.formBuilder.group({
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
    });
  }

  get f() { return this.resetPaswordForm.controls}

  onSubmit(form : NgForm)
  {
    this.submitted = true;
    if(this.resetPaswordForm.invalid)
    {
      return
    }
    else
    {
      this.AuthService.resetpassword(form.value.password , this.id)
      .subscribe((res)=>{
          if(res.callback == "done")
          {
            this.success = true;
          }
      },
      error => console.log(error)
      );
    }
  }

}
