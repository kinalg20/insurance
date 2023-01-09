import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/Services/api.service';
import { CommonFunction } from 'src/app/Utility/commonFunction';

@Component({
  selector: 'app-dashboard-sidemenu',
  templateUrl: './dashboard-sidemenu.component.html',
  styleUrls: ['./dashboard-sidemenu.component.scss']
})
export class DashboardSidemenuComponent implements OnInit {

  menuList : any = [];
  constructor(private _apiService : ApiService , private _utility : CommonFunction) { }

  ngOnInit(): void {
    this.getSideMenus();
  }


  getSideMenus(){
    let userObject = this._utility.getLocalStorageDetails();
    console.log(userObject?.userId);    
    // this._apiService.getMenuSubMenu(userObject.userId).then((res:any)=>{
    //   console.log(res);  
    //   this.menuList = res.returnValue;    
    // })
  }

}
