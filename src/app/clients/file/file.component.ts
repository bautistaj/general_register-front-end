import { Component, OnInit, Input } from '@angular/core';
import { ModalService } from '../detail/modal.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Ntf } from 'src/app/util/Notifications';
import { ClientService } from '../client.service';
import { Client } from '../client';
import { ModalFileService } from './modal-file.service';
import { ClientFile } from './file';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-file',
  templateUrl: './file.component.html',
  styleUrls: ['./file.component.css']
})
export class FileComponent implements OnInit {
  public title: string;
  public files: File[] = [];
  public clientFiles: ClientFile[] = [];
  public API = environment.API;
  
  @Input() client: Client;
  constructor(private clientService: ClientService, 
    private ntf: Ntf,
    public modalFileService: ModalFileService,
    private router: Router,
    private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.loadFiles();
  }

  async loadFiles() {
    this.activatedRoute.params.subscribe( async params => {
      let id = params['id'];
      if(id){
        try {
          
          this.client = await this.clientService.getClient(id).toPromise();
          const response = await this.clientService.getFiles(this.client.id).toPromise();
          this.title = `${this.client.name} ${this.client.firstLastName} ${this.client.secondLastName}`;
          this.clientFiles = response['files'];

        } catch (error) {
          this.ntf.handleError(error);
        }
      }
    });
  }

  closeModal() {
    this.modalFileService.closeModal();
  }

  async deleteFile(file: ClientFile){
    try {
      await this.clientService.deleteFile(file.id).toPromise();  
      this.ntf.showSuccessMessage('Operación exitosa', 'El archivo se elimino correctamente');
      this.loadFiles();
    } catch (error) {
      this.ntf.handleError(error);
    }
    
  }

  onSelect(event){
    this.files.push(...event.addedFiles);
  }

  onRemove(event){
    this.files.splice(this.files.indexOf(event), 1);
  }

  async saveFiles() {
    if(this.files.length > 0 ){
      try {
  
        const response = await this.clientService.saveFiles(this.files, this.client.id).toPromise(); 
        const newfiles = response.files as ClientFile[];
        this.clientFiles = [...this.clientFiles, ...newfiles];
        
        this.files = [];

      } catch (error) {
        this.ntf.showErrorMessage('Error en la operación','Ocurrio un error al guardar archivos');
      }
    }else {
      this.ntf.showWarningMessage('Precaución','No ha seleccionado archivos');
    }
  }
}