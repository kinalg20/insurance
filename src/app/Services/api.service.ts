import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
  import { MessageService, PrimeNGConfig } from 'primeng/api';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  constructor(public http: HttpClient, private messageService: MessageService,private primengConfig: PrimeNGConfig) {
     this.primengConfig.ripple = true;
  }
  public _baseUrl = environment.api_baseUrl;

//dropdown
  dropdowndata(string: any, object?: any): Promise<any> {
    let endpoint = 'dropdowns';
    if (!object) {
      return this.http.get(this._baseUrl + 'dropdowns' + "?Mode=" + string).toPromise()
    }
    else {
      if (object) {
        var queryStrings = new HttpParams({ fromObject: object }).toString();
        endpoint = `${endpoint}?${queryStrings}`;
      }
      return this.http.get(`${this._baseUrl}${endpoint}`).toPromise()
    }
  }
  //user 
  userLogin(logindata: any): Promise<any> {
    return this.http.post(this._baseUrl + 'User/login', logindata).toPromise()
  }

  GetOTP(OTPdata: any): Promise<any> {
    return this.http.put(this._baseUrl + 'User/OTP', OTPdata).toPromise()
  }

  //group
  groupInsertion(groupName: any): Promise<any> {
    return this.http.post(this._baseUrl + 'group', groupName).toPromise()
  } 
  //menu-submenu
  getMenuSubMenu(userId: any): Promise<any> {
    return this.http.get(this._baseUrl + 'module', userId).toPromise()
  }
  
  showMessage(errorMsg: any, errorMsgCheck: any) {
    this.messageService.add({ severity: errorMsgCheck, summary: errorMsgCheck, detail: errorMsg });
  }
//Agent
getAgentMaster(): Promise<any> {
  return this.http.get(this._baseUrl + 'agent').toPromise()
}

  addAgentMaster(agentData: any): Promise<any> {
    return this.http.post(this._baseUrl + 'agent', agentData).toPromise()
  }

  editAgentMaster(object: any): Promise<any> {
    return this.http.put(this._baseUrl + 'agent', object).toPromise()
  }
  deleteAgentMaster(id: any): Promise<any> {
    return this.http.delete(this._baseUrl + 'agent/' + id).toPromise()
  }

}
