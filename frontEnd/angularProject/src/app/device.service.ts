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
import { map, retry, switchMap, combineLatest } from 'rxjs/operators';




@Injectable()
export class DeviceService {

  rootUrl = 'http://localhost:3000/';
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

  constructor(private http: Http) {
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
    this.headersValue.append('Content-Type', 'application/json');
    const resultado =  this.http.put(
        this.rootUrl + 'devices/' + device._id,
        JSON.stringify(device),
       {headers: this.headersValue} )
      .map((response: Response) => {
        console.log(response);
        return response.json();
      })
      .catch((error: Response) => {
        console.log('ERROR');
        return Observable.throw('Something went wrong');
      });

      this.deviceListChanged.next(this.devices);
      return resultado;


  }
createOne(device: Device) {
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
  this.headersValue.append('Content-Type', 'application/json');
    return this.http.delete(
       this.rootUrl + 'devices/' + request.id,
       {headers: this.headersValue} )
      .map((response: Response) => {
        console.log(response);
        this.onDeviceDeleted.emit(request.id);
        this.devices = this.devices.filter(e => e._id !== request.id);
        this.deviceListChanged.next( this.devices );
        return response.json();
      }).catch((error: Response) => {
        console.log('ERROR');
        return Observable.throw('Something went wrong');
      });
}

  getAppName(): Observable<string> {

    return this.http.get(this.rootUrl + 'params/' + this.app_name_KEY)
    .map((response: Response) => {
      const param = response.json();
      return param.value;
    })
    .retry(15);
  }

  fixResponse(route: string) {
    return this.http.get( route )
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
    return this.getDevices(new Request());
  }


}
