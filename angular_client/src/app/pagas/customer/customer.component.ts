import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { CommonService } from 'src/app/services/common.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent implements OnInit {
  customerName = new FormControl('');
  email = new FormControl('');
  MobileNo = new FormControl('');
  constructor(private _CommonService: CommonService,private router: Router) {
   
   }

  ngOnInit() {
  }

  onSubmit(){
    if(this.MobileNo.value != undefined && this.customerName.value != undefined && this.email.value !=undefined){
     let body = {
      name : this.customerName.value,
      email : this.email.value,
      mobileNo : this.MobileNo.value,
      flag : 2
     }
     
      this._CommonService.postApiCall("customer",body).subscribe(data =>{
      if(data['result']==1){
        this.router.navigate(['/dashboard']);
      }  
      })
    } 
    else{

    }
  }

}
