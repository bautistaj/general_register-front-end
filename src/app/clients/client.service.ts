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
  private httpHeaders = new HttpHeaders({'Content-Type': ['application/json']});

  constructor(private http: HttpClient, 
  private authService: AuthService, private nft: Ntf) { }

  getAuthorizationHeader(){
    const token = this.authService.token;
    if(token !== null){
      return this.httpHeaders.append('Authorization', 'Bearer ' + token);
    }
    this.httpHeaders;
  }
  
  getFiles(id: any) {
    return this.http.get<any>(`${this.API}/api/clients/${id}/files`, {headers: this.getAuthorizationHeader()});
  }


  deleteFile(id: any) {
    return this.http.delete<any>(`${this.API}/api/clients/files/${id}`, {headers: this.getAuthorizationHeader()});
  }

  saveFiles(files: File[], id): Observable<Client> {
    let formData = new FormData();
    for (let index = 0; index < files.length; index++) {
      const file = files[index];
      formData.append(`file${index}`, file);
    }
    
    formData.append("id", id);
    
    let httpHeaders = new HttpHeaders();
    let token = this.authService.token;
    if (token != null) {
      httpHeaders = httpHeaders.append('Authorization', 'Bearer ' + token);
    }

      
    return this.http.post<Client>(`${this.API}/api/clients/files`, formData, { headers: httpHeaders });
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

  uploadPhoto(photo: File, id): Observable<Client> {
    let formData = new FormData();
    formData.append("photo", photo);
    formData.append("id", id);
    
    let httpHeaders = new HttpHeaders();
    let token = this.authService.token;
    if (token != null) {
      httpHeaders = httpHeaders.append('Authorization', 'Bearer ' + token);
    }

      
    return this.http.post<Client>(`${this.API}/api/clients/photo`, formData, { headers: httpHeaders });
  }
}
