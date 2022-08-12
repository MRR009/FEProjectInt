import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Audit } from 'src/app/model/audit';
import { Auditor } from 'src/app/model/auditor';
import { Auditors } from 'src/app/model/auditors';
import { AuditorsList } from 'src/app/model/auditors-list';
import { AuditorsService } from 'src/app/services/auditors.service';
import { AuditserviceService } from 'src/app/services/auditservice.service';
import { DealerService } from 'src/app/services/dealer.service';
import { DocumentService } from 'src/app/services/document/document.service';
import { Dealer } from 'src/Objects';

@Component({
  selector: 'select-dealer',
  templateUrl: './select-dealer.component.html',
  styleUrls: ['./select-dealer.component.css']
})
export class SelectDealerComponent implements OnInit, AfterViewInit {


  @ViewChild(MatSort) sort !: MatSort;
  @ViewChild(MatPaginator) paginator !: MatPaginator;

  constructor(private documnetService:DocumentService ,private dealerService:DealerService,private fb: FormBuilder, private auditorService:AuditorsService,private auditService:AuditserviceService ) { 
    
    this.dataSource.filterPredicate = this.createFilter();
    
    dealerService.getDealers().subscribe({
      next:(data:any)=>{this.dataSource.data=data, console.log(data)}
    })
    

    this.auditorService.getAuditorsList().subscribe(
      {
        next :(data:any) => {this.auditorsList=data, console.log(data)}
      }
    )
  }


  dealersList:any[]=[]
  auditorsList : Auditor[]=[];
  selectedAuditors:Auditor[]=[];
  workAllocatedAuditors:AuditorsList[]=[];
  dealer:any={}
  showDealersList:boolean=true;
  showDealerData:boolean=false;
  showCreateAudit:boolean=false;
  showAuditors:boolean=false;
  showReviewSubmit:boolean=false;
  totalWorkAssigned:number=0;
  reportsLanguage:string="";
  auditType:string="";

  auditForm=this.fb.group({
    auditType:[0, Validators.required],
    comments:['', Validators.required],
    dateAssigned:['', Validators.required],
    noOfMonths:[0, Validators.required],
    reason: ['', Validators.required],
    reportsLanguage:[0, Validators.required],
  })

  dealerInfo=this.fb.group({
    businessCenter : ['', Validators.required],
    dealerCode : ['', Validators.required],
    dealerName : ['', Validators.required],
    dba : ['', Validators.required],
    dealerPrincipal : ['', Validators.required],
    letterGreeting : ['', Validators.required],
    salesGroupSize : ['', Validators.required],
    
    dealerAddress: this.fb.group({
      addressLane1 : ['', Validators.required],
      state : ['', Validators.required],
      addressLane2 : ['', Validators.required],
      country : ['', Validators.required],
      city : ['', Validators.required],
      zip : ['', Validators.required],
      phone : ['', Validators.required],
      mail : ['', Validators.required],
  
    })

  })

  /** Slect dealers List related   */

  dealerCodeFilter = new FormControl('');
  businessCenterFilter = new FormControl('');
  dealerNameFilter = new FormControl('');
  dealerStateFilter = new FormControl('');
  countryFilter = new FormControl('');

  dataSource = new MatTableDataSource();

  columnsToDisplay = ['dealerCode','businessCenter','dealerName', 'state', 'country']

  filterValues = {
    dealerCode:'',
    businessCenter: '',
    dealerName:'',
    state: '',
    country: ''
  }

  ngAfterViewInit(): void {
    this.dataSource.sortingDataAccessor = (dealer:any, property) => {
      switch(property) {
        case 'state': return dealer.dealerAddress.state;
        case 'country': return dealer.dealerAddress.country;
        default: return dealer[property];
      }
    };
    this.dataSource.sort = this.sort;
   
    console.log(this.auditorsList)
  }

  ngOnInit(): void {

  

    this.dealerCodeFilter.valueChanges
    .subscribe(
      dealerCode => {
        this.filterValues.dealerCode = dealerCode;
        this.dataSource.filter = JSON.stringify(this.filterValues);
      }
    )

    this.businessCenterFilter.valueChanges
    .subscribe(
      businessCenter => {
        this.filterValues.businessCenter = businessCenter;
        this.dataSource.filter = JSON.stringify(this.filterValues);
      }
    )

    this.dealerNameFilter.valueChanges
    .subscribe(
      dealerName => {
        this.filterValues.dealerName = dealerName;
        this.dataSource.filter = JSON.stringify(this.filterValues);
      }
    )

    this.dealerStateFilter.valueChanges
    .subscribe(
      dealerState => {
        this.filterValues.state = dealerState;
        this.dataSource.filter = JSON.stringify(this.filterValues);
      }
    )

    this.countryFilter.valueChanges
    .subscribe(
      country => {
        this.filterValues.country = country;
        this.dataSource.filter = JSON.stringify(this.filterValues);
      }
    )
    

  }

