import { Component, OnInit } from '@angular/core';
import { Client } from './client';
import { ClientService } from './client.service';
import { Ntf } from '../util/Notifications';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html'
})
export class FormComponent implements OnInit {
  private client: Client = new Client();
  public title: string = 'Crear cliente';
  constructor(private clientService: ClientService, 
    private ntf: Ntf,
    private router: Router,
    private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.loadClient();
  }

  async loadClient() {
    this.activatedRoute.params.subscribe( async params => {
      let id = params['id'];
      if(id){
        try {
          this.client = await this.clientService.getClient(id).toPromise();
        } catch (error) {
          this.ntf.handleError(error);
          this.router.navigate(['/clients']);
        }
      }
    });
  }

  async create() {
    try {
      
      this.client.createdAt = new Date();
      await this.clientService.create(this.client).toPromise();

      this.ntf.showSuccessMessage('Operación exitosa','El cliente se registro correctamente');  
      this.router.navigate(['/clients']);
      
    } catch (error) {
      this.ntf.handleError(error);
    }
    
  }

  async update(){
    try {
      
      await this.clientService.update(this.client).toPromise();
      
      this.ntf.showSuccessMessage('Operación exitosa','El cliente se actualizo exitosamente');  
      this.router.navigate(['/clients']);

    } catch (error) {
      this.ntf.handleError(error);
    }
  }
}
