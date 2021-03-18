import { Injectable } from '@angular/core';
import {User} from '../models/user';
import{HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class UserService {

  base_url="http://localhost:3000/";
  login_url=this.base_url+"users/login";
  register_url=this.base_url+"users/register";
  userInfoUrl=this.base_url+"users/me";

  constructor(private http:HttpClient) { }

  register(user){
    console.log("going to save");
    console.log(user);
    return this.http.post(this.register_url,user);
  }

  
  login(email,password){
    let user=
    {
      "email":email,
      "password":password
    }
    return this.http.post(this.login_url,user);
  }

  getUserInfo(){
    return this.http.get(this.userInfoUrl).pipe(map(res=>{

      (res as any).profile=(res as any).profile="http://localhost:3000/static/profile/"+(res as any).profile;
      
    return res;
  }));
  }

  getToken(){
    return localStorage.getItem('token');
  }

  isLoggedIn()
  {
    if(localStorage.getItem('token')) return true;
    else return false;
  }

  logout(){
    localStorage.removeItem('token');
  }


  
}
