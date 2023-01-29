import { Injectable } from '@angular/core';
import * as moment from 'moment';
// import * as moment from 'moment';
// import { ApiServiceService } from '../api-service.service';

@Injectable({
  providedIn: 'root'
})

export class CommonFunction {
  constructor() { }

  getLocalStorageDetails() {
    let local_id = localStorage.getItem('UserObject');
    if (local_id) {
      return JSON.parse(local_id);
    }
  }

  //validate user mobile number
  inputMobile(event: any) {
    if (event.keyCode != 9) {
      if (event.keyCode != 8) {
        if (!/^[0-9]$/.test(event.key)) {
          event.preventDefault();
        }
      }
    }
  }

  validateMobile(event: any) {
    const value = event.target.value;

    if (
      value &&
      /^[0-9]+$/.test(value) &&
      value.length < 10
    ) {
      // this.invalidMobile = true;
      return true
    }

    else {
      // this.invalidMobile = false;
      return false
    }
  }

  selectedFiles: any = [];
  onFileChange(event: any) {
    if (event.target.files && event.target.files[0]) {
      if (event.target.files[0].size < 2000000) {
        if (event.target.files[0].type == 'image/jpeg' || 'image/jpg' || 'image/png' || 'application/pdf') {
          var filesAmount = event.target.files.length;
          for (let i = 0; i < filesAmount; i++) {
            var reader = new FileReader();
            reader.readAsDataURL(event.target.files[i]);
            return event.target.files[i];
          }
        }
      }

      //   else{
      //     this._apiService.showMessage('Max file upload size should be 2MB ' , 'error')
      //     return false
      //   }
    }
  }

  _valueLoader: boolean = false;
  loader(value: boolean) {
    this._valueLoader = value;
  }

  dateFormat(date: any) {
    return moment(date).format('YYYY-MM-DD')
  }

  getloaderValue() {
    return this._valueLoader;
  }

  downloadFile(data: any, name?: any) {
    var blob = new Blob([data], { type: '.xlsx' });
    var url = window.URL.createObjectURL(blob);
    var anchor = document.createElement("a");
    anchor.download = name + ".xlsx";
    anchor.href = url;
    anchor.click();
  }
}