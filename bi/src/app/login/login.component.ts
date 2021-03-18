import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  email="";
  password="";
  constructor(private _user:UserService,private _router:Router) { }

  ngOnInit(): void {
  }

  login(){
    console.log(this.password);
    this._user.login(this.email,this.password).subscribe((res)=>{
        console.log(res);
         localStorage.setItem('token',(res as any).token);
         this._router.navigate(['/']);
    },err=>(alert("Please Enter Correct password")));

  }


}
