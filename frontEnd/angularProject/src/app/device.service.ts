import { Device } from './shared/Device';
import { Request } from './shared/request';
import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
// tslint:disable-next-line:import-blacklist
import 'rxjs/Rx';
import { Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class DeviceService {

  rootUrl = 'http://localhost:3000/';

  constructor(private http: Http) {}

  // storeServers(servers: any[]) {
  //   const headersValue = new Headers({ 'Content-Type': this.newMethod() });
  //   // return this.http.post('https://ng-http-fs.firebaseio.com/data.json', servers,
  //   //   {headers: headersValue} );
  //   return this.http.put(
  //     'https://ng-http-fs.firebaseio.com/data.json',
  //     servers,
  //     { headers: headersValue }
  //   );
  // }



  getDevices(rqst: Request) {

  if (rqst.isVoid() || rqst == null) {
      return this.fixResponse( this.rootUrl + 'devices');
  }
  if (rqst.id != null) {
    return this.fixResponse( this.rootUrl + 'devices/' + rqst.id);
  }
  // if (rqst.name != null) {
  //   if (rqst.type != null) {
  //     return this.fixResponse('http://localhost:1214/devices/' + rqst.id + '/' + rqst.type);
  //   }
  //  return this.fixResponse('http://localhost:1214/devices/' + rqst.name );
  // }else {
  //   return this.fixResponse('http://localhost:1214/devices/null/' + rqst.type );
  // }
}
  update(device: Device) {
    const ruta = this.rootUrl + 'devices/' + device._id;
    const body = device;
    console.log(ruta);
    console.log(body);
    console.log('==========> respuesta del put');
    return this.http.put( ruta , body )
    .map((response: Response) => {
      console.log('==========> respuesta del put');
      console.log(response);
      return response.json();
    } )
    .catch((error: Response) => {
      console.log('ERROR');
      return Observable.throw('Something went wrong');

    });

  }

  delete () {

  }

  getAppName() {
    // return this.http.get('http://localhost:1214/params')
    // .map(
    //   (response: Response) => {
    //     return response.json();
    //   }
    // );
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
      return data;
    })
    .catch((error: Response) => {
      return Observable.throw('Something went wrong');
    });

  }




}
