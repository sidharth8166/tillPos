import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {ApiService} from '../api.service';
import { DomSanitizer, SafeResourceUrl, SafeUrl } from '@angular/platform-browser';
import { NgForm,FormControl, FormGroup, FormBuilder, Validators }   from '@angular/forms';

@Component({
  selector: 'app-member-profile',
  templateUrl: './member-profile.component.html',
  styleUrls: ['./member-profile.component.css']
})
export class MemberProfileComponent implements OnInit {

  data = [];
  name1 : any;
  email1 : any;
  contact1 : any;
  about1 : any;
  age1 : any;
  address1 : any;
  insId : any;
  memberData : FormGroup;
  submitted = false
  submitButton = true;
  success = false;
  filedata:any;
  profilePic : any;
  successPic = false;
  image : any;
submitPic = false;
  constructor(private formBuilder : FormBuilder , private router : Router , private ApiService : ApiService,private _sanitizer: DomSanitizer) { }
  ngOnInit() {
    let param = this.router.parseUrl(this.router.url);
    console.log(param.queryParams.id)
    const id = param.queryParams.id;
    this.insId = id;
    this.loadScript('../assets/js/imagePreview.js');

    this.ApiService.getMemberData(id)
    .subscribe((res)=>{
      this.data = res.data;
      console.log(this.data);
      this.name1 = res.data.name;
      this.email1 = res.data.email;
      this.about1 = res.data.about;
      this.contact1 = res.data.phone;
      this.age1 = res.data.age;
      this.address1 = res.data.address;
      this.image = res.data.pic;
    },
    error => console.log(error)
    );

    this.memberData = this.formBuilder.group({
      'name' : ['' , Validators.required],
      'email' : ['', [Validators.required , Validators.email]],
      'contact' : ['' , [Validators.required , Validators.pattern('[6-9]\\d{9}')]],
      'about' : ['' , Validators.required],
      'age' : ['' , Validators.required],
      'address' : ['' , Validators.required] 
    });

  }

  get f() { return this.memberData.controls; }

  public loadScript(url: string) {
    const body = <HTMLDivElement> document.body;
    const script = document.createElement('script');
    script.innerHTML = '';
    script.src = url;
    script.async = false;
    script.defer = true;
    body.appendChild(script);
  }

  getBackground(image) {
    return this._sanitizer.bypassSecurityTrustStyle(`url(${'http://127.0.0.1:8000/assets/member/profile_pic/'+image})`);
  }

  onSubmit(form : NgForm)
  {
    console.log('submitting');
    this.submitted = true;
  if(this.memberData.invalid)
  {
    return
  }
  else
  {
    this.ApiService.updateMemberData(form.value , this.insId)
    .subscribe((response)=>{
      
        this.submitButton = false;
        this.success = true;
      
    },
    error => console.log(error)
    );
  }
    
  }

  fileEvent(e){
    this.filedata=e.target.files[0];
    let file = e.target.files[0];
    this.profilePic = file.name;
    this.submitPic = true;
  }
  
  submitPicForm()
  {
    let formdata = new FormData();
    formdata.append('myFile' , this.filedata);
    formdata.append('insId' , this.insId);
    this.ApiService.updateInstructorPic(formdata)
    .subscribe((res)=>{
      this.submitPic = false;
      this.successPic = true;  
    },
    error => console.log(error));
  }

  deleteMember()
  {
    this.ApiService.deleteMember(this.insId)
    .subscribe((res)=>{
        alert('Member deleted');
        this.router.navigate(['/members']);
    })
  }

  
}
