import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormGroupDirective, Validators } from '@angular/forms';
import * as moment from 'moment';
import { ConfirmationService, Message, PrimeNGConfig } from 'primeng/api';
import { AppUtility } from 'src/app/interceptor/apputitlity';
import { ApiService } from 'src/app/Services/api.service';
import { CommonFunction } from 'src/app/Utility/commonFunction';

@Component({
  selector: 'app-policy',
  templateUrl: './policy.component.html',
  styleUrls: ['./policy.component.scss']
})

export class PolicyComponent implements OnInit {

  tax_dropdown: any = [];
  agent_dropdown : any = [];
  city_dropdown : any = [];
  state_dropdown : any = [];


  policyMasterTable: any = [];
  myDate: any;
  msgs: Message[] = [];
  submitButton : string = 'Submit'
  constructor(private _apiservice: ApiService, private confirmationService: ConfirmationService, private primengConfig: PrimeNGConfig , public _utility : AppUtility) { }

  ngOnInit(): void { 
    this.getAllTableData();
    this.getDropdowns();
    this.primengConfig.ripple = true;
    let date = new Date();
    this.myDate = moment(date).format('MM/DD/YYYY');
  }

  breadcrumb = [
    {
      title: 'policy Master',
      subTitle: 'Dashboard'
    }
  ]

  policyMaster = new FormGroup({
    policyId: new FormControl('', [Validators.required ]), 
    policyNumber: new FormControl('', [Validators.required ]), 
    policyIssueDate: new FormControl('', [Validators.required ]), 
    policyExpiryDate: new FormControl('', [Validators.required ]), 
    customerName: new FormControl('', [Validators.required ]), 
    customerFName: new FormControl('', [Validators.required ]), 
    vallageId: new FormControl('', [Validators.required ]), 
    insuranceTypeId: new FormControl('', [Validators.required ]), 
    vechileTypeId: new FormControl('', [Validators.required ]), 
    registrationNumber: new FormControl('', [Validators.required ]),
    mobileNumber: new FormControl('', [Validators.required , Validators.minLength(10) , Validators.maxLength(10)]),
    fMobileNumber: new FormControl('', [Validators.required ]),
    premiumAmount: new FormControl('', [Validators.required ]),
    netPremiumAmount: new FormControl('', [Validators.required ]),
    commissionPer: new FormControl('', [Validators.required ]),
    commissionAmount: new FormControl('', [Validators.required ]),
    stateId: new FormControl('', [Validators.required ]),
    companyId: new FormControl('', [Validators.required ]),
    commissionId: new FormControl('', [Validators.required ]),
    countryId: new FormControl('', [Validators.required ]),
    policyUpload: new FormControl('', [Validators.required ]),
    oldpolicyUpload: new FormControl('', [Validators.required ]),
    rcUpload: new FormControl('', [Validators.required ]),
    documentUpload: new FormControl('', [Validators.required ]),
  })

  policyMasterSubmit(policyMaster : FormGroupDirective) {
    console.log(this.policyMaster.value , this.policyMaster.valid);
    if (this.policyMaster.valid) {
      let object = this.policyMaster.value;
      if(this.submitButton == 'Submit'){
      this._utility.loader(true); 
      this._apiservice.addPolicyMaster(object).then((res: any) => {
        this._utility.loader(false);
        if (res.success == true) {
          window.scroll(0, 0)
          this._apiservice.showMessage(res.message, 'success');
          this.getAllTableData();
          this.policyMaster.reset();
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
      object['policyTypeId'] = this.editagentId;   
      console.log(object);      
      this._apiservice.editPolicyMaster(object).then((res:any)=>{
        this._utility.loader(false);
        if (res.success == true) {
          this._apiservice.showMessage(res.message, 'success');
          this.getAllTableData();
          this.policyMaster.reset();
          Object.keys(this.policyMaster.controls).forEach(key => {
            this.policyMaster.controls[key].setErrors(null)
          });
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
    this._apiservice.getPolicyMaster()
    .then((res: any) => {
      console.log(res);
      this.policyMasterTable = res.returnValue;
    })
    .catch((error:any)=>{
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
    this.policyMaster.reset();
    Object.keys(this.policyMaster.controls).forEach(key => {
      this.policyMaster.controls[key].setErrors(null)
    });
    this._utility.loader(true);
    this._apiservice.deletePolicyMaster(agentId).then((res: any) => {
      this._utility.loader(false);
      if (res.success == true) {
        window.scroll(0, 0)
        this._apiservice.showMessage(res.message, 'success');
        this.getAllTableData();
      }

      else {
        window.scroll(0, 0)
        this._apiservice.showMessage(res.message , 'error'); 
        this.getAllTableData();
      }

    })
  }

  editagentId : any;
  EditItem(customer : any){
    console.log(customer);
    Object.keys(this.policyMaster.controls).forEach(key => { 
      this.policyMaster.controls[key].setValue(customer[key]);
    });   
    this.submitButton = 'Update'
    this.editagentId = customer.policyTypeId;
  } 


  // filterval: string;
  // dateFilterVal: string;
  // reset(dt2) {
  //   dt2.reset();
  //   this.filterval = '';
  //   this.dateFilterVal = ''
  // }


  // header : string = 'Add Insurance';
  // display : boolean = false;
  // openModel(){
  //   Object.keys(this.insuranceMaster.controls).forEach(key => {
  //     this.insuranceMaster.controls[key].setValue('');
  //   });
  //   this.header = 'Add Insurance';
  //   this.submitButton = 'Submit';
  //   this.display = true;
  // }


  policyDropdown : any = [];
  vallageDropdown : any = [];
  companyDropdown : any = [];
  insuranceDropdown : any = [];
  vehicleTypeDropdown : any = [];
  country_dropdown : any = [];
  getDropdowns(){
    this._apiservice.getPolicyMaster().then((res:any)=>{
      console.log(res);
      if(res.success){
        this.policyDropdown = res.returnValue;
      }
    })
    this._apiservice.getVallageMaster().then((res:any)=>{
      console.log(res);
      if(res.success){
        this.vallageDropdown = res.returnValue;
      }
    })
    this._apiservice.getInsuranceMaster().then((res:any)=>{
      console.log(res);
      if(res.success){
        this.insuranceDropdown = res.returnValue;
      }
    })
    this._apiservice.getVehicleTypeMaster().then((res:any)=>{
      console.log(res);
      if(res.success){
        this.vehicleTypeDropdown = res.returnValue;
      }
    })
    this._apiservice.dropdowndata('state').then((res:any)=>{
      console.log(res);
      if(res.success){
        this.state_dropdown = res.returnValue;
      }
    })
    this._apiservice.dropdowndata('country').then((res:any)=>{
      console.log(res);
      if(res.success){
        this.country_dropdown = res.returnValue;
      }
    })
    this._apiservice.getCompanyMaster().then((res:any)=>{
      console.log(res);
      if(res.success){
        this.companyDropdown = res.returnValue;
      }
    })
  }


  // files : any = {};
  uploadedFile(event:any , string:any){
    let file = this._utility.onFileChange(event);
    if(file != false){
      if(string == 'policy'){
        this.policyMaster.controls['policyUpload'].setValue(file);
      }

      else if(string == 'oldpolicy'){
        this.policyMaster.controls['oldpolicyUpload'].setValue(file);
      }
      else if(string == 'rcUpload'){
        this.policyMaster.controls['rcUpload'].setValue(file);
      }
      else if(string == 'documentUpload'){
        this.policyMaster.controls['documentUpload'].setValue(file);
      }
    }
  }
   
}