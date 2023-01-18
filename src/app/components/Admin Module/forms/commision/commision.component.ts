import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, FormGroupDirective, Validators } from '@angular/forms';
import * as moment from 'moment';
import { ConfirmationService, Message, PrimeNGConfig } from 'primeng/api';
import { Table } from 'primeng/table';
import { AppUtility } from 'src/app/interceptor/apputitlity';
import { ApiService } from 'src/app/Services/api.service';

@Component({
  selector: 'app-commision',
  templateUrl: './commision.component.html',
  styleUrls: ['./commision.component.scss']
})
export class CommisionComponent implements OnInit {

  tax_dropdown: any = [];
  agent_dropdown : any = [];
  city_dropdown : any = [];
  state_dropdown : any = [];


  commissionMasterTable: any = [];
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
      title: 'Commission Master',
      subTitle: 'Dashboard'
    }
  ]

  @ViewChild ('dt2') FilteredData:Table;
  commissionMaster = new FormGroup({
    commissionTypeName: new FormControl('', [Validators.required ]), 
  })

  commissionMasterSubmit(CommissionMaster : FormGroupDirective) {
    console.log(this.commissionMaster.value);
    if (this.commissionMaster.valid) {
      let object = this.commissionMaster.value;
      if(this.submitButton == 'Submit'){
      this._utility.loader(true); 
      this._apiservice.addCommissionMaster(object).then((res: any) => {
        this._utility.loader(false);
        if (res.success == true) {
          window.scroll(0, 0);
          this.display = false;
          this._apiservice.showMessage(res.message, 'success');
          this.getAllTableData();
          this.commissionMaster.reset();
          Object.keys(this.commissionMaster.controls).forEach(key => {
            this.commissionMaster.controls[key].setErrors(null)
          });
          CommissionMaster.resetForm();
        }
        else {
          this._apiservice.showMessage(res.message, 'error');
          this.getAllTableData();
        }

      })
     }
     else {  
      object['CommissionTypeId'] = this.editagentId;   
      console.log(object);      
      this.display = false;
      this._apiservice.editCommissionMaster(object).then((res:any)=>{
        this._utility.loader(false);
        if (res.success == true) {
          this._apiservice.showMessage(res.message, 'success');
          this.getAllTableData();
          this.commissionMaster.reset();
          Object.keys(this.commissionMaster.controls).forEach(key => {
            this.commissionMaster.controls[key].setErrors(null)
          });
          CommissionMaster.resetForm();
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
    this._apiservice.getCommissionMaster()
    .then((res: any) => {
      console.log(res);
      this.commissionMasterTable = res.returnValue;
    })
    .catch((error:any)=>{
      this.commissionMasterTable = [];
    })
  }

  confirm1(Commission: any) {
    this.confirmationService.confirm({
      message: 'Are you sure that you want to proceed?',
      header: 'Delete Agent Master Record',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.msgs = [{ severity: 'info', summary: 'Confirmed', detail: 'You have accepted' }];
        this.deleteItem(Commission.CommissionId ?? 1);
      },
      reject: () => {
        this.msgs = [{ severity: 'info', summary: 'Rejected', detail: 'You have rejected' }];
      }
    });
  }

  deleteItem(agentId: any) {
    this.commissionMaster.reset();
    Object.keys(this.commissionMaster.controls).forEach(key => {
      this.commissionMaster.controls[key].setErrors(null)
    });
    this._utility.loader(true);
    this._apiservice.deleteCommissionMaster(agentId).then((res: any) => {
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
    Object.keys(this.commissionMaster.controls).forEach(key => { 
      this.commissionMaster.controls[key].setValue(customer[key]);
    });   
    this.submitButton = 'Update'
    this.header = 'Update Commission'
    this.editagentId = customer.CommissionTypeId;
    this.display = true;
  } 


  filterval: string;
  dateFilterVal: string;
  reset(dt2) {
    dt2.reset();
    this.filterval = '';
    this.dateFilterVal = ''
  }


  header : string = 'Add Commission';
  display : boolean = false;
  openModel(){
    Object.keys(this.commissionMaster.controls).forEach(key => {
      this.commissionMaster.controls[key].setValue('');
    });
    this.header = 'Add Commission';
    this.submitButton = 'Submit';
    this.display = true;
  }

   
}

