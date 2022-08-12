import { NgModule } from '@angular/core';
import {HttpClientModule} from '@angular/common/http'
import { MatSidenavModule } from '@angular/material/sidenav';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CreateAuditComponent } from './components/create-audit/create-audit.component';
import { CreateDealerComponent } from './components/create-dealer/create-dealer.component';
import { AssignAuditComponent } from './components/assign-audit/assign-audit.component';
import { AuditorsComponent } from './components/auditors/auditors.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SideNavigationBarComponent } from './components/side-navigation-bar/side-navigation-bar.component';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { SelectDealerComponent } from './components/select-dealer/select-dealer.component';
import { CreateDocumentComponent } from './components/create-document/create-document.component';
import { ReadDocumentComponent } from './components/read-document/read-document.component';
import { DocumentDashboardComponent } from './components/document-dashboard/document-dashboard.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatOptionModule, MatRippleModule } from '@angular/material/core';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { MatSelectModule } from '@angular/material/select';
import { MatDialogModule } from '@angular/material/dialog';
import { EditSelectedDocComponent } from './components/edit-selected-doc/edit-selected-doc.component';
import { StoreModule } from '@ngrx/store';
import { docIdReducer, metaReducerLocalStorage } from './store/document-store/document.reducer';


@NgModule({
  declarations: [
    AppComponent,
    CreateAuditComponent,
    CreateDealerComponent,
    AssignAuditComponent,
    AuditorsComponent,
    SideNavigationBarComponent,
    SelectDealerComponent,
    CreateDocumentComponent,
    ReadDocumentComponent,
    DocumentDashboardComponent,
    EditSelectedDocComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatSidenavModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatRippleModule,
    MatCardModule,
    MatToolbarModule,
    MatListModule,
    MatPaginatorModule,
    MatSortModule,
    MatTableModule,
    MatCheckboxModule,
    MatSelectModule,
    MatOptionModule,
    MatDialogModule,
    StoreModule.forRoot({docIdEntries: docIdReducer}, { metaReducers: [ metaReducerLocalStorage ] })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
