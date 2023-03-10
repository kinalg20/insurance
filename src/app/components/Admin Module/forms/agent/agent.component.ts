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

  agent_dropdown : any = [];
  // city_dropdown : any = [];
  // state_dropdown : any = [];
  header : string = 'Add Master'

  itemMasterTable: any = [];
  myDate: any;
  display: any;
  msgs: Message[] = [];
  submitButton : string = 'Submit'
  constructor(private _apiservice: ApiService, private confirmationService: ConfirmationService, private primengConfig: PrimeNGConfig , public _utility : AppUtility) { }

  ngOnInit(): void { 
    this.getDropdown();
    this.getAllTableData();
    this.primengConfig.ripple = true;
    let date = new Date();
    this.myDate = moment(date).format('MM/DD/YYYY');
    // this.itemMaster.controls['itemDate'].setValue(this.myDate);
  }

  breadcrumb = [
    {
      title: 'Agent Master',
      subTitle: 'Dashboard'
    }
  ]

  state_dropdown : any = [
    {id : 1 , value : 'demo1'},
    {id : 2 , value : 'demo2'},
    {id : 3 , value : 'demo3'},
    {id : 4 , value : 'demo4'}
  ]


  city_dropdown : any = [
    {id : 1 , value : 'demo1'},
    {id : 2 , value : 'demo2'},
    {id : 3 , value : 'demo3'},
    {id : 4 , value : 'demo4'}
  ]

  itemMaster = new FormGroup({
    agentName: new FormControl('', [Validators.required ]), 
    agentFName: new FormControl('', [Validators.required ]), 
    agentMobileNo: new FormControl('', [Validators.required ]), 
    agentAddress: new FormControl('', [Validators.required]),     
    agentType: new FormControl("2"),
    agentPinCode: new FormControl("", [Validators.required]),
    aadharcard: new FormControl('', [Validators.required , Validators.pattern('^[2-9]{1}[0-9]{3}[0-9]{4}[0-9]{4}$')]),
    panCard: new FormControl('', [Validators.required , Validators.pattern('[A-Z a-z]{5}[0-9]{4}[A-Z a-z]{1}')]),
    qualification: new FormControl('', [Validators.required]),
    emailAddress: new FormControl('', [Validators.required, Validators.pattern('[A-Za-z0-9._%-]+@[A-Za-z0-9._%-]+\\.[a-z]{2,3}')]),     
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
          this.display = false;
          window.scroll(0, 0)
          this._apiservice.showMessage(res.message, 'success');
          this.getAllTableData();
          this.itemMaster.reset();
          Object.keys(this.itemMaster.controls).forEach(key => {
            this.itemMaster.controls[key].setErrors(null)
          });
          itemMaster.resetForm();
          this.itemMaster.controls['commission'].setValue('0');
        }
        else {
          this._apiservice.showMessage(res.message, 'error');
          this.getAllTableData();
        }

      })
     }
     else {  
      object['id'] = this.editagentId;   
      console.log(object);      
      this._apiservice.editAgentMaster(object).then((res:any)=>{
        this._utility.loader(false);
        if (res.success == true) {
          this.display = false;
          this._apiservice.showMessage(res.message, 'success');
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
          this._apiservice.showMessage(res.message, 'error');
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
      header: 'Delete Agent Master Record',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.msgs = [{ severity: 'info', summary: 'Confirmed', detail: 'You have accepted' }];
        this.deleteItem(agentId ?? 1);
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
    Object.keys(this.itemMaster.controls).forEach(key => { 
      console.log(key , this.itemMaster.controls)
      this.itemMaster.controls[key].setValue(customer[key]);
    });   

    this.submitButton = 'Update'
    this.editagentId = customer.id;
    this.display = true;
  }


  getDropdown(){
    this._apiservice.dropdowndata('agentType').then((res:any)=>{
      console.log(res);
      if(res.success){
        this.agent_dropdown = res.returnValue;
      }
    })
    this._apiservice.dropdowndata('state').then((res:any)=>{
      console.log(res);
      if(res.success){
        this.state_dropdown = res.returnValue;
      }
    })
    this._apiservice.dropdowndata('city').then((res:any)=>{
      console.log(res);
      if(res.success){
        this.city_dropdown = res.returnValue;
      }
      
    })
  }


  filterval: string;
  dateFilterVal: string;
  reset(dt2) {
    dt2.reset();
    this.filterval = '';
    this.dateFilterVal = ''
  }


  openModel(){
    Object.keys(this.itemMaster.controls).forEach(key => {
      this.itemMaster.controls[key].setValue('');
    });
    this.header = 'Add Agent';
    this.submitButton = 'Submit';
    this.display = true;
  }
  

   
}
