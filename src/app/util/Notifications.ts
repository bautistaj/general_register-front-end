
import swal from 'sweetalert2';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class Ntf {
  handleError(error:any):void{
    console.log(error);
    
    let errorMessage = '';

    switch(error.status){
      case 400:
          errorMessage = error.error.message;
        break;
      case 401:
          errorMessage = 'Usuario no autorizado';
        break;
      case 404:
          errorMessage = error.error.message;
        break;
      case 500:
          errorMessage = 'Error en servidor';
        break;
      default :
        errorMessage = 'Error inisperado';
        break;
    }
  
    swal.fire('Error', errorMessage ,'error');
  }

  showErrorMessage(title, message){
    swal.fire(title, message ,'error');
  }

  showSuccessMessage(title, message){
    swal.fire(title, message ,'success');
  }
  
  showSuccessWarning(title, message){
    swal.fire(title, message ,'warning');
  }
}