import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { DashbordComponent } from './pagas/dashbord/dashbord.component';
import { CustomerComponent } from './pagas/customer/customer.component';
import { LoginComponent } from './pagas/login/login.component';
import { AppLayoutComponent } from './pagas/app-layout/app-layout.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {   MatButtonModule,
  MatCheckboxModule,
  MatToolbarModule,
  MatIconModule,
  MatInputModule,
  MatButtonToggleModule,
  MatTableModule,
  MatSidenavModule,
  MatPaginatorModule,
  MatListModule,
  MatRadioModule,
  MatCardModule
 } from '@angular/material';
 import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonService } from './services/common.service';
import { HttpClientModule } from '@angular/common/http';
import { ProductsComponent } from './pagas/products/products.component';
import { ProductsListComponent } from './pagas/products-list/products-list.component';
import { TransactionListComponent } from './pagas/transaction-list/transaction-list.component';
import { CustomerListComponent } from './pagas/customer-list/customer-list.component';
import { AddProductComponent } from './pagas/add-product/add-product.component';
import { BookProductComponent } from './pagas/book-product/book-product.component';

@NgModule({
  declarations: [
    AppComponent,
    DashbordComponent,
    CustomerComponent,
    LoginComponent,
    AppLayoutComponent,
    ProductsComponent,
    ProductsListComponent,
    TransactionListComponent,
    CustomerListComponent,
    AddProductComponent,
    BookProductComponent
  ],
  imports: [
    HttpClientModule ,
    MatButtonModule,
    MatRadioModule,
    MatListModule,
    BrowserAnimationsModule,
    MatCheckboxModule,
    MatToolbarModule,
    MatIconModule,
    MatInputModule,
    MatButtonToggleModule,
    MatTableModule,
    MatSidenavModule,
    MatPaginatorModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserModule,
    MatRadioModule,
    MatCardModule,
    RouterModule.forRoot([
      {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full'
      },
      {
        path : '',
        component :AppLayoutComponent,
        children : [
          {
            path: 'dashboard' , 
            component: DashbordComponent
          },
          {
            path: 'customer' , 
            component: CustomerComponent
          },
          {
            path: 'product' , 
            component: ProductsComponent
          },
          {
            path: 'customerlist' , 
            component: CustomerListComponent
          },
          {
            path: 'productlist' , 
            component: ProductsListComponent
          },
          {
            path: 'addproduct' , 
            component: AddProductComponent
          },
          
          {
            path: 'transationlist' , 
            component: TransactionListComponent
          },
          {
            path: 'bookproduct' , 
            component: BookProductComponent
          },


        ]
      },
      {
        path: 'login',
        component: LoginComponent
      } , 
     
    ])
  ],
  providers: [CommonService],
  bootstrap: [AppComponent]
})
export class AppModule { }
