import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormControl, FormGroup, FormGroupDirective, Validators } from '@angular/forms';

@Component({
  selector: 'app-assign-group',
  templateUrl: './assign-group.component.html',
  styleUrls: ['./assign-group.component.scss']
})
export class AssignGroupComponent implements OnInit {

  errorMsg: string = ''
  date: any;
  errorMsgCheck: string = ''
  submitButton: string = 'Submit'
  costBreakerTable: any = [];
  myDate: any;
  loading: boolean = false;
  // msgs: Message[] = [];
  @Output() getTableData = new EventEmitter<string>();
  @Input() EditCostBreakup = '';

  constructor() { }

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

  assignGroupForm = new FormGroup({
    GroupNames: new FormControl('', [Validators.required])
  })

  costBreakerSubmit(costBreaker : FormGroupDirective) {
    console.log(this.assignGroupForm.value);
    // if (this.costBreakerForm.valid) {
    //   this._utility.loader(true);
    //   let object = this.costBreakerForm.value;
    //   if (this.submitButton == 'Submit') {
    //     this._apiService.addcostBreakup(object).then((res: any) => {
    //       this._utility.loader(false);
    //       if (res.success == true) {
    //         this.errorMsg = res.message;
    //         this.errorMsgCheck = 'success'
    //         this._apiService.showMessage(this.errorMsg, this.errorMsgCheck)
    //         window.scroll(0, 0)
    //         this.getTableData.emit("getTableData");
    //         this.costBreakerForm.reset();
    //         // debugger;          
    //         Object.keys(this.costBreakerForm.controls).forEach(key => {
    //           this.costBreakerForm.controls[key].setErrors(null)
    //         });
    //         costBreaker.resetForm();
    //       }
    //       else {
    //         this.errorMsg = res.message;
    //         this.errorMsgCheck = 'error'
    //         this._apiService.showMessage(this.errorMsg, this.errorMsgCheck);
  
    //       }

    //     })
    //   }
    //   else {
    //     object['costBreakupId'] = this.editItemId;
    //     console.log(object);
    //     this._apiService.editcostBreakup(object).then((res: any) => {
    //       this._utility.loader(false);
    //       if (res.success == true) {
    //         this.errorMsg = res.message;
    //         this.getTableData.emit("getTableData");
    //         window.scroll(0, 0)
    //         this.errorMsgCheck = 'success'
    //         this._apiService.showMessage(this.errorMsg, this.errorMsgCheck);
    //         this.costBreakerForm.reset();
    //         costBreaker.resetForm();
    //         Object.keys(this.costBreakerForm.controls).forEach(key => {
    //           this.costBreakerForm.controls[key].setErrors(null)
    //         });
    //         this.submitButton = 'Submit'
    //       }

    //       else {
    //         this.errorMsg = res.message;
    //         this.errorMsgCheck = 'error'
    //         this._apiService.showMessage(this.errorMsg, this.errorMsgCheck);
    //       }
    //     })
    //   }
    // }
  }

  editItemId: any;
  EditItem(customer: any) {
   if(customer.costBreakupId){
     console.log(customer);
      Object.keys(this.assignGroupForm.controls).forEach(key => {
        this.assignGroupForm.controls[key].setValue(customer[key]);
      });
      this.submitButton = 'Update'
      this.editItemId = customer.costBreakupId;
   }
  }

}
