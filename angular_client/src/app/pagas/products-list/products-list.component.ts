import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import { Router } from '@angular/router';
import { CommonService } from 'src/app/services/common.service';
import {MatPaginator} from '@angular/material/paginator';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.css']
})
export class ProductsListComponent implements OnInit {

  displayedColumns: string[] = ['position', 'product_title', '_id','quantity_total','quantity_booked','Available_Quantity','price','Action'];
  dataSource ;
  ELEMENT_DATA
  @ViewChild(MatPaginator, {}) paginator: MatPaginator;
  @ViewChild('content') content: ElementRef;
  constructor(private router: Router, private _CommonService: CommonService) { }

  ngOnInit() {
  this.getCustomers()

  }

  getCustomers(){
    let body ={
      customerId : 0,
      flag :2
    }
    this._CommonService.postApiCall("product",body).subscribe(data => {
      if(data['result']==1){
        this.ELEMENT_DATA = data['data'];
          for(let i = 0 ;this.ELEMENT_DATA.length >i ; i++){
            this.ELEMENT_DATA[i].position = i+1;
            this.ELEMENT_DATA[i].Available_Quantity = this.ELEMENT_DATA[i].quantity_total - this.ELEMENT_DATA[i].quantity_booked
          }
        this.dataSource = new MatTableDataSource<any>(this.ELEMENT_DATA);
      }
    })
  }

  addCustomer(){
    console.log("running aduser...");
    this.router.navigate(['/addproduct']);
  }


  deletProduct(Id){
    this._CommonService.deletApiCall('product',Id).subscribe(data =>{
      console.log(data);
       if(data['result']==1){
         //use toastr
         this.getCustomers();
       }
    })
  }
  assignProduct(data){
    data.isProduct = true;
    this._CommonService.seveData(data,);
    this.router.navigate(['/bookproduct']);
  }
  // public downloadPDF() {
  //   const doc = new jsPDF();
  //   const specialElementHandlers = {
  //     '#editor': function (element, renderer) {
  //       return true;
  //     }
  //   };

  //   const content = this.content.nativeElement;

  //   doc.fromHTML(content.innerHTML, 15, 15, {
  //     width: 190,
  //     'elementHandlers': specialElementHandlers
  //   });

  //   doc.save('test.pdf');
  // }
}
