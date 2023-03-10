import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import * as moment from 'moment';
import { ConfirmationService, Message, PrimeNGConfig } from 'primeng/api';
import { Table } from 'primeng/table';
import { AppUtility } from 'src/app/interceptor/apputitlity';
import { ApiService } from 'src/app/Services/api.service';

@Component({
  selector: 'app-policy',
  templateUrl: './policy.component.html',
  styleUrls: ['./policy.component.scss']
})

export class PolicyComponent implements OnInit {
  @ViewChild('policy') PolicyForm : NgForm;
  @ViewChild('policyDoc') PolicyDoc : ElementRef;
  @ViewChild('oldpolicyDoc') OldPolicyDoc : ElementRef;
  @ViewChild('rcUpload') rcUpload : ElementRef;
  @ViewChild('documentUpload') documentUpload : ElementRef;
  @ViewChild ('dt2') FilteredData:Table;
  
  tax_dropdown: any = [];
  agent_dropdown: any = [];
  city_dropdown: any = [];
  state_dropdown: any = [];
  policyMasterTable: any = [];
  myDate: any;
  displayPolicyDoc : boolean;
  msgs: Message[] = [];
  submitButton: string = 'Submit'
  displayPolicy: boolean = false;
  header: string = 'Add Policy'
  displayOldPolicyDoc: boolean;
  displayRcUploadDoc: boolean;
  displayDoc: boolean;
  constructor(private _apiservice: ApiService, private confirmationService: ConfirmationService, private primengConfig: PrimeNGConfig, public _utility: AppUtility) { }

  ngOnInit(): void {
    this.getAllTableData();
    this.getDropdowns();
    this.primengConfig.ripple = true;
    let date = new Date();
    this.myDate = moment(date).format('MM/DD/YYYY');
  }

  breadcrumb = [
    {
      title: 'Policy Master',
      subTitle: 'Dashboard'
    }
  ]

  policyMaster = new FormGroup({
    policyTypeId: new FormControl('', [Validators.required]),
    agentId: new FormControl(''),
    address: new FormControl('', [Validators.required]),
    pinCode: new FormControl('', [Validators.required]),
    rcNumber : new FormControl('', [Validators.required]),
    policyNumber: new FormControl('', [Validators.required]),
    policyIssueDate: new FormControl('', [Validators.required]),
    policyExpiryDate: new FormControl('', [Validators.required]),
    customerName: new FormControl('', [Validators.required]),
    customerFName: new FormControl('', [Validators.required]),
    vallageId: new FormControl('', [Validators.required]),
    insuranceTypeId: new FormControl('', [Validators.required]),
    vechileTypeId: new FormControl('', [Validators.required]),
    registrationNumber: new FormControl('', [Validators.required]),
    mobileNumber: new FormControl('', [Validators.required, Validators.minLength(10), Validators.maxLength(10)]),
    fMobileNumber: new FormControl('', [Validators.required]),
    premiumAmount: new FormControl('', [Validators.required]),
    netPremiumAmount: new FormControl('', [Validators.required]),
    commissionPer: new FormControl('', [Validators.required]),
    commissionAmount: new FormControl('', [Validators.required]),
    stateId: new FormControl('', [Validators.required]),
    companyId: new FormControl('', [Validators.required]),
    countryId: new FormControl('', [Validators.required]),
    policyUpload: new FormControl('', [Validators.required]),
    oldpolicyUpload: new FormControl('', [Validators.required]),
    rcUpload: new FormControl('', [Validators.required]),
    documentUpload: new FormControl('', [Validators.required]),
  })

