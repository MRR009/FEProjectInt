import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserDetails } from '../model/userDetails';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private baseUrl = "http://localhost:7070/stgit.com/autodealerauditappapi/user/v1"
  constructor(private http:HttpClient) { }

  getUser(mailId:string):Observable<UserDetails>{
    return this.http.get<UserDetails>(`${this.baseUrl}/user/${mailId}`)
  }

  getOtp(mailId:string):Observable<any>{
    return this.http.get<any>(`${this.baseUrl}/users/otp/${mailId}`)
  }

  resetPassword(password:string, mailId:string, value:any): Observable<any>{
    return this.http.put<any>(`${this.baseUrl}/updatepassword/${password}/${mailId}`, value)
  }
}
