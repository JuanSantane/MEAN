import { Device } from './../../shared/Device';
import { Component, OnInit, Input,  EventEmitter, Inject } from '@angular/core';
import { DeviceService } from '../../device.service';
import { Router, ActivatedRoute } from '@angular/router';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';

@Component({
  selector: 'app-device',
  templateUrl: './device.component.html',
  styleUrls: ['./device.component.css']
})
export class DeviceComponent implements OnInit {
  @Input() device: Device;

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

}
