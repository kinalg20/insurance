import { Component, OnInit } from '@angular/core';
import { AppUtility } from 'src/app/interceptor/apputitlity';
import { ApiService } from 'src/app/Services/api.service';

@Component({
  selector: 'app-dashboard-sidemenu',
  templateUrl: './dashboard-sidemenu.component.html',
  styleUrls: ['./dashboard-sidemenu.component.scss']
})
export class DashboardSidemenuComponent implements OnInit {

  menuList : any = [];
  roleName : string = '';
  constructor(private _apiService : ApiService , private _utility : AppUtility) { }

  ngOnInit(): void {
    this.getSideMenus();
  }


  getSideMenus(){
    let userObject = this._utility.getLocalStorageDetails();
    console.log(userObject?.userId); 
    this.roleName = userObject?.roleName;
    // this._apiService.getMenuSubMenu(userObject.userId).then((res:any)=>{
    //   console.log(res);  
    //   this.menuList = res.returnValue;    
    // })
  }

}
