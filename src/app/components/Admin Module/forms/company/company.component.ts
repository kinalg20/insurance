import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, FormGroupDirective, Validators } from '@angular/forms';
import * as moment from 'moment';
import { ConfirmationService, Message, PrimeNGConfig } from 'primeng/api';
import { Table } from 'primeng/table';
import { AppUtility } from 'src/app/interceptor/apputitlity';
import { ApiService } from 'src/app/Services/api.service';

@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.scss']
})

export class CompanyComponent implements OnInit {

  tax_dropdown: any = [];
  agent_dropdown : any = [];
  city_dropdown : any = [];
  state_dropdown : any = [];


  companyMasterTable: any = [];
  myDate: any;
  display : boolean = false;
  header : string = 'Add Company';
  msgs: Message[] = [];
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
      title: 'Company Master',
      subTitle: 'Dashboard'
    }
  ]

  companyMaster = new FormGroup({
    companyName: new FormControl('', [Validators.required ]), 
  })

  companyMasterSubmit(companyMaster : FormGroupDirective) {
    console.log(this.companyMaster.value);
    if (this.companyMaster.valid) {
      let object = this.companyMaster.value;
      if(this.submitButton == 'Submit'){
      this._utility.loader(true); 
      this._apiservice.addCompanyMaster(object).then((res: any) => {
        this._utility.loader(false);
        if (res.success == true) {
          window.scroll(0, 0)
          this._apiservice.showMessage(res.message, 'success');
          this.getAllTableData();
          this.companyMaster.reset();
          Object.keys(this.companyMaster.controls).forEach(key => {
            this.companyMaster.controls[key].setErrors(null)
          });
          companyMaster.resetForm();
        }
        else {
          this._apiservice.showMessage(res.message, 'error');
          this.getAllTableData();
        }

      })
     }
     else {  
      object['companyId'] = this.editagentId;   
      console.log(object);      
      this._apiservice.editCompanyMaster(object).then((res:any)=>{
        this._utility.loader(false);
        if (res.success == true) {
          this._apiservice.showMessage(res.message, 'success');
          this.getAllTableData();
          this.companyMaster.reset();
          Object.keys(this.companyMaster.controls).forEach(key => {
            this.companyMaster.controls[key].setErrors(null)
          });
          companyMaster.resetForm();
          this.submitButton = 'Submit'
        }

        else {
          this._apiservice.showMessage(res.message, 'error');
          this.getAllTableData();
        }
      })
    }

    this.display = false;
    this.submitButton = 'Submit';
    }
  }

  getAllTableData() {
    this._apiservice.getCompanyMaster()
    .then((res: any) => {
      console.log(res);
      this.companyMasterTable = res.returnValue;
    })
    .catch((error:any)=>{
      this.companyMasterTable = [];
    })
  }

  confirm1(company: any) {
    this.confirmationService.confirm({
      message: 'Are you sure that you want to proceed?',
      header: 'Delete Agent Master Record',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.msgs = [{ severity: 'info', summary: 'Confirmed', detail: 'You have accepted' }];
        this.deleteItem(company.companyId ?? 1);
      },
      reject: () => {
        this.msgs = [{ severity: 'info', summary: 'Rejected', detail: 'You have rejected' }];
      }
    });
  }

  deleteItem(agentId: any) {
    this.companyMaster.reset();
    Object.keys(this.companyMaster.controls).forEach(key => {
      this.companyMaster.controls[key].setErrors(null)
    });
    this._utility.loader(true);
    this._apiservice.deleteCompanyMaster(agentId).then((res: any) => {
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
    Object.keys(this.companyMaster.controls).forEach(key => { 
      this.companyMaster.controls[key].setValue(customer[key]);
    });   
    this.submitButton = 'Update'
    this.editagentId = customer.companyId;
    this.display = true;
  } 

  filterval: string;
  dateFilterVal: string;
  reset(dt2) {
    dt2.reset();
    this.filterval = '';
    this.dateFilterVal = ''
  }


  openModel(){
    Object.keys(this.companyMaster.controls).forEach(key => {
      this.companyMaster.controls[key].setValue('');
    });
    this.header = 'Add Company';
    this.submitButton = 'Submit';
    this.display = true;
  }

   
}
