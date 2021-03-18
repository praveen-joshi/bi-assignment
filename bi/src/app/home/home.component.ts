import { Component, OnInit } from '@angular/core';
import {UserService} from '../services/user.service';
import {Router } from '@angular/router';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private _user:UserService,private _router:Router) { }

  user
  ngOnInit(): void {
  this._user.getUserInfo().subscribe((res)=>{
    this.user=res;
    //setting date in our required format
    this.user.lastSeen=new Date(this.user.lastSeen).toLocaleString();
  });
  
  }


  logout(){
    this._user.logout();
    this._router.navigate(['/login']);
  }

}
