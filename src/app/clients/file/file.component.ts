import { Component, OnInit, Input } from '@angular/core';
import { ModalService } from '../detail/modal.service';
import { ActivatedRoute } from '@angular/router';
import { Ntf } from 'src/app/util/Notifications';
import { ClientService } from '../client.service';
import { Client } from '../client';
import { ModalFileService } from './modal-file.service';

@Component({
  selector: 'app-file',
  templateUrl: './file.component.html',
  styleUrls: ['./file.component.css']
})
export class FileComponent implements OnInit {
  public title: string;
  public files: File[] = [];
  @Input() client: Client;
  constructor(private clientService: ClientService, 
    private ntf: Ntf,
    public modalFileService: ModalFileService) { }

  ngOnInit() {
    this.title = `${this.client.name} ${this.client.firstLastName} ${this.client.secondLastName}`;
  }

  closeModal() {
    this.modalFileService.closeModal();
  }

  downloadFile(){
    console.log('downloadFile');
  }

  onSelect(event){
    this.files.push(...event.addedFiles);
  }

  onRemove(event){
    this.files.splice(this.files.indexOf(event), 1);
  }
}