  createFilter(): (data: any, filter: string) => boolean {

    let filterFunction = function (data: any, filter: any): boolean {
      console.log(data)
      let searchTerms = JSON.parse(filter);
      console.log(searchTerms)
      return data.dealerCode.toLowerCase().indexOf(searchTerms.dealerCode.toLowerCase()) !== -1
        && data.businessCenter.toLowerCase().indexOf(searchTerms.businessCenter.toLowerCase()) !== -1
        && data.dealerName.toLowerCase().indexOf(searchTerms.dealerName.toLowerCase()) !== -1
        && data.dealerAddress.country.toLowerCase().indexOf(searchTerms.country.toLowerCase()) !== -1
        && data.dealerAddress.state.toLowerCase().indexOf(searchTerms.state.toLowerCase()) !== -1;
    }
   

    return filterFunction;
  }
  
  selectDealer(dealerData:any){
    this.dealer=dealerData
    this.showDealersList=false;
    this.showDealerData=true;
    this.dealerInfo.patchValue(dealerData);
    // this.dealerInfo = this.fb.group({
    //   dealerCode : [dealerData.dealerCode, Validators.required],
    //   businessCenter : [dealerData.businessCenter, Validators.required],
    //   dealerName : [dealerData.dealerName, Validators.required],
    //   dba : [dealerData.dba, Validators.required],
    //   dealerPrincipal : [dealerData.dealerPrincipal, Validators.required],
    //   letterGreeting : [dealerData.letterGreeting, Validators.required],
    //   salesGroupSize : [dealerData.salesGroupSize, Validators.required],
    //   dealerAddress : this.fb.group({
      
    //     addressLane1 : [dealerData.dealerAddress.addressLane1 , Validators.required],
    //     state : [dealerData.dealerAddress.state, Validators.required],
    //     addressLane2 : [dealerData.dealerAddress.addressLane2, Validators.required],
    //     country : [dealerData.dealerAddress.country, Validators.required],
    //     city : [dealerData.dealerAddress.city, Validators.required],
    //     zip : [dealerData.dealerAddress.zip, Validators.required],
    //     phone : [dealerData.dealerAddress.phone, Validators.required],
    //     mail : [dealerData.dealerAddress.mail, Validators.required],
    
    //   })
    // })
  }

  onClickOnDealersList(){
    this.showDealersList=true;
    this.showDealerData=false;
    this.showCreateAudit=false;
    this.showReviewSubmit=false;
    
  }
  onClickOnDealersInfo(){
    this.showDealersList=false;
    this.showDealerData=true;
    this.showCreateAudit=false;
    this.showReviewSubmit=false;
  }
  onClickOnAssignAudit(){
    this.showDealersList=false;
    this.showDealerData=false;
    this.showCreateAudit=true;
    this.showReviewSubmit=false;
  }
  onClickOnReviewAudit(){
    this.showDealersList=false;
    this.showDealerData=false;
    this.showCreateAudit=false;
    this.showReviewSubmit=true;

  }
  showAuditorsList(){
    this.showAuditors=true;
  }
  onSelectAuditor(auditor:Auditor){
    const found=this.selectedAuditors.find(e=>e.auditorId==auditor.auditorId)
    if(found){
      alert("Already auditor assigned for this audit")
    }else{
      this.selectedAuditors.push(auditor)
      this.showAuditors=false;
    }
    
  }

  onAssigningWork(e:any, allocatedAuditor:any){
    let workAllocation:number=parseInt(e.target.value)
    if(this.totalWorkAssigned + workAllocation >100){
      alert("Work allocation exceeded 100%")
    }else{
      this.totalWorkAssigned=this.totalWorkAssigned+workAllocation;
      this.workAllocatedAuditors.push(new AuditorsList(0,allocatedAuditor.auditorId,workAllocation))
    }
    
  }

  onSelectOfAuditType(e:any){
    let value= parseInt(e.target.value)
    switch (value) {
      case 0:
        return this.auditType="RSA"
      case 1:
        return this.auditType="SALES"
      case 2:
        return this.auditType="WARRANTY"
      default:
        return this.auditType=""
    }
  }

  onSelectOfReportsLanguage(e:any){
    let value= parseInt(e.target.value)
    switch (value) {
      case 0:
        return this.reportsLanguage="English"
      case 1:
        return this.reportsLanguage="Spanish"
      case 2:
        return this.reportsLanguage="French"
      default:
        return this.reportsLanguage=""
    }
  }

  onSearchOfAuditors(e:any){
  
  }

  onClickOnBack(){
    this.onClickOnDealersList();
  }
  onClickOnNext(){
    this.onClickOnAssignAudit();
  }
  onClickOnCancel(){
    this.onClickOnDealersList();
    this.dealer={};
    this.selectedAuditors=[]
    window.location.reload();
  }
  onClickOnBack1(){
    this.onClickOnDealersInfo();
  }
  onClickOnNext1(){
    this.onClickOnReviewAudit();
  }
  onClickOnBack2(){
    this.onClickOnAssignAudit();
  }
  onClickOnSubmit(){
    if(this.workAllocatedAuditors.length==0){
      alert("Audit cannot be created without auditors")
    }else{
      const audit = new Audit(0,this.dealer.dealerId,parseInt(this.auditForm.value.auditType),this.auditForm.value.comments,this.auditForm.value.dateAssigned,parseInt(this.auditForm.value.noOfMonths),this.auditForm.value.reason,this.auditForm.value.reportsLanguage,this.workAllocatedAuditors)
      this.auditService.createAudit(audit).subscribe({
        next:(data:any)=>{
          console.log(data)
          alert("Audit created  successfully")
        }
      })
    }
    
  }

}