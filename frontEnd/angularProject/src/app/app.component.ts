import { Request } from './shared/request';
import { DeviceService } from './device.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  appName = this.deviceService.getAppName();
  queryRqst: Request = new Request();

  devices = [
    {
      id: 'DEFAUL_ID',
      type: 'DEAULT_TYPE',
      name: 'DEFAULT_NAME',
      desc: 'DEFAULT_DESC'
    }
  ];

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

}
