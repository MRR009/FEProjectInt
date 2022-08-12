import {  NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuditorsComponent } from './components/auditors/auditors.component';
import { CreateDocumentComponent } from './components/create-document/create-document.component';
import { DocumentDashboardComponent } from './components/document-dashboard/document-dashboard.component';
import { ReadDocumentComponent } from './components/read-document/read-document.component';
import { SelectDealerComponent } from './components/select-dealer/select-dealer.component';
import { SideNavigationBarComponent } from './components/side-navigation-bar/side-navigation-bar.component';



const routes: Routes = [
  {path:"dealer", component: SelectDealerComponent},
  {path:"auditors", component: AuditorsComponent},
  {path:"document", component: ReadDocumentComponent},
  {path:"create-document", component: CreateDocumentComponent},
  {path:"read-document", component: ReadDocumentComponent},
  {path:"document-dashboard", component: DocumentDashboardComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
