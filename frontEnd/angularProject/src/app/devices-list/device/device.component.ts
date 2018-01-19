import { Device } from './../../shared/Device';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-device',
  templateUrl: './device.component.html',
  styleUrls: ['./device.component.css']
})
export class DeviceComponent implements OnInit {

  @Input() device: Device ;

  @Output() deviceSelected = new EventEmitter<Device>();

  constructor() { }

  ngOnInit() {
  }

  onDeviceSelected(selectedDevice: Device) {
    this.deviceSelected.emit(this.device);
  }

}
