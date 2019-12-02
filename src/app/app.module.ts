import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes} from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { ClientsComponent } from './clients/clients.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatMenuModule } from '@angular/material/menu';
import { LoginComponent } from './users/login.component';
import { HttpClientModule } from '@angular/common/http';
import { FormComponent } from './clients/form.component';
import { PaginatorComponent } from './paginator/paginator.component';

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
    PaginatorComponent
  ],
  imports: [
    FormsModule,
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot(routes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
