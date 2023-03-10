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
  filterval2: string = '';
  filterval1: string = '';
  dateFilterVal: Date[] | any;
  // dateFilterVal1: Date[] | any;
  @ViewChild('calendar1') private calendar1: any;
  typeOfFilter : any = 1;
  constructor(private _apiService: ApiService, private utility: AppUtility) { }

  ngOnInit(): void {
    this.getAllPolicy();
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
  totalPolicy : any = [];
  getAllPolicy(string?:any) {
    // debugger;
    let id = this.utility.getLocalStorageDetails();
    if(!string){
      string = '';
    }

    if(string == '' || string == 'dt5'){
      this._apiService.getPolicyByIdMaster(id.agentId).then((res: any) => {
        console.log(res);
        if (res.success) {
          this.policyData = res.returnValue;
        }
        else{
          this.policyData = [];
        }
      })
    }
    if(string == '' || string == 'dt3'){
      this._apiService.getNextMonthlyExpiryPolicyMaster().then((res: any) => {
        if (res.success) {
          this.nextMonthExpiryPolicy = res.returnValue;
        }
        else{
          this.nextMonthExpiryPolicy = [];
        }
      })
    }

    
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
    // debugger;
    if (string == 'calendar1') {
      if (this.dateFilterVal[0] != null && this.dateFilterVal[1] != null) {
        this.calendar1.overlayVisible = false;
        let object = {
          fromDate : this.utility.dateTimeChange(this.dateFilterVal[0]),
          toDate :this.utility.dateTimeChange( this.dateFilterVal[1])
        }

        if(this.typeOfFilter == '2'){
          this._apiService.getDateWiseExpiryPolicyMaster(object).then((res:any)=>{
            if(res.success){
              this.policyData = res.returnValue;
            }
            else{
              this.policyData = [];
            }
          })
        }
        
        else{
          this._apiService.getDateWisePolicy(object).then((res:any)=>{
            if(res.success){
              this.policyData = res.returnValue;
            }
            else{
              this.policyData = [];
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
      this.filterval1 = '';
      this.getAllPolicy('dt3');
    }
    else if (string == 'dt5') {
      this.filterval2 = '';
      this.getAllPolicy('dt5');
    }
    this.dateFilterVal = ''
  }
  exportExcel(){
    this._apiService.getNextMonthlyExpiryPolicyReport().then((res:any)=>{
      this.utility.downloadFile(res, 'NextMonthExpiryReport');
    })
  }

}
