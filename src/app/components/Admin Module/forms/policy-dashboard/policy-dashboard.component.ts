import { Component, OnInit, ViewChild } from '@angular/core';
import * as moment from 'moment';
import { Table } from 'primeng/table';
import { AppUtility } from 'src/app/interceptor/apputitlity';
import { ApiService } from 'src/app/Services/api.service';

@Component({
  selector: 'app-policy-dashboard',
  templateUrl: './policy-dashboard.component.html',
  styleUrls: ['./policy-dashboard.component.scss']
})
export class PolicyDashboardComponent implements OnInit {
  filterval1: string = '';
  filterval2: string = '';
  dateFilterVal: Date[] | any;
  dateFilterVal1: Date[] | any;
  filterval5: string;
  constructor(private _apiService: ApiService, private utility: AppUtility) { }

  ngOnInit(): void {
    this.getAllPolicy()
  }

  breadcrumb = [
    {
      title: 'Howdy, Andy!',
      subTitle: 'Dashboard'
    }
  ]


  policyData: any = [];
  @ViewChild('dt1') FilteredData: Table;
  @ViewChild('dt2') FilteredData1: Table;

  todayExpiryPolicy: any = [];
  nowMonthExpiryPolicy: any = [];
  getAllPolicy() {
    let id = this.utility.getLocalStorageDetails();
    this._apiService.getNowMonthlyExpiryPolicyMaster().then((res: any) => {
      console.log(res);
      if (res.success) {
        this.nowMonthExpiryPolicy = res.returnValue;
      }
    })

    this._apiService.getTodayExpiryPolicyMaster().then((res: any) => {
      if (res.success) {
        this.todayExpiryPolicy = res.returnValue;
      }
    })
  }

  CustomerData: any = {};
  displayPolicy: boolean = false;
  getData(data) {
    console.log(data);
    this.CustomerData = data;
    this.displayPolicy = true;
  }
  reset(dt, string: any) {
    dt.reset();
    console.log(dt);
    if (string == 'dt1') {
      this.filterval1 = '';
    }
    else if (string == 'dt2') {
      this.filterval2 = '';
    }
    this.dateFilterVal = ''
  }



  getDropdownValue(event) {
    console.log(event.target.value);

    if (event.target.value == 1) {
      let object: any = {};
      this._apiService.getDashboardMaster().then((res: any) => {
        console.log(res);
      })
    }
  }

}
