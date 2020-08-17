import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Product } from 'src/app/modes/Product';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import { CommonService } from 'src/app/services/common.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  displayedColumns: string[] = ['position', "_id",'product_id', 'quantity', 'transation_date_time','Action'];
  //dataSource = new MatTableDataSource<any>(ELEMENT_DATA);

  dataSource ;
  ELEMENT_DATA;
  userData;
  customer_name = "";
  customer_mail = "";
  _id = ""
  position = null
  @ViewChild(MatPaginator, {}) paginator: MatPaginator;
  // address = new Product();
  constructor( private _CommonService: CommonService,private router: Router) { }

  ngOnInit() {

    this.userData = this._CommonService.getData();
    if(this.userData){
      this.customer_mail = this.userData['customer_mail'];
      this.customer_name = this.userData['customer_name']
      this._id = this.userData['_id'];
      this.position = this.userData['position'];
      this.getProductList();
    }
    
   
  }
  addProduct(){
    let body ={
      customerId : 0,
      flag :2
    }
    this._CommonService.postApiCall("product",body).subscribe(data => {
      console.log(data);
      this._CommonService.setCustomerList(data['data'])
      this.router.navigate(['/bookproduct']);
    })
  
   
  
   
  }
getProductList(){
  let body ={
    customerId : 0,
    flag :3,
    customer_id: this._id
  }
  this._CommonService.postApiCall("transaction",body).subscribe(data => {
    if(data['result']==1){
      this.ELEMENT_DATA = data['data'];
        for(let i = 0 ;this.ELEMENT_DATA.length >i ; i++){
          this.ELEMENT_DATA[i].position = i+1;
        }
      this.dataSource = new MatTableDataSource<any>(this.ELEMENT_DATA);
    }
  })

}
onSubmit() {

}

}
const ELEMENT_DATA =[]
// const ELEMENT_DATA = [
//   {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
//   {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
//   {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
//   {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
//   {position: 5, name: 'Boron', weight: 10.811, symbol: 'B'},
//   {position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C'},
//   {position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N'},
//   {position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O'},
//   {position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F'},
//   {position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne'},
//   {position: 11, name: 'Sodium', weight: 22.9897, symbol: 'Na'},
//   {position: 12, name: 'Magnesium', weight: 24.305, symbol: 'Mg'},
//   {position: 13, name: 'Aluminum', weight: 26.9815, symbol: 'Al'},
//   {position: 14, name: 'Silicon', weight: 28.0855, symbol: 'Si'},
//   {position: 15, name: 'Phosphorus', weight: 30.9738, symbol: 'P'},
//   {position: 16, name: 'Sulfur', weight: 32.065, symbol: 'S'},
//   {position: 17, name: 'Chlorine', weight: 35.453, symbol: 'Cl'},
//   {position: 18, name: 'Argon', weight: 39.948, symbol: 'Ar'},
//   {position: 19, name: 'Potassium', weight: 39.0983, symbol: 'K'},
//   {position: 20, name: 'Calcium', weight: 40.078, symbol: 'Ca'},
// ];