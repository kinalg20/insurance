import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/Services/api.service';
import { CommonFunction } from 'src/app/Utility/commonFunction';

@Component({
  selector: 'app-policy-dashboard',
  templateUrl: './policy-dashboard.component.html',
  styleUrls: ['./policy-dashboard.component.scss']
})
export class PolicyDashboardComponent implements OnInit {

  constructor(private _apiService : ApiService , private utility : CommonFunction) { }

  ngOnInit(): void {
    this.getAllPolicy()
  }

  breadcrumb = [
    {
      title: 'Howdy, Andy!',
      subTitle: 'Dashboard'
    }
  ]


  policyData : any = [];
  getAllPolicy(){
    let id = this.utility.getLocalStorageDetails();
    this._apiService.getPolicyByIdMaster(id.agentId).then((res:any)=>{
      console.log(res);
      if(res.success){
        this.policyData = res.returnValue;
      }
    })
  }

  CustomerData : any = {};
  displayPolicy : boolean = false;
  getData(data){
    console.log(data);
    this.CustomerData = data;
    this.displayPolicy = true;
  }

}
