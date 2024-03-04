import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { BrandsComponent } from './brands/brands.component';
import { CategoriesComponent } from './categories/categories.component';
import { CartComponent } from './cart/cart.component';
import { ProductesComponent } from './productes/productes.component';
import { authguardGuard } from './guard/authguard.guard';
import { NotfoundComponent } from './notfound/notfound.component';
import { ProductdetailsComponent } from './component/productdetails/productdetails.component';
import { BrandesdetailsComponent } from './brandesdetails/brandesdetails.component';
import { SubcategoryComponent } from './subcategory/subcategory.component';
import { AllordersComponent } from './allorders/allorders.component';
import { WishlistComponent } from './wishlist/wishlist.component';
import { ForgetpasswordComponent } from './forgetpassword/forgetpassword.component';
import { AddressComponent } from './address/address.component';
import { ShippAddressComponent } from './shipp-address/shipp-address.component';


const routes: Routes = [

  {path:'', redirectTo:'home', pathMatch:'full'},
  {path:"forgetpassword", component:ForgetpasswordComponent, title:"forgetpassword"},
  {path:"home",canActivate:[authguardGuard] ,component:HomeComponent, title:"home"},
  {path:"allorders",canActivate:[authguardGuard] ,component:AllordersComponent, title:"home"},
  {path:"register", component:RegisterComponent, title:"register"},
  {path:"login", component:LoginComponent, title:"login"},
  {path:"brands",canActivate:[authguardGuard], component:BrandsComponent, title:"brands"},
  {path:"categories",canActivate:[authguardGuard], component:CategoriesComponent, title:"categories"},
  {path:"cart",canActivate:[authguardGuard], component:CartComponent, title:"cart"},
  {path:"productes",canActivate:[authguardGuard], component:ProductesComponent, title:"products"},
  {path:"productdetails/:id",canActivate:[authguardGuard], component:ProductdetailsComponent, title:"productdetails"},
  {path:"brandesdetails/:id",canActivate:[authguardGuard], component:BrandesdetailsComponent, title:"brandesdetails"},
  {path:"subcategory/:id",canActivate:[authguardGuard], component:SubcategoryComponent, title:"subcategory"},
  {path:"Address",canActivate:[authguardGuard], component:AddressComponent, title:"Address"},
  {path:"shippaddress/:id",canActivate:[authguardGuard], component:ShippAddressComponent, title:"shippAddress"},
  {path:"wishList",canActivate:[authguardGuard], component:WishlistComponent, title:"wish List"},
  {path:'**',component:NotfoundComponent, title:'notfound'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
