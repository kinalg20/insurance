import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { ApiService } from 'src/app/Services/api.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  providers: [MessageService]
})
export class HomeComponent implements OnInit {

  constructor(private _apiService: ApiService, private fb: FormBuilder, private router: Router, private messageService: MessageService) { }

  loginForm = this.fb.group({
    loginName: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required])
  })

  responsiveOptions = [
    {
        breakpoint: '1024px',
        numVisible: 3,
        numScroll: 3
    },
    {
        breakpoint: '768px',
        numVisible: 2,
        numScroll: 2
    },
    {
        breakpoint: '560px',
        numVisible: 1,
        numScroll: 1
    }
];

  adminloginForm = new FormGroup({
    email: new FormControl('', [Validators.required])
  })

  userFormControl = new FormGroup({
    emailAddress: new FormControl('', [Validators.required, Validators.pattern('[A-Za-z0-9._%-]+@[A-Za-z0-9._%-]+\\.[a-z]{2,3}')]),
    OTP: new FormControl(''),
  })

  banners: any = [{ image: 'assets/img/banner1-edited.png' }, { image: 'assets/img/banner1-edited.png' }, { image: 'assets/img/banner1-edited.png' }]

  errorMessage: string = ''
  errorMessageCheck: string = ''
  buttonvalue: string = 'Get OTP'

  products: any = [
    { image: 'assets/img/images/banner.jpg' },
    { image: 'assets/img/images/img2.jpeg' },
    { image: 'assets/img/images/img3.jpeg' },
    { image: 'assets/img/images/img4.jpeg' },
    { image: 'assets/img/images/img5.jpeg' },
    { image: 'assets/img/images/img6.jpeg' },
    { image: 'assets/img/images/img7.jpeg' },
    { image: 'assets/img/images/img8.jpeg' },
    { image: 'assets/img/images/img9.jpeg' },
    { image: 'assets/img/images/img10.jpeg' },
    { image: 'assets/img/images/img11.jpeg' },
    { image: 'assets/img/images/img12.jpeg' },
    { image: 'assets/img/images/img13.jpeg' },
    { image: 'assets/img/images/img14.jpeg' },
  ]

  ngOnInit(): void {
  }

  loginFunction(login: NgForm) {
    if (login.valid) {
      let object = {
        loginName: this.loginForm.value.loginName,
        loginPassword: this.loginForm.value.password
      }
      this._apiService.userAgentLogin(object).then((res: any) => {
        console.log(res);
        if (res?.returnValue) {
          localStorage.setItem('UserObject', JSON.stringify(res.returnValue));
          this.loginForm.reset();
          Object.keys(this.loginForm.controls).forEach(key => {
            this.loginForm.controls[key].setErrors(null)
          });
          this.router.navigateByUrl('/dashboard-my-profile');
        }
        else {
          // this._apiService.showMessage('error', 'Please Fill Correct Value!')
          this.messageService.add({ severity: 'error', summary: 'error', detail: 'Please Fill Correct Details!' });
        }
      })
    }
    else {
      this.messageService.add({ severity: 'error', summary: 'error', detail: 'Please Fill All the Details!' });
    }
  }
  loginForAgent() {
    if (this.buttonvalue == "Get OTP") {
      if (this.userFormControl.valid) {
        let signInObject = {
          loginName: this.userFormControl.value.emailAddress
        }
        this._apiService.GetOTP(signInObject)
          .then((res: any) => {
            console.log(res);
            // this._utility.loader(false);
            if (res.success == false) {
              window.scroll(0, 0);
              this.errorMessage = res.message
              this.errorMessageCheck = 'error'
              this._apiService.showMessage(this.errorMessage, this.errorMessageCheck)
            }

            else {
              this.buttonvalue = "Submit OTP";
              this.userFormControl.get('OTP').setValidators(Validators.required);
            }
          })
      }
    }
    else {
      if (this.userFormControl.valid) {
        let signInObject = {
          loginName: this.userFormControl.value.emailAddress,
          OTP: this.userFormControl.value.OTP
        }
        this._apiService.userLogin(signInObject)
          .then((res: any) => {
            console.log(res);
            if (res.success == false) {
              window.scroll(0, 0);
              this.errorMessage = res.message
              if (res.message == 'OTP Expire') {
                this.buttonvalue = "Get OTP";
                this.userFormControl.reset();
                Object.keys(this.userFormControl.controls).forEach(key => {
                  this.userFormControl.controls[key].setErrors(null)
                });
              }
              this.errorMessageCheck = 'error'
              this._apiService.showMessage(this.errorMessage, this.errorMessageCheck)
            }

            else {
              localStorage.setItem('UserObject', JSON.stringify(res.returnValue))
              this.userFormControl.reset();
              Object.keys(this.userFormControl.controls).forEach(key => {
                this.userFormControl.controls[key].setErrors(null)
              });
              this.router.navigateByUrl('/dashboard-my-profile');
            }
          })
      }

    }
  }

  scroll(el: HTMLElement) {
    el.scrollIntoView({ behavior: 'smooth' });
    this.displayMenu = false;
  }

  displayMenu : boolean = false;
  openMenu() {
    this.displayMenu = !this.displayMenu
  }
}
