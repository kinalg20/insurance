import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormGroupDirective, Validators } from '@angular/forms';
import * as moment from 'moment';
import { ConfirmationService, Message, PrimeNGConfig } from 'primeng/api';
import { AppUtility } from 'src/app/interceptor/apputitlity';
import { ApiService } from 'src/app/Services/api.service';

@Component({
  selector: 'app-insurance',
  templateUrl: './insurance.component.html',
  styleUrls: ['./insurance.component.scss']
})

export class InsuranceComponent implements OnInit {

  tax_dropdown: any = [];
  agent_dropdown : any = [];
  city_dropdown : any = [];
  state_dropdown : any = [];


  insuranceMasterTable: any = [];
  myDate: any;
  msgs: Message[] = [];
  submitButton : string = 'Submit'
  constructor(private _apiservice: ApiService, private confirmationService: ConfirmationService, private primengConfig: PrimeNGConfig , public _utility : AppUtility) { }

  ngOnInit(): void { 
    this.getAllTableData();
    this.primengConfig.ripple = true;
    let date = new Date();
    this.myDate = moment(date).format('MM/DD/YYYY');
  }

  breadcrumb = [
    {
      title: 'Insurance Master',
      subTitle: 'Dashboard'
    }
  ]

  insuranceMaster = new FormGroup({
    insuranceTypeName: new FormControl('', [Validators.required ]), 
  })

  insuranceMasterSubmit(insuranceMaster : FormGroupDirective) {
    console.log(this.insuranceMaster.value);
    if (this.insuranceMaster.valid) {
      let object = this.insuranceMaster.value;
      if(this.submitButton == 'Submit'){
      this._utility.loader(true); 
      this._apiservice.addInsuranceMaster(object).then((res: any) => {
        this._utility.loader(false);
        if (res.success == true) {
          window.scroll(0, 0)
          this._apiservice.showMessage(res.message, 'success');
          this.getAllTableData();
          this.insuranceMaster.reset();
          Object.keys(this.insuranceMaster.controls).forEach(key => {
            this.insuranceMaster.controls[key].setErrors(null)
          });
          insuranceMaster.resetForm();
        }
        else {
          this._apiservice.showMessage(res.message, 'error');
          this.getAllTableData();
        }

      })
     }
     else {  
      object['insuranceTypeId'] = this.editagentId;   
      console.log(object);      
      this._apiservice.editInsuranceMaster(object).then((res:any)=>{
        this._utility.loader(false);
        if (res.success == true) {
          this._apiservice.showMessage(res.message, 'success');
          this.getAllTableData();
          this.insuranceMaster.reset();
          Object.keys(this.insuranceMaster.controls).forEach(key => {
            this.insuranceMaster.controls[key].setErrors(null)
          });
          insuranceMaster.resetForm();
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
    this._apiservice.getInsuranceMaster()
    .then((res: any) => {
      console.log(res);
      this.insuranceMasterTable = res.returnValue;
    })
    .catch((error:any)=>{
      this.insuranceMasterTable = [];
    })
  }

  confirm1(insurance: any) {
    this.confirmationService.confirm({
      message: 'Are you sure that you want to proceed?',
      header: 'Delete Agent Master Record',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.msgs = [{ severity: 'info', summary: 'Confirmed', detail: 'You have accepted' }];
        this.deleteItem(insurance.insuranceId ?? 1);
      },
      reject: () => {
        this.msgs = [{ severity: 'info', summary: 'Rejected', detail: 'You have rejected' }];
      }
    });
  }

  deleteItem(agentId: any) {
    this.insuranceMaster.reset();
    Object.keys(this.insuranceMaster.controls).forEach(key => {
      this.insuranceMaster.controls[key].setErrors(null)
    });
    this._utility.loader(true);
    this._apiservice.deleteInsuranceMaster(agentId).then((res: any) => {
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
    Object.keys(this.insuranceMaster.controls).forEach(key => { 
      this.insuranceMaster.controls[key].setValue(customer[key]);
    });   
    this.submitButton = 'Update'
    this.editagentId = customer.insuranceTypeId;
  } 

   
}
