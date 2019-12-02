import { Injectable } from '@angular/core';
import { environment } from './../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Client } from './client';
import { Observable } from 'rxjs';
import { AuthService } from '../users/auth.service';
import { Ntf } from '../util/Notifications';


@Injectable({
  providedIn: 'root'
})
export class ClientService {
  private API = environment.API;
  private httpHeaders = new HttpHeaders({'Content-Type': 'application/json'});

  constructor(private http: HttpClient, 
  private authService: AuthService, private nft: Ntf) { }

  getAuthorizationHeader(){
    const token = this.authService.token;
    if(token !== null){
      return this.httpHeaders.append('Authorization', 'Bearer ' + token);
    }
    this.httpHeaders;
  }
  
  getClients(page: number): Observable<any> {
    return this.http.get<any>(`${this.API}/api/clients/page/${page}`, {headers: this.getAuthorizationHeader()});
  }

  create(client: Client) : Observable<Client> {
    return this.http.post<Client>(`${this.API}/api/clients`, client, {headers: this.getAuthorizationHeader()});
  }

  getClient(id): Observable<Client>{
    return this.http.get<Client>(`${this.API}/api/clients/${id}`, {headers: this.getAuthorizationHeader()})
  }

  update(client: Client): Observable<Client>{
    return this.http.put<Client>(`${this.API}/api/clients/${client.id}`, client, {headers: this.getAuthorizationHeader()})
  }

  delete(id: number): Observable<Client>{
    return this.http.delete<Client>(`${this.API}/api/clients/${id}`, {headers: this.getAuthorizationHeader()})
  }
}
