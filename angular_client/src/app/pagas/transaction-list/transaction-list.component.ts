import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { CommonService } from 'src/app/services/common.service';
@Component({
  selector: 'app-transaction-list',
  templateUrl: './transaction-list.component.html',
  styleUrls: ['./transaction-list.component.css']
})
export class TransactionListComponent implements OnInit {
  displayedColumns: string[] = ['position', '_id', 'customer_id', 'product_id', "transation_type", 'transation_date_time', 'Action'];
  dataSource;
  ELEMENT_DATA
  @ViewChild(MatPaginator, {}) paginator: MatPaginator;
 
  constructor(private router: Router, private _CommonService: CommonService) { }

  ngOnInit() {
 this.getCustomers()

  }

  getCustomers() {
    let body = {
      customerId: 0,
      flag: 1
    }
    this._CommonService.postApiCall("transaction", body).subscribe(data => {
      console.log("data", data);

      if (data['result'] == 1) {
        this.ELEMENT_DATA = data['data'];
        for (let i = 0; this.ELEMENT_DATA.length > i; i++) {
          this.ELEMENT_DATA[i].position = i + 1;
        }
        this.dataSource = new MatTableDataSource<any>(this.ELEMENT_DATA);
      }
    })
  }

  addCustomer() {
    this.router.navigate(['/dashboard']);
  }
  deleteTrans(Id) {
    console.log(Id);
    this._CommonService.deletApiCall('transaction', Id).subscribe(data => {
      console.log(data);
      if (data['result'] == 1) {
        //use toastr
        this.getCustomers();
      }
    })
  }




}
