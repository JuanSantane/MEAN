import { FormControl } from '@angular/forms';
import { LastViewsByDeviceType } from './shared/lastViews';
import { Device } from './shared/Device';
import { Request } from './shared/request';
import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Subject } from 'rxjs/Subject';
// tslint:disable-next-line:import-blacklist
import 'rxjs/Rx';
import { Observable } from 'rxjs/Observable';
import { EventEmitter, OnInit } from '@angular/core';
import { map, retry, switchMap, combineLatest, retryWhen } from 'rxjs/operators';
import { UserService } from './services/user.service';

@Injectable()
export class DeviceService {

  rootUrl = 'http://localhost:3000/';
  // rootUrl = 'http://192.168.188.67:3000/';
  // deviceListChanged = new Subject<Device[]>();
  headersValue = new Headers();
  private devices: Device[] = [];
  deviceListChanged = new Subject<Device[]>();
  onDeviceDeleted = new EventEmitter<string>();
  app_name_KEY = 'app_name';
  combineLatestViews: LastViewsByDeviceType;

  private mraSubject = new Subject<string>();
  private lsrSubject = new Subject<string>();
  private vocSubject = new Subject<string>();

  public combineLatest: Observable<LastViewsByDeviceType> = this.mraSubject
    .combineLatest(this.lsrSubject, this.vocSubject,
      function(s1, s2, s3){ return new LastViewsByDeviceType(s1, s2, s3); });

  constructor(private http: Http, private authService: UserService) {
    this.combineLatest
      .subscribe((combine: LastViewsByDeviceType) => {
        this.combineLatestViews = combine;
      });
    this.mraSubject.next('--');
    this.lsrSubject.next('--');
    this.vocSubject.next('--');

  }

  getDevices(rqst: Request) {
    console.log(rqst);
    if (rqst.isVoid() || rqst == null) {
        return this.fixResponse( this.rootUrl + 'devices/');
    }
    if (rqst.id != null) {
      return this.fixResponse( this.rootUrl + 'devices/' + rqst.id);
    }
    if (rqst.name != null) {
      if (rqst.type != null) {
        return this.fixResponse(  this.rootUrl + 'devices/null/' + rqst.name + '/' + rqst.type);
      }
    return this.fixResponse( this.rootUrl + 'devices/null/' + rqst.name + '/null' );
    }else {
      return this.fixResponse( this.rootUrl + 'devices/null/null/' + rqst.type );
    }
  }


  update(device: Device) {
    this.headersValue = new Headers();
    this.headersValue.append('Content-Type', 'application/json');
    // this.headersValue.append('authorization_token', this.authService.getToken());
    console.log('device ID ==> ' +  JSON.stringify(device._id));
    console.log(JSON.stringify(device));
    const resultado =  this.http.put(
        this.rootUrl + 'devices/' + device._id,
        JSON.stringify(device),
        {headers: this.headersValue}
      )
      .map((response: Response) => {
        console.log(response);
        return response.json();
      })
      .catch((error: Response) => {
        console.log(error);
        return Observable.throw('Something went wrong');
      });

      this.deviceListChanged.next(this.devices);
      return resultado;


  }
  createOne(device: Device) {
    this.headersValue = new Headers();
    this.headersValue.append('Content-Type', 'application/json');
    return this.http.post(
      this.rootUrl + 'devices/new/',
      JSON.stringify(device),
        {headers: this.headersValue})
      .map((response: Response) => {
          console.log(response);
          return response.json();
        }
      ).catch( (error: Response) => {
        console.log('ERROR');
        return Observable.throw('Something went wrong');
      });
  }

  deleteOne(request: Request) {
    this.headersValue = new Headers();
    this.headersValue.append('Content-Type', 'application/json');
    console.log('item will be deleted');
      return this.http.delete(
        this.rootUrl + 'devices/' + request.id,
        {headers: this.headersValue} )
        .map((response: Response) => {
          this.onDeviceDeleted.emit(request.id);
          console.log(this.devices);
          this.devices = this.devices.filter(e => e._id !== request.id);
          this.deviceListChanged.next( this.devices );
          return response.json();
        }).catch((error: Response) => {
          console.log(error);
          return Observable.throw(error);
        });
  }

  getAppName(): Observable<string> {
    // S5-retry
    return this.http.get(this.rootUrl + 'params/' + this.app_name_KEY)
    .map((response: Response) => {
      const param = response.json();
      return param.value;
    }).retry(5);
    // .retryWhen(errors =>
    //   errors.do(val => console.log(`Value ${val} was too high!`))
    //   // restart in 5 seconds
    //   .delayWhen(val => Observable.timer(val * 1000)));
  }

  fixResponse(route: string) {
    this.headersValue = new Headers();
    this.headersValue.append('authorization_token', this.authService.getToken());
    return this.http.get( route, {headers: this.headersValue } )
    .map((response: Response) => {
      const data = response.json();
      let count = 0;
      for (const device of data) {
        count = count + 1;
        if (!device.type) { device.type = 'DEFAULT TYPE'; }
        if (!device.name) { device.name = 'DEFAULT NAME'; }
        if (!device.desc) { device.desc = 'DEFAULT DESCRIPTION'; }
        if (!device._id) { device._id = null; }
      }

      this.devices = data;
      this.deviceListChanged.next(this.devices);
      console.log(count + ' devices found' );
      return data;
    })
    .catch((error: Response) => {
      console.log(error);
      return Observable.throw(error);
    });

  }

  public announceView(device: Device) {
    console.log('Se ha visitado el dispositivo ' + JSON.stringify(device));
    switch (device.type) {
      case 'MRA': {
        this.mraSubject.next(device._id);
        break;
      }
      case 'LSR': {
        this.lsrSubject.next(device._id);
        break;
      }
      case 'VOC': {
        this.vocSubject.next(device._id);
        break;
     }
   }
  }

  getLatestViews(): LastViewsByDeviceType {
    return this.combineLatestViews;
  }

  getDevicesByKeyword(keyword: string) {
    if (keyword === '') { return this.getDevices(new Request()); }
    return this.http.get( this.rootUrl + 'devices/keyword/' + keyword )
    .map((response: Response) => {
      const data = response.json();
      for (const device of data) {
        if (!device.type) { device.type = 'DEFAULT TYPE'; }
        if (!device.name) { device.name = 'DEFAULT NAME'; }
        if (!device.desc) { device.desc = 'DEFAULT DESCRIPTION'; }
        if (!device._id) { device._id = null; }
      }
      this.devices = data;
      this.deviceListChanged.next(this.devices);
      return data;
    })
    .catch((error: Response) => {
      console.log(error);
      return Observable.throw('Something went wrong');
    });
  }
}
