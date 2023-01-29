import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { ApiService } from 'src/app/Services/api.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  providers : [MessageService]
})
export class HomeComponent implements OnInit {

  constructor(private _apiService : ApiService , private fb : FormBuilder, private router : Router, private messageService : MessageService) { }

  loginForm = this.fb.group({
    loginName: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required])
  })

  adminloginForm = new FormGroup({
    email : new FormControl('',[Validators.required])
  })

  banners : any = [{image : 'assets/img/banner1-edited.png'},{image : 'assets/img/banner1-edited.png'},{image : 'assets/img/banner1-edited.png'}]

  products : any = [
    {image : 'assets/img/images/img1.jpeg'},
    {image : 'assets/img/images/img2.jpeg'},
    {image : 'assets/img/images/img3.jpeg'},
    {image : 'assets/img/images/img4.jpeg'},
    {image : 'assets/img/images/img5.jpeg'},
    {image : 'assets/img/images/img6.jpeg'},
    {image : 'assets/img/images/img7.jpeg'},
    {image : 'assets/img/images/img8.jpeg'},
    {image : 'assets/img/images/img9.jpeg'},
    {image : 'assets/img/images/img10.jpeg'},
    {image : 'assets/img/images/img11.jpeg'},
    {image : 'assets/img/images/img12.jpeg'},
    {image : 'assets/img/images/img13.jpeg'},
    {image : 'assets/img/images/img14.jpeg'},
  ]

  ngOnInit(): void {
  }

  loginFunction(login : NgForm) { 
    if(login.valid) {
      let object = {
        loginName : this.loginForm.value.loginName,
        loginPassword : this.loginForm.value.password
      }
      this._apiService.userAgentLogin(object).then((res : any) => {
        console.log(res);
        if(res?.returnValue) {
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

}
