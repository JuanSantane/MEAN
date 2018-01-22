import { Device } from './../../shared/Device';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { DeviceService } from '../../device.service';
import { Router, ActivatedRoute } from '@angular/router';

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
    private router: Router
  ) {}

  ngOnInit() {}

  onViewDetails(selectedDevice: Device) {
    this.deviceService.setSelectedDevice(selectedDevice);
    console.log(this.deviceService.getSelectedDevice());
    this.router.navigate(['devices/' + this.device.id ]);
  }

  onDeleteItem() {
    prompt('item will be deleted');
  }
}
