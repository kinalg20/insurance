import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/Services/api.service';
// import { ApiServiceService } from 'src/app/api-service.service';
// import { AppUtility } from 'src/app/interceptor/appUtitlity';
// import { md5 } from 'src/md5';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
   

  constructor(private activate: ActivatedRoute, private _apiService : ApiService , private route : Router) { }

  errorMessage: string = ''
  errorMessageCheck: string = ''
  buttonvalue:string='Get OTP'

  ngOnInit(): void {
  } 
   //formGroup
   userFormControl = new FormGroup({
    emailAddress: new FormControl('', [Validators.required , Validators.pattern('[A-Za-z0-9._%-]+@[A-Za-z0-9._%-]+\\.[a-z]{2,3}')]),
    OTP: new FormControl(''),
  })

  //Login Supplier
  signinWithEmail() {
    // this._utility.loader(true);
    // console.log(this.userFormControl.value, this.userFormControl.valid);
    if(this.buttonvalue=="Get OTP"){  
    if (this.userFormControl.valid) {
      let signInObject = {
        loginName: this.userFormControl.value.emailAddress  
      }
      this._apiService.GetOTP(signInObject)
        .then((res: any) => {
          console.log(res);  
          debugger;        
          // this._utility.loader(false);
          if (res.success == false) {
            window.scroll(0, 0);
            this.errorMessage = res.message
            this.errorMessageCheck = 'error'
              this._apiService.showMessage(this.errorMessage , this.errorMessageCheck)
          }

          else {
            this.buttonvalue="Submit OTP";
            this.userFormControl.get('OTP').setValidators(Validators.required);
            //localStorage.setItem('UserObject', JSON.stringify(res.returnValue))
          
            // Object.keys(this.userFormControl.controls).forEach(key => {
            //   this.userFormControl.controls[key].setErrors(null)
            // });
           // this.route.navigateByUrl('/dashboard-my-profile');
          }
        })
    }
  }
    else{ 
      if (this.userFormControl.valid  ) {
        let signInObject = {
          loginName: this.userFormControl.value.emailAddress,
          OTP: this.userFormControl.value.OTP
        }
        this._apiService.userLogin(signInObject)
          .then((res: any) => {
            console.log(res);          
            // this._utility.loader(false);
            if (res.success == false) {
              window.scroll(0, 0);
              this.errorMessage = res.message
              if(res.message=='OTP Expire'){
                this.buttonvalue="Get OTP";
                this.userFormControl.reset();
                Object.keys(this.userFormControl.controls).forEach(key => {
              this.userFormControl.controls[key].setErrors(null)
            });
              }
              this.errorMessageCheck = 'error'
              this._apiService.showMessage(this.errorMessage , this.errorMessageCheck)
            }
  
            else {
              localStorage.setItem('UserObject', JSON.stringify(res.returnValue))
              this.userFormControl.reset();
              Object.keys(this.userFormControl.controls).forEach(key => {
                this.userFormControl.controls[key].setErrors(null)
              });
              this.route.navigateByUrl('/dashboard-my-profile');
            }
          })
      }

    }
   
    // else {
    //   this._utility.loader(false);
    //   this._apiService.showMessage('Please enter your email address or password' , 'error');
    // }
  }

  // validateEmail(event: any, string: any) {
  //   // let value = this._apiService.validateEmail(event);
  //   // console.log(value);
  //   // if (string == 'signin') {
  //   //   this.invalidEmail = value;
  //   // }
  // }

}
