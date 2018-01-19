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

  if (rqst.isVoid()) {
      return this.fixResponse('http://localhost:1214/devices');
  }
  if (rqst.name != null) {
    if (rqst.type != null) {
      return this.fixResponse('http://localhost:1214/devices/' + rqst.name + '/' + rqst.type);
    }
   return this.fixResponse('http://localhost:1214/devices/' + rqst.name );
  }else {
    return this.fixResponse('http://localhost:1214/devices/null/' + rqst.type );
  }
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

  fixResponse(route: String) {
    return this.http.get('' + route )
    .map((response: Response) => {
      const data = response.json();
      for (const device of data) {
        if (!device.type) { device.type = 'DEFAULT TYPE'; }
        if (!device.name) { device.name = 'DEFAULT NAME'; }
        if (!device.desc) { device.desc = 'DEFAULT DESCRIPTION'; }
      }
      return data;
    })
    .catch((error: Response) => {
      return Observable.throw('Something went wrong');
    });

  }


}
