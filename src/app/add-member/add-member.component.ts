import { Component, OnInit } from '@angular/core';
import{CustomValidators} from '../custom-validators';
import { NgForm,FormControl,FormGroup, Validators ,FormBuilder }   from '@angular/forms';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { Http, Headers, RequestOptions} from '@angular/http';
import {AuthServiceService} from '../auth-service.service';
import {ApiService} from '../api.service';

@Component({
  selector: 'app-add-instructor',
  templateUrl: './add-member.component.html',
  styleUrls: ['./add-member.component.css']
})

export class AddMemberComponent implements OnInit {

  addMemberForm : FormGroup;
  submitted = false;
  public data = [];
  public id = [];
  data1 : any;

  public currentText: string = '';
  public charsLeft: number = 200;
  successMsg = false;
  filedata:any;
  fileToUpload: File = null;
  input : any;
  centres = [];

  constructor(private _http:Http,private router: Router,private formBuilder: FormBuilder,private AuthServiceService : AuthServiceService , private ApiService : ApiService) { }
  private headers = new Headers({'Content-Type': 'application/json'});
  ngOnInit() {
    this.addMemberForm = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      contact:['',[Validators.required , Validators.pattern('[6-9]\\d{9}')]],
      age : ['' ,Validators.required],
      address : ['' , Validators.required],
      about : ['' , Validators.required],
      imageInput: ['', Validators.required],
      avatar : ['' , Validators.required]
  });

  this.loadScript('../assets/js/imagePreview.js');

  // this.ApiService.getCentres()
  // .subscribe(res=>{
  //   this.centres = res
  // },
  // error => console.log(error)
  //   );
  }
  
  public loadScript(url: string) {
    const body = <HTMLDivElement> document.body;
    const script = document.createElement('script');
    script.innerHTML = '';
    script.src = url;
    script.async = false;
    script.defer = true;
    body.appendChild(script);
  }


// convenience getter for easy access to form fields
get f() { return this.addMemberForm.controls; }


fileEvent(e){
  this.filedata=e.target.files[0];
  let file = e.target.files[0];
  this.addMemberForm.controls['imageInput'].setValue(file ? file.name : '');
  console.log(e);
}
onSubmit(form:NgForm) {
  this.submitted = true;
  if(this.addMemberForm.invalid)
  {
    return;
  }
  else
  {
    let formdata = new FormData();
    console.log(this.addMemberForm)
    formdata.append("avatar1",this.filedata);
    formdata.append("name" , form.value.name);
    formdata.append("email" , form.value.email);
    formdata.append("age" , form.value.age);
    formdata.append("contact" , form.value.contact);
    formdata.append("address" , form.value.address);
    formdata.append("about" , form.value.about);
    this.ApiService.addMember(formdata)
    .subscribe((res) =>{
      if(res.callback == "done")
      {
        this.successMsg = true;
      }
    },
    error => console.log(error)
    );
  }
}
}

