import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { login } from 'src/app/modes/login';
import { Router } from '@angular/router';
import { CommonService } from 'src/app/services/common.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  userNae = new FormControl('');
  password = new FormControl('');
  constructor(
    private _CommonService: CommonService,
    private router: Router
  ) { }

  ngOnInit() {

  }

  onSubmit() {
    console.log("hshshs");
    if (this.userNae.value != undefined && this.password.value != undefined) {
      let body: login = {
        user: this.userNae.value,
        password: this.password.value
      }
      console.log();
      this._CommonService.postApiCall("user", body).subscribe(data => {
        if (data['result'] == 1) {
          this.router.navigate(['/dashboard']);
        }
        else{
          alert("something went wrong")
        }
      })
    }

  }

}
