import { Device } from './../../shared/Device';
import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { DeviceService } from '../../device.service';
import { Router } from '@angular/router';
import { Request } from '../../shared/request';

@Component({
  selector: 'app-device-detail',
  templateUrl: './device-detail.component.html',
  styleUrls: ['./device-detail.component.css']
})
export class DeviceDetailComponent implements OnInit, OnDestroy {

  queryRqst: Request = new Request();
  currentDevice: Device;

  constructor(
    private route: ActivatedRoute,
    private deviceService: DeviceService,
    private router: Router
  ) { }

  ngOnInit() {
    this.route.params
    .subscribe(
      (params: Params) => {
        this.queryRqst.id = params.id;
        this.deviceService.getDevices(this.queryRqst)
      .subscribe(
        (device: any ) =>  {
          this.currentDevice = device;
          console.log(this.currentDevice);
        },
        (error) => { console.log(error); }
      );
      }
    );
  }

  getUrlImage() {
    if (this.currentDevice.type === 'MRA') {
     return 'https://raychambers.files.wordpress.com/2013/09/python.jpg';
    }else if (this.currentDevice.type === 'VOC') {
     return 'https://cdn.auth0.com/blog/angular2-series/angular2-logo.png';
    }else {
      return 'http://www.myiconfinder.com/uploads/iconsets/256-256-601e6208944772964c75dfe54a2d4af4.png';
    }
   }

   onBackButton() {
     this.router.navigate(['/devices']);
   }

   ngOnDestroy(): void {
    console.log('ondestroy');
  }

}
