import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
// import { ConfirmationService, Message } from 'primeng/api';
import { FormControl, FormGroup, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ApiService } from 'src/app/Services/api.service';
// import { ApiServiceService } from 'src/app/api-service.service';
// import { AppUtility } from 'src/app/interceptor/appUtitlity';


@Component({
  selector: 'app-creation-group',
  templateUrl: './creation-group.component.html',
  styleUrls: ['./creation-group.component.scss']
})
export class CreationGroupComponent implements OnInit {

  errorMsg: string = ''
  date: any;
  errorMsgCheck: string = ''
  submitButton: string = 'Submit'
  costBreakerTable: any = [];
  myDate: any;
  loading: boolean = false;
  // msgs: Message[] = [];
  // @Output() getTableData = new EventEmitter<string>();
  // @Input() EditCostBreakup = '';

  constructor(private _apiService : ApiService) { }

  ngOnInit(): void {
    
  }

  ngOnChanges(changes: SimpleChanges): void {
      // this.EditItem(this.EditCostBreakup);    
  }

  breadcrumb = [
    {
      title: 'Group Creation',
      subTitle: 'Dashboard'
    }
  ]

  GroupForm = new FormGroup({
    groupName: new FormControl('', [Validators.required])
  })

  GroupSubmit(costBreaker : FormGroupDirective) {
    console.log(this.GroupForm.value);
    if (this.GroupForm.valid) { 
      // this._utility.loader(true);
      let object = this.GroupForm.value;
      if (this.submitButton == 'Submit') {
        this._apiService.groupInsertion(object).then((res: any) => {
          // this._utility.loader(false);
          if (res.success == true) {
            this.errorMsg = res.message;
            this.errorMsgCheck = 'success'
            // this._apiService.showMessage(this.errorMsg, this.errorMsgCheck)
            window.scroll(0, 0)
            // this.getTableData.emit("getTableData");
            this.GroupForm.reset();
            // debugger;          
            Object.keys(this.GroupForm.controls).forEach(key => {
              this.GroupForm.controls[key].setErrors(null)
            });
            costBreaker.resetForm();
          }
          else {
            this.errorMsg = res.message;
            this.errorMsgCheck = 'error'
            // this._apiService.showMessage(this.errorMsg, this.errorMsgCheck);
          }

        })
      }
      // else {
      //   object['costBreakupId'] = this.editItemId;
      //   console.log(object);
      //   this._apiService.editcostBreakup(object).then((res: any) => {
      //     this._utility.loader(false);
      //     if (res.success == true) {
      //       this.errorMsg = res.message;
      //       this.getTableData.emit("getTableData");
      //       window.scroll(0, 0)
      //       this.errorMsgCheck = 'success'
      //       this._apiService.showMessage(this.errorMsg, this.errorMsgCheck);
      //       this.costBreakerForm.reset();
      //       costBreaker.resetForm();
      //       Object.keys(this.costBreakerForm.controls).forEach(key => {
      //         this.costBreakerForm.controls[key].setErrors(null)
      //       });
      //       this.submitButton = 'Submit'
      //     }

      //     else {
      //       this.errorMsg = res.message;
      //       this.errorMsgCheck = 'error'
      //       this._apiService.showMessage(this.errorMsg, this.errorMsgCheck);
      //     }
      //   })
      // }
    }
  }

  editItemId: any;
  EditItem(customer: any) {
   if(customer.costBreakupId){
     console.log(customer);
      Object.keys(this.GroupForm.controls).forEach(key => {
        this.GroupForm.controls[key].setValue(customer[key]);
      });
      this.submitButton = 'Update'
      this.editItemId = customer.costBreakupId;
   }
  }

}
