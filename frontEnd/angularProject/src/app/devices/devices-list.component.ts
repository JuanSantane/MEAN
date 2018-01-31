import { Subject } from 'rxjs/Subject';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { LastViewsByDeviceType } from './../shared/lastViews';
import { Observable } from 'rxjs/Observable';
import { Response } from '@angular/http';
import { Subscription } from 'rxjs/Subscription';
import { Device } from './../shared/Device';
import { DeviceService } from '../device.service';
import { Request } from '../shared/request';
import {
  Component,
  OnInit
} from '@angular/core';
import { Subscriber } from 'rxjs';
import * as Rx from 'rxjs/Rx';
import { of } from 'rxjs/observable/of';
import {
  delay, zip, groupBy, mergeMap, concatMap, flatMap, count, map,
  combineLatest, debounce, debounceTime, merge
} from 'rxjs/operators';
import { interval } from 'rxjs/observable/interval';
import { OnDestroy } from '@angular/core/src/metadata/lifecycle_hooks';

@Component({
  selector: 'app-devices-list',
  templateUrl: './devices-list.component.html',
  styleUrls: ['./devices-list.component.css']
})
export class DevicesComponent implements OnInit, OnDestroy {

  queryRqst: Request = new Request();
  devices: Device[] = [
    new Device(
      'DEFAULT_ID',
      'DEFAULT_NAME',
      'DEFAULT_TYPE',
      'DEFAULT_DESCRIPTION'
    )
  ];

  private subscription: Subscription;
  private groupBySubscription: Subscription;
  appName: Observable<string>;
  scores: Observable<any[]>;
  object: any;
  combineLatestViews: LastViewsByDeviceType;
  keywordSubject = new Subject<string>();

  clickObservable01 = Rx.Observable.fromEvent(document.getElementById('cl01'), 'click');
  clickObservable02 = Rx.Observable.fromEvent(document.getElementById('cl02'), 'click');
  clickObservable03 = Rx.Observable.fromEvent(document.getElementById('cl03'), 'click');




  constructor(private deviceService: DeviceService) {}

  onGetDevices(event, keyword) {
    this.keywordSubject.next(keyword);
    if (
      event == null ||
      (event != null && event.keyCode === 13) ||
      this.queryRqst.isVoid()
    ) {
      this.fixRequest();
      console.log(this.queryRqst);
      this.deviceService.getDevices(this.queryRqst).subscribe(
        (devices: any[]) => {
          this.devices = devices;
        },
        error => {
          console.log(error);
        }
      );
    }
  }

  fixRequest() {
    this.queryRqst.name != null && this.queryRqst.name.trim() === ''
      ? (this.queryRqst.name = null)
      : (this.queryRqst.name = this.queryRqst.name);

    this.queryRqst.type != null && this.queryRqst.type.trim() === ''
      ? (this.queryRqst.type = null)
      : (this.queryRqst.type = this.queryRqst.type);
  }
  ngOnInit() {
    // S5-combine-latest
    this.combineLatestViews = this.deviceService.getLatestViews();
    console.log('los views --> ' + JSON.stringify(this.combineLatestViews));
    this.onGetDevices(null, '');
    this.subscription = this.deviceService.onDeviceDeleted.subscribe(
      (deviceId: string) => {
        console.log('item with id = ' + deviceId + ' was removed');
        this.devices = this.removeItemById(this.devices, deviceId);
      }
    );
    // S5-retry, async
    this.appName = this.deviceService.getAppName();

    // S5-GROUP-BY, async
    this.groupBySubscription = this.deviceService.deviceListChanged.subscribe(
      (deviceList: Device[]) => {
        this.scores = Observable.from(deviceList)
        .groupBy((device: Device) => device.type)
        .mergeMap(group => {
          const count$ = group.count();
          return count$.map(c => ({type: group.key, count: c}));
          }).toArray();
      }
    );

    // S5-Debounce, switchMap
    this.keywordSubject
      .debounceTime(2000)
      .switchMap( keyword => this.deviceService.getDevicesByKeyword(keyword))
      .subscribe((result) => {
        console.log(result);
    });


    this.deviceService.deviceListChanged.subscribe(
      (devices: Device[]) => {
        this.devices = devices;
      }
    );

  }

  ngOnDestroy(): void {
    this.groupBySubscription.unsubscribe();
  }

  getUrlImage(deviceType: string) {
    if (deviceType === 'MRA') {
      return 'https://raychambers.files.wordpress.com/2013/09/python.jpg';
    } else if (deviceType === 'VOC') {
      return 'https://cdn.auth0.com/blog/angular2-series/angular2-logo.png';
    } else {
      return 'http://www.myiconfinder.com/uploads/iconsets/256-256-601e6208944772964c75dfe54a2d4af4.png';
    }
  }

  removeItemById(array, id) {
    return array.filter(e => e._id !== id);
  }
}

