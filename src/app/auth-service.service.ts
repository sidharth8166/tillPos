import { Injectable } from '@angular/core';
import {Http , Response , Headers} from '@angular/http';
import { map } from 'rxjs/operators';
import {observable} from 'rxjs';
import 'rxjs/Rx';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

  private _url:string = "http://127.0.0.1:8000/api/"
  constructor(private _http:Http) { }

  signup(name : string , email : string , password : string , phone : number)
  {
    return this._http.post(this._url + 'register' , 
    {name: name , email: email , password: password , phone: phone},
    {headers : new Headers({'X-Requested-With' : 'XMLHttpRequest'})
  })
  .pipe(map(
    (response : Response) => {
      console.log(response);
      const token = response.json().token;
      const base64Url = token.split('.')[1];
      const base64 = base64Url.replace('-', '+').replace('_', '/');
      return {token: token, decoded: JSON.parse(window.atob(base64))};
    }
  ))
  .do(
    tokenData => {
      localStorage.setItem('token', tokenData.token);
    }
  );
  }

  signin(email : string , password : string)
  {
      return this._http.post(this._url + 'login',
      {email : email , password : password},
      {headers : new Headers ({'X-Requested-With' : 'XMLHttpRequest'})})
    .pipe(map(
      (response : Response) => {
        console.log(response);
        const token = response.json().token;
        const base64Url = token.split('.')[1];
        const base64 = base64Url.replace('-', '+').replace('_', '/');
        return {token: token, decoded: JSON.parse(window.atob(base64))};
      }
    ))
    .do(
      tokenData => {
        localStorage.setItem('token', tokenData.token);
      }
    );
  }

  getToken()
  {
    return localStorage.getItem('token');
  }

  getUser()
  {
    const token = this.getToken();
    return this._http.get(this._url+"getUser?token=" + token)
    .pipe(map((response : Response) => response.json()))
  }

  changePassword(password : string)
  {
    const token = this.getToken();
    return this._http.post(this._url+"changePassword?token="+token, {password : password})
  }

  updateProfile(name : string, email : string, contact : number)
  {
    const token = this.getToken();
    return this._http.post(this._url+"updateProfile?token="+token, {name : name, email : email, contact : contact});
  }

  logout()
  {
    const token = this.getToken();
    return this._http.post(this._url+"logout" , {token: token})
    .pipe(map((response : Response) => response.json()))
  }

  recoverpassword(data)
  {
    return this._http.post(this._url+"recoverpassword" , {data : data})
    .pipe(map((response : Response) => response.json()))
  }

  resetpassword(data , id)
  {
    return this._http.post(this._url+"resetPassword" , {data : data , id : id})
    .pipe(map((response : Response) => response.json()))
  }
}
