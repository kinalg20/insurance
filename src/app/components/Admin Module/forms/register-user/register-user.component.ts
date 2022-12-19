import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, FormGroupDirective, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
// import { AppUtility } from 'src/app/Utilities/Apputility';
// import { ApiServiceService } from 'src/app/api-service.service';
// import { md5 } from 'src/md5';

@Component({
  selector: 'app-register-user',
  templateUrl: './register-user.component.html',
  styleUrls: ['./register-user.component.scss']
})
export class RegisterUserComponent implements OnInit {
  constructor(private activate: ActivatedRoute , private formBuilder : FormBuilder) { }
  errorMessage: string = ''
  errorMessageCheck: string = ''
  userArray : any;
  invalidEmail : boolean = false;
  submitButton : string = 'Submit'

  //formGroup
  userRegisterFormControl = new FormGroup(
    {
      emailAddress: new FormControl('', [Validators.required , Validators.pattern('[A-Za-z0-9._%-]+@[A-Za-z0-9._%-]+\\.[a-z]{2,3}')]),
      name: new FormControl('', [Validators.required]),
      address: new FormControl('', [Validators.required]),
      mobile_no: new FormControl('', [Validators.required , Validators.pattern('^((\\+91-?)|0)?[0-9]{10}$')]),
      password: new FormControl('', [Validators.required , Validators.minLength(8), Validators.pattern('(?=.*[A-Za-z])(?=.*[0-9])(?=.*[$@$!#^~%*?&,.<>"\'\\;:\{\\\}\\\[\\\]\\\|\\\+\\\-\\\=\\\_\\\)\\\(\\\)\\\`\\\/\\\\\\]])[A-Za-z0-9\d$@].{8,}')]),
      confirmPassword: new FormControl('', [Validators.required])
    },
    // [AppUtility.MatchValidator('password', 'confirmPassword')]
  )
  
  

  ngOnInit(): void {
    // this.getRegisteredUser();
  }

  breadcrumb = [
    {
      title: 'Register User',
      subTitle: 'Dashboard'
    }
  ]

  //Login Supplier
  registerUser(signup : FormGroupDirective) {
    console.log(this.userRegisterFormControl.value, this.userRegisterFormControl.valid);
    if(this.userRegisterFormControl.valid){
      this.userRegisterFormControl.reset();
        Object.keys(this.userRegisterFormControl.controls).forEach(key => {
          this.userRegisterFormControl.controls[key].setErrors(null);
        });
        signup.resetForm();
    }
    // if (this.userRegisterFormControl.valid && !this.invalidEmail && !this.invalidMobile) {
    // this._utility.loader(true);
    //  if(this.submitButton == 'Submit'){
    //   let signUpObject = {
    //     loginName: this.userRegisterFormControl.value.emailAddress,
    //     loginPassword: this.userRegisterFormControl.value.password,
    //     userName: this.userRegisterFormControl.value.name,
    //     address: this.userRegisterFormControl.value.address,
    //     mobileNo: this.userRegisterFormControl.value.mobile_no,
    //     roleName : 'User'
    //   }
    //   this._apiService.register(signUpObject)
    //     .then((res: any) => {
    //       this._utility.loader(false);
    //       if (res.success == false) {
    //         window.scroll(0, 0);
    //         this.errorMessage = res.message
    //         this.errorMessageCheck = 'error'
    //         this._apiService.showMessage(this.errorMessage , this.errorMessageCheck)
    //       }

    //       else {
    //         this.errorMessage = res.message
    //         this.errorMessageCheck = 'success'
    //         this._apiService.showMessage(this.errorMessage , this.errorMessageCheck);
    //         this.userRegisterFormControl.reset();
    //         Object.keys(this.userRegisterFormControl.controls).forEach(key => {
    //           this.userRegisterFormControl.controls[key].setErrors(null);
    //         });
    //         signup.resetForm();
    //         this.getRegisteredUser();
    //       }
    //     })
    //  }

    //  else {
    //   let signUpObject = {
    //     loginName: this.userRegisterFormControl.value.emailAddress,
    //     loginPassword: md5(this.userRegisterFormControl.value.password),
    //     userName: this.userRegisterFormControl.value.name,
    //     address: this.userRegisterFormControl.value.address,
    //     mobileNo: this.userRegisterFormControl.value.mobile_no,
    //     roleName : 'User',
    //     loginId : this.editUserId
    //   }

    //   this._apiService.updateUserInfo(signUpObject).then((res:any)=>{
    //     console.log(res);   
    //     this._utility.loader(false);
    //     if(res.success == true){
    //       this.errorMessage = res.message
    //       this.errorMessageCheck = 'success'
    //       this.userRegisterFormControl.reset();
    //       Object.keys(this.userRegisterFormControl.controls).forEach(key => {
    //         this.userRegisterFormControl.controls[key].setErrors(null)
    //       });
    //       signup.resetForm();
    //       this.getRegisteredUser();
          
    //     }   
    //     else {
    //       this.errorMessage = res.message
    //       this.errorMessageCheck = 'error'
    //       this._apiService.showMessage(this.errorMessage , this.errorMessageCheck);
    //     } 
    //   })
    //  }
    // }

    // else {
    //   this._utility.loader(false);
    //   this.errorMessage = 'Please fill form details'
    //   this.errorMessageCheck = 'error'
    //   this._apiService.showMessage(this.errorMessage , this.errorMessageCheck);
    // }
  }

  validateEmail(event: any, string: any) {
    // let value = this._apiService.validateEmail(event);
    // console.log(value);
    // if (string == 'signin') {
    //   this.invalidEmail = value;
    // }
  }

  validateNumber(event) {
    const keyCode = event.keyCode;

    const excludedKeys = [8, 37, 39, 46];

    if (!((keyCode >= 48 && keyCode <= 57) ||
      (keyCode >= 96 && keyCode <= 105) ||
      (excludedKeys.includes(keyCode)))) {
      event.preventDefault();
    }
  }

  
  invalidMobile: boolean = false;
  phone: string = ''
  // validate user mobile number
  validateMobile(event: any) {
    // this.invalidMobile = this._utility.validateMobile(event);
  }

  getRegisteredUser(){
    // this._apiService.getAllRegisteredUser().then((res:any)=>{
    //   this.userArray = res.returnValue; 
    // })
  }

  editUserId : any;
  EditItem(customer : any){
    console.log(customer);
      this.userRegisterFormControl.controls["emailAddress"].setValue(customer["loginName"]);
      this.userRegisterFormControl.controls["name"].setValue(customer["userName"]);
      this.userRegisterFormControl.controls["mobile_no"].setValue(customer["mobileNo"]);
      this.userRegisterFormControl.controls["address"].setValue(customer["address"]);
      this.userRegisterFormControl.controls["password"].setValue(customer["loginPassword"]);
      this.userRegisterFormControl.controls["confirmPassword"].setValue(customer["loginPassword"]);
      // this.confirmPassword = customer["loginPassword"];
      this.editUserId = customer.loginId
    this.submitButton = 'Update'
  }
}
