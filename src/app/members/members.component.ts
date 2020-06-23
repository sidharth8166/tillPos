import { Component, OnInit } from '@angular/core';
import {ApiService} from '../api.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-members',
  templateUrl: './members.component.html',
  styleUrls: ['./members.component.css']
})
export class MembersComponent implements OnInit {
data = [];
  constructor(private ApiService : ApiService , private router : Router) { }
  
  ngOnInit() {
  this.ApiService.getAllMembers()
  .subscribe((res)=>{
    this.data = res
    },
   error => console.log(error) 
    );
  }

  memberProfile(id)
  {
    this.router.navigate(['memberProfile/'], { queryParams: { id: id }, skipLocationChange: true });
  }

}
