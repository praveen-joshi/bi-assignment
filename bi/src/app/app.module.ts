import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AddProductComponent } from './add-product/add-product.component';
import { ProductsComponent } from './products/products.component';
import {TokenIntercepterService} from './services/token-interceptor.service';
import { EditProductComponent } from './edit-product/edit-product.component';
import{ AuthGuardService} from './services/auth-guard.service';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    AddProductComponent,
    ProductsComponent,
    EditProductComponent,
    PageNotFoundComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
  ],
  providers: [AuthGuardService,
    {provide:HTTP_INTERCEPTORS,
      useClass:TokenIntercepterService,
      multi:true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
