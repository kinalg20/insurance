import { Component, OnInit, ViewChild } from '@angular/core';
import * as moment from 'moment';
import { Table } from 'primeng/table';
import { ApiService } from 'src/app/Services/api.service';
import { CommonFunction } from 'src/app/Utility/commonFunction';

@Component({
  selector: 'app-policy-dashboard',
  templateUrl: './policy-dashboard.component.html',
  styleUrls: ['./policy-dashboard.component.scss']
})
export class PolicyDashboardComponent implements OnInit {
  filterval: string = '';
  dateFilterVal: Date[] |  any;
  @ViewChild('calendar') private calendar: any;
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
  @ViewChild ('dt') FilteredData:Table;


  dropdown = [
    {id : 1  , value : 'Date wise Policy'},
    {id : 2  , value : 'Date wise Expiry Policy'},
    {id : 3  , value : 'Today Expiry Policy'},
    {id : 4  , value : 'This Month Expiry Policy'},
    {id : 5  , value : 'Next Month Expiry Policy'}
  ]
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


  searchFilter(event?: any) {
    console.log(this.dateFilterVal);
    // let date = moment(event).format('DD-MM-YYYY');
    if(this.dateFilterVal?.length  > 1){
      this.calendar.overlayVisible = false;
    }
    // this.FilteredData.filter(date, 'billDate', 'contains');
  }

  reset(dt) {
    dt.reset();
    this.filterval = '';
    // this.dateFilterVal = ''
  }

}
