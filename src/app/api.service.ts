import { Injectable } from '@angular/core';
import {Http , Response , Headers} from '@angular/http';
import {HttpErrorResponse} from '@angular/common/http';
import { map } from 'rxjs/operators';
import {AuthServiceService} from './auth-service.service';
import { tokenKey } from '@angular/core/src/view';
import { jsonpFactory } from '@angular/http/src/http_module';
import { pipe } from '@angular/core/src/render3';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ajax } from 'rxjs/ajax';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  //private _url:string = "http://vedicare-demo.66etv63dqh.ap-south-1.elasticbeanstalk.com/api/"
  private _url:string = "http://127.0.0.1:8000/api/"
  constructor(private _http:Http , private AuthServiceService : AuthServiceService) { }



   addMember (formData)
   {
     const token = this.AuthServiceService.getToken();
     return this._http.post(this._url+"addMember?token="+token , formData)
     .pipe(map((response:Response)=>response.json()))
   }


   getAllMembers()
   {
     const token = this.AuthServiceService.getToken();
     return this._http.get(this._url + "getAllMembers?token=" + token)
     .pipe(map((response : Response)=> response.json()))
   }

   getMemberData(id)
  {
    const token = this.AuthServiceService.getToken();
    return this._http.post(this._url+"getMemberData?token=" + token , {id : id})
    .pipe(map((response : Response) => response.json()))
  } 
  
  updateMemberData(data , id)
  {
    const token = this.AuthServiceService.getToken();
    return this._http.post(this._url+"updateMemberData?token=" + token , {data : data , id :id})
  }

  deleteMember(id)
  {
    const token = this.AuthServiceService.getToken();
    return this._http.post(this._url+"deleteMember?token=" + token , {id:id})
  }

  updateInstructorPic(data)
  {
    const token = this.AuthServiceService.getToken();
    return this._http.post(this._url+"updateInstructorPic?token=" + token , data)
  }

  

  updateCentreAddress(address , lat , lng , website , mapUrl , city , state , zipcode , id)
  {
    const token = this.AuthServiceService.getToken();
    return this._http.post(this._url+ "updateCentreAddress?token=" + token , {address : address , lat : lat, lng:lng , website:website , mapUrl:mapUrl , city:city, state:state, zipcode:zipcode , id : id})
    .pipe(map((response : Response)=>response.json()))
  }

  addCourses(data)
  {
    const token = this.AuthServiceService.getToken();
    return this._http.post(this._url+"addCourses?token=" + token , data)
    .pipe(map((response : Response) => response.json()))
  }

  getAllCourses()
  {
    const token = this.AuthServiceService.getToken();
    return this._http.get(this._url+"getAllCourses?token=" + token)
    .pipe(map((response : Response) => response.json()))
  }

  getCourseProfile(id)
  {
    const token = this.AuthServiceService.getToken();
    return this._http.post(this._url+"getCourseProfile?token="+token , {id : id})
    .pipe(map((response : Response) => response.json()))
  }

  updateCourse(data , id)
  {
    const token = this.AuthServiceService.getToken();
    return this._http.post(this._url+"updateCourse?token=" + token , {data : data , id : id})
    .pipe(map((response : Response) => response.json()))
  }

  searchInstructors(data , id)
  {
    const token = this.AuthServiceService.getToken();
    return this._http.post(this._url+"searchInstructors?token=" + token , {data : data , id : id})
    .pipe(map((response : Response) => response.json()))
  }

  addInsToCourse(courseId , insId)
  {
    const token = this.AuthServiceService.getToken()
    return this._http.post(this._url+"addInsToCourse?token=" + token , {courseId : courseId , insId : insId})
    .pipe(map((response : Response) => response.json()))
  }

  removeInsFromCourse(courseId , insId)
  {
    const token = this.AuthServiceService.getToken();
    return this._http.post(this._url+"removeInsFromCourse?token=" + token , {courseId : courseId , insId : insId})
    .pipe(map((response : Response) => response.json()))
  }

  getNewBookings()
  {
    const token = this.AuthServiceService.getToken();
    return this._http.get(this._url+"getNewBookings?token=" + token)
    .pipe(map((response : Response) => response.json()));
  }

  uploadImage(formData) {
    return ajax.post(this._url+ "upload", formData);
  }

  deleteImage(formData) {
    return this._http.post(this._url+ "deleteImage" , formData)
    .pipe(
      catchError(this.handleError)
    );
  }

  saveProduct(formData) {
    return this._http.post(this._url + "saveProduct", formData)
    .pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(`Backend returned code ${error.status}, ` + `body was: ${error.error}`);
    }
    // return an observable with a user-facing error message
    return throwError('Something bad happened. Please try again later.');
  }

}
