import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/Services/api.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private _apiService : ApiService , private fb : FormBuilder, private router : Router) { }

  loginForm = this.fb.group({
    loginName: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required])
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

  }

}
