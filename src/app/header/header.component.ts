import { Component, OnInit } from '@angular/core';
import { AuthServiceService } from '../auth-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private AuthService : AuthServiceService , private router : Router) { }
user = [];
  ngOnInit() {
    this.AuthService.getUser()
    .subscribe((res)=>{
      this.user = res.user
    })
  }


  logout()
  {
    this.AuthService.logout()
    .subscribe((res)=>{
      if(res.callback == "done")
      {
        this.router.navigate(['/login']);
      }
    });
  }
}
