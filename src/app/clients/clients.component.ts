import { Component, OnInit } from '@angular/core';
import { Client } from './client';
import { ClientService } from './client.service';
import { Ntf } from '../util/Notifications';
import swal from 'sweetalert2';
import { ActivatedRoute } from '@angular/router';
import { ModalService } from './detail/modal.service';
import { ModalFileService } from './file/modal-file.service';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
})
export class ClientsComponent implements OnInit {
  public selectedClient: Client;
  public selectedClientFile: Client;
  public clients:Client[]=[];
  public paginator: any;

  constructor(private clientService: ClientService, 
    private ntf: Ntf,
    private activatedRoute: ActivatedRoute,
    private modalService: ModalService,
    private modalFileService: ModalFileService) { }

  ngOnInit() {
    this.getClients();
  }

  async getClients() {
    try {
      this.activatedRoute.params.subscribe( async params => {
        let page: number = +params['page'];

        if(!page){
          page = 0;
        }

        try {

          const response = await this.clientService.getClients(page)
          .toPromise(); 
          this.paginator = response;
          this.clients = response['content'] as Client[];
          
        } catch (error) {
          this.ntf.handleError(error);
        }
      }
      ); 
    } catch (error) {
      this.ntf.handleError(error);
    }
  }

  async delete(client: Client){
    swal.fire({
      title: '¿Está seguro?',
      text: `¿Seguro que desea eliminar al cliente ${client.name} ${client.firstLastName}?`,
      icon: 'warning',
      confirmButtonText: 'Si, eliminar!',
      cancelButtonText: 'No, cancelar!',
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      showConfirmButton: true,
      showCancelButton: true,
    }).then(async result => {
      if (result.value) {
        await this.clientService.delete(client.id).toPromise();
        this.clients = this.clients.filter(cli => cli !== client);
        
        this.ntf.showSuccessMessage('Operación exitosa', 'El cliente se elimino correctamente');
      }
    });
  }

  openModal(client: Client){
    this.selectedClient = client;
    this.modalService.openModal();
  }

  openFileModal(client: Client){
    this.selectedClientFile = client;
    this.modalFileService.openModal();
  }
}
