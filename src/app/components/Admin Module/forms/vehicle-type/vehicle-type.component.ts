import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormGroupDirective, Validators } from '@angular/forms';
import * as moment from 'moment';
import { ConfirmationService, Message, PrimeNGConfig } from 'primeng/api';
import { AppUtility } from 'src/app/interceptor/apputitlity';
import { ApiService } from 'src/app/Services/api.service';

@Component({
  selector: 'app-vehicle-type',
  templateUrl: './vehicle-type.component.html',
  styleUrls: ['./vehicle-type.component.scss']
})

export class VehicleTypeComponent implements OnInit {

  tax_dropdown: any = [];
  agent_dropdown : any = [];
  city_dropdown : any = [];
  state_dropdown : any = [];


  vehicleMasterTable: any = [];
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
      title: 'vehicle Master',
      subTitle: 'Dashboard'
    }
  ]

  vehicleMaster = new FormGroup({
    vechileTypeName: new FormControl('', [Validators.required ]), 
  })

  vehicleMasterSubmit(vehicleMaster : FormGroupDirective) {
    console.log(this.vehicleMaster.value);
    if (this.vehicleMaster.valid) {
      let object = this.vehicleMaster.value;
      if(this.submitButton == 'Submit'){
      this._utility.loader(true); 
      this._apiservice.addVehicleTypeMaster(object).then((res: any) => {
        this._utility.loader(false);
        if (res.success == true) {
          window.scroll(0, 0)
          this._apiservice.showMessage(res.message, 'success');
          this.getAllTableData();
          this.vehicleMaster.reset();
          Object.keys(this.vehicleMaster.controls).forEach(key => {
            this.vehicleMaster.controls[key].setErrors(null)
          });
          vehicleMaster.resetForm();
        }
        else {
          this._apiservice.showMessage(res.message, 'error');
          this.getAllTableData();
        }

      })
     }
     else {  
      object['vechileTypeId'] = this.editagentId;   
      console.log(object);      
      this._apiservice.editVehicleTypeMaster(object).then((res:any)=>{
        this._utility.loader(false);
        if (res.success == true) {
          this._apiservice.showMessage(res.message, 'success');
          this.getAllTableData();
          this.vehicleMaster.reset();
          Object.keys(this.vehicleMaster.controls).forEach(key => {
            this.vehicleMaster.controls[key].setErrors(null)
          });
          vehicleMaster.resetForm();
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
    this._apiservice.getVehicleTypeMaster()
    .then((res: any) => {
      console.log(res);
      this.vehicleMasterTable = res.returnValue;
    })
    .catch((error:any)=>{
      this.vehicleMasterTable = [];
    })
  }

  confirm1(vehicle: any) {
    this.confirmationService.confirm({
      message: 'Are you sure that you want to proceed?',
      header: 'Delete Agent Master Record',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.msgs = [{ severity: 'info', summary: 'Confirmed', detail: 'You have accepted' }];
        this.deleteItem(vehicle.vehicleId ?? 1);
      },
      reject: () => {
        this.msgs = [{ severity: 'info', summary: 'Rejected', detail: 'You have rejected' }];
      }
    });
  }

  deleteItem(agentId: any) {
    this.vehicleMaster.reset();
    Object.keys(this.vehicleMaster.controls).forEach(key => {
      this.vehicleMaster.controls[key].setErrors(null)
    });
    this._utility.loader(true);
    this._apiservice.deleteVehicleTypeMaster(agentId).then((res: any) => {
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
    Object.keys(this.vehicleMaster.controls).forEach(key => { 
      this.vehicleMaster.controls[key].setValue(customer[key]);
    });   
    this.submitButton = 'Update'
    this.editagentId = customer.vechileTypeId;
  } 

   
}
