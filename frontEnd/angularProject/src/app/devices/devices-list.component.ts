import { Observable } from 'rxjs/Observable';
import { Response } from '@angular/http';
import { Subscription } from 'rxjs/Subscription';
import { Device } from './../shared/Device';
import { Component, OnInit, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { DeviceService } from '../device.service';
import { Request } from '../shared/request';
// tslint:disable-next-line:import-blacklist
import { Subscriber } from 'rxjs';
import * as Rx from 'rxjs/Rx';
import { groupBy, mergeMap, concatMap, flatMap } from 'rxjs/operators';

@Component({
  selector: 'app-devices-list',
  templateUrl: './devices-list.component.html',
  styleUrls: ['./devices-list.component.css']
})
export class DevicesComponent implements OnInit {

  queryRqst: Request = new Request();
  devices: Device[] = [ new Device('DEFAULT_ID', 'DEFAULT_NAME', 'DEFAULT_TYPE', 'DEFAULT_DESCRIPTION') ];
  @Output() deviceSelected = new EventEmitter<Device>();
  private subscription: Subscription;
  appName: Observable<string>;
  constructor(private deviceService: DeviceService) {}

  onGetDevices(event) {
    if (event == null || (event != null && event.keyCode === 13) ||
    this.queryRqst.isVoid()) {
      this.fixRequest();
      this.deviceService.getDevices(this.queryRqst)
      .subscribe(
        (devices: any[] ) =>  {
          this.devices = devices;
        },
        (error) => { console.log(error); }
      );
    }
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

    this.onGetDevices(null);
    this.subscription =  this.deviceService.onDeviceDeleted
      .subscribe(
        (deviceId: string) => {
          console.log('item with id = ' + deviceId + ' was removed');
          this.devices = this.removeItemById(this.devices, deviceId);
        }
      );
    this.appName = this.deviceService.getAppName();
    // // //emit every click
    // const source = Observable.of(1, 2, 3);
    // // //if another click comes within 3s, message will not be emitted
    // const example = source.switchMap(val =>
    //   Rx.Observable.fromEvent(document.getElementById('inputName'), 'keyup')
    //  .mapTo('buscando por ' + this.queryRqst.name ));
    // // //(click)...3s...'Hello I made it!'...(click)...2s(click)...

    // const subscribe = example.subscribe(val => console.log(val));



    // GROUP-BY
    this.deviceService.getDevices(new Request())
    .mergeMap(obs => Observable.from(obs))
    .groupBy((device: Device) => device.type)
    .mergeMap(group => group.toArray())
    .subscribe(val => {
      console.log(val);
    });



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


  removeItemById(array, id) {
    return array.filter(e => e._id !== id);
}



}
