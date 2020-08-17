import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { CommonService } from 'src/app/services/common.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {
  quantity_total = new FormControl('');
  product_title = new FormControl('');
  price = new FormControl('');
  constructor(private _CommonService: CommonService,private router: Router) { }

  ngOnInit() {
    
  }
  
  onSubmit(){
    if(this.quantity_total.value != undefined && this.product_title.value != undefined && this.price.value !=undefined){
     let body = {
      quantity_total : this.quantity_total.value,
      product_title : this.product_title.value,
      price : this.price.value,
      quantity_booked : 0,
      flag :1
     }
     
      this._CommonService.postApiCall("product",body).subscribe(data =>{
        console.log(data);
        
      if(data['result']==1){
        this.router.navigate(['/productlist']);
      }  
      })
    } 
    else{

    }
  }

}
