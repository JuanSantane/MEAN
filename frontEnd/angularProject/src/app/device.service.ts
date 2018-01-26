import { Device } from './shared/Device';
import { Request } from './shared/request';
import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Subject } from 'rxjs/Subject';
// tslint:disable-next-line:import-blacklist
import 'rxjs/Rx';
import { Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { EventEmitter } from '@angular/core';

@Injectable()
export class DeviceService {

  rootUrl = 'http://localhost:3000/';
 // deviceListChanged = new Subject<Device[]>();
  headersValue = new Headers();
  private devices: Device[] = [];
  deviceListChanged = new EventEmitter<Device[]>();
  onDeviceDeleted = new EventEmitter<string>();

  constructor(private http: Http) {}

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

      this.deviceListChanged.emit(this.devices);
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
        return response.json();
      })
      .catch((error: Response) => {
        console.log('ERROR');
        return Observable.throw('Something went wrong');
      });
}

  getAppName() {
    return 'App default Name';
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
      return Observable.throw('Something went wrong');
    });

  }




}
