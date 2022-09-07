import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { multiDocDto } from 'src/app/model/multiDocDto';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DealerService {
  url='http://localhost:7070/stgit.com/autodealerauditappapi/dealer/v1/dealers/2';

  constructor(private http:HttpClient) { }
  getDealerById(id:number){
    return this.http.get(`http://localhost:7070/stgit.com/autodealerauditappapi/dealer/v1/dealers/${id}`)
  }
  getDealers(){
    return this.http.get(`http://localhost:7070/stgit.com/autodealerauditappapi/dealer/v1/dealers`)
  }
 
}
