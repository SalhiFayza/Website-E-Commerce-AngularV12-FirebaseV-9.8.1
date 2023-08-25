import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import { AuthservicesService } from '../services/authservices.service';
import {UsersservicesService} from '../services/usersservices.service';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  user$ = this.userserv.currentUserProfile$;
  isUser:any
  constructor(private router:Router,private authserv:AuthservicesService, private userserv:UsersservicesService) {
    this.authserv.currentUser$.subscribe((user$)=>{
      if(user$){
        this.isUser=true
      }
      else{
        this.isUser=false
      }
    })
    }

  ngOnInit(): void {
  }
  logout(){
    this.authserv.logout().subscribe(() => {
      this.router.navigate(['/singup']);
    });
  }

}
