import { Component, OnInit } from '@angular/core';
import { AuthService } from '../users/auth.service';
import { Route } from '@angular/compiler/src/core';
import { Router } from '@angular/router';
import swal from 'sweetalert2';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  public title: string = 'Collecta';

  constructor(private authService: AuthService, private router: Router ) { }

  ngOnInit() {
  }

  logout():void {
    this.authService.logout();
    swal.fire('Logout', 'Ha cerrado sesión','success');
    this.router.navigate(['/login']);
  }
}
