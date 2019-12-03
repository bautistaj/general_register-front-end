import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes} from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { ClientsComponent } from './clients/clients.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { LoginComponent } from './users/login.component';
import { HttpClientModule } from '@angular/common/http';
import { FormComponent } from './clients/form.component';
import { PaginatorComponent } from './paginator/paginator.component';
import { DetailComponent } from './clients/detail/detail.component';
import { NgxDropzoneModule } from 'ngx-dropzone';

const routes: Routes = [
  { path: '', redirectTo: '/clients', pathMatch:'full'},
  { path: 'login', component: LoginComponent},
  { path: 'clients', component: ClientsComponent},
  { path: 'clients/form', component: FormComponent},
  { path: 'clients/form/:id', component: FormComponent},
  { path: 'clients/page/:page', component: ClientsComponent},

];

@NgModule({
  declarations: [
    AppComponent,
    ClientsComponent,
    HeaderComponent,
    FooterComponent,
    LoginComponent,
    FormComponent,
    PaginatorComponent,
    DetailComponent
  ],
  imports: [
    FormsModule,
    BrowserModule,
    HttpClientModule,
    NgxDropzoneModule,
    RouterModule.forRoot(routes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
