import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-practice',
  templateUrl: './practice.component.html',
  styleUrls: ['./practice.component.css']
})
export class PracticeComponent implements OnInit {

  // paramsSubscription: Subscription;
  // key: any;
  // organizations: any[];
  // usersByCompany: any;
  // private doneEvent = new Subject<string>();

  constructor() { }

  ngOnInit() {

    // this.practiceService.getIssueObject().subscribe(
    //   (res: any) => {
    //     this.key = res.fields.creator.key;
    //     console.log('USER: ' + this.key);
    //   }
    // );

    // this.practiceService.getCompanies().subscribe(
    //   (res: any) => {
    //     this.organizations = res.values;
    //     Observable.from(this.organizations).subscribe(
    //       (company: any) => {
    //         console.log(company);
    //         this.practiceService.getUsersByCompanyId(company.id + '')
    //         .subscribe(
    //           (user: any) => {
    //             this.usersByCompany = user.values;
    //             console.log(this.usersByCompany);
    //             console.log(this.key + ' ----- Vs ----- ' + );
    //           }
    //         );
    //       }
    //     );
    //   }
    // );

    // this.doneEvent.subscribe(
    //   (companyName: string) => {
    //     console.log('el usuario pertenece a la empresa  -> ' + companyName );
    //   }
    // );

    // this.practiceService.getUsersByCompanyId('3')
    //   .subscribe(
    //     (res: any) => {
    //       this.usersByCompany = res.values;
    //       console.log(this.usersByCompany);
    //     }
    //   );




  }

}
