import { Component, Input, OnInit } from '@angular/core';
import { ApiService } from 'src/app/Services/api.service';

@Component({
  selector: 'app-stats',
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.scss']
})
export class StatsComponent implements OnInit {
  counters : any = [];
  @Input() string = '';
  constructor(private _apiService : ApiService) { }

  ngOnInit(): void {
    console.log(this.string);
    this.getCounters();
  }

  getCounters(){
    this._apiService.counters().then((res:any)=>{
      console.log(res);
      if(res.success){
        this.counters = res.returnValue;
      }
      else{
        this.counters = [];
      }
    })
  }

}
