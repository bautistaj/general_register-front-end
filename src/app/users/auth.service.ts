import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from './user';
import { environment } from './../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private _user: User;
  private _token: string;

  constructor(private http: HttpClient) { }

  public get user(): User {
    if(this._user){
      return this._user;
    }else if(sessionStorage.getItem('user')){
      this._user = JSON.parse( sessionStorage.getItem('user')) as User;
      return this._user;
    }

    return new User();
  }

  public get token(): string {
    if(this._token){
      return this._token;
    }else if(sessionStorage.getItem('token')){
      this._token =  sessionStorage.getItem('token');
      return this._token;
    }

    return null;
  }

  logout() {
    this._token = null;
    this._user = null;
    sessionStorage.clear();
  }

  login(user: User): Observable<any> {
    let params = new URLSearchParams();
    params.set('grant_type', 'password');
    params.set('username', user.username);
    params.set('password', user.password);
  
    
    const credentials = btoa(`${environment.app}:${environment.secret}`);
    const httpHeaders = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': `Basic ${credentials}`
    });
    
    return this.http.post<any>(`${environment.API}/oauth/token`, params.toString(), { headers: httpHeaders });
  }

  saveDataUser(data: any):void {    
    this._user = new User();
    this._user.username = data['user_name'];
    this._user.email = data['email'];
    this._user.enabled = data['enabled'];
    this._user.roles = data['authorities'];

    sessionStorage.setItem('user',JSON.stringify(this._user));
  }

  saveToken(token: string){
    this._token = token;
    sessionStorage.setItem('token',this._token);
  }

  isAuthenticated():boolean {
    let payload = this.getDataToken(this.token);

    if(payload && payload.user_name && payload.user_name.length > 0) {
      return true;
    }

    return false;
  }

  getDataToken(token: any) {    
    if(token !== null && token !== undefined) {
      return JSON.parse(atob(token.split(".")[1]));
    }
    return null;
  }
}
