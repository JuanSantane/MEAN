import { Device } from './shared/Device';
import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  appName: String = 'APP_DEFAULT_NAME';
  selectedDevice: Device;

  updateSelectedDevice(newSelectedDevice: Device) {
    this.selectedDevice = newSelectedDevice;
  }
}
