import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { AppUtility } from 'src/app/interceptor/apputitlity';
import { ApiService } from 'src/app/Services/api.service';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.scss']
})
export class ReportsComponent implements OnInit {
  dateFilterVal : Date;
  @ViewChild('calendar1') private calendar1: any;
  constructor(private _apiService: ApiService , private utility : AppUtility) { }

  ngOnInit(): void {
    this.getStatic();
  }

  breadcrumb = [
    {
      title: 'Reports',
      subTitle: 'Dashboard'
    }
  ]

  reportMaster = new FormGroup({
    vallageId: new FormControl('0'),
    agentId: new FormControl('0'),
    insuranceTypeId: new FormControl('0'),
    vechileTypeId: new FormControl('0'),
    companyId : new FormControl('0'),
    policyTypeId: new FormControl('0')
  })

  AgentDropdown : any = [];
  typeOfFilter : string = '';
  vallageDropdown : any = []
  InsuranceTypeDropdown : any = [];
  VechileTypeDropdown : any = [];
  CompanyDropdown : any = [];
  CommissionDropdown : any = [];
  stateDropdown : any = [];
  countryDropdown : any = [];
  policyTypeDropdown : any = [];
  getStatic() {
    this._apiService.getAgentMaster().then((res:any)=>{
      if(res.success){
        this.AgentDropdown = res.returnValue;
      }
      else{
        this.AgentDropdown = [];
      }
    })
    this._apiService.getVallageMaster().then((res:any)=>{
      if(res.success){
        this.vallageDropdown = res.returnValue;
      }
      else{
        this.vallageDropdown = [];
      }
    })
    this._apiService.getInsuranceMaster().then((res:any)=>{
      if(res.success){
        this.InsuranceTypeDropdown = res.returnValue;
      }
      else{
        this.InsuranceTypeDropdown = [];
      }
    })
    this._apiService.getVehicleTypeMaster().then((res:any)=>{
      if(res.success){
        this.VechileTypeDropdown = res.returnValue;
      }
      else{
        this.VechileTypeDropdown = [];
      }
    })
    this._apiService.getCompanyMaster().then((res:any)=>{
      if(res.success){
        this.CompanyDropdown = res.returnValue;
      }
      else{
        this.CompanyDropdown = [];
      }
    })
    this._apiService.getCommissionMaster().then((res:any)=>{
      if(res.success){
        this.CommissionDropdown = res.returnValue;
      }
      else{
        this.CommissionDropdown = [];
      }
    })
    this._apiService.dropdowndata('state').then((res:any)=>{
      if(res.success){
        this.stateDropdown = res.returnValue;
      }
      else{
        this.stateDropdown = [];
      }
    })
    this._apiService.dropdowndata('country').then((res:any)=>{
      if(res.success){
        this.countryDropdown = res.returnValue;
      }
      else{
        this.countryDropdown = [];
      }
    })
    this._apiService.getPolicyMaster().then((res:any)=>{
      if(res.success){
        this.policyTypeDropdown = res.returnValue;
      }
      else{
        this.policyTypeDropdown = [];
      }
    })
  }

  reportSubmit(report : NgForm){
    let object : any = {};
    console.log(this.reportMaster.value , this.dateFilterVal);
    let value : boolean = false;
    if(this.reportMaster.valid){
      this.utility.loader(true);
      if(this.dateFilterVal != undefined){
        if(this.dateFilterVal[0] && this.dateFilterVal[1]){
          value = false;
          object['fromDate'] = this.utility.dateTimeChange(this.dateFilterVal[0])
          object['toDate'] = this.utility.dateTimeChange(this.dateFilterVal[1])
        }
        else{
          this._apiService.showMessage('Please select both date' , 'error');
          value = true;
        }
      }
  
      else{
        value = false;
      }
  
      if(!value){
        object['vallageId'] = this.reportMaster.value?.vallageId
        object['agentId'] = this.reportMaster.value?.agentId
        object['insuranceTypeId'] = this.reportMaster.value?.insuranceTypeId
        object['vechileTypeId'] = this.reportMaster.value?.vechileTypeId
        object['companyId'] = this.reportMaster.value?.companyId
        object['policyTypeId'] = this.reportMaster.value?.policyTypeId
        if(this.typeOfFilter == 'Policy Report')  {
          this._apiService.getDateWisePolicyReport(object).then((res:any)=>{
            this.utility.loader(false);
            if(res?.success == false){
              this._apiService.showMessage(res.message , 'error')
            }
            else{
              this.utility.downloadFile(res , 'Policy_Report');
            }
          })
        }  
        else if(this.typeOfFilter == 'Expiry Policy Report')  {
          this._apiService.getDateWiseExpiryPolicyReport(object).then((res:any)=>{
            this.utility.loader(false);
            if(res?.success == false){
              this._apiService.showMessage(res.message , 'error')
            }
            else{
              this.utility.downloadFile(res , 'Expiry_Policy_Report');
            }
          })
        }  
        else if(this.typeOfFilter == 'Today Expiry Policy Report')  {
          this._apiService.getTodayExpiryPolicyReport(object).then((res:any)=>{
            this.utility.loader(false);
            if(res?.success == false){
              this._apiService.showMessage(res.message , 'error')
            }
            else{
              this.utility.downloadFile(res , 'Today_Expiry_Policy_Report');
            }
          })
        }  
        else if(this.typeOfFilter == 'Now Month Expiry Policy Report')  {
          this._apiService.getNowMonthlyExpiryPolicyReport(object).then((res:any)=>{
            this.utility.loader(false);
            if(res?.success == false){
              this._apiService.showMessage(res.message , 'error')
            }
            else{
              this.utility.downloadFile(res , 'Now_Month_Expiry_Policy_Report');
            }
          })
        }  
        else {
          this._apiService.getNextMonthlyExpiryPolicyReport(object).then((res:any)=>{
            this.utility.loader(false);
            if(res?.success == false){
              this._apiService.showMessage(res.message , 'error')
            }
            else{
              this.utility.downloadFile(res , 'Next_Month_Expiry_Policy_Report');
            }
          })
        }
      }
    }
  }

   searchFilter() {
    console.log(this.dateFilterVal);
    // if (string == 'calendar1') {
      if (this.dateFilterVal[0] != null && this.dateFilterVal[1] != null) {
        this.calendar1.overlayVisible = false;
        // let object = {
        //   fromDate : this.utility.dateFormat(this.dateFilterVal[0]),
        //   toDate :this.utility.dateFormat( this.dateFilterVal[1])
        // }
      }
    // }
  }

}
