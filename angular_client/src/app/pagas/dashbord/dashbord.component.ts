import { Component, OnInit, ViewChild } from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import { Router } from '@angular/router';
import { CommonService } from 'src/app/services/common.service';
@Component({
  selector: 'app-dashbord',
  templateUrl: './dashbord.component.html',
  styleUrls: ['./dashbord.component.css']
})
export class DashbordComponent implements OnInit {
  displayedColumns: string[] = ['position', 'customer_name', '_id','customer_mail','Action'];
  dataSource ;
  ELEMENT_DATA
  @ViewChild(MatPaginator, {}) paginator: MatPaginator;

  constructor( private router: Router, private _CommonService: CommonService) { }
  ngOnInit() {
    let body ={
      customerId : 0,
      flag :1
    }
    this._CommonService.postApiCall("customer",body).subscribe(data => {
      if(data['result']==1){
        this._CommonService.setCustomerList(data['data']);
        this.ELEMENT_DATA = data['data'];
          for(let i = 0 ;this.ELEMENT_DATA.length >i ; i++){
            this.ELEMENT_DATA[i].position = i+1;
          }
        this.dataSource = new MatTableDataSource<any>(this.ELEMENT_DATA);
      }
    })

  }

  addCustomer(){
    console.log("running aduser...");
    
    this.router.navigate(['/customer']);
  }
  viewCustomer(data){
    data.isProduct = false;
     this._CommonService.seveData(data);
    this.router.navigate(['/product']);
  }
  
}


