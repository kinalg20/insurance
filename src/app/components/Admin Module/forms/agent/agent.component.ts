import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormGroupDirective, Validators } from '@angular/forms';
import * as moment from 'moment';
import { ConfirmationService, Message, PrimeNGConfig } from 'primeng/api';
import { AppUtility } from 'src/app/interceptor/apputitlity';
import { ApiService } from 'src/app/Services/api.service';

@Component({
  selector: 'app-agent',
  templateUrl: './agent.component.html',
  styleUrls: ['./agent.component.scss']
})
export class AgentComponent implements OnInit {

  tax_dropdown: any = [];
  errorMsg: string = ''
  date: any;
  errorMsgCheck: string = ''
  itemMasterTable: any = [];
  myDate: any;
  loading: boolean = false;
  value : Date;
  msgs: Message[] = [];
  submitButton : string = 'Submit'
  constructor(private _apiservice: ApiService, private confirmationService: ConfirmationService, private primengConfig: PrimeNGConfig , private _utility : AppUtility) { }

  ngOnInit(): void { 
    this.getAllTableData();
    this.primengConfig.ripple = true;
    this.date = new Date();
    this.myDate = moment(this.date).format('MM/DD/YYYY');
    this.itemMaster.controls['itemDate'].setValue(this.myDate);
  }

  breadcrumb = [
    {
      title: 'Agent Master',
      subTitle: 'Dashboard'
    }
  ]

  itemMaster = new FormGroup({
    agentName: new FormControl('', [Validators.required ]), 
    agentType: new FormControl('', [Validators.required]) 
    
  })

  itemMasterSubmit(itemMaster : FormGroupDirective) {
    console.log(this.itemMaster.value);
    if (this.itemMaster.valid) {
      let object = this.itemMaster.value;
      if(this.submitButton == 'Submit'){
      this._utility.loader(true); 
      this._apiservice.addAgentMaster(object).then((res: any) => {
        this._utility.loader(false);
        if (res.success == true) {
          this.errorMsg = res.message;
          window.scroll(0, 0)
          this.errorMsgCheck = 'success'
          this._apiservice.showMessage(this.errorMsg, this.errorMsgCheck);
          this.getAllTableData();
          this.itemMaster.reset();
          Object.keys(this.itemMaster.controls).forEach(key => {
            this.itemMaster.controls[key].setErrors(null)
          });
          itemMaster.resetForm();
          this.itemMaster.controls['itemDate'].setValue(this.myDate);
        }
        else {
          this.errorMsg = res.message;
          this.errorMsgCheck = 'error'
          this._apiservice.showMessage(this.errorMsg, this.errorMsgCheck);
          this.getAllTableData();
        }

      })
     }
     else {  
      object['agentId'] = this.editagentId;   
      console.log(object);      
      this._apiservice.editAgentMaster(object).then((res:any)=>{
        this._utility.loader(false);
        if (res.success == true) {
          this.errorMsg = res.message;
          this.errorMsgCheck = 'success'
          this._apiservice.showMessage(this.errorMsg, this.errorMsgCheck);
          this.getAllTableData();
          this.itemMaster.reset();
          Object.keys(this.itemMaster.controls).forEach(key => {
            this.itemMaster.controls[key].setErrors(null)
          });
          itemMaster.resetForm();
          this.itemMaster.controls['itemDate'].setValue(this.myDate);
          this.submitButton = 'Submit'
        }

        else {
          this.errorMsg = res.message;
          this.errorMsgCheck = 'error'
          this._apiservice.showMessage(this.errorMsg, this.errorMsgCheck);
          this.getAllTableData();
        }
      })
    }
    }
  }

  getAllTableData() {
    this._apiservice.getAgentMaster()
    .then((res: any) => {
      console.log(res);
      this.itemMasterTable = res.returnValue;
    })
    .catch((error:any)=>{
      this.itemMasterTable = [];
    })
  }

  confirm1(agentId: any) {
    this.confirmationService.confirm({
      message: 'Are you sure that you want to proceed?',
      header: 'Delete Item Master Record',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.msgs = [{ severity: 'info', summary: 'Confirmed', detail: 'You have accepted' }];
        this.deleteItem(agentId);
      },
      reject: () => {
        this.msgs = [{ severity: 'info', summary: 'Rejected', detail: 'You have rejected' }];
      }
    });
  }

  deleteItem(agentId: any) {
    this.itemMaster.reset();
    Object.keys(this.itemMaster.controls).forEach(key => {
      this.itemMaster.controls[key].setErrors(null)
    });
    this._utility.loader(true);
    this._apiservice.deleteAgentMaster(agentId).then((res: any) => {
      this._utility.loader(false);
      if (res.success == true) {
        this.errorMsg = res.message;
        window.scroll(0, 0)
        this.errorMsgCheck = 'success'
        this._apiservice.showMessage(this.errorMsg, this.errorMsgCheck);
        this.getAllTableData();
      }

      else {
        this.errorMsg = res.message;
        window.scroll(0, 0)
        this.errorMsgCheck = 'error'
        this._apiservice.showMessage(this.errorMsg, this.errorMsgCheck); 
        this.getAllTableData();
      }

    })

      // .catch((error: any) => {
      //   this.errorMsg = error.message;
      //   window.scroll(0, 0)
      //   this.errorMsgCheck = 'error'
      //   this._apiservice.showMessage(this.errorMsg, this.errorMsgCheck);
      //   this.getAllTableData();
      // })
  }

  editagentId : any;
  EditItem(customer : any){
    console.log(customer);
    Object.keys(this.itemMaster.controls).forEach(key => { 
      this.itemMaster.controls[key].setValue(customer[key]);
    });   
    this.submitButton = 'Update'
    this.editagentId = customer.agentId;
  }

   
}
