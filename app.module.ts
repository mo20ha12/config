import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './Components/navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';
import { HomeComponent } from './home/home.component';
import { NotfoundComponent } from './notfound/notfound.component';
import { CartComponent } from './cart/cart.component';
import { LoginComponent } from './login/login.component';
import { CategoriesComponent } from './categories/categories.component';
import { BrandsComponent } from './brands/brands.component';
import { RegisterComponent } from './register/register.component';
import { ProductesComponent } from './productes/productes.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import{HttpClientModule}from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule}from '@angular/platform-browser/animations'
import { CarouselModule } from 'ngx-owl-carousel-o';
import { ProductdetailsComponent } from './component/productdetails/productdetails.component';
import { SearchPipe } from './search.pipe';
import { BrandesdetailsComponent } from './brandesdetails/brandesdetails.component';
import { CategorySliderComponent } from './Components/category-slider/category-slider.component';
import { MainSliderComponent } from './Components/main-slider/main-slider.component';
import { SubcategoryComponent } from './subcategory/subcategory.component';
import { ToastrModule } from 'ngx-toastr';
import { ShippAddressComponent } from './shipp-address/shipp-address.component';
import { WishlistComponent } from './wishlist/wishlist.component';
import { ForgetpasswordComponent } from './forgetpassword/forgetpassword.component';
import { AddressComponent } from './address/address.component';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
    HomeComponent,
    NotfoundComponent,
    CartComponent,
    LoginComponent,
    CategoriesComponent,
    BrandsComponent,
    RegisterComponent,
    ProductesComponent,
    ProductdetailsComponent,MainSliderComponent,
    SearchPipe,BrandesdetailsComponent,
    CategorySliderComponent, 
    SubcategoryComponent, 
    ShippAddressComponent,
    WishlistComponent,
    ForgetpasswordComponent,
    AddressComponent,

  ],
  imports: [
    BrowserModule,FormsModule,ToastrModule.forRoot(),
    RouterModule,BrowserAnimationsModule,CarouselModule,
    AppRoutingModule,ReactiveFormsModule,HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
