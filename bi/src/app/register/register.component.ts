import { Component, OnInit } from '@angular/core';
import {User} from '../models/user';
import {UserService} from '../services/user.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  user=new User;
  maxDate=this.currentDate();
  image:File;
  
  constructor(private _user:UserService,private _router:Router) { }

  
  onFileSelect(event){
    this.image=<File>event.target.files[0];
  }

  Register(){


    let fd=new FormData();
    // console.log(typeof(this.user.age))
    fd.append("age",String(this.user.age));   
    fd.append('profile',this.image,this.image.name);
    fd.append("name",this.user.name);
    fd.append("email",this.user.email);
    fd.append("password",this.user.password);
    fd.append("mobile",this.user.mobile);
    fd.append("dob",String(this.user.dob));
    

    this._user.register(fd).subscribe((res)=>{
      console.log(res);
      this._router.navigate(['/login']);
    },
    (res)=>{
      console.log(res);
      alert("Unable to Register. "+res.error);
    });

  }

  currentDate(){
    var today = new Date();
    var dd = String(today.getDate());
    var mm = String(today.getMonth()+1); //January is 0!
    var yyyy = today.getFullYear();
    if(today.getDate()<10){
            dd='0'+dd
        } 
        if(today.getMonth()+1<10){
            mm='0'+mm
        } 

    return yyyy+'-'+mm+'-'+dd;
  }

  setAge()
  {
    if (this.user.dob) 
    {
      var timeDiff = Math.abs(Date.now() - new Date(this.user.dob).getTime());
      this.user.age = Number(Math.floor(timeDiff / (1000 * 3600 * 24) / 365.25));
    }

  }

  ngOnInit(): void {
  }
}
