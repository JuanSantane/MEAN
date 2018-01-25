import { Request } from './../../shared/request';
import { Device } from './../../shared/Device';
import { Component, OnInit, Input,  EventEmitter, Inject } from '@angular/core';
import { DeviceService } from '../../device.service';
import { Router, ActivatedRoute } from '@angular/router';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { trigger, state, style, transition, animate, keyframes } from '@angular/animations';
import { PRETTY_ANIMATION, removingDevice } from './device.animations';

@Component({
  selector: 'app-device',
  templateUrl: './device.component.html',
  styleUrls: ['./device.component.css'],
  animations: [ removingDevice ]
})
export class DeviceComponent implements OnInit {
  @Input() device: Device;
  state = 'normal';

  constructor(
    private deviceService: DeviceService,
    private route: ActivatedRoute,
    private router: Router,
    public dialog: MatDialog
  ) {}

  ngOnInit() {}

  testing() {
   // console.log(this.device);
  }

  onDeleteDevice() {
    this.animateMe();
    const rqst = new Request();
    rqst.id = this.device._id;
    this.sleep(1000).then(() => {
      this.deviceService.deleteOne(rqst).subscribe(res => { });
    });
  }

  animateMe() {
    this.state = (this.state === 'normal' ? 'small' : 'small');
  }

  sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}