  policyMasterSubmit(policyMaster: FormGroupDirective) {
    console.log(this.policyMaster.value, this.policyMaster.valid);
    if (this.policyMaster.valid) {
      let object = this.policyMaster.value;
      let formData = new FormData();
      Object.keys(object).forEach((key: any) => {
        if (key == 'policyIssueDate' || key == 'policyExpiryDate') {
          formData.append(key, this._utility.dateTimeChange(object[key]))
        } else {
          if(!(['policyUpload' ,'oldpolicyUpload' , 'rcUpload' , 'documentUpload'].includes(key))){
            formData.append(key, object[key])
          }
          else{
            if(object[key] != 'Uploaded' ){
              formData.append(key, object[key])
            }

            else{
              formData.append(key, '')
            }
          }
        }
      })
      if (this.submitButton == 'Submit') {
        this._utility.loader(true);
        this._apiservice.addPolicyPMaster(formData).then((res: any) => {
          this._utility.loader(false);
          if (res.success == true) {
            window.scroll(0, 0);
            this.displayPolicy = false;
            this._apiservice.showMessage(res.message, 'success');
            this.getAllTableData();
            this.policyMaster.reset();
            this.PolicyDoc.nativeElement.value = null;
            this.OldPolicyDoc.nativeElement.value = null;
            this.rcUpload.nativeElement.value = null;
            this.documentUpload.nativeElement.value = null;
            Object.keys(this.policyMaster.controls).forEach(key => {
              this.policyMaster.controls[key].setErrors(null)
            });
            policyMaster.resetForm();
          }
          else {
            this._apiservice.showMessage(res.message, 'error');
            this.getAllTableData();
          }

        })
      }
      else {
        this._utility.loader(true);
        formData.append('policyId' , this.editagentId)
        console.log(object);
        this._apiservice.editPolicyPMaster(formData).then((res: any) => {
          this._utility.loader(false);
          if (res.success == true) {
            this.displayPolicy = false;
            this._apiservice.showMessage(res.message, 'success');
            this.getAllTableData();
            this.policyMaster.reset();
            Object.keys(this.policyMaster.controls).forEach(key => {
              this.policyMaster.controls[key].setErrors(null)
            });
            this.PolicyDoc.nativeElement.value = null;
            this.OldPolicyDoc.nativeElement.value = null;
            this.rcUpload.nativeElement.value = null;
            this.documentUpload.nativeElement.value = null;
            policyMaster.resetForm();
            this.submitButton = 'Submit'
          }

          else {
            this._apiservice.showMessage(res.message, 'error');
            this.getAllTableData();
          }
        })
      }
    }
  }

  getAllTableData() {
    this._apiservice.getPolicyPMaster()
      .then((res: any) => {

        this.policyMasterTable = res.returnValue;
      })
      .catch((error: any) => {
        this.policyMasterTable = [];
      })
  }

