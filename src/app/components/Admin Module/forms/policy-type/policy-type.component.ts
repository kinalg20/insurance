import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, FormGroupDirective, Validators } from '@angular/forms';
import * as moment from 'moment';
import { ConfirmationService, Message, PrimeNGConfig } from 'primeng/api';
import { Table } from 'primeng/table';
import { AppUtility } from 'src/app/interceptor/apputitlity';
import { ApiService } from 'src/app/Services/api.service';

@Component({
  selector: 'app-policy-type',
  templateUrl: './policy-type.component.html',
  styleUrls: ['./policy-type.component.scss']
})

export class PolicyTypeComponent implements OnInit {

  tax_dropdown: any = [];
  agent_dropdown : any = [];
  city_dropdown : any = [];
  state_dropdown : any = [];


  policyMasterTable: any = [];
  myDate: any;
  msgs: Message[] = [];
  display : boolean = false;
  submitButton : string = 'Submit'
  @ViewChild ('dt2') FilteredData:Table;
  constructor(private _apiservice: ApiService, private confirmationService: ConfirmationService, private primengConfig: PrimeNGConfig , public _utility : AppUtility) { }

  ngOnInit(): void { 
    this.getAllTableData();
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
    policyTypeName: new FormControl('', [Validators.required ]), 
  })

  policyMasterSubmit(policyMaster : FormGroupDirective) {
    console.log(this.policyMaster.value);
    if (this.policyMaster.valid) {
      let object = this.policyMaster.value;
      if(this.submitButton == 'Submit'){
      this._utility.loader(true); 
      this._apiservice.addPolicyMaster(object).then((res: any) => {
        this._utility.loader(false);
        if (res.success == true) {
          window.scroll(0, 0);
          this.display = false;
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
      this.display = false;
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
      header: 'Delete Policy Type Master Record',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.msgs = [{ severity: 'info', summary: 'Confirmed', detail: 'You have accepted' }];
        this.deleteItem(policy ?? 1);
      },
      reject: () => {
        this.msgs = [{ severity: 'info', summary: 'Rejected', detail: 'You have rejected' }];
      }
    });
  }

  deleteItem(policyTypeId: any) {
    this._utility.loader(true);
    this._apiservice.deletePolicyMaster(policyTypeId).then((res: any) => {
      this._utility.loader(false);
      if (res.success == true) {
        window.scroll(0, 0)
        this._apiservice.showMessage(res.message, 'success');
        this.policyMaster.reset();
        Object.keys(this.policyMaster.controls).forEach(key => {
          this.policyMaster.controls[key].setErrors(null)
        });
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
    this.header = 'Update Policy Type'
    this.display = true;
    this.editagentId = customer.policyTypeId;
  } 


  filterval: string;
  dateFilterVal: string;
  reset(dt2) {
    dt2.reset();
    this.filterval = '';
    this.dateFilterVal = ''
  }


  header : string = 'Add Policy Type';
  openModel(){
    Object.keys(this.policyMaster.controls).forEach(key => {
      this.policyMaster.controls[key].setValue('');
    });
    this.header = 'Add Policy Type';
    this.submitButton = 'Submit';
    this.display = true;
  }

   
}
