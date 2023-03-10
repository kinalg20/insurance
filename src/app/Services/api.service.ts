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
  userAgentLogin(logindata: any): Promise<any> {
    return this.http.post(this._baseUrl + 'User/agentlogin', logindata).toPromise()
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

  //Company
  getCompanyMaster(): Promise<any> {
    return this.http.get(this._baseUrl + 'company').toPromise()
  }

  addCompanyMaster(agentData: any): Promise<any> {
    return this.http.post(this._baseUrl + 'company', agentData).toPromise()
  }

  editCompanyMaster(object: any): Promise<any> {
    return this.http.put(this._baseUrl + 'company', object).toPromise()
  }
  deleteCompanyMaster(id: any): Promise<any> {
    return this.http.delete(this._baseUrl + 'company/' + id).toPromise()
  }


  //Insurance
  getInsuranceMaster(): Promise<any> {
    return this.http.get(this._baseUrl + 'InsuranceType').toPromise()
  }

  addInsuranceMaster(agentData: any): Promise<any> {
    return this.http.post(this._baseUrl + 'InsuranceType', agentData).toPromise()
  }

  editInsuranceMaster(object: any): Promise<any> {
    return this.http.put(this._baseUrl + 'InsuranceType', object).toPromise()
  }
  deleteInsuranceMaster(id: any): Promise<any> {
    return this.http.delete(this._baseUrl + 'InsuranceType/' + id).toPromise()
  }

  //Insurance
  getCommissionMaster(): Promise<any> {
    return this.http.get(this._baseUrl + 'Commission').toPromise()
  }

  addCommissionMaster(agentData: any): Promise<any> {
    return this.http.post(this._baseUrl + 'Commission', agentData).toPromise()
  }

  editCommissionMaster(object: any): Promise<any> {
    return this.http.put(this._baseUrl + 'Commission', object).toPromise()
  }
  deleteCommissionMaster(id: any): Promise<any> {
    return this.http.delete(this._baseUrl + 'Commission/' + id).toPromise()
  }


  //policyType
  getPolicyMaster(): Promise<any> {
    return this.http.get(this._baseUrl + 'PolicyType').toPromise()
  }

  addPolicyMaster(agentData: any): Promise<any> {
    return this.http.post(this._baseUrl + 'PolicyType', agentData).toPromise()
  }

  editPolicyMaster(object: any): Promise<any> {
    return this.http.put(this._baseUrl + 'PolicyType', object).toPromise()
  }
  deletePolicyMaster(id: any): Promise<any> {
    return this.http.delete(this._baseUrl + 'PolicyType/' + id).toPromise()
  }

  //policy
  getPolicyPMaster(): Promise<any> {
    return this.http.get(this._baseUrl + 'Policy').toPromise()
  }

  getPolicyByIdMaster(id:any): Promise<any> {
    return this.http.get(this._baseUrl + 'Policy?agentId=' + id).toPromise()
  }

  addPolicyPMaster(agentData: any): Promise<any> {
    return this.http.post(this._baseUrl + 'Policy', agentData).toPromise()
  }

  editPolicyPMaster(object: any): Promise<any> {
    return this.http.put(this._baseUrl + 'Policy', object).toPromise()
  }
  deletePolicyPMaster(id: any): Promise<any> {
    return this.http.delete(this._baseUrl + 'Policy/' + id).toPromise()
  }


  //vallage
  getVallageMaster(): Promise<any> {
    return this.http.get(this._baseUrl + 'Vallage').toPromise()
  }

  addVallageMaster(agentData: any): Promise<any> {
    return this.http.post(this._baseUrl + 'Vallage', agentData).toPromise()
  }

  editVallageMaster(object: any): Promise<any> {
    return this.http.put(this._baseUrl + 'Vallage', object).toPromise()
  }
  deleteVallageMaster(id: any): Promise<any> {
    return this.http.delete(this._baseUrl + 'Vallage/' + id).toPromise()
  }


  //vehicle
  getVehicleTypeMaster(): Promise<any> {
    return this.http.get(this._baseUrl + 'VechileType').toPromise()
  }

  addVehicleTypeMaster(agentData: any): Promise<any> {
    return this.http.post(this._baseUrl + 'VechileType', agentData).toPromise()
  }

  editVehicleTypeMaster(object: any): Promise<any> {
    return this.http.put(this._baseUrl + 'VechileType', object).toPromise()
  }

  deleteVehicleTypeMaster(id: any): Promise<any> {
    return this.http.delete(this._baseUrl + 'VechileType/' + id).toPromise()
  }
  
  
  //dashboard  datewise
  getDashboardMaster(object?:any): Promise<any> {
    let endpoint = 'Dashboard/dateWisePolicy'
    if (object) {
      var queryStrings = new HttpParams({ fromObject: object }).toString();
      endpoint = `${endpoint}?${queryStrings}`;
    }
    return this.http.get(this._baseUrl + endpoint).toPromise()
  }


  getTodayExpiryPolicyMaster(): Promise<any> {
    let endpoint = 'Dashboard/TodayExpiryPolicy'
    return this.http.get(this._baseUrl + endpoint).toPromise();
  }

  getTodayExpiryPolicyReport(object?:any): Promise<any> {
    let endpoint = 'Report/TodayExpiryPolicy'
    return this.http.get(this._baseUrl + endpoint , {responseType : 'blob'}).toPromise();
  }

  getDateWisePolicy(object): Promise<any> {
    let endpoint = 'Dashboard/dateWisePolicy'
    return this.http.get(this._baseUrl + endpoint+ '?FromDate='+ object.fromDate + '&ToDate='+ object.toDate).toPromise()
  }
  getDateWisePolicyReport(object): Promise<any> {
    let endpoint = 'Report/dateWisePolicy'
    if (object) {
      var queryStrings = new HttpParams({ fromObject: object }).toString();
      endpoint = `${endpoint}?${queryStrings}`;
    }
    return this.http.get(this._baseUrl + endpoint, {responseType : 'blob'}).toPromise()
  }

  getDateWiseExpiryPolicyMaster(object:any): Promise<any> {
    let endpoint = 'Dashboard/dateWiseExpiryPolicy'
    return this.http.get(this._baseUrl + endpoint + '?FromDate='+ object.fromDate + '&ToDate='+ object.toDate).toPromise();
  }
  getDateWiseExpiryPolicyReport(object?:any): Promise<any> {
    let endpoint = 'Report/dateWiseExpiryPolicy'
    if (object) {
      var queryStrings = new HttpParams({ fromObject: object }).toString();
      endpoint = `${endpoint}?${queryStrings}`;
    }
    return this.http.get(this._baseUrl + endpoint, {responseType : 'blob'}).toPromise()
  }

  getNowMonthlyExpiryPolicyMaster(): Promise<any> {
    let endpoint = 'Dashboard/NowMontlyExpiryPolicy'
    return this.http.get(this._baseUrl + endpoint).toPromise()
  }

  getNowMonthlyExpiryPolicyReport(object?:any): Promise<any> {
    let endpoint = 'Report/NowMontlyExpiryPolicy'
    if (object) {
      var queryStrings = new HttpParams({ fromObject: object }).toString();
      endpoint = `${endpoint}?${queryStrings}`;
    }
    return this.http.get(this._baseUrl + endpoint, {responseType : 'blob'}).toPromise();
  }

  getNextMonthlyExpiryPolicyMaster(): Promise<any> {
    let endpoint = 'Dashboard/NextMontlyExpiryPolicy'
    return this.http.get(this._baseUrl + endpoint).toPromise()
  }

  getNextMonthlyExpiryPolicyReport(object?:any): Promise<any> {
    let endpoint = 'Report/NextMontlyExpiryPolicy'
    if (object) {
      var queryStrings = new HttpParams({ fromObject: object }).toString();
      endpoint = `${endpoint}?${queryStrings}`;
    }
    return this.http.get(this._baseUrl + endpoint, {responseType : 'blob'}).toPromise()
  }

  counters():Promise<any>{
    return this.http.get(this._baseUrl + 'Counter/Insurance').toPromise();
  }

}