  confirm1(policy: any) {
    this.confirmationService.confirm({
      message: 'Are you sure that you want to proceed?',
      header: 'Delete Agent Master Record',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.msgs = [{ severity: 'info', summary: 'Confirmed', detail: 'You have accepted' }];
        this.deleteItem(policy.policyId ?? 1);
      },
      reject: () => {
        this.msgs = [{ severity: 'info', summary: 'Rejected', detail: 'You have rejected' }];
      }
    });
  }

  deleteItem(agentId: any) {
    this.policyMaster.reset();';'
    Object.keys(this.policyMaster.controls).forEach(key => {
      this.policyMaster.controls[key].setErrors(null)
    });
    this._utility.loader(true);
    this._apiservice.deletePolicyPMaster(agentId).then((res: any) => {
      this._utility.loader(false);
      if (res.success == true) {
        window.scroll(0, 0)
        this._apiservice.showMessage(res.message, 'success');
        this.getAllTableData();
      }

      else {
        window.scroll(0, 0)
        this._apiservice.showMessage(res.message, 'error');
        this.getAllTableData();
      }

    })
  }

  editagentId: any;
  policyDocument : any = {};
  EditItem(customer: any) {
    console.log(customer);
    this.policyDocument = {};
    Object.keys(this.policyMaster.controls).forEach(key => {
      if(key != 'policyUpload' && key != 'oldpolicyUpload' && key != 'rcUpload' && key != 'documentUpload'){
        if (key == 'policyIssueDate' || key == 'policyExpiryDate') {
          console.log(customer[key]);
          this.policyMaster.controls[key].setValue(this._utility.calendarDateFormat(customer[key]));
        }
  
        else {
          this.policyMaster.controls[key].setValue(customer[key]);
        }
      }

      else{
        if(key == 'policyUpload' && customer[key] != ''){
          this.displayPolicyDoc = true;
          this.policyDocument['policyUpload'] = customer[key];
          this.policyMaster.controls[key].setValue('Uploaded');
        }
        if(key == 'oldpolicyUpload' && customer[key] != ''){
          this.displayOldPolicyDoc = true;
          this.policyDocument['oldpolicyUpload'] = customer['oldPolicyUpload'];
          this.policyMaster.controls[key].setValue('Uploaded');
        }
        if(key == 'rcUpload' && customer[key] != ''){
          this.displayRcUploadDoc = true;
          this.policyDocument['rcUpload'] = customer[key];
          this.policyMaster.controls[key].setValue('Uploaded');
        }
        if(key == 'documentUpload' && customer[key] != ''){
          this.displayDoc = true;
          this.policyMaster.controls[key].setValue('Uploaded');
          this.policyDocument['documentUpload'] = customer[key];
        }
      }
    });
    this.submitButton = 'Update'
    this.editagentId = customer.policyId;
    this.displayPolicy = true;
  }



  policyDropdown: any = [];
  agentDropdown: any = [];
  vallageDropdown: any = [];
  companyDropdown: any = [];
  insuranceDropdown: any = [];
  vehicleTypeDropdown: any = [];
  country_dropdown: any = [];
  getDropdowns() {
    this._apiservice.getPolicyMaster().then((res: any) => {
      if (res.success) {
        this.policyDropdown = res.returnValue;
      }
    })
    this._apiservice.dropdowndata('agent').then((res: any) => {
      if (res.success) {
        this.agentDropdown = res.returnValue;
      }
    })
    this._apiservice.getVallageMaster().then((res: any) => {
      if (res.success) {
        this.vallageDropdown = res.returnValue;
      }
    })
    this._apiservice.getInsuranceMaster().then((res: any) => {
      if (res.success) {
        this.insuranceDropdown = res.returnValue;
      }
    })
    this._apiservice.getVehicleTypeMaster().then((res: any) => {
      if (res.success) {
        this.vehicleTypeDropdown = res.returnValue;
      }
    })
    this._apiservice.dropdowndata('state').then((res: any) => {
      if (res.success) {
        this.state_dropdown = res.returnValue;
      }
    })
    this._apiservice.dropdowndata('country').then((res: any) => {
      if (res.success) {
        this.country_dropdown = res.returnValue;
      }
    })
    this._apiservice.getCompanyMaster().then((res: any) => {
      if (res.success) {
        this.companyDropdown = res.returnValue;
      }
    })

    this._apiservice.getCommissionMaster().then((res: any) => {
      if (res.success) {
        this.commission_dropdown = res.returnValue;
      }
    })
  }


  // files : any = {};
  commission_dropdown: any = [];
  uploadedFile(event: any, string: any) {
    let file = this._utility.onFileChange(event);
    if (file != false) {
      if (string == 'policy') {
        this.policyMaster.controls['policyUpload'].setValue(file);
      }

      else if (string == 'oldpolicy') {
        this.policyMaster.controls['oldpolicyUpload'].setValue(file);
      }
      else if (string == 'rcUpload') {
        this.policyMaster.controls['rcUpload'].setValue(file);
      }
      else if (string == 'documentUpload') {
        this.policyMaster.controls['documentUpload'].setValue(file);
      }
    }
  }

  openModel() {
    this.PolicyForm.resetForm();
    Object.keys(this.policyMaster.controls).forEach(key => {
      this.policyMaster.controls[key].setValue('');
    });
    this.policyDocument = {};
    this.displayDoc = false;
    this.displayOldPolicyDoc = false;
    this.displayRcUploadDoc = false;
    this.displayRcUploadDoc = false;
    this.header = 'Add Policy';
    this.submitButton = 'Submit';
    this.displayPolicy = true;
  }

  getComissionAmount(){
    if(this.policyMaster.controls['netPremiumAmount'].value && this.policyMaster.controls['commissionPer'].value){
      let commission : any = this.policyMaster.controls['commissionPer'].value;
      let amount : any = this.policyMaster.controls['netPremiumAmount'].value;
      let commissionAmount : any;
      commissionAmount  = (amount * commission)/100;
      this.policyMaster.controls['commissionAmount'].setValue(commissionAmount);
    }
  }



  showFile(string:any){
    if(string == 'policy'){
      this.displayPolicyDoc =! this.displayPolicyDoc;
      this.policyMaster.get('policyUpload').setValue('')
    }
    if(string == 'oldpolicy'){
      this.displayOldPolicyDoc =! this.displayOldPolicyDoc;
      this.policyMaster.get('oldpolicyUpload').setValue('')

    }
    if(string == 'rcUpload'){
      this.displayRcUploadDoc =! this.displayRcUploadDoc;
      this.policyMaster.get('rcUpload').setValue('')
    }
    if(string == 'documentUpload'){
      this.displayDoc =! this.displayDoc;
      this.policyMaster.get('documentUpload').setValue('')
    }
  }

  filterval: string;
  dateFilterVal: string;
  reset(dt2) {
    dt2.reset();
    this.filterval = '';
    this.dateFilterVal = ''
  }

  searchFilter(event?: any) {
    // debugger;
    let date = this._utility.dateTimeChange(event);
    this.FilteredData.filter(date, 'policyExpiryDate', 'contains');
  }

  exportExcel(){
    this._apiservice.getDateWiseExpiryPolicyReport().then((res)=>{
      this._utility.downloadFile(res,'expiry_policy');
    })
  }

  showExpiryDate(){
    let date = this.policyMaster.controls['policyIssueDate'].value;
    const aYearFromNow = new Date(date);
    aYearFromNow.setFullYear(aYearFromNow.getFullYear() + 1);
    aYearFromNow.setDate(aYearFromNow.getDate() - 1);
    this.policyMaster.controls['policyExpiryDate'].setValue(moment(aYearFromNow).format('DD/MM/yyyy'));
    console.log(moment(aYearFromNow).format('DD/MM/yyyy'))
  }


}