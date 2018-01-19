import { Device } from './../../shared/Device';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-device-detail',
  templateUrl: './device-detail.component.html',
  styleUrls: ['./device-detail.component.css']
})
export class DeviceDetailComponent implements OnInit {

  @Input() device: Device;

  constructor() { }

  ngOnInit() {
  }

  getUrlImage(deviceType: string) {
    if (deviceType === 'MRA') {
     return 'https://raychambers.files.wordpress.com/2013/09/python.jpg';
    }else if (deviceType === 'VOC') {
     return 'https://cdn.auth0.com/blog/angular2-series/angular2-logo.png';
    }else {
      return 'http://www.myiconfinder.com/uploads/iconsets/256-256-601e6208944772964c75dfe54a2d4af4.png';
    }
   }

}
