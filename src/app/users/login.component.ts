import { Component, OnInit } from '@angular/core';
import { User } from './user';
import swal from 'sweetalert2';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';
import { Ntf } from '../util/Notifications';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public title: string = 'Sign in';
  public user: User;
  constructor(private authService: AuthService, 
    private router: Router, private ntf: Ntf) { 
    this.user = new User();
  }

  ngOnInit() {
    if(this.authService.isAuthenticated()){
      this.router.navigate(['/clients']);
      this.ntf.showSuccessMessage('Bienvenido',`Hola ${this.authService.user.username}!!`);
    }
  }

  async login() {
    if(!this.user.username || !this.user.password){
      this.ntf.showErrorMessage('Error Login','Username o password no validos');
      return;
    }
    try {
      const response = await this.authService.login(this.user).toPromise();
      const payload = JSON.parse(atob(response.access_token.split('.')[1]));
      this.authService.saveDataUser(payload);
      this.authService.saveToken(response.access_token);

      const user = this.authService.user;

      this.router.navigate(['/clients']);
      this.ntf.showSuccessMessage('Bienvenido',`Hola ${user.username}!!`);

    } catch (error) {
      this.ntf.handleError(error);
    }
  }
}
