import { Subject } from 'rxjs/Subject';
import { Response } from '@angular/http';
import { Subscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs/Observable';
import { Device } from './../../shared/Device';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { DeviceService } from '../../device.service';
import {User} from './../../shared/user';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit, OnDestroy {

  signinForm: FormGroup = new FormGroup({
    'userData': new FormGroup({
      'email': new FormControl(null, [Validators.required]),
      'password': new FormControl(null, [Validators.required])
    })
  });
  logged= false;
  submited= false;
  messageToUser= '';

  constructor( private userService: UserService, private router: Router) { }

  ngOnInit() {

  }
  ngOnDestroy(): void {

  }

  onSubmit() {
    const userData =  this.signinForm.getRawValue().userData;
    const user = {
      email: userData.email,
      password: userData.password
    };

    this.userService.signin(user).subscribe(
      (response: any) => {
        this.logged = true;
        this.submited = true;
        this.router.navigate(['/devices']);
       },
      (err) => {
        console.log(err);
        switch (err.status) {
          case 401 :
            console.log('Failed authentication');
            this.messageToUser = 'Failed authentication';
            break;
          case 404 :
            console.log('User no found');
            this.messageToUser = 'User no found';
            break;
          default :
            console.log('Error was found');
            this.messageToUser = 'Error was found';
        }
        this.logged = false;
        this.submited = true;
      },
      () => {console.log('[onComplete].signin'); }
    );
  }

}
