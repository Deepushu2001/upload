import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { AccountService } from 'src/app/_services/account.service';
import { metricallocation } from 'src/app/interface/metricallocation';
import { Metricupdation } from 'src/app/interface/metricupdation';
import { SiteEnginner } from 'src/app/interface/site-enginner';
import { StageAlloction } from 'src/app/interface/stage-alloction';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';
import { Title } from '@angular/platform-browser';
import { Status } from 'src/app/_models/Status';
import { StagesUpdationDetails } from 'src/app/interface/stages-updation-details';
import { DatePipe } from '@angular/common';
import { DateAdapter } from '@angular/material/core';

@Component({
  selector: 'app-chiefengineer-allocation-dates-updatetion',
  templateUrl: './chiefengineer-allocation-dates-updatetion.component.html',
  styleUrls: ['./chiefengineer-allocation-dates-updatetion.component.css']
})
export class ChiefengineerAllocationDatesUpdatetionComponent implements OnInit {
  dropdownSiteEnginner  : SiteEnginner[] =[];
  dropdownmetric: Metricupdation[]=[];
  baseUrl=environment.apiUrl;
  EntryBy: string;
  UniqueId: string;
  EncryptKey:string;
  ipaddress:string;
  isAuthenticate:boolean = false;
  routecomponent:string;
  userName: any;
  
  table : StageAlloction[]=[];
  item:any;

  constructor(private dateAdapter: DateAdapter<Date>,private datePipe: DatePipe,private title:Title,private http : HttpClient ,private route:ActivatedRoute,private accountService:AccountService,private router: Router, private SpinnerService: NgxSpinnerService) {

    this.dateAdapter.setLocale('en-GB');
   }
  
  ngOnInit(): void
  {
    this.title.setTitle("OBP Consturction Date Updation");
    this.UniqueId=this.route.snapshot.params['id'];
    this.EncryptKey=this.route.snapshot.params['encyKey'];
    this.accountService.getclientIPAddress().subscribe((data: any) => {
      this.ipaddress= data.ipAddress;
      this.checkAuthentication();

    });
    this.SpinnerService.show();

  }


  checkAuthentication()
  {      
    //   var accrdDTO={
    //     "UniqueId":this.UniqueId,
    //     "EncryptKey":this.EncryptKey,
    //     "Name":this.routecomponent,
    //     "IpAdd":encodeURIComponent(this.ipaddress)
    //  };
    //  this.accountService.accrdlogin(accrdDTO).subscribe(response=>{ 
    //     if(response.token!=""){    
    //     this.isAuthenticate=true;     
    //     }
      this.isAuthenticate=true;   
      //if(this.isAuthenticate){
          //Load popup first
          // let userId = localStorage.getItem('user');
          // this.userName = JSON.parse(userId).username;
          this.userName = "20909";
          this.getvalueofdropdownsiteengineer();
          this.getvalueofdropdownMetricUpdtion();
       //  }  
        //  else{
        //   this.router.navigate(['/not-found']);
        // }
       this.SpinnerService.hide(); 
     // });
  }
  StageDecription(data: any):void{
    
   // console.log(data,"data");
    if(data.ddlPlanner === ''){
      Swal.fire({
        icon: 'error',
        html: '<span class="my-title" style="font-weight:bold;font-size: 21px !important">Please Select Planner Session !</span>',
        position: 'center',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        // More options can be found in the documentation
      });
      return;
    }
    else if(data.ddlmetric == ''){
      Swal.fire({
        icon: 'error',
        html: '<span class="my-title" style="font-weight:bold;font-size: 21px !important">Please select metric !</span>',
        position: 'center',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        // More options can be found in the documentation
      });         
      return;
    }
    else if(data.ddlengineer == ''){
      Swal.fire({
        icon: 'error',
        html: '<span class="my-title" style="font-weight:bold;font-size: 21px !important">Please select Engineer !</span>',
        position: 'center',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        // More options can be found in the documentation
      });     
      return;
    }
    debugger;
    this.http.get<StageAlloction[]>(`https://localhost:7178/api/Construction/GetStageDecripationUpdtion?EngineerUID=${data.ddlengineer}&MetricId=${data.ddlmetric}&PlannerSessionId=${data.ddlPlanner}`).subscribe(
      (data) => {
       // debugger;
        this.table = data; 
        console.log(data,"data");
        this.SpinnerService.hide();
      },
      (error) => {
        console.error('Error fetching data:', error);
        this.SpinnerService.hide();
      }
      );
  }
       getvalueofdropdownsiteengineer(){
        this.SpinnerService.show();
       this.http.get<SiteEnginner[]>('https://localhost:7178/api/Construction/GetSiteEngineer').subscribe(
       (data) => {
        debugger;
         this.dropdownSiteEnginner = data; 
         this.SpinnerService.hide();
       },
       (error) => {
         console.error('Error fetching data:', error);
         this.SpinnerService.hide();
       }
       );
     }
     saveData(item: any):void { 
      debugger;
        //console.log(item,"item");
      //  console.log(JSON.stringify(data));
          const obj:StagesUpdationDetails=new StagesUpdationDetails (item.stageAllocationId,this.datePipe.transform(item.startDate,'yyyy-MM-dd'),this.datePipe.transform(item.endDate,'yyyy-MM-dd'),this.userName,item.Remarks)
          console.log(JSON.stringify(obj));
          this.http.post<Status>('https://localhost:7178/api/Construction/UpdateStageRemarsks',obj).subscribe
          (
            response => {
              if(response[0].status==1){
              Swal.fire({
                icon: 'success',
                html: '<span class="my-title" style="font-weight:bold;font-size: 21px !important">'+response[0].message+'</span>',
                position: 'center',
                showConfirmButton: false,
                timer: 3000,
                timerProgressBar: true,
              
              });
            }
              else if(response[0].status==-1){
                Swal.fire({
                  icon: 'error',
                  html: '<span class="my-title" style="font-weight:bold;font-size: 21px !important">'+response[0].message+'</span>',
                  position: 'center',
                  showConfirmButton: false,
                  timer: 3000,
                  timerProgressBar: true,
                });
              }
             
              }
          );
      }
     getvalueofdropdownMetricUpdtion(){
      this.SpinnerService.show();
     this.http.get<Metricupdation[]>('https://localhost:7178/api/Construction/GetMetricDescriptionUpdation').subscribe(
     (data) => {
      debugger;
       this.dropdownmetric = data; 
       this.SpinnerService.hide();
     },
     (error) => {
       console.error('Error fetching data:', error);
       this.SpinnerService.hide();
     }
     );
   }
}
