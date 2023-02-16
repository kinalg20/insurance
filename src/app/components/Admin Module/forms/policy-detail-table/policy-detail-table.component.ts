import { Component, OnInit, ViewChild } from '@angular/core';
import { Table } from 'primeng/table';
import { AppUtility } from 'src/app/interceptor/apputitlity';
import { ApiService } from 'src/app/Services/api.service';

@Component({
  selector: 'app-policy-detail-table',
  templateUrl: './policy-detail-table.component.html',
  styleUrls: ['./policy-detail-table.component.scss']
})


export class PolicyDetailTableComponent implements OnInit {
  filterval4: string = '';
  filterval3: string = '';
  dateFilterVal: Date[] | any;
  // dateFilterVal1: Date[] | any;
  @ViewChild('calendar1') private calendar1: any;
  typeOfFilter : any = 1;
  filterval5: string;
  constructor(private _apiService: ApiService, private utility: AppUtility) { }

  ngOnInit(): void {
    this.getAllPolicy()
  }

  breadcrumb = [
    {
      title: 'Policies',
      subTitle: 'Dashboard'
    }
  ]


  policyData: any = [];
  @ViewChild('dt3') FilteredData2: Table;
  @ViewChild('dt5') FilteredData4: Table;
  nextMonthExpiryPolicy: any = [];
  dateWiseFilterPolicy : any = [];
  totalPolicy : any = [];
  getAllPolicy() {
    let id = this.utility.getLocalStorageDetails();
    this._apiService.getPolicyByIdMaster(id.agentId).then((res: any) => {
      console.log(res);
      if (res.success) {
        this.policyData = res.returnValue;
      }
    })

    this._apiService.getNextMonthlyExpiryPolicyMaster().then((res: any) => {
      if (res.success) {
        this.nextMonthExpiryPolicy = res.returnValue;
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


  searchFilter(event: any, string?: any) {
    console.log(this.dateFilterVal);
    if (string == 'calendar1') {
      if (this.dateFilterVal[0] != null && this.dateFilterVal[1] != null) {
        this.calendar1.overlayVisible = false;
        let object = {
          fromDate : this.utility.dateFormat(this.dateFilterVal[0]),
          toDate :this.utility.dateFormat( this.dateFilterVal[1])
        }

        if(this.typeOfFilter == '2'){
          this._apiService.getDateWiseExpiryPolicyMaster(object).then((res:any)=>{
            if(res.success){
              this.dateWiseFilterPolicy = res.returnValue;
            }
          })
        }
        
        else{
          this._apiService.getDateWisePolicy(object).then((res:any)=>{
            if(res.success){
              this.dateWiseFilterPolicy = res.returnValue;
            }
          })
        }
      }
    }
  }

  reset(dt, string: any) {
    dt.reset();
    console.log(dt);
    if (string == 'dt3') {
      this.filterval3 = '';
    }
    else if (string == 'dt5') {
      this.filterval5 = '';
    }
    this.dateFilterVal = ''
  }



  getDropdownValue(event) {
    console.log(event.target.value);
    this.dateFilterVal = [];
  }

}
