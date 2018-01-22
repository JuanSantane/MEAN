import { Device } from './../../shared/Device';
import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { DeviceService } from '../../device.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-device-detail',
  templateUrl: './device-detail.component.html',
  styleUrls: ['./device-detail.component.css']
})
export class DeviceDetailComponent implements OnInit {

  @Input() device: Device;

  constructor(
    private route: ActivatedRoute,
    private deviceService: DeviceService,
    private router: Router
  ) { }

  ngOnInit() {
    console.log('ngOnInit....');
    this.route.params
    .subscribe(
      (params: Params) => {
        this.device = this.deviceService.getSelectedDevice();
      }
    );
  }

  getUrlImage() {
    if (this.device.type === 'MRA') {
     return 'https://raychambers.files.wordpress.com/2013/09/python.jpg';
    }else if (this.device.type === 'VOC') {
     return 'https://cdn.auth0.com/blog/angular2-series/angular2-logo.png';
    }else {
      return 'http://www.myiconfinder.com/uploads/iconsets/256-256-601e6208944772964c75dfe54a2d4af4.png';
    }
   }

   onBackButton() {
     this.router.navigate(['/devices']);
   }

}
