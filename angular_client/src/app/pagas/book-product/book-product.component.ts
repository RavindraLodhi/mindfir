import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { CommonService } from 'src/app/services/common.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-book-product',
  templateUrl: './book-product.component.html',
  styleUrls: ['./book-product.component.css']
})
export class BookProductComponent implements OnInit {
  transation_type = new FormControl('');
  quantity = new FormControl('');
  transation_id_parent = new FormControl('');
  customer_Name;
  allCustomers = [];
  customer_id: any;
  allProduct = [];
  productId
  isProduct: boolean = false;
  totalQuantity : number ;
  bookedquantity : number;
  constructor(private _CommonService: CommonService, private router: Router) { }

  ngOnInit() {

    this.allProduct = this._CommonService.getData();
   
    if (this.allProduct['isProduct']) {
      this.isProduct = this.allProduct['isProduct'];
      this.totalQuantity =  this.allProduct['quantity_total'];
      this.bookedquantity =  this.allProduct['quantity_booked'];
    }
    this.allCustomers = this._CommonService.getCustomerList();
    if (this.allCustomers) {
      this.customer_id = this.allCustomers[0]._id;
    }

    if (this.allProduct) {
      this.productId = this.allProduct['_id']
    }

  }
  customerSelect(value) {
    this.customer_id = value
  }
  onSubmit() {
if(this.totalQuantity >  this.bookedquantity){
  if (this.transation_type.value != undefined && this.quantity.value != undefined && this.transation_id_parent.value != undefined) {
    let body
        if (this.isProduct) {
           body = {
            transation_type: this.transation_type.value,
            quantity: this.quantity.value,
            transation_id_parent: this.transation_id_parent.value,
            customer_id: this.customer_id,
            product_id: this.productId,
            book_quantity :(this.bookedquantity+ parseInt(this.quantity.value)),
            flag: 2
          } 
  
        } else {
           body = {
            transation_type: this.transation_type.value,
            quantity: this.quantity.value,
            transation_id_parent: this.transation_id_parent.value,
            customer_id: this.productId,
            product_id: this.customer_id,
            book_quantity : this.bookedquantity + this.quantity.value,
            flag: 2
          }
  
        }
  
  
        this._CommonService.postApiCall("transaction", body).subscribe(data => {
          console.log(data);
  
          if (data['result'] == 1) {
            this.router.navigate(['/productlist']);
          }
        })
      }
      else {

        alert("NO more product remining..")
  
      }
}else{}


  }
}
