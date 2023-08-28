import { Component, EventEmitter, HostListener, OnChanges, OnInit, Output } from '@angular/core';
import { navbarData } from './nav-data';
import { animate, style, transition, trigger } from '@angular/animations';


interface SideNavToggle{
  screenWidth: number;
  collapsed: boolean;
}

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss'],
  animations: [
    trigger('fadeInOut', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate(700, style({ opacity: 1 }))
        ]),
      transition(':leave', [
        style({ opacity: 1 }),
        animate(100, style({ opacity: 0 }))
        ]),
    ]),
  ]
})
export class SidenavComponent implements OnInit {

  constructor() { }

  @Output() onToggleSideNav: EventEmitter<SideNavToggle> = new EventEmitter();

  collapsed = false;
  navData = navbarData;
  screenWidth: number = 0;

  ngOnInit(): void {
    this.screenWidth = window.innerWidth;
    console.log("this.screenWidth: ",window.innerWidth);
  }



  @HostListener('window:resize', ['$event'])
  onResize(event:any):void {
    this.screenWidth = window.innerWidth;
    if(this.screenWidth < 768){
      this.collapsed = false;
      this.onToggleSideNav.emit({ collapsed: this.collapsed,screenWidth: this.screenWidth });
    }
  }

  toggleCollapse():void {
    this.collapsed = !this.collapsed;
    this.onToggleSideNav.emit({ collapsed: this.collapsed,screenWidth: this.screenWidth });
  }

  closeSidenav():void {
    this.collapsed = false;
    this.onToggleSideNav.emit({ collapsed: this.collapsed,screenWidth: this.screenWidth });
  }


}
