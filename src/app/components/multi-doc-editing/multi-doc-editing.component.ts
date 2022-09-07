import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { Country } from 'src/app/model/country';
import { Section } from 'src/app/model/section';
import { DocumentService } from 'src/app/services/document/document.service';
import { selectedDocIds } from 'src/app/store/document-store/document.selector';
import { DataExport2 } from '../document-dashboard/document-dashboard.component';
import { ReadDocumentComponent } from '../read-document/read-document.component';


@Component({
  selector: 'app-multi-doc-editing',
  templateUrl: './multi-doc-editing.component.html',
  styleUrls: ['./multi-doc-editing.component.css']
})
export class MultiDocEditingComponent implements OnInit {
  
  multipleDocIds: number[] = this.dataOfDocsList.data2
  countryList!:Country[];
  sectionList!:Section[];
  resourceList:string[]=["RSA", "SALES", "WARRANTY"]
  docStatusList:string[]=["Active","Inactive"]
  reviewStatusList:string[]=["Reviewed","Not Reviewed"]
  constructor(private fb:FormBuilder, private documentService: DocumentService, private store: Store,public dialogRef: MatDialogRef<ReadDocumentComponent>,@Inject(MAT_DIALOG_DATA) public dataOfDocsList: DataExport2) { }



  ngOnInit(): void {
    this.store.select(selectedDocIds).subscribe(data => {
      data.forEach((val:any) => {
        this.multipleDocIds.push(val.documentId)
      })
    })
   
    this.documentService.getAllCountries().subscribe(res=>{
      this.countryList=res;
      //console.log(this.countryList)
    })


    this.documentService.getAllSections().subscribe(res=>{
      this.sectionList=res;
      //console.log(this.sectionList)
    })

  }




  onSubmit(){ 
    var dataToSubmit = this.documentForm.value;
    dataToSubmit.revisionStatus = dataToSubmit.revisionStatus == "Reviewed"? "true": "false";
    console.log(dataToSubmit)
    this.documentService.editMultipleDocs(dataToSubmit).subscribe((data: any) => console.log(data,alert("Update has been reflected successfully!!")))
  }

  documentForm=new FormGroup({
    country:new FormControl('',[Validators.required]),
    section:new FormControl('',[Validators.required]),
    resourceType:new FormControl('',[Validators.required]),
    category:new FormControl('',[Validators.required]),
    year:new FormControl('',[Validators.required]),
    revisionStatus:new FormControl('',[Validators.required]),
    updatingDocsumentIdsList:new FormControl(this.dataOfDocsList.data2,[Validators.required]),
  })



}