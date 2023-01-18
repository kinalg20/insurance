import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, FormGroupDirective, Validators } from '@angular/forms';
import * as moment from 'moment';
import { ConfirmationService, Message, PrimeNGConfig } from 'primeng/api';
import { Table } from 'primeng/table';
import { AppUtility } from 'src/app/interceptor/apputitlity';
import { ApiService } from 'src/app/Services/api.service';

@Component({
  selector: 'app-vallage',
  templateUrl: './vallage.component.html',
  styleUrls: ['./vallage.component.scss']
})

export class VallageComponent implements OnInit {

  tax_dropdown: any = [];
  agent_dropdown : any = [];
  city_dropdown : any = [];
  state_dropdown : any = [];


  vallageMasterTable: any = [];
  myDate: any;
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
      title: 'vallage Master',
      subTitle: 'Dashboard'
    }
  ]

  vallageMaster = new FormGroup({
    vallageName: new FormControl('', [Validators.required ]), 
  })

  vallageMasterSubmit(vallageMaster : FormGroupDirective) {
    console.log(this.vallageMaster.value);
    if (this.vallageMaster.valid) {
      let object = this.vallageMaster.value;
      if(this.submitButton == 'Submit'){
      this._utility.loader(true); 
      this.display = false;
      this._apiservice.addVallageMaster(object).then((res: any) => {
        this._utility.loader(false);
        if (res.success == true) {
          window.scroll(0, 0)
          this._apiservice.showMessage(res.message, 'success');
          this.getAllTableData();
          this.vallageMaster.reset();
          Object.keys(this.vallageMaster.controls).forEach(key => {
            this.vallageMaster.controls[key].setErrors(null)
          });
          vallageMaster.resetForm();
        }
        else {
          this._apiservice.showMessage(res.message, 'error');
          this.getAllTableData();
        }

      })
     }
     else {  
      object['vallageId'] = this.editagentId;   
      console.log(object);    
      this.display = false;
      this._apiservice.editVallageMaster(object).then((res:any)=>{
        this._utility.loader(false);
        if (res.success == true) {
          this._apiservice.showMessage(res.message, 'success');
          this.getAllTableData();
          this.vallageMaster.reset();
          Object.keys(this.vallageMaster.controls).forEach(key => {
            this.vallageMaster.controls[key].setErrors(null)
          });
          vallageMaster.resetForm();
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
    this._apiservice.getVallageMaster()
    .then((res: any) => {
      console.log(res);
      this.vallageMasterTable = res.returnValue;
    })
    .catch((error:any)=>{
      this.vallageMasterTable = [];
    })
  }

  confirm1(vallage: any) {
    this.confirmationService.confirm({
      message: 'Are you sure that you want to proceed?',
      header: 'Delete Agent Master Record',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.msgs = [{ severity: 'info', summary: 'Confirmed', detail: 'You have accepted' }];
        this.deleteItem(vallage.vallageId ?? 1);
      },
      reject: () => {
        this.msgs = [{ severity: 'info', summary: 'Rejected', detail: 'You have rejected' }];
      }
    });
  }

  deleteItem(agentId: any) {
    this.vallageMaster.reset();
    Object.keys(this.vallageMaster.controls).forEach(key => {
      this.vallageMaster.controls[key].setErrors(null)
    });
    this._utility.loader(true);
    this._apiservice.deleteVallageMaster(agentId).then((res: any) => {
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
    Object.keys(this.vallageMaster.controls).forEach(key => { 
      this.vallageMaster.controls[key].setValue(customer[key]);
    });   
    this.submitButton = 'Update'
    this.display = true;
    this.header = 'Update Village Name'
    this.editagentId = customer.vallageId;
  } 


  filterval: string;
  dateFilterVal: string;
  reset(dt2) {
    dt2.reset();
    this.filterval = '';
    this.dateFilterVal = ''
  }


  header : string = 'Add Village';
  display : boolean = false;
  openModel(){
    Object.keys(this.vallageMaster.controls).forEach(key => {
      this.vallageMaster.controls[key].setValue('');
    });
    this.header = 'Add Village';
    this.submitButton = 'Submit';
    this.display = true;
  }

   
}
