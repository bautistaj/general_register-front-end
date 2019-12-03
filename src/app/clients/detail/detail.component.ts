import { Component, OnInit, Input } from '@angular/core';
import { ClientService } from '../client.service';
import { Ntf } from 'src/app/util/Notifications';
import { Router, ActivatedRoute } from '@angular/router';
import { Client } from '../client';
import { FormGroup, FormBuilder } from '@angular/forms';
import { environment } from '../../../environments/environment';
import { ModalService } from './modal.service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit {
  @Input() client: Client;
  public title: string;
  public photo: File;
  public form: FormGroup;
  public files: File[] = [];

  public API = environment.API;
  
  constructor(private clientService: ClientService, 
    private ntf: Ntf,
    public modalService: ModalService) { }

  ngOnInit() {
    this.title = `${this.client.name} ${this.client.firstLastName} ${this.client.secondLastName}`;
    this.API = environment.API;
  }

  onSelect( event ) {
    this.photo = event.target.files[0];
  }

  async uploadPhoto() {
    if(!this.photo){
      this.ntf.showSuccessWarning('Advertencia','Debe de seleccionar foto');
    }else{
      const response =  await this.clientService.uploadPhoto(this.photo, this.client.id).toPromise();
      this.client = response['client'] as Client;
      this.ntf.showSuccessMessage('Operación exitosa','La foto se subio correctamente');
    }
  }

  closeModal() {
    this.modalService.closeModal();
    this.photo = null;
  }
}
