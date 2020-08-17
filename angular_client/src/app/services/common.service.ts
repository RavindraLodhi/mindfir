import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class CommonService {
  userSelected : any;
  allCustomer : any
  constructor(private _http: HttpClient) { }


  postApiCall(apiName, body) {
    return this._http.post("http://localhost:3000/"+apiName, body)
  }

  getApiCall(apiName, bodu) {
    return this._http.get('nana')
  }

  deletApiCall(apiName, id) {
    console.log(id,apiName);
    
    return this._http.delete('http://localhost:3000/'+apiName+"/"+id)
  }
  seveData(item){
    this.userSelected = item;
  }

  getData(){
    console.log(this.userSelected);
    
    if(this.userSelected)
    return this.userSelected;
    else
    return [{isProduct : false}]
  }
  setCustomerList(data){
    this.allCustomer = data
  }
  getCustomerList(){
    return this.allCustomer 
  }
}
