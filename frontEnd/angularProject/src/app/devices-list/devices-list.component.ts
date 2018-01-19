import { Device } from './../shared/Device';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { DeviceService } from '../device.service';
import { Request } from '../shared/request';

@Component({
  selector: 'app-devices-list',
  templateUrl: './devices-list.component.html',
  styleUrls: ['./devices-list.component.css']
})
export class DevicesListComponent implements OnInit {

  appName = this.deviceService.getAppName();
  queryRqst: Request = new Request();
  devices: Device[] = [ new Device('DEFAULT_ID', 'DEFAULT_NAME', 'DEFAULT_TYPE', 'DEFAULT_DESCRIPTION') ];
   @Output() deviceSelected = new EventEmitter<Device>();

  constructor(private deviceService: DeviceService) {}

  onGetDevices() {
    console.log(this.queryRqst);
    this.fixRequest();
    this.deviceService.getDevices(this.queryRqst)
    .subscribe(
      (devices: any[] ) =>  {
        this.devices = devices;
        console.log(devices);
      },
      (error) => { console.log(error); }
    );
  }
  fixRequest() {
  (this.queryRqst.name != null && this.queryRqst.name.trim() === '' )
  ? this.queryRqst.name = null
  : this.queryRqst.name = this.queryRqst.name;

  (this.queryRqst.type != null && this.queryRqst.type.trim() === '' )
  ? this.queryRqst.type = null
  : this.queryRqst.type = this.queryRqst.type;

  }
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

  ondeviceSelected(deviceSelected: Device) {
     this.deviceSelected.emit(deviceSelected);
  }

}
