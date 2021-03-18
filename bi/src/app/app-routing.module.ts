import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddProductComponent } from './add-product/add-product.component';
import { EditProductComponent } from './edit-product/edit-product.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { ProductsComponent } from './products/products.component';
import { RegisterComponent } from './register/register.component';
import { AuthGuardService } from './services/auth-guard.service';

const routes: Routes = [
  { path:'', component:HomeComponent,canActivate:[AuthGuardService]},
  { path: 'login', component: LoginComponent},
  { path: 'register',component:RegisterComponent}  ,
  { path: 'products',component:ProductsComponent,canActivate:[AuthGuardService]}  ,
  { path: 'add_product',component:AddProductComponent,canActivate:[AuthGuardService]}  ,
  { path: 'edit_product/:id',component:EditProductComponent,canActivate:[AuthGuardService]}  ,
  { path: '**',component:PageNotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
