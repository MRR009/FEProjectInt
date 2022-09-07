import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'side-navigation',
  templateUrl: './side-navigation-bar.component.html',
  styleUrls: ['./side-navigation-bar.component.css']
})
export class SideNavigationBarComponent implements OnInit {

  opened: boolean = false;
 
  constructor() {
   
  }

  ngOnInit() {
  }
  

  toggleMenu() {
    this.opened = !this.opened;
  }

}
