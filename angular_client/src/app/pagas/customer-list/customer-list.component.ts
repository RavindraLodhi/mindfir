import { Component, OnInit, ViewChild } from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import { Router } from '@angular/router';
import { CommonService } from 'src/app/services/common.service';
@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.css']
})
export class CustomerListComponent implements OnInit {
  displayedColumns: string[] = ['position', 'customer_name', '_id','customer_mail','Action'];
  dataSource ;
  ELEMENT_DATA
  @ViewChild(MatPaginator, {}) paginator: MatPaginator;

  constructor(private router: Router, private _CommonService: CommonService) { }

  ngOnInit() {
   this.getCustomers();
  }

  getCustomers(){
    let body ={
      customerId : 0,
      flag :1
    }
    this._CommonService.postApiCall("customer",body).subscribe(data => {
      if(data['result']==1){
        this.ELEMENT_DATA = data['data'];
          for(let i = 0 ;this.ELEMENT_DATA.length >i ; i++){
            this.ELEMENT_DATA[i].position = i+1;
          }
        this.dataSource = new MatTableDataSource<any>(this.ELEMENT_DATA);
      }
    })
  }

  addCustomer(){
    this.router.navigate(['/customer']);
  }
  viewCustomer(data){
     this._CommonService.seveData(data);
    this.router.navigate(['/product']);
  }
  deleteCus(Id){
    this._CommonService.deletApiCall('customer',Id).subscribe(data =>{
      console.log(data);
       if(data['result']==1){
         //use toastr
         this.getCustomers();
       }
    })
  }

}
