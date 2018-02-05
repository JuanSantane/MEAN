import { FormControl } from '@angular/forms';
import { LastViewsByDeviceType } from '../shared/lastViews';
import { Device } from '../shared/Device';
import { Request } from '../shared/request';
import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Subject } from 'rxjs/Subject';
import 'rxjs/Rx';
import { Observable } from 'rxjs/Observable';
import { EventEmitter, OnInit } from '@angular/core';
import { map, retry, switchMap, combineLatest, retryWhen } from 'rxjs/operators';


@Injectable()
export class PracticeService {

  rootUrl = 'http://192.168.188.67:3000/';
  headersValue = new Headers();

  constructor(private http: Http) {

  }


  getIssueObject() {
    const route =  'http://192.168.188.67:3000/practice/getIssue';
    return this.http.get( route )
    .map((res: Response) => {
      const param = res.json();
      return param;
    });
  }

  getCompanies() {
    const route =  'http://192.168.188.67:3000/practice/getOrganizations';
    return this.http.get( route )
    .map((res: Response) => {
      const param = res.json();
      return param;
    });
  }

  getUsersByCompanyId(companyId: string) {
    const route =  'http://192.168.188.67:3000/practice/getUsersByCompanyId/' + companyId;
    return this.http.get( route )
    .map((res: Response) => {
      const param = res.json();
      return param;
    });
  }

}
